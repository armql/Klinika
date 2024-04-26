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

export type HelpCenter = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  creationData: string;
  categoryId: number;
};

export default function HelpCenterData() {
  const { create_modal: create, edit_modal: edit } = zHandler();
  const helpcenter_api = new ApiService<HelpCenter>(
    {
      category: "HelpCenterCategory/getAll",
      getAll: "HelpCenter/getAll",
      get: "HelpCenter/get",
      create: "HelpCenter/create",
      update: "HelpCenter/update",
      delete: "HelpCenter/delete",
    },
    axios_instance
  );
  const { data, isLoading } = useQuery("category", helpcenter_api.category);

  const formFields: FormField[] = [
    {
      type: "email",
      identifier: "email",
      name: "Email",
      placeholder: "Enter your email",
    },
    {
      type: "text",
      identifier: "name",
      name: "Name",
      placeholder: "Enter your name",
    },
    {
      type: "text",
      identifier: "subject",
      name: "Subject",
      placeholder: "Enter your Subject",
    },
    {
      type: "textarea",
      identifier: "message",
      name: "Message",
      placeholder: "Enter your message",
    },
    {
      type: "select",
      identifier: "categoryId",
      name: "Category type",
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
      <Filters name="Help Center List" />
      <Table<HelpCenter>
        headers={[
          "Help Center ID",
          "Name",
          "Email",
          "Subject",
          "Message",
          "CategoryId",
        ]}
        all={helpcenter_api.getAll}
        delete={helpcenter_api.delete}
        dataField={["id", "name", "email", "subject", "message", "categoryId"]}
      />
      {edit && (
        <EditForm<HelpCenter>
          header="Help Center"
          get={helpcenter_api.get}
          update={helpcenter_api.update}
          fields={formFields}
        />
      )}
      {create && (
        <CreateForm<HelpCenter>
          header="Help Center"
          api={helpcenter_api.create}
          fields={formFields}
        />
      )}
    </DataList>
  );
}
