import axios_instance from "../../api/axios";
import {ApiService} from "../../services/ApiServices";
import {BaseItem, CreateForm, DataList, EditForm, Filters, Table, zHandler,} from "../../features/handata/__handata";
import {FormField} from "../../features/handata/utils/form-fields";
import {useQuery} from "react-query";

export type Patient = BaseItem & {
    id: number;
};

export default function PatientData() {
    const {create_modal: create, edit_modal: edit} = zHandler();

    const Patient_api = new ApiService<Patient>(
        {
            category: "Account/getAll",
            paginate: "Patient/paginate",
            get: "Patient/get",
            create: "Patient/create",
            update: "Patient/update",
            delete: "Patient/delete",
            bulk_delete: "Patient/bulkDelete",
        },
        axios_instance
    );
    const {data, isLoading} = useQuery("category", Patient_api.category);

    const Options = Array.isArray(data) ? data.map((item) => ({
        id: item.id,
        name: item.id,
    })) : [];

    const formFields: FormField[] = [
        {
            type: "select",
            identifier: "patientId",
            name: "Patients",
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
                name="Patient List"
                bulkDelete={Patient_api.bulk_delete}
            />
            <Table<Patient>
                headers={[
                    "Patient ID",
                ]}
                all={Patient_api.paginate}
                delete={Patient_api.delete}
                dataField={["id"]}
            />
            {edit && (
                <EditForm<Patient>
                    header="Patient"
                    get={Patient_api.get}
                    update={Patient_api.update}
                    fields={formFields}
                />
            )}
            {create && (
                <CreateForm<Patient>
                    header="Patient"
                    api={Patient_api.create}
                    fields={formFields}
                />
            )}
        </DataList>
    );
}
