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

export type HelpCenter = {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    creationData: string;
    categoryId: number;
};
const createFields: FormField[] = [
    {
        type: "text",
        identifier: "name",
        name: "Your Name",
        placeholder: "Enter your name",
    },
    {
        type: "text",
        identifier: "email",
        name: "Your Email",
        placeholder: "Enter your email",
    },
    {
        type: "text",
        identifier: "subject",
        name: "Your Subject",
        placeholder: "Enter your subject",
    },
    {
        type: "textarea",
        identifier: "message",
        name: "Your message",
        placeholder: "Enter your message",
    },
    {
        type: "number",
        identifier: "categoryId",
        name: "Category Id",
    },
];

const editFields: FormField[] = [
    {
        type: "text",
        identifier: "name",
        name: "Your Name",
        placeholder: "Enter your name",
    },
    {
        type: "text",
        identifier: "email",
        name: "Your Email",
        placeholder: "Enter your email",
    },
    {
        type: "text",
        identifier: "subject",
        name: "Your Subject",
        placeholder: "Enter your subject",
    },
    {
        type: "textarea",
        identifier: "message",
        name: "Your message",
        placeholder: "Enter your message",
    },

];

export default function HelpCenterData() {
    const { create_modal: create, edit_modal: edit } = useHandler();

    const helpcenter_api = new ApiService<HelpCenter>(
        {
            getAll: "/api/HelpCenter/getAll",
            get: "/api/HelpCenter/get",
            create: "/api/HelpCenter/create",
            update: "/api/HelpCenter/update",
            delete: "/api/HelpCenter/delete",
        },
        axios_instance
    );

    return (
        <DataList>
            <Filters name="Help Center List" />
            <Table<HelpCenter>
                headers={["Help Center #ID", "Name", "Email", "Subject", "Message", "CategoryId"]}
                all={helpcenter_api.getAll}
                delete={helpcenter_api.delete}
                dataField={["id", "name", "email", "subject", "message", "categoryId"]}
            />
            {edit && (
                <EditForm<HelpCenter>
                    header="Help Center"
                    get={helpcenter_api.get}
                    update={helpcenter_api.update}
                    fields={editFields}
                />
            )}
            {create && (
                <CreateForm<HelpCenter>
                    header="Help Center"
                    api={helpcenter_api.create}
                    fields={createFields}
                />
            )}
        </DataList>
    );
}
