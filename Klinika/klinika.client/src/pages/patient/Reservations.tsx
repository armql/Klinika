import {zReservation} from "../../features/reservation/store/zReservation.ts";
import {Categories, Form} from "../../features/reservation/__reservation.ts";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {zAuth} from "../../store/zAuth.ts";
import {useEffect, useState} from "react";
import {specialization_data} from "../../features/reservation/data/specialization_data.ts";
import axios_instance from "../../services/axios.ts";
import {useQuery} from "react-query";
import {CaretLeft} from "@phosphor-icons/react";

const stripePromise = loadStripe("pk_test_51PLLAYET6IMeC9ZTgP36mqJEWbaxtYtuJElKW4PbjzG5I2wYJXrLe0L8VgPTHhsqVRtfCQOSt20BP27P4c6rgWlb00RHgd9aZ6");

function Reservations() {
    const {selectedSpecialization, setSelectedSpecialization} = zReservation();
    const {data: userData} = zAuth();
    const [specializations, setSpecializations] = useState(specialization_data);
    const fetchFees = async () => {
        const response = await axios_instance.get('Fee/all');
        const fees = response.data[0].specializations;
        return specializations.map(specialization => {
            const fee = fees.find((fee: { name: string }) => fee.name === specialization.title);
            if (fee) {
                specialization.isAvailable = fee.feeReleased.includes(userData.id);
            }
            return specialization;
        });
    };

    const {data, refetch} = useQuery('fees', fetchFees, {
        retry: false,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (data) {
            setSpecializations(data);
        }
    }, [data]);

    return (
        <section className={`w-full h-fit py-12 px-12 flex justify-center items-center`}>
            {selectedSpecialization ?
                <Elements stripe={stripePromise}>
                    <div className="relative">
                        <Form refetch={refetch}/>
                        <button
                            type="button"
                            onClick={() => setSelectedSpecialization(null)}
                            className="absolute group top-0 -left-40 w-40 bottom-0 flex justify-end items-center">
                            <CaretLeft size={48} weight="duotone" className="group-hover:block hidden"/>
                        </button>
                    </div>
                </Elements>
                : <Categories/>
            }
        </section>
    );
}

export default Reservations;