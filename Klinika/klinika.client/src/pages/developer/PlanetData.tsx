import axios_instance from "../../services/axios.ts";
import {ApiService} from "../../services/ApiServices";
import {CreateForm, DataList, EditForm, Filters, Table, zHandler,} from "../../features/handata/__handata";
import {FormField} from "../../features/handata/utils/form-fields";
import {BaseItem} from "../../features/handata/__handata.ts";

export type Planet = BaseItem & {
    name: string;
    type: string;
};

const formFields: FormField[] = [
    {
        type: "text",
        identifier: "name",
        name: "Planet Name",
        placeholder: "Enter your planet name",
    },
    {
        type: "text",
        identifier: "type",
        name: "Planet Type",
        placeholder: "Enter your planet name",
    },
];

export default function PlanetData() {
    const {create_modal: create, edit_modal: edit} = zHandler();
    const planet_api = new ApiService<Planet>(
        {
            paginate: "Planet/paginate",
            get: "Planet/get",
            create: "Planet/create",
            update: `Planet/update`,
            delete: "Planet/delete-soft",
            bulk_delete: "Planet/bulkDelete",
        },
        axios_instance
    );

    return (
        <DataList>
            <Filters
                name="Planet List"
                bulkDelete={planet_api.bulk_delete}
            />
            <Table
                headers={["Planet ID", "Name", "Type"]}
                all={planet_api.paginate}
                delete={planet_api.delete}
                dataField={["id", "name", "type"]}
            />
            {edit && (
                <EditForm<Planet>
                    header="Planet"
                    get={planet_api.get}
                    update={planet_api.update}
                    fields={formFields}
                />
            )}
            {create && (
                <CreateForm<Planet>
                    header="Planet"
                    api={planet_api.create}
                    fields={formFields}
                />
            )}
        </DataList>
    );
}
