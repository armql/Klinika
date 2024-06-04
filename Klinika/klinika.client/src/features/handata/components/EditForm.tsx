import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import {Fragment} from "react/jsx-runtime";
import {Spinner, X} from "@phosphor-icons/react";
import {z} from "zod";
import {useEffect, useState} from "react";
import getErrorMessage from "../../../util/http-handler";
import {isAxiosError} from "axios";
import Swal from "sweetalert2";
import {Checkbox, createGlobalSchema, File, GlobalError, Input, Select, Textarea,} from "../../validation/__validation";
import {zForm, zHandler} from "../__handata";
import {FormField} from "../utils/form-fields";

type FormProps<T> = {
    header: string;
    fields: FormField[];
    get: (id: number | string) => Promise<T>;
    update: (id: number | string, item: T) => Promise<T>;
};

type PatchProps = { op: string; path: string; value: number | string | boolean; }[];


export default function EditForm<T>({
                                        header,
                                        fields,
                                        get,
                                        update,
                                    }: FormProps<T>) {
    const global_schema = createGlobalSchema(fields);
    type RefinedInputs = z.infer<typeof global_schema>;
    const {
        register,
        setValue,
        handleSubmit,
        control,
        formState: {errors, isSubmitting, isSubmitSuccessful},
    } = useForm<RefinedInputs>({
        mode: "onChange",
        resolver: zodResolver(global_schema),
    });
    const {closeEdit: close, setGlobalError, global_error} = zHandler();
    const [loadingData, setLoadingData] = useState(true);
    const {selectedItem} = zForm();

    useEffect(() => {
        const getData = async (id: number | string | null) => {
            setLoadingData(true);
            try {
                if (id) {
                    const response = await get(id);
                    if (response) {
                        fields.forEach((field) => {
                            if (field.type === "date") {
                                const dateValue = response[field.identifier];
                                if (dateValue) {
                                    const date = new Date(dateValue);
                                    const formattedDate = `${date.getFullYear()}-${(
                                        "0" +
                                        (date.getMonth() + 1)
                                    ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
                                    setValue(field.identifier, formattedDate);
                                }
                            } else {
                                setValue(field.identifier, response[field.identifier]);
                            }
                        });
                    } else {
                        setGlobalError("Failed getting the id with needed data");
                    }
                } else {
                    setGlobalError("No id received");
                }
            } catch (error) {
                console.log(error);
            }
            setLoadingData(false);
        };
        getData(selectedItem);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps -- Intentional suppress

    const onSubmit = async (data: RefinedInputs) => {
        try {
            const patchDoc: PatchProps = fields.map((field) => ({
                op: "replace",
                path: `/${field.identifier}`,
                value: data[field.identifier],
            }));
            if (selectedItem === null) {
                setGlobalError("No id received");
                return;
            }

            const response = await update(selectedItem, patchDoc);
            if (response) {
                await Swal.fire({
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1000,
                });
                close();
            } else {
                setGlobalError("Response failed for some unknown reason.");
            }
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                const errorMessage = getErrorMessage(error);
                setGlobalError(errorMessage);
            }
        }
    };

    const generateInputs = (field: FormField) => {
        const betterOptions = field.options?.map(option => ({value: option.id, label: option.name}));
        let inputElement;
        switch (field.type) {
            case "checkbox":
                inputElement = (
                    <Checkbox
                        type="checkbox"
                        htmlFor={field.identifier}
                        labelName={field.name}
                        placeholder={field.placeholder}
                        {...register(field.identifier)}
                        error={errors[field.identifier]?.message}
                        hidden={field.isHidden}
                    />
                );
                break;
            case "number":
                inputElement = (
                    <Controller
                        name={field.identifier}
                        control={control}
                        render={({field: {onChange, onBlur, value, name, ref}}) => (
                            <Input
                                type="number"
                                htmlFor={field.identifier}
                                labelName={field.name}
                                placeholder={field.placeholder}
                                value={value || ''} // Provide a default value
                                onChange={async e => {
                                    onChange(e.target.valueAsNumber);
                                    return Promise.resolve();
                                }}
                                onBlur={async () => {
                                    onBlur();
                                    return Promise.resolve();
                                }}
                                error={errors[name]?.message}
                                hidden={field.isHidden}
                                ref={ref}
                            />
                        )}
                    />
                );
                break;
            case "hidden":
                inputElement = (
                    <input
                        type="hidden"
                        name={field.identifier}
                        {...register}
                        defaultValue={field.value}
                    />
                );
                break;
            case "file":
                inputElement = (
                    <Controller
                        control={control}
                        name="file"
                        render={({field: {onChange, onBlur, name, ref}}) => (
                            <File
                                type="file"
                                htmlFor="file"
                                labelName="Image"
                                placeholder="Upload your image"
                                onChange={e => {
                                    console.log(e.target.files[0]); // Add this line
                                    onChange(e.target.files[0]);
                                }}
                                onBlur={onBlur}
                                name={name}
                                ref={ref}
                                error={errors.file?.message}
                            />
                        )}
                    />
                );
                break;
            case "select":
                inputElement = (
                    <Select
                        control={control}
                        name={field.identifier}
                        labelName={field.name}
                        options={betterOptions}
                        error={errors[field.identifier]?.message}
                        hidden={field.isHidden}
                    />
                );
                break;
            case "textarea":
                inputElement = (
                    <Textarea
                        htmlFor={field.identifier}
                        labelName={field.name}
                        placeholder={field.placeholder}
                        {...register(field.identifier)}
                        error={errors[field.identifier]?.message}
                        hidden={field.isHidden}
                    />
                );
                break;
            default:
                inputElement = (
                    <Input
                        type={field.type}
                        htmlFor={field.identifier}
                        labelName={field.name}
                        placeholder={field.placeholder}
                        {...register(field.identifier)}
                        error={errors[field.identifier]?.message}
                        hidden={field.isHidden}
                    />
                );
        }

        return <Fragment key={field.identifier}>{inputElement}</Fragment>;
    };

    if (loadingData) {
        return (
            <div
                className="absolute top-0 left-0 bottom-0 right-0 flex items-center bg-opacity-20 justify-center bg-black ">
                <div
                    className="flex overflow-y-auto flex-col gap-12 relative justify-center sm:px-40 px-4 items-center w-[700px] h-[600px] rounded-md bg-white">
                    <h1 className="text-4xl font-bold">Loading data</h1>
                    <Spinner size={32} className="animate-spin"/>
                </div>
            </div>
        );
    }

    return (
        <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center bg-opacity-20 justify-center bg-black">
            <div
                className="flex overflow-y-auto flex-col gap-12 py-12 relative justify-center sm:px-40 px-4 items-center w-[700px] max-h-[900px] rounded-md bg-white">
                <h1 className="font-medium text-3xl">Edit {header}</h1>
                <button
                    title="Close edit modal"
                    type="button"
                    onClick={close}
                    className="absolute top-2 right-2 p-4 rounded-full hover:bg-zinc-50 hover:opacity-70"
                >
                    <X size={24}/>
                </button>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-6 w-full"
                >
                    {fields.map((field) => generateInputs(field))}
                    <button
                        type="submit"
                        className="mt-4 py-2.5 flex justify-center items-center font-manrope hover:bg-primary/70 text-compact bg-primary/50 rounded-md active:cursor-wait"
                    >
                        {isSubmitting || isSubmitSuccessful ? (
                            global_error ? (
                                "Edit"
                            ) : (
                                <Spinner size={24} className="animate-spin"/>
                            )
                        ) : (
                            "Edit"
                        )}
                    </button>
                </form>
            </div>
            <GlobalError/>
        </div>
    );
}
