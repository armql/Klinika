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

export type ServiceDesk = {
  id: number;
  name: string;
  email: string;
  operatingHours: string;
  blockId: number;
};

export default function ServiceDeskData() {
  const { create_modal: create, edit_modal: edit } = zHandler();

  const ServiceDesk_api = new ApiService<ServiceDesk>(
    {
      category: "/api/Block/getAll",
      getAll: "/api/ServiceDesk/getAll",
      get: "/api/ServiceDesk/get",
      create: "/api/ServiceDesk/create",
      update: "/api/ServiceDesk/update",
      delete: "/api/ServiceDesk/delete",
    },
    axios_instance
  );
  const { data, isLoading } = useQuery("category", ServiceDesk_api.category);

  const formFields: FormField[] = [
    {
      type: "text",
      identifier: "name",
      name: "ServiceDesk Name",
      placeholder: "Enter your Service Desk Name",
    },
    {
      type: "email",
      identifier: "email",
      name: "Email",
      placeholder: "Enter your Service Desk Email",
    },
    {
      type: "text",
      identifier: "operatingHours",
      name: "Operating Hours",
      placeholder: "Enter your Operating Hours",
    },
    {
      type: "select",
      identifier: "blockId",
      name: "Block Type",
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
      <Filters name="ServiceDesk List" />
      <Table<ServiceDesk>
        headers={[
          "ServiceDesk ID",
          "Name",
          "Email",
          "Operating Hours",
          "Block Id",
        ]}
        all={ServiceDesk_api.getAll}
        delete={ServiceDesk_api.delete}
        dataField={["id", "name", "email", "operatingHours", "blockId"]}
      />
      {edit && (
        <EditForm<ServiceDesk>
          header="ServiceDesk"
          get={ServiceDesk_api.get}
          update={ServiceDesk_api.update}
          fields={formFields}
        />
      )}
      {create && (
        <CreateForm<ServiceDesk>
          header="ServiceDesk"
          api={ServiceDesk_api.create}
          fields={formFields}
        />
      )}
    </DataList>
  );
}
