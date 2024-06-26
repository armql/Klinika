import axios_instance from "../../services/axios.ts";
import {ApiService} from "../../services/ApiServices";
import {BaseItem, CreateForm, DataList, EditForm, Filters, Table, zHandler,} from "../../features/handata/__handata";
import {FormField} from "../../features/handata/utils/form-fields";

export type IdentityRole = BaseItem & {
    Id: string;
    Name: string;
    NormalizedName: string;
    ConcurrencyStamp: string;
};
const formField: FormField[] = [
    {
        type: "text",
        identifier: "Name",
        name: "Role Name",
        placeholder: "Enter your role name",
    },
];

export default function RoleData() {
    const {create_modal: create, edit_modal: edit} = zHandler();

    const role_api = new ApiService<IdentityRole>(
        {
            paginate: "Role/paginate",
            get: "Role/get",
            create: "Role/create",
            update: "Role/update",
            delete: "Role/delete",
            bulk_delete: "Role/bulkDelete",
        },
        axios_instance
    );

    return (
        <DataList>
            <Filters 
                name="Role List"
                bulkDelete={role_api.bulk_delete}
            />
            <Table<IdentityRole>
                headers={["Role ID", "Role Name"]}
                all={role_api.paginate}
                delete={role_api.delete}
                dataField={["id", "name"]}
            />
            {edit && (
                <EditForm<IdentityRole>
                    header="Identity Role"
                    get={role_api.get}
                    update={role_api.update}
                    fields={formField}
                />
            )}
            {create && (
                <CreateForm<IdentityRole>
                    header="Identity Role"
                    api={role_api.create}
                    fields={formField}
                />
            )}
        </DataList>
    );
}
