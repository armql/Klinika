import axios_instance from "../../api/axios";
import {ApiService} from "../../services/ApiServices";
import {CreateForm, DataList, EditForm, Filters, Table, zHandler,} from "../../features/handata/__handata";
import {FormField} from "../../features/handata/utils/form-fields";
import {BaseItem} from "../../features/handata/__handata.ts";
import {useQuery} from "react-query";

export type Consultation = BaseItem & {
    notes: string;
    evaluation: number;
    creationDate: string;
    reservationId: string;
};


export default function ConsultationData() {
    const {create_modal: create, edit_modal: edit} = zHandler();
    const specialization_api = new ApiService<Consultation>(
        {
            paginate: "Consultation/paginate",
            get: "Consultation/get",
            create: "Consultation/create",
            update: "Consultation/update",
            delete: "Consultation/delete",
            bulk_delete: "Consultation/bulkDelete",
            category: "Reservation/getAll",
        },
        axios_instance
    );
    const {data, isLoading} = useQuery("category", specialization_api.category);

    // Check if categoryData and category2Data are arrays
    const Options = Array.isArray(data) ? data.map((item) => ({
        id: item.id,
        name: "ReservationId: " + item.id + ", Reason: " + item.reasonOfConsultation,
    })) : [];

    const formFields: FormField[] = [
        {
            type: "text",
            identifier: "notes",
            name: "Notes",
            placeholder: "Enter your notes",
        },
        {
            type: "text",
            identifier: "evaluation",
            name: "Evaluation",
            placeholder: "Enter your evaluation",
        },
        {
            type: "select",
            identifier: "reservationId",
            name: "Reservation",
            options: isLoading
                ? [
                    {
                        id: 1,
                        name: "Loading Options...",
                    },
                ]
                : Options,
        },
    ];

    return (
        <DataList>
            <Filters
                name="Consultation List"
                bulkDelete={specialization_api.bulk_delete}
            />
            <Table
                headers={["Consultation ID", "Notes", "Evaluation", "Created In", "Reservation ID"]}
                all={specialization_api.paginate}
                delete={specialization_api.delete}
                dataField={["id", "notes", "evaluation", "creationDate", "reservationId"]}
            />
            {edit && (
                <EditForm<Consultation>
                    header="Consultation"
                    get={specialization_api.get}
                    update={specialization_api.update}
                    fields={formFields}
                />
            )}
            {create && (
                <CreateForm<Consultation>
                    header="Consultation"
                    api={specialization_api.create}
                    fields={formFields}
                />
            )}
        </DataList>
    );
}
