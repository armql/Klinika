import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {ApiService} from "../../../services/ApiServices.ts";
import axios_instance from "../../../api/axios.ts";
import {zAppointments} from "../__specialized.ts";
import {Input, Textarea} from "../../validation/__validation.ts";
import {z} from "zod";
import {Spinner, X} from "@phosphor-icons/react";
import {format, parse} from "date-fns";
import {getTimespanForSlot} from "../../../util/timeslot-handle.ts";

type Consultation = {
    notes: string;
    evaluation: string;
};

const schema_consultation = z.object({
    notes: z
        .string()
        .max(144, "Field should not exceed 144 characters")
        .refine((value) => value && value.length > 0, {
            message: "Field is required",
        })
        .refine((value) => value && value[0] === value[0].toUpperCase(), {
            message: "Field should start with an uppercase letter",
        }),
    evaluation: z
        .string()
        .max(64, "Field should not exceed 64 characters")
        .refine((value) => value && value.length > 0, {
            message: "Field is required",
        })
        .refine((value) => value && value[0] === value[0].toUpperCase(), {
            message: "Field should start with an uppercase letter",
        }),
});

type FormFields = z.infer<typeof schema_consultation>;

function AppointmentModal() {
    const {form, setForm} = zAppointments();
    const dashboard_api = new ApiService(
        {
            create: "Consultation/create",
        },
        axios_instance
    );

    const {register, handleSubmit, formState: {errors, isSubmitting, isSubmitSuccessful}} = useForm<FormFields>({
        mode: "onChange",
        resolver: zodResolver(schema_consultation)
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const consultationData = {
                ...data,
                reservationId: form?.id,
            } as Consultation;
            const response = await dashboard_api.create(consultationData);
            if (response) {
                setForm(null);
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const parsedDate = parse(form?.date || '', 'MM/dd/yyyy', new Date());
    const formattedDate = format(parsedDate, 'do MMMM yyyy');
    const timeSpan = getTimespanForSlot(form?.slot || 0);

    return (
        <div
            className="absolute top-0 bottom-0 right-0 left-0 bg-black bg-opacity-20 flex justify-center items-center">

            <div className='border-2 rounded-xl p-8 flex flex-col bg-white gap-6 relative'>
                <div className="absolute top-0 right-0 p-2">
                    <button
                        type="button"
                        className='rounded-full p-1 hover:bg-zinc-100'
                        onClick={() => setForm(null)}
                    >
                        <X size={24}/>
                    </button>
                </div>
                <h1 className="text-xl font-medium my-4">
                    Appointments Form for {form?.patientFullName}
                </h1>
                <div className="flex flex-row gap-12">

                    <div className="w-80 flex flex-col gap-4">
                        <div>
                            <h3 className="">
                                Reason for Consult: <span className="underline"> {form?.reasonOfConsultation}</span>
                            </h3>
                            <span className="text-zinc-400 text-sm">
                            {formattedDate} | {timeSpan}
                        </span>
                        </div>
                        {/*<div className="flex flex-col span-2 items-start justify-center gap-2 border-2 text-sm">*/}
                        {/*    <p className="text-zinc-400">Patients Attendance</p>*/}
                        {/*</div>*/}
                        <form onSubmit={handleSubmit(onSubmit)} className="w-80 flex flex-col gap-6">
                            <Input
                                {...register('notes')}
                                htmlFor="notes"
                                labelName="Notes"
                                placeholder=""
                                type="text"
                                error={errors.notes?.message}
                            />
                            <Textarea
                                {...register('evaluation')}
                                htmlFor="evaluation"
                                labelName="Evaluation"
                                placeholder=""
                                type="text"
                                error={errors.evaluation?.message}
                            />
                            <button
                                type="submit"
                                onClick={() => console.log('clicked')}
                                className="mt-4 py-2.5 focus:outline-none active:opacity-80 flex justify-center items-center font-manrope hover:bg-primary/70 text-compact bg-primary/50 rounded-md active:cursor-wait"
                            >
                                {isSubmitting || isSubmitSuccessful ? (
                                    <Spinner size={24} className="animate-spin"/>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppointmentModal;