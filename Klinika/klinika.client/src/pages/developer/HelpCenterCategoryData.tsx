import axios_instance from "../../services/axios.ts";
import {ApiService} from "../../services/ApiServices";
import {BaseItem, CreateForm, DataList, EditForm, Filters, Table, zHandler,} from "../../features/handata/__handata";
import {FormField} from "../../features/handata/utils/form-fields";

export type HelpCenterCategory = BaseItem & {
    id: number;
    name: string;
    createdBy: string;
    creationData: string;
};
const formField: FormField[] = [
    {
        type: "text",
        identifier: "name",
        name: "Category Name",
        placeholder: "Enter your category name",
    },
];

export default function HelpCenterCategoryData() {
    const {create_modal: create, edit_modal: edit} = zHandler();
    const helpcentercategory_api = new ApiService<HelpCenterCategory>(
        {
            paginate: "HelpCenterCategory/paginate",
            get: "HelpCenterCategory/get",
            create: "HelpCenterCategory/create",
            update: "HelpCenterCategory/update",
            delete: "HelpCenterCategory/delete",
            bulk_delete: "HelpCenterCategory/bulkDelete",
        },
        axios_instance
    );

    return (
        <DataList>
            <Filters 
                name="Category List"
                bulkDelete={helpcentercategory_api.bulk_delete}
            />
            <Table<HelpCenterCategory>
                headers={["Category ID", "Name", "Created by", "Created in"]}
                all={helpcentercategory_api.paginate}
                delete={helpcentercategory_api.delete}
                dataField={["id", "name", "createdBy", "creationDate"]}
            />
            {edit && (
                <EditForm<HelpCenterCategory>
                    header="Category"
                    get={helpcentercategory_api.get}
                    update={helpcentercategory_api.update}
                    fields={formField}
                />
            )}

            {create && (
                <CreateForm<HelpCenterCategory>
                    header="Category"
                    api={helpcentercategory_api.create}
                    fields={formField}
                />
            )}
        </DataList>
    );
}
