import {zReservation} from "../store/zReservation.ts";

export default function Display() {
    const {specialization, setReserving} = zReservation();
    return (
        <div
            className="w-[800px] h-fit border-2 rounded-3xl overflow-hidden shadow-sm p-12 flex flex-col gap-2">
            <div>
                <h2 className="font-medium text-xl">
                    {specialization?.title} Reservations
                </h2>
                <p className="text-zinc-700">
                    You have no reservations for {specialization?.title} yet.
                </p>
            </div>
            <div className="flex flex-row gap-2">
                <button
                    type="button"
                    onClick={() => setReserving(true)}
                    className="w-1/2 h-12 bg-gradient-to-b from-black to-black/90 hover:from-black/90 hover:to-black text-white tracking-wide font-medium rounded-md">
                    Make a Reservation
                </button>
                <button
                    type="button"
                    onClick={() => setReserving(false)}
                    className="w-1/2 h-12 border-2 tracking-wide font-medium rounded-md">
                    View Reservations
                </button>
            </div>

        </div>
    );
}

