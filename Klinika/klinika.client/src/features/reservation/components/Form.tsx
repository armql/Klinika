import {zReservation} from "../store/zReservation.ts";
import {Textarea} from "../../validation/__validation.ts";
import Datepicker from "./Datepicker.tsx";
import {ClockClockwise, Info, MagicWand, Spinner, User} from "@phosphor-icons/react";
import {Tooltip} from "react-tooltip";
import {zAuth} from "../../../store/zAuth.ts";
import axios_instance from "../../../api/axios.ts";
import {useQuery} from "react-query";
import {format} from "date-fns";
import {useNavigate} from "react-router-dom";
import PaymentGate from "./PaymentGate.tsx";

type FormProps = {
    refetch: () => void;
}

type Reservation = {
    date: string;
    slots: number[];
};

type ReservationForm = {
    reasonOfConsultation: string,
    date: string,
    slot: number,
    specializedDoctorId: string,
    patientId: string
};

type SpecializedDoctor = {
    id: string;
    specializationId: number;
    specializationName: string;
    fullName: string;
    reservations: Reservation[];
};

export default function Form({refetch}: FormProps) {
    const {
        selectedSpecialization,
        selectedDoctor,
        setOptions,
        options,
        setSelectedDoctor,
        selectedDate,
        selectedTime,
        reasonOfConsult,
        setReasonOfConsult,
        formError,
        setFormError,
        loading: reserveLoading,
        setLoading: setReserveLoading
    } = zReservation();
    const {data: authData} = zAuth();

    const navigate = useNavigate();
    const fetchSpecializedDoctors = async (): Promise<SpecializedDoctor[]> => {
        const response = await axios_instance.get<SpecializedDoctor[]>('SpecializedDoctor/getAll');
        return response.data;
    };

    const {
        data: specializedDoctors,
        error,
        isLoading
    } = useQuery<SpecializedDoctor[]>('specializedDoctors', fetchSpecializedDoctors);


    const doctorsForSpecialization = specializedDoctors
        ? specializedDoctors.filter((doctor: SpecializedDoctor) => doctor.specializationName === selectedSpecialization?.title)
        : [];


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {(error as Error).message}</div>;
    }


    const handleReserve = async () => {
        setReserveLoading(true);

        if (!selectedSpecialization?.isAvailable) {
            setFormError('You have to pay for reservation to this specialization, fee is 20EUR');
            setReserveLoading(false);
            return;
        }

        if (!selectedDate || !selectedTime || !selectedDoctor || !reasonOfConsult) {
            setFormError('Ensure that all fields are filled in');
            setReserveLoading(false);
            return;
        }

        const reservation: ReservationForm = {
            reasonOfConsultation: reasonOfConsult,
            date: format(selectedDate, 'MM/dd/yyyy'),
            slot: selectedTime.id,
            specializedDoctorId: selectedDoctor.id,
            patientId: authData.id
        };

        try {
            await axios_instance.post('Fee/cleanup', {
                userId: authData.id,
                specializationName: selectedSpecialization.title,
            });
        } catch (error: unknown) {
            setFormError(`Error removing fee: ${error.message}`);
            setReserveLoading(false);
            return;
        }

        try {
            const response = await axios_instance.post('Reservation/create', reservation);

            if (response.status === 200) {
                navigate('../dashboard');
                setReserveLoading(false);
            } else {
                setFormError(`Error creating reservation ${response.data}`);
                setReserveLoading(false);
            }
        } catch (error) {
            setFormError(`Error creating reservation ${error}`);
            setReserveLoading(false);
        }
    };

    return (
        <section className="border-2 p-12 w-[800px] relative h-fit rounded-3xl shadow-sm">
            <h1 className="text-2xl font-medium">Reserving for [Firstname Lastname]
                in {selectedSpecialization?.title}</h1>
            <div className="mt-4 flex flex-col gap-4">
                <Textarea
                    htmlFor={"reasonOfConsult"}
                    labelName={"Reason for Consult"}
                    placeholder={"The reasoning for consult"} type={"textarea"}
                    onChange={(e) => {
                        setReasonOfConsult(e.target.value);
                    }}
                    name={"reasonOfConsult"}/>
                <div className="flex flex-col gap-6">
                    <div className="flex gap-2 flex-row">
                        <button
                            type="button"
                            onClick={() => setOptions(false)}
                            className={`border-2 w-1/2 h-20 hover:border-zinc-300 gap-4 flex justify-start flex-row items-center px-4 rounded-md ${options || "border-zinc-300"}`}>
                            <div>
                                <MagicWand size={32} weight="duotone"/>
                            </div>
                            <div>
                                <h3 className="text-zinc-900 text-start">Reserve Specific Date</h3>
                                <p className="text-start text-sm text-zinc-600">
                                    Pick a specific doctor with a specific date and time for the consultation
                                </p>
                            </div>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                // handleEarliest();
                                setOptions(true);
                            }}
                            className={`border-2 w-1/2 h-20 hover:border-zinc-300 gap-4 flex justify-start flex-row items-center px-4 rounded-md ${options && "border-zinc-300"}`}>
                            <div>
                                <ClockClockwise size={32} weight="duotone"/>
                            </div>
                            <div>
                                <h3 className="text-start text-zinc-900">
                                    Earliest Available Date
                                </h3>
                                <p className="text-start text-sm text-zinc-600">
                                    Earliest available date will be selected for you with the first available doctor
                                </p>
                            </div>
                        </button>
                    </div>
                    {options === undefined || options || <div>
                        <div className="w-full overflow-x-auto">
                            <div
                                className="flex gap-4 rounded-l-sm h-[160px] min-w-max">
                                {doctorsForSpecialization.map((doctor: SpecializedDoctor) => {
                                    return (
                                        <button
                                            type="button"
                                            key={doctor.id}
                                            onClick={() => setSelectedDoctor(doctor)}
                                            className={`w-[220px] border-2 rounded-md gap-1 flex flex-col justify-center items-center transition-all duration-700 group h-full ${doctor === selectedDoctor ? "border-zinc-300" : ""} `}>
                                            <div
                                                className="w-[100px] h-[80px] flex justify-center items-center bg-white transition-all duration-700 rounded-full">
                                                <User size={64} weight="duotone"/>
                                            </div>
                                            <div>
                                                <h1 className="text-zinc-800 text-center">{doctor.fullName}</h1>
                                                <p className="text-xs text-zinc-500 font-light text-center">
                                                    {doctor.specializationName}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>}
                    {selectedDoctor && <Datepicker/>}
                </div>
                <PaymentGate refetch={refetch}/>
                <div className="border-zinc-300 absolute top-0 right-0 p-4">
                    {selectedSpecialization?.isAvailable ? (
                        <div data-tooltip-id="free-info-tooltip"
                             className="w-4 h-4 rounded-full bg-emerald-400 animate-pulse"
                             id="free-info-tooltip"/>
                    ) : (
                        <div data-tooltip-id="paid-info-tooltip"
                             className="w-4 h-4 rounded-full bg-amber-400 animate-pulse"
                             id="paid-info-tooltip"/>
                    )}
                </div>
                <div className="flex flex-col gap-2 justify-center items-start py-4">
                    {formError && (
                        <div
                            className="shadow-sm flex flex-col p-2 w-full text-sm text-red-600 rounded-md bg-red-50">
                            <div className="flex items-center justify-start flex-row gap-2">
                                <Info size={16} weight="bold"/>
                                <span className="font-medium">
                    Ensure that these requirements are met:
                  </span>
                            </div>
                            <ul className="mt-1.5 list-disc ml-6 text-sm">
                                <li>{formError}</li>
                            </ul>
                        </div>
                    )}
                    <p className="text-sm w-full">
                        By clicking on the reserve button, you agree to the <span className="text-green-500">terms and conditions</span> of
                        the reservation
                    </p>
                    <button
                        type="button"
                        onClick={() => handleReserve()}
                        className="border-2 flex justify-center items-center w-72 bg-zinc-50 font-medium px-6 rounded-md py-2.5"
                    >
                        {reserveLoading ?
                            <Spinner size={20} className="animate-spin"/> : "Reserve"}
                    </button>
                </div>
            </div>
            <Tooltip
                style={{
                    backgroundColor: '#f5f5f5',
                    padding: '0.6rem',
                    color: '#323232',
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    zIndex: 40,
                    width: "300px",
                    fillOpacity: 1,
                }}
                arrowColor="#323232"
                id="free-info-tooltip"
                className="z-40 text-xs">
                <p>
                    You have access for free reservation to this specialization
                </p>
            </Tooltip>
            <Tooltip
                style={{
                    backgroundColor: '#f5f5f5',
                    padding: '0.6rem',
                    color: '#323232',
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    zIndex: 40,
                    width: "300px",
                    fillOpacity: 1,
                }}
                arrowColor="#323232"
                id="paid-info-tooltip"
                className="z-40 text-xs">
                <p>
                    You have to pay for reservation to this specialization, fee is 20EUR
                </p>
            </Tooltip>
        </section>
    );
}


