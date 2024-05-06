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

export type ApplicationUser = {
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

export default function UserData() {
  const { create_modal: create, edit_modal: edit } = zHandler();

  const role_api = new ApiService<ApplicationUser>(
    {
      paginate: "Account/paginate",
      get: "Account/get",
      create: "Account/create",
      update: "Account/update",
      delete: "Account/delete",
    },
    axios_instance
  );

  return (
    <DataList>
      <Filters name="User List" />
      <Table<ApplicationUser>
        headers={[
          "ID",
          "First Name",
          "Last Name",
          "Gender",
          "Birth Date",
          "Email",
        ]}
        all={role_api.paginate}
        delete={role_api.delete}
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
          get={role_api.get}
          update={role_api.update}
          fields={formField}
        />
      )}
      {create && (
        <CreateForm<ApplicationUser>
          header="User"
          api={role_api.create}
          fields={formField}
        />
      )}
    </DataList>
  );
}
