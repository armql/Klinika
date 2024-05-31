import {zReservation} from "../store/zReservation.ts";
import {Textarea} from "../../validation/__validation.ts";
import Datepicker from "./Datepicker.tsx";
import {Check, ClockClockwise, MagicWand, Spinner, User} from "@phosphor-icons/react";
import {SpecializedDoctors} from "../data/specializationDoctor_data.ts";
import {Tooltip} from "react-tooltip";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {FormEvent} from "react";
import {zAuth} from "../../../store/zAuth.ts";
import axios_instance from "../../../api/axios.ts";
import {zHandler} from "../../handata/__handata.ts";

type FormProps = {
    refetch: () => void;
}

export default function Form({refetch}: FormProps) {
    const {
        selectedSpecialization,
        selectedDoctor,
        setOptions,
        options,
        setSelectedDoctor,
        // selectedTime,
        // selectedDate,
        // setSelectedTime,
        // setSelectedDate,
    } = zReservation();
    const {setGlobalError, loading, setLoading} = zHandler();


    const {data} = zAuth();
    const doctorsForSpecialization = SpecializedDoctors.filter(doctor => doctor.specializations === selectedSpecialization?.title);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setGlobalError('Stripe or elements is not loaded');
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (cardElement) {
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                setGlobalError(`Error creating payment method, ${error.message}`);
            } else {
                try {
                    setLoading(false);
                    const response = await axios_instance.post('Fee/purchase', {
                        specializationName: selectedSpecialization?.title,
                        userId: data.id,
                    });

                    const {clientSecret} = response.data;

                    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                        payment_method: paymentMethod?.id,
                    });

                    if (paymentResult.error) {
                        setGlobalError(`Error confirming payment:, ${paymentResult.error.message}`);
                    } else {
                        if (paymentResult.paymentIntent.status === 'succeeded') {
                            setLoading(true);
                            refetch();
                        }
                    }
                } catch (error: any) {
                    setGlobalError(`Error sending POST request:, ${error.response.data}`);
                }
            }
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
                    // onChange={() => {}}
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
                                {doctorsForSpecialization.map((doctor) => {
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
                                                <h1 className="text-zinc-800 text-center">{doctor.name}</h1>
                                                <p className="text-xs text-zinc-500 font-light text-center">
                                                    {doctor.specializations}
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
                <div className="border-zinc-300 absolute top-0 right-0 p-4">
                    {selectedSpecialization?.isAvailable ? (
                        <div data-tooltip-id="free-info-tooltip"
                             className="w-4 h-4 rounded-full bg-emerald-400 animate-pulse"
                             id="free-info-tooltip"/>
                    ) : (
                        <div data-tooltip-id="paid-info-tooltip"
                             className="w-4 h-4 rounded-full bg-amber-400 animate-pulse"
                             id="free-info-tooltip"/>
                    )}
                </div>
                {selectedSpecialization?.isAvailable ? null : (
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <CardElement className="border-2 rounded-md px-4 py-2"/>
                            <span className="text-sm px-1 text-zinc-500">
                                The reservation fee is 20EUR
                            </span>
                        </div>
                        <div className="mt-4">
                            <button type="submit" disabled={!stripe}
                                    className="rounded-full px-4 w-60 flex justify-center items-center py-1.5 bg-gradient-to-tr from-green-400 to-green-200">
                                {loading !== undefined ? loading ? <Check size={20}/> :
                                    <Spinner size={20} className="animate-spin"/> : "Pay for a reservation"}
                            </button>
                        </div>
                    </form>
                )}
                <div className="flex flex-col gap-2 justify-center items-start py-4">
                    <p className="text-sm w-full">
                        By clicking on the reserve button, you agree to the <span className="text-green-500">terms and conditions</span> of
                        the reservation
                    </p>
                    <button
                        type="button"
                        // onClick={() => {}}
                        className="border-2 w-72 bg-zinc-50 font-medium px-6 rounded-md py-2.5"
                    >
                        Reserve
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


