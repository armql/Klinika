import {Fragment} from "react";
import {ApiService} from "../../../services/ApiServices.ts";
import axios_instance from "../../../api/axios.ts";
import {zAuth} from "../../../store/zAuth.ts";
import {useQuery} from "react-query";
import {Spinner} from "@phosphor-icons/react";
import {format, parse} from "date-fns";
import {getTimespanForSlot} from "../../../util/timeslot-handle.ts";
import {zAppointments} from "../__specialized.ts";

interface Appointments {
    id: number;
    patientFullName: string;
    reasonOfConsultation: string;
    date: string;
    slot: number;
}

function AppointmentsOverview() {
    const {setForm} = zAppointments();
    const dashboard_api = new ApiService(
        {
            get: "SpecializedDoctor/getReservationsWithoutConsultation",
        },
        axios_instance
    );
    const {data: userData} = zAuth()

    const {data: additionalData, isLoading} = useQuery(["category", userData.id], () => dashboard_api.get(userData.id));

    return (
        <Fragment>
            <h1 className="text-xl font-medium">
                Reservation List
            </h1>
            <div className="w-full h-full border-2 rounded-xl">
                <ul className="grid grid-cols-5 border-b-2 items-center justify-between text-center text-sm">
                    <li className="shadow-sm h-full flex justify-center items-center px-2 py-2">
                        Reservation id
                    </li>
                    <li className="shadow-sm h-full flex justify-center items-center px-2 py-2">
                        Patient Name
                    </li>
                    <li className="shadow-sm h-full flex justify-center items-center px-2 py-2">
                        Reason of Consult
                    </li>
                    <li className="shadow-sm h-full flex justify-center items-center px-2 py-2">
                        Date of consult & Time of consult
                    </li>
                    <li className="shadow-sm h-full flex justify-center items-center px-2 py-2">
                        Action
                    </li>
                </ul>
                {isLoading ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <Spinner size={64} className="animate-spin"/>
                    </div>
                ) : (
                    Array.isArray(additionalData) && additionalData.map((item: Appointments) => {
                        const parsedDate = parse(item.date, 'MM/dd/yyyy', new Date());
                        const formattedDate = format(parsedDate, 'do MMMM yyyy');
                        const timeSpan = getTimespanForSlot(item.slot);

                        return (
                            <ul key={item.id}
                                className="grid text-center grid-cols-5 items-center bg-zinc-50 justify-between text-zinc-900 text-xs">
                                <li className="shadow-sm h-full flex justify-center items-center px-2 py-2">
                                    {item.id}
                                </li>
                                <li className="shadow-sm h-full flex justify-center items-center px-2 py-2">
                                    {item.patientFullName}
                                </li>
                                <li className="shadow-sm h-full flex justify-center items-center px-2 py-2">
                                    {item.reasonOfConsultation}
                                </li>
                                <li className="shadow-sm h-full flex justify-center items-center px-2 py-2">
                                    {formattedDate} | {timeSpan}
                                </li>
                                <li className="shadow-sm px-2 py-2 flex justify-center items-center">
                                    <button
                                        type="button"
                                        onClick={() => setForm(item)}
                                        className="hover:bg-zinc-100 px-4 py-2 font-medium border-2 rounded-md"
                                    >
                                        Consult
                                    </button>
                                </li>
                            </ul>
                        )
                    })
                )}
            </div>
        </Fragment>
    );
}

export default AppointmentsOverview;