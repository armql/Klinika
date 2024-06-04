import {Notebook, UserPlus} from "@phosphor-icons/react";
import {ApiService} from "../../services/ApiServices.ts";
import axios_instance from "../../api/axios.ts";
import {useQuery} from "react-query";
import {zAuth} from "../../store/zAuth.ts";
import {Announcement} from "../../features/dashboard/__dashboard.ts";
import {format} from "date-fns";
import {AppointmentModal, AppointmentsOverview, zAppointments} from "../../features/specialized/__specialized.ts";

interface Stats {
    patientsCount: number;
    totalReservationsCount: number;
    patients: {
        fullName: string;
        reservationsCount: number;
    }[];
}

export default function Dashboard() {
    const dashboard_api = new ApiService(
        {
            get: "SpecializedDoctor/getOverview",
        },
        axios_instance
    );
    const {data: userData} = zAuth()
    const {form} = zAppointments();

    const {
        data: stats,
        isLoading
    } = useQuery(["overview", userData.id], () => dashboard_api.get(userData.id));
    const statsData = stats as Stats;
    const date = new Date();
    return (
        <section className="xl:p-12 lg:p-8 md:p-6 p-4 bg-zinc-100 w-full h-full">
            <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4">
                        <div
                            className="flex flex-row gap-8 bg-white w-96 rounded-xl h-24 p-4 justify-start items-center  border-2">
                            <Notebook size={48} weight="duotone" className="bg-zinc-100 rounded-xl p-2"/>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-zinc-500 text-sm font-medium">
                                    Total Appointments
                                </h3>
                                <div className="flex flex-row gap-4 items-center">
                                    <p className="font-semibold text-xl">{isLoading || statsData?.totalReservationsCount}</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex flex-row gap-8 bg-white w-96 rounded-xl h-24 p-4 justify-start items-center  border-2">
                            <UserPlus size={48} weight="duotone" className="bg-zinc-100 rounded-xl p-2"/>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-zinc-500 text-sm font-medium">
                                    New Patients
                                </h3>
                                <div className="flex flex-row gap-4 items-center">
                                    <p className="font-semibold text-xl">{isLoading || statsData?.patientsCount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {form && <AppointmentModal/>}
                    <AppointmentsOverview/>
                </div>
                <div className="w-full gap-4 flex flex-col min-w-[600px] border-2 h-[800px] bg-white rounded-xl p-4">
                    <div>
                        <h2 className="font-medium">Welcome Specialized Doctor</h2>
                        <p className="text-zinc-400 text-sm">{`Today's date is ${format(date, "do MMMM yyyy")}`}</p>
                    </div>
                    <Announcement/>
                </div>
            </div>
        </section>
    );
}