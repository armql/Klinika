import {AppointmentModal, AppointmentsOverview, zAppointments} from "../../features/specialized/__specialized.ts";

export default function Appointments() {
    const {form} = zAppointments();

    return (
        <section className="xl:p-12 lg:p-8 md:p-6 p-4 w-full h-screen min-w-[1400px]">
            <div className="flex flex-col gap-4 h-full">
                {form && <AppointmentModal/>}
                <AppointmentsOverview/>
            </div>
        </section>
    );
}

