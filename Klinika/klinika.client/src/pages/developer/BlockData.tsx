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
import { useQuery } from "react-query";

export type Block = {
  id: number;
  name: string;
  specializationId: number;
};

export default function BlockData() {
  const { create_modal: create, edit_modal: edit } = useHandler();

  const Block_api = new ApiService<Block>(
    {
      category: "/api/Specialization/getAll",
      getAll: "/api/Block/getAll",
      get: "/api/Block/get",
      create: "/api/Block/create",
      update: "/api/Block/update",
      delete: "/api/Block/delete",
    },
    axios_instance
  );
  const { data, isLoading } = useQuery("category", Block_api.category);

  const formFields: FormField[] = [
    {
      type: "text",
      identifier: "name",
      name: "Block Name",
      placeholder: "Enter your Block Name",
    },
    {
      type: "select",
      identifier: "specializationId",
      name: "Specialization Type",
      options: isLoading
        ? [
            {
              id: 1,
              name: "Loading Options...",
            },
          ]
        : data?.data.map((item) => ({
            id: item.id,
            name: item.name,
          })),
    },
  ];

  return (
    <DataList>
      <Filters name="Block List" />
      <Table<Block>
        headers={["Block ID", "Name", "Specialization Id"]}
        all={Block_api.getAll}
        delete={Block_api.delete}
        dataField={["id", "name", "specializationId"]}
      />
      {edit && (
        <EditForm<Block>
          header="Block"
          get={Block_api.get}
          update={Block_api.update}
          fields={formFields}
        />
      )}
      {create && (
        <CreateForm<Block>
          header="Block"
          api={Block_api.create}
          fields={formFields}
        />
      )}
    </DataList>
  );
}
