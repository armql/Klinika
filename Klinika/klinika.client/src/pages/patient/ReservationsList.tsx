import {Filters, Table} from "../../features/pandata/__pandata.ts";
import {DataList} from "../../features/handata/__handata.ts";
import {ApiService} from "../../services/ApiServices.ts";
import axios_instance from "../../services/axios.ts";
import {Reservation} from "../developer/ReservationData.tsx";

export default function ReservationsList() {
    const specialization_api = new ApiService<Reservation>(
        {
            reservations: "Reservation/paginateById",
            delete: 'Reservation/delete',
        },
        axios_instance
    );

    return (
        <DataList>
            <Filters name="Reservations list"/>
            <Table
                headers={["Reservation id", "Reason of Consult", "Date of reservation", "Chosen timeslot", "Specialized Doctor", "Specialization"]}
                dataField={["id", "reasonOfConsultation", "date", "slot", "specializedDoctorName", "specializationName"]}
                all={specialization_api.reservations}
                delete={specialization_api.delete}/>
        </DataList>
    )
}
