import axios_instance from "../../services/axios.ts";
import {ApiService} from "../../services/ApiServices";
import {BaseItem, CreateForm, DataList, EditForm, Filters, Table, zHandler,} from "../../features/handata/__handata";
import {FormField} from "../../features/handata/utils/form-fields";
import {useQuery} from "react-query";

export type Block = BaseItem & {
    id: number;
    name: string;
    specializationId: number;
};

export default function BlockData() {
    const {create_modal: create, edit_modal: edit} = zHandler();

    const Block_api = new ApiService<Block>(
        {
            category: "Specialization/getAll",
            paginate: "Block/paginate",
            get: "Block/get",
            create: "Block/create",
            update: "Block/update",
            bulk_delete: "Block/bulkDelete",
            delete: "Block/delete",
        },
        axios_instance
    );
    const {data, isLoading} = useQuery("getAll", Block_api.category);

    const Options = Array.isArray(data) ? data.map((item) => ({
        id: item.id,
        name: item.name,
    })) : [];

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
                : Options,
        },
    ];

    return (
        <DataList>
            <Filters 
                name="Block List"
                bulkDelete={Block_api.bulk_delete}
            />
            <Table<Block>
                headers={["Block ID", "Name", "Specialization Id"]}
                all={Block_api.paginate}
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
