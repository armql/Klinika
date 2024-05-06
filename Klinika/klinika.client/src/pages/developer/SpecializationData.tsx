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

export type Specialization = {
  id: number;
  name: string;
  createdBy: string;
  creationData: string;
};

const formFields: FormField[] = [
  {
    type: "text",
    identifier: "name",
    name: "Specialization Name",
    placeholder: "Enter your specialization name",
  },
];

export default function SpecializationData() {
  const { create_modal: create, edit_modal: edit } = zHandler();
  const specialization_api = new ApiService<Specialization>(
    {
      paginate: "Specialization/paginate",
      get: "Specialization/get",
      create: "Specialization/create",
      update: `Specialization/update`,
      delete: "Specialization/delete",
    },
    axios_instance
  );

  return (
    <DataList>
      <Filters name="Specialization List" />
      <Table<Specialization>
        headers={["Specialization ID", "Name", "Created by", "Created in"]}
        all={specialization_api.paginate}
        delete={specialization_api.delete}
        dataField={["id", "name", "createdBy", "creationDate"]}
      />
      {edit && (
        <EditForm<Specialization>
          header="Specialization"
          get={specialization_api.get}
          update={specialization_api.update}
          fields={formFields}
        />
      )}
      {create && (
        <CreateForm<Specialization>
          header="Specialization"
          api={specialization_api.create}
          fields={formFields}
        />
      )}
    </DataList>
  );
}
