import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {Check, Spinner} from "@phosphor-icons/react";
import {zReservation} from "../store/zReservation.ts";
import {FormEvent, Fragment} from "react";
import axios_instance from "../../../services/axios.ts";
import {zHandler} from "../../handata/store/zHandler.ts";
import {zAuth} from "../../../store/zAuth.ts";

type PaymentProps = {
    refetch: () => void;
}

function PaymentGate({refetch}: PaymentProps) {
    const {selectedSpecialization} = zReservation();
    const {setGlobalError, loading, setLoading} = zHandler();
    const stripe = useStripe();
    const elements = useElements();
    const {data: authData} = zAuth();

    const handlePayment = async (event: FormEvent) => {
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
                        userId: authData.id,
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
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        setGlobalError(`Error sending POST request, ${error.message}`);
                    } else {
                        setGlobalError(`Error sending POST request, ${String(error)}`);
                    }
                }
            }
        }
    };

    return (
        <Fragment>
            {selectedSpecialization?.isAvailable ? null : (
                <form onSubmit={handlePayment}>
                    <div className="mt-4">
                        <CardElement className="border-2 rounded-md px-4 py-2.5"/>
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
        </Fragment>
    );
}

export default PaymentGate;