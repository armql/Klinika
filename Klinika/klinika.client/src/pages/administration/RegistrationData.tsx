import axios_instance from "../../services/axios.ts";
import {ApiService} from "../../services/ApiServices";
import {BaseItem, CreateForm, DataList, EditForm, Filters, Table, zHandler,} from "../../features/handata/__handata";
import {FormField} from "../../features/handata/utils/form-fields";

export type ApplicationUser = BaseItem & {
    Id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthDate: string;
    gender: string;
};
const formField: FormField[] = [
    {
        type: "text",
        identifier: "firstName",
        name: "First Name",
        placeholder: "Enter your First Name",
    },
    {
        type: "text",
        identifier: "lastName",
        name: "Last Name",
        placeholder: "Enter your Last Name",
    },
    {
        type: "email",
        identifier: "email",
        name: "Email",
        placeholder: "Enter your Email",
    },
    {
        type: "password",
        identifier: "password",
        name: "Password",
        placeholder: "Enter your password",
    },
    {
        type: "date",
        identifier: "birthDate",
        name: "Birth Date",
        placeholder: "Enter your Birth Date",
    },
    {
        type: "select",
        identifier: "gender",
        name: "Gender",
        options: [
            {
                id: "male",
                name: "Male",
            },
            {
                id: "male",
                name: "Female",
            },
        ],
    },
];

export default function RegistrationData() {
    const {create_modal: create, edit_modal: edit} = zHandler();

    const registration_api = new ApiService<ApplicationUser>(
        {
            paginate: "Account/paginate",
            get: "Account/get",
            create: "Account/create",
            update: "Account/update",
            delete: "Account/delete",
            bulk_delete: "Account/bulkDelete",
        },
        axios_instance
    );

    return (
        <DataList>
            <Filters 
                name="User List"
                bulkDelete={registration_api.bulk_delete}
            />
            <Table<ApplicationUser>
                headers={[
                    "ID",
                    "First Name",
                    "Last Name",
                    "Gender",
                    "Birth Date",
                    "Email",
                ]}
                all={registration_api.paginate}
                delete={registration_api.delete}
                dataField={[
                    "id",
                    "firstName",
                    "lastName",
                    "gender",
                    "birthDate",
                    "email",
                ]}
            />
            {edit && (
                <EditForm<ApplicationUser>
                    header="User"
                    get={registration_api.get}
                    update={registration_api.update}
                    fields={formField}
                />
            )}
            {create && (
                <CreateForm<ApplicationUser>
                    header="User"
                    api={registration_api.create}
                    fields={formField}
                />
            )}
        </DataList>
    );
}
