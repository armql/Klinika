import { useState } from "react";
import axios_instance from "../../api/axios";
import DataList from "../../features/handata/components/DataList";
import Table from "../../features/handata/components/Table";
import { Filters } from "../../features/handata/handata";
import { ApiService } from "../../services/ApiServices";
import CreateForm, {
  FormField,
} from "../../features/handata/components/CreateForm";

// interface ApiResponse {
//   specialization: Specialization[];
// }

export type Specialization = {
  specialization_id: number;
  name: string;
  created_by: string;
  created_date: string;
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
  const [handler, setHandler] = useState({
    create_modal: false,
    refetch_data: false,
  });

  const specialization_api = new ApiService<Specialization>(
    {
      getAll: "/data",
      get: "/data/edit",
      create: "/data/add",
      update: "/data/edit",
      delete: "/data/remove",
    },
    axios_instance
  );

  return (
    <DataList>
      <Filters
        name="Specialization List"
        create={() =>
          setHandler((prev) => ({
            ...prev,
            create_modal: true,
          }))
        }
      />
      <Table
        headers={["Specialization id", "Name", "Created by", "Created in"]}
        all={specialization_api.getAll}
        delete={specialization_api.delete}
        dataKey="specializations"
        handler={handler.refetch_data}
      />
      {handler.create_modal && (
        <CreateForm<Specialization>
          header="Specialization"
          api={specialization_api.create}
          fields={formFields}
          close={() =>
            setHandler((prev) => ({
              ...prev,
              create_modal: false,
              refetch_data: !handler.refetch_data,
            }))
          }
        />
      )}
    </DataList>
  );
}
