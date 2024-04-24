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

export type HelpCenterCategory = {
  id: number;
  name: string;
  createdBy: string;
  creationData: string;
};
const formField: FormField[] = [
  {
    type: "text",
    identifier: "name",
    name: "Category Name",
    placeholder: "Enter your category name",
  },
];

export default function HelpCenterCategoryData() {
  const { create_modal: create, edit_modal: edit } = zHandler();
  const helpcentercategory_api = new ApiService<HelpCenterCategory>(
    {
      getAll: "/api/HelpCenterCategory/getAll",
      get: "/api/HelpCenterCategory/get",
      create: "/api/HelpCenterCategory/create",
      update: "/api/HelpCenterCategory/update",
      delete: "/api/HelpCenterCategory/delete",
    },
    axios_instance
  );

  return (
    <DataList>
      <Filters name="Category List" />
      <Table<HelpCenterCategory>
        headers={["Category ID", "Name", "Created by", "Created in"]}
        all={helpcentercategory_api.getAll}
        delete={helpcentercategory_api.delete}
        dataField={["id", "name", "createdBy", "creationDate"]}
      />
      {edit && (
        <EditForm<HelpCenterCategory>
          header="Category"
          get={helpcentercategory_api.get}
          update={helpcentercategory_api.update}
          fields={formField}
        />
      )}

      {create && (
        <CreateForm<HelpCenterCategory>
          header="Category"
          api={helpcentercategory_api.create}
          fields={formField}
        />
      )}
    </DataList>
  );
}
