import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";
import { Spinner, X } from "@phosphor-icons/react";
import { z } from "zod";
import { useEffect, useState } from "react";
import getErrorMessage from "../../../util/http-handler";
import { isAxiosError } from "axios";
import Swal from "sweetalert2";
import {
  Checkbox,
  createGlobalSchema,
  GlobalError,
  Input,
  Select,
} from "../../validation/__validation";
import { useFormStore } from "../store/FormStore";
import { useHandler } from "../__handata";
export type FormField = {
  type: string;
  identifier: string;
  name: string;
  options?: string[];
  placeholder?: string;
};

type FormProps<T> = {
  header: string;
  fields: FormField[];
  get: (id: string) => Promise<T>;
  update: (id: string, item: T) => Promise<T>;
};

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
    formState: { errors, isSubmitting },
  } = useForm<RefinedInputs>({
    mode: "onChange",
    resolver: zodResolver(global_schema),
  });
  const { openEdit: close, setGlobalError } = useHandler();
  const [loadingData, setLoadingData] = useState(true);
  const { selectedItem } = useFormStore();

  useEffect(() => {
    const getData = async (id: number | null) => {
      setLoadingData(true);
      try {
        if (id) {
          const response = await get(id);
          if (response) {
            fields.forEach((field) => {
              if (
                field.identifier !== "id" &&
                field.identifier !== "created_by" &&
                field.identifier !== "created_date"
              ) {
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
  }, []);

  const onSubmit = async (data: RefinedInputs) => {
    try {
      const response = await update(selectedItem, data);
      if (response) {
        Swal.fire({
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
    let inputElement;
    console.log(errors);
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
          />
        );
        break;
      case "select":
        inputElement = (
          <Select
            htmlFor={field.identifier}
            labelName={field.name}
            options={field.options}
            {...register(field.identifier)}
            error={errors[field.identifier]?.message}
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
          />
        );
    }

    return <Fragment key={field.identifier}>{inputElement}</Fragment>;
  };

  if (loadingData) {
    return (
      <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center bg-opacity-20 justify-center bg-black ">
        <div className="flex overflow-y-auto flex-col gap-12 relative justify-center sm:px-40 px-4 items-center w-[700px] h-[600px] rounded-md bg-white">
          <h1 className="text-4xl font-bold">Loading data</h1>
          <Spinner size={32} className="animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center bg-opacity-20 justify-center bg-black ">
      <div className="flex overflow-y-auto flex-col gap-12 relative justify-center sm:px-40 px-4 items-center w-[700px] h-[600px] rounded-md bg-white">
        <h1 className="font-medium text-3xl">Edit {header}</h1>
        <button
          title="Close create modal"
          type="button"
          onClick={close}
          className="absolute top-0 right-0 p-2 hover:opacity-70"
        >
          <X size={24} />
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
            {isSubmitting ? (
              <Spinner size={24} className="animate-spin" />
            ) : (
              "Create"
            )}
          </button>
        </form>
      </div>
      <GlobalError />
    </div>
  );
}
