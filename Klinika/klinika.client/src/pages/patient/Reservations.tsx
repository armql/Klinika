import {zReservation} from "../../features/reservation/store/zReservation.ts";
import {Categories, Display, Form} from "../../features/reservation/__reservation.ts";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51PLLAYET6IMeC9ZTgP36mqJEWbaxtYtuJElKW4PbjzG5I2wYJXrLe0L8VgPTHhsqVRtfCQOSt20BP27P4c6rgWlb00RHgd9aZ6");

function Reservations() {
    const {specialization, reserving} = zReservation();
    return (
        <section className={`w-full h-full flex justify-center items-center`}>
            {specialization ? reserving === undefined ?
                <Display/> : reserving ? (
                    <Elements stripe={stripePromise}>
                        <Form/></Elements>
                ) : "Not Reserving" : <Categories/>
            }
        </section>
    );
}

export default Reservations;