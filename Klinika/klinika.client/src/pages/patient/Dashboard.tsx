import {Fragment} from "react";
import {HandWaving, PencilSimple} from "@phosphor-icons/react";
import {ApiService} from "../../services/ApiServices.ts";
import {Reservation} from "../developer/ReservationData.tsx";
import axios_instance from "../../api/axios.ts";
import {zAuth} from "../../store/zAuth.ts";
import {useQuery} from "react-query";
import {format, parse} from "date-fns";
import {getTimespanForSlot} from "../../util/timeslot-handle.ts";

type CurrentUserProps = {
    firstName: string;
    lastName: string;
    gender: string;
    reservationsCount: number;
    reservations: ReservationProps[];
};

type ReservationProps = {
    id: number;
    reasonOfConsultation: string;
    date: string;
    slot: number;
    creationDate: string;
    specializedDoctorName: string;
    specializationName: string;
};

export default function Dashboard() {
    const {data: userData} = zAuth();
    const specialization_api = new ApiService<Reservation>(
        {
            get: "Account/getCurrent",
        },
        axios_instance
    );

    const {data, isLoading, error} = useQuery('user', async () => {
        const response: CurrentUserProps = await specialization_api.get(userData.id);
        return response;
    });

    if (isLoading) return 'Loading...';
    if (error) return 'An error has occurred: ' + (error as Error).message;


    return (
        <Fragment>
            {/*{walkthrough === undefined ? <Walkthrough/> : walkthrough ? <Walkthrough/> : (*/}
            <Fragment>
                <section
                    className="flex gap-8 flex-col justify-start items-start xl:p-12 lg:p-8 md:p-6 p-4 min-w-[1000px]">
                    <h1 className="text-5xl text-zinc-800 font-bold">Dashboard</h1>
                    <div
                        className="sm:w-[500px] w-fit h-fit flex justify-center items-start p-0.5 overflow-hidden bg-gradient-to-tr from-zinc-200 to-zinc-300 via-zinc-100 rounded-[26px] animate-lively">
                        <div className="w-full h-full bg-white rounded-3xl p-8 bg-opacity-80 backdrop-blur-lg">

                            <h1 className="font-medium text-lg flex gap-6 items-center">
                                <HandWaving size={64}
                                            weight="duotone"/>
                                Welcome
                                {` ${data?.firstName} ${data?.lastName} `} and you made
                                {data?.reservationsCount ? ` ${data.reservationsCount} reservations by now` : ' no reservations by now'}.
                            </h1>
                        </div>
                    </div>
                    <div
                        className="w-full h-[600px] border-2 rounded-xl overflow-hidden p-8">

                        <div>
                            <ul className="grid grid-cols-5 border-b-2 px-2 truncate">
                                <li className="truncate">Reservation Id</li>
                                <li className="truncate">Reason for Consult</li>
                                <li className="truncate">Date of Consult & Timeslot</li>
                                <li className="truncate">Specialized Doctor</li>
                                <li className="truncate">Specialized Department</li>
                            </ul>
                        </div>
                        {data ? data.reservations.map((reservation: ReservationProps) => {
                            const parsedDate = parse(reservation.date, 'MM/dd/yyyy', new Date());
                            const formattedDate = format(parsedDate, 'do MMMM yyyy');
                            const timeSpan = getTimespanForSlot(reservation.slot);

                            return (
                                <div key={reservation.id}>
                                    <ul className="grid grid-cols-5 py-1.5 text-sm text-zinc-700 truncate">
                                        <li title={String(reservation.id)}
                                            className="shadow-sm py-2 px-4 truncate">{reservation.id}</li>
                                        <li title={reservation.reasonOfConsultation}
                                            className="shadow-sm py-2 px-4 truncate">{reservation.reasonOfConsultation}</li>
                                        <li title={formattedDate + ' | ' + timeSpan}
                                            className="shadow-sm py-2 px-4 truncate">{formattedDate + ' | ' + timeSpan}</li>
                                        <li title={reservation.specializedDoctorName}
                                            className="shadow-sm py-2 px-4 truncate">{reservation.specializedDoctorName}</li>
                                        <li title={reservation.specializationName}
                                            className="shadow-sm py-2 px-4 truncate">{reservation.specializationName}</li>
                                    </ul>
                                </div>
                            )
                        }) : (
                            <Fragment>
                                <h1 className="text-2xl text-zinc-800 text-center font-bold">You haven't made any
                                    reservations yet.</h1>
                                <button
                                    className="border-2 border-b-4 px-4 py-2 rounded-lg flex gap-2 items-center border-zinc-800 hover:bg-white">
                                    Make a reservation <PencilSimple size={20} weight="bold"/>
                                </button>
                            </Fragment>
                        )}
                    </div>
                </section>
            </Fragment>
            {/*)}*/}
        </Fragment>
    );
}
