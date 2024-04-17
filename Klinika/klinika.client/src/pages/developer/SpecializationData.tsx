import { useState } from "react";
import axios_instance from "../../api/axios";
import DataList from "../../features/handata/components/DataList";
import Table from "../../features/handata/components/Table";
import { Filters } from "../../features/handata/handata";
import { ApiService } from "../../services/ApiServices";
import CreateForm, {
  FormField,
} from "../../features/handata/components/CreateForm";
import { useHandler } from "../../features/handata/handata";
import EditForm from "../../features/handata/components/EditForm";
// interface ApiResponse {
//   specialization: Specialization[];
// }

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
  const { handler, openCreate, openEdit, closeCreate, closeEdit } =
    useHandler();

  const specialization_api = new ApiService<Specialization>(
    {
      getAll: "api/Specialization/getAll",
      get: "api/Specialization/get",
      create: "api/Specialization/create",
      update: "api/Specialization/update",
      delete: "api/Specialization/delete",
    },
    axios_instance
  );

  return (
    <DataList>
      <Filters name="Specialization List" create={openCreate} />
      <Table<Specialization>
        headers={["Specialization id", "Name", "Created by", "Created in"]}
        all={specialization_api.getAll}
        delete={specialization_api.delete}
        dataKey="specializations"
        handler={handler.refetch_data}
        edit={openEdit}
      />
      {handler.edit_modal && (
        <EditForm<Specialization>
          header="Specialization"
          get={specialization_api.get}
          update={specialization_api.update}
          fields={formFields}
          close={closeEdit}
        />
      )}
      {handler.create_modal && (
        <CreateForm<Specialization>
          header="Specialization"
          api={specialization_api.create}
          fields={formFields}
          close={closeCreate}
        />
      )}
    </DataList>
  );
}
