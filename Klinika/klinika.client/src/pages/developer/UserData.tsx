import axios_instance from "../../api/axios";
import { ApiService } from "../../services/ApiServices";
import {
    useHandler,
    EditForm,
    Table,
    CreateForm,
    Filters,
    DataList,
} from "../../features/handata/__handata";
import { FormField } from "../../features/handata/utils/form-fields";

export type ApplicationUser = {
    Id: string, 
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    birthDate: string,
    gender: string,
};
const createFields: FormField[] = [
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
        type: "text",
        identifier: "email",
        name: "Email",
        placeholder: "Enter your Email",
    },
    {
        type: "text",
        identifier: "password",
        name: "Password",
        placeholder: "Enter your password",
    },
    {
        type: "text",
        identifier: "birthDate",
        name: "Birth Date",
        placeholder: "Enter your Birth Date",
    },
    {
        type: "text",
        identifier: "gender",
        name: "Gender",
        placeholder: "Enter your Gender",
    },
];

const editFields: FormField[] = [
    {
        type: "text",
        identifier: "id",
        name: "Specialization id",
        isHidden: true,
    },
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
        type: "text",
        identifier: "email",
        name: "Email",
        placeholder: "Enter your Email",
    },
    {
        type: "text",
        identifier: "birthDate",
        name: "Birth Date",
        placeholder: "Enter your Birth Date",
    },
    {
        type: "text",
        identifier: "gender",
        name: "Gender",
        placeholder: "Enter your Gender",
    },
];

export default function UserData() {
    const { create_modal: create, edit_modal: edit } = useHandler();

    const role_api = new ApiService<ApplicationUser>(
        {
            getAll: "/api/Account/getAll",
            get: "/api/Account/get",
            create: "/api/Account/create",
            update: "/api/Account/update",
            delete: "/api/Account/delete",
        },
        axios_instance
    );

    return (
        <DataList>
            <Filters name="User List" />
            <Table<ApplicationUser>
                headers={["ID", "First Name", "Last Name", "Gender" , "Birth Date", "Email"]}
                all={role_api.getAll}
                delete={role_api.delete}
                dataField={["id", "firstName", "lastName", "gender", "birthDate", "email"]}
            />
            {edit && (
                <EditForm<ApplicationUser>
                    header="User"
                    get={role_api.get}
                    update={role_api.update}
                    fields={editFields}
                />
            )}
            {create && (
                <CreateForm<ApplicationUser>
                    header="User"
                    api={role_api.create}
                    fields={createFields}
                />
            )}
        </DataList>
    );
}
