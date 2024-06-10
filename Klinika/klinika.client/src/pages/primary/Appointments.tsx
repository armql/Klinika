import axios_instance from "../../services/axios.ts";
import {ApiService} from "../../services/ApiServices";
import {BaseItem, CreateForm, DataList, EditForm, Filters, Table, zHandler,} from "../../features/handata/__handata";
import {FormField} from "../../features/handata/utils/form-fields";
import {useQuery} from "react-query";
import {zAuth} from "../../store/zAuth.ts";

export type ApplicationUser = BaseItem & {
    id: string;
    note: string;
    userFullName: string;
    primaryCareFullName: string;
};


export default function Appointments() {
    const {create_modal: create, edit_modal: edit} = zHandler();
    const {data: userData} = zAuth();
    const appointment_api = new ApiService<ApplicationUser>(
        {
            paginate: "Report/paginate",
            create: "Report/prescribe",
            category: "Account/getAll",
            category2: 'Specialization/getAll',
            get: 'Report/get',
            update: 'Report/edit',
            delete: 'Report/delete',
        },
        axios_instance
    );
    const {data: categoryData, isLoading: isCategoryLoading} = useQuery("category", appointment_api.category);
    const {data: categoryData2, isLoading: isCategoryLoading2} = useQuery("category2", appointment_api.category2);

    const categoryOptions = Array.isArray(categoryData) ? categoryData.map((item) => ({
        id: item.id,
        name: item.firstName + " " + item.lastName + " : " + item.email
    })) : [];

    const categoryOptions2 = Array.isArray(categoryData2) ? categoryData2.map((item) => ({
        id: item.name,
        name: item.name
    })) : [];

    const formField: FormField[] = [
        {
            type: "textarea",
            identifier: "note",
            name: "Report notes",
            placeholder: "Enter your First Name",
        },
        {
            type: "select",
            identifier: "userId",
            name: "Patient Name",
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
            identifier: "specializationName",
            name: "Specialization Name",
            options: isCategoryLoading2
                ? [
                    {
                        id: 1,
                        name: "Loading Options...",
                    },
                ]
                : categoryOptions2,
        },
        {
            type: "hidden",
            identifier: "primaryCareId",
            name: "Primary Care Doctor",
            value: userData.id
        }
    ];

    return (
        <DataList>
            <Filters name="User List"/>
            <Table<ApplicationUser>
                headers={[
                    "ID",
                    "Report notes",
                    "Primary Care Doctor",
                    "Patient Name",
                ]}
                all={appointment_api.paginate}
                delete={appointment_api.delete}
                dataField={[
                    "id",
                    "note",
                    "primaryCareFullName",
                    "userFullName",
                ]}
            />
            {edit && (
                <EditForm<ApplicationUser>
                    header="User"
                    get={appointment_api.get}
                    update={appointment_api.update}
                    fields={formField}
                />
            )}
            {create && (
                <CreateForm<ApplicationUser>
                    header="User"
                    api={appointment_api.create}
                    fields={formField}
                />
            )}
        </DataList>
    );
}
