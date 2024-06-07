import axios_instance from "../../services/axios.ts";
import {ApiService} from "../../services/ApiServices";
import {CreateForm, DataList, EditForm, Filters, Table, zHandler,} from "../../features/handata/__handata";
import {FormField} from "../../features/handata/utils/form-fields";
import {BaseItem} from "../../features/handata/__handata.ts";
import {useQuery} from "react-query";

export type Reservation = BaseItem & {
    reasonOfConsultation: string;
    slot: number;
    specializedDoctorId: string;
    patientId: string;
};

export default function ReservationData() {
    const {create_modal: create, edit_modal: edit} = zHandler();
    const specialization_api = new ApiService<Reservation>(
        {
            paginate: "Reservation/paginate",
            get: "Reservation/get",
            create: "Reservation/create",
            update: `Reservation/update`,
            delete: "Reservation/delete",
            bulk_delete: "Reservation/bulkDelete",
            category: "SpecializedDoctor/getAll",
            category2: "Patient/getAll",
        },
        axios_instance
    );
    const {
        data: categoryData,
        isLoading: isCategoryLoading,
        // error: categoryError
    } = useQuery("category", specialization_api.category);
    const {
        data: category2Data,
        isLoading: isCategory2Loading,
        // error: category2Error
    } = useQuery("category2", specialization_api.category2);

    const categoryOptions = Array.isArray(categoryData) ? categoryData.map((item) => ({
        id: item.id,
        name: item.fullName,
    })) : [];

    const category2Options = Array.isArray(category2Data) ? category2Data.map((item) => ({
        id: item.id,
        name: item.fullName,
    })) : [];

    const formFields: FormField[] = [
        {
            type: "text",
            identifier: "reasonOfConsultation",
            name: "Specialization Name",
            placeholder: "Enter your specialization name",
        },
        {
            type: "text",
            identifier: "date",
            name: "Date",
            placeholder: "Enter your reservation date",
        },
        {
            type: "select",
            identifier: "slot",
            name: "Available Slots",
            options: [
                {id: 1, name: '08:00 - 08:15'},
                {id: 2, name: '08:15 - 08:30'},
                {id: 3, name: '08:30 - 08:45'},
                {id: 4, name: '08:45 - 09:00'},
                {id: 5, name: '09:00 - 09:15'},
                {id: 6, name: '09:15 - 09:30'},
                {id: 7, name: '09:30 - 09:45'},
                {id: 8, name: '09:45 - 10:00'},
            ],
        },
        {
            type: "select",
            identifier: "specializedDoctorId",
            name: "Specialized Doctor",
            options: isCategoryLoading
                ? [
                    {
                        id: 1,
                        name: "Loading Options...",
                    },
                ]
                : categoryOptions,
        },
        {
            type: "select",
            identifier: "patientId",
            name: "Patient",
            options: isCategory2Loading
                ? [
                    {
                        id: 1,
                        name: "Loading Options...",
                    },
                ]
                : category2Options,
        },
    ];

    return (
        <DataList>
            <Filters
                name="Reservation List"
                bulkDelete={specialization_api.bulk_delete}
            />
            <Table
                headers={["Reservation ID", "Reason Of Consultation", "Reservation Date", "Created In", "Slot"]}
                all={specialization_api.paginate}
                delete={specialization_api.delete}
                dataField={["id", "reasonOfConsultation", "date", "creationDate", "slot"]}
            />
            {edit && (
                <EditForm<Reservation>
                    header="Reservation"
                    get={specialization_api.get}
                    update={specialization_api.update}
                    fields={formFields}
                />
            )}
            {create && (
                <CreateForm<Reservation>
                    header="Reservation"
                    api={specialization_api.create}
                    fields={formFields}
                />
            )}
        </DataList>
    );
}