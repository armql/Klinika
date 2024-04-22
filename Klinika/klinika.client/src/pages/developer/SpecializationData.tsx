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
import { useFormStore } from "../../features/handata/store/FormStore";

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
  const { create_modal: create, edit_modal: edit } = useHandler();
  const { selectedItem } = useFormStore();
  const specialization_api = new ApiService<Specialization>(
    {
      getAll: "/api/Specialization/getAll",
      get: "/api/Specialization/get",
      create: "/api/Specialization/create",
      update: `/api/Specialization/update`,
      delete: "/api/Specialization/delete",
    },
    axios_instance
  );

  return (
    <DataList>
      <Filters name="Specialization List" />
      <Table<Specialization>
        headers={["Specialization ID", "Name", "Created by", "Created in"]}
        all={specialization_api.getAll}
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
