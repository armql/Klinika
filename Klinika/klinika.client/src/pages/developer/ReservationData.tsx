import axios_instance from "../../api/axios";
import { ApiService } from "../../services/ApiServices";
import { CreateForm, DataList, EditForm, Filters, Table, zHandler, } from "../../features/handata/__handata";
import { FormField } from "../../features/handata/utils/form-fields";
import { BaseItem } from "../../features/handata/__handata.ts";
import { useQuery } from "react-query";

export type Reservation = BaseItem & {
    reasonOfConsultation: string;
    slot: number;
    specializedDoctorId: string;
    patientId: string;
};

export default function ReservationData() {
    const { create_modal: create, edit_modal: edit } = zHandler();
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
    const { data: categoryData, isLoading: isCategoryLoading, error: categoryError } = useQuery("category", specialization_api.category);
    const { data: category2Data, isLoading: isCategory2Loading, error: category2Error } = useQuery("category2", specialization_api.category2);


    console.log('categoryData:', categoryData);
    console.log('category2Data:', category2Data);
    
    // Check if categoryData and category2Data are arrays
    const categoryOptions = Array.isArray(categoryData) ? categoryData.map((item) => ({
        id: item.id,
        name: item.id,
    })) : [];

    const category2Options = Array.isArray(category2Data) ? category2Data.map((item) => ({
        id: item.id,
        name: item.id,
    })) : [];

    const formFields: FormField[] = [
        {
            type: "text",
            identifier: "reasonOfConsultation",
            name: "Reason Of Consultation",
            placeholder: "Enter your reason of consultation",
        },
        {
            type: "number",
            identifier: "slot",
            name: "Slot",
            placeholder: "Enter your slot",
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
                headers={["Reservation ID", "Reason Of Consultation", "Created In", "Slot"]}
                all={specialization_api.paginate}
                delete={specialization_api.delete}
                dataField={["id", "reasonOfConsultation", "creationDate", "slot"]}
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