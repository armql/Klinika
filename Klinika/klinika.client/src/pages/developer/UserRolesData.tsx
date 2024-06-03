import axios_instance from "../../api/axios";
import { ApiService } from "../../services/ApiServices";
import {
    zHandler,
    EditForm,
    Table,
    CreateForm,
    Filters,
    DataList,
} from "../../features/handata/__handata";
import { FormField } from "../../features/handata/utils/form-fields";
import { useQuery } from "react-query";

export type UserWithRole = {
    id: number;
    email: string;
    roleName: number;
};

export default function UserRolesData() {
    const { create_modal: create, edit_modal: edit } = zHandler();

    const Block_api = new ApiService<UserWithRole>(
        {
            category: "Role/getAll",
            category2: "Account/getAll",
            paginate: "UserRoles/paginate",
            get: "UserRoles/get",
            create: "UserRoles/create",
            update: "UserRoles/update",
            delete: "UserRoles/delete",
            bulk_delete: "UserRoles/bulkDelete",
        },
        axios_instance
    );
    const { data: categoryData, isLoading: isCategoryLoading, error: categoryError } = useQuery("category", Block_api.category);
    const { data: category2Data, isLoading: isCategory2Loading, error: category2Error } = useQuery("category2", Block_api.category2);

    // Check if categoryData and category2Data are arrays
    const categoryOptions = Array.isArray(categoryData) ? categoryData.map((item) => ({
        id: item.id,
        name: item.roleName,
    })) : [];

    const category2Options = Array.isArray(category2Data) ? category2Data.map((item) => ({
        id: item.id,
        name: item.email,
    })) : [];

    const formFields: FormField[] = [
        {
            type: "select",
            identifier: "roleId",
            name: "Role Name",
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
            identifier: "id",
            name: "User Email",
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
            <Filters name="User With Roles List" />
            <Table<UserWithRole>
                headers={["User ID", "Email", "Role Name"]}
                all={Block_api.getAll}
                delete={Block_api.delete}
                dataField={["id", "email", "roleName"]}
            />
            {edit && (
                <EditForm<UserWithRole>
                    header="User With Roles"
                    get={Block_api.get}
                    update={Block_api.update}
                    fields={formFields}
                />
            )}
            {create && (
                <CreateForm<UserWithRole>
                    header="User With Roles"
                    api={Block_api.create}
                    fields={formFields}
                />
            )}
        </DataList>
    );
}
