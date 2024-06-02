import {Filters, Table} from "../../features/pandata/__pandata.ts";
import {DataList} from "../../features/handata/__handata.ts";
import {ApiService} from "../../services/ApiServices.ts";
import axios_instance from "../../api/axios.ts";
import {Reservation} from "../developer/ReservationData.tsx";

export default function ReservationsList() {
    const specialization_api = new ApiService<Reservation>(
        {
            reservations: "Consultation/paginateById",
            delete: 'Reservation/delete',
        },
        axios_instance
    );

    return (
        <DataList>
            <Filters name="Consultations list"/>
            <Table
                headers={["Consultation id", "Note of Consultation", "Evaluation of Consult"]}
                dataField={["id", "notes", "evaluation"]}
                all={specialization_api.reservations}
                delete={specialization_api.delete}/>
        </DataList>
    )
}
