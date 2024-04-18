import axios_instance from "../../api/axios";
import { ApiService } from "../../services/ApiServices";
import { FormField } from "../../features/handata/components/CreateForm";
import {
  useHandler,
  EditForm,
  Table,
  CreateForm,
  Filters,
  DataList,
} from "../../features/handata/__handata";

export type IdentityRole = {
  Id: string;
  Name: string;
  NormalizedName: string;
  ConcurrencyStamp: string;
};
const createFields: FormField[] = [
  {
    type: "text",
    identifier: "Name",
    name: "Role Name",
    placeholder: "Enter your role name",
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
    identifier: "name",
    name: "Role Name",
    placeholder: "Enter your role name",
  },
  {
    type: "text",
    identifier: "normalizedName",
    name: "Specialization id",
    isHidden: true,
  },
];

export default function RoleData() {
  const { create_modal: create, edit_modal: edit } = useHandler();

  const role_api = new ApiService<IdentityRole>(
    {
      getAll: "/api/Role/getAll",
      get: "/api/Role/get",
      create: "/api/Role/create",
      update: "/api/Role/update",
      delete: "/api/Role/delete",
    },
    axios_instance
  );

  return (
    <DataList>
      <Filters name="Role List" />
      <Table<IdentityRole>
        headers={["Role id", "Role Name"]}
        all={role_api.getAll}
        delete={role_api.delete}
        dataField={["id", "name"]}
      />
      {edit && (
        <EditForm<IdentityRole>
          header="Identity Role"
          get={role_api.get}
          update={role_api.update}
          fields={editFields}
        />
      )}
      {create && (
        <CreateForm<IdentityRole>
          header="Identity Role"
          api={role_api.create}
          fields={createFields}
        />
      )}
    </DataList>
  );
}
