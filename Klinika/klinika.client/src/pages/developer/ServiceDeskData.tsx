import axios_instance from "../../services/axios.ts";
import {ApiService} from "../../services/ApiServices";
import {BaseItem, CreateForm, DataList, EditForm, Filters, Table, zHandler,} from "../../features/handata/__handata";
import {FormField} from "../../features/handata/utils/form-fields";
import {useQuery} from "react-query";

export type ServiceDesk = BaseItem & {
    id: number;
    name: string;
    email: string;
    operatingHours: string;
    blockId: number;
};

export default function ServiceDeskData() {
    const {create_modal: create, edit_modal: edit} = zHandler();

    const ServiceDesk_api = new ApiService<ServiceDesk>(
        {
            category: "Block/getAll",
            paginate: "ServiceDesk/paginate",
            get: "ServiceDesk/get",
            create: "ServiceDesk/create",
            update: "ServiceDesk/update",
            delete: "ServiceDesk/delete",
            bulk_delete: "ServiceDesk/bulkDelete",
        },
        axios_instance
    );
    const {data, isLoading} = useQuery("category", ServiceDesk_api.category);

    const Options = Array.isArray(data) ? data.map((item) => ({
        id: item.id,
        name: item.name,
    })) : [];
    
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
                : Options,
        },
    ];

    return (
        <DataList>
            <Filters 
                name="ServiceDesk List"
                bulkDelete={ServiceDesk_api.bulk_delete}
            />
            <Table<ServiceDesk>
                headers={[
                    "ServiceDesk ID",
                    "Name",
                    "Email",
                    "Operating Hours",
                    "Block Id",
                ]}
                all={ServiceDesk_api.paginate}
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
