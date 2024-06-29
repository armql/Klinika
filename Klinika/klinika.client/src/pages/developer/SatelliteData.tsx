import axios_instance from "../../services/axios.ts";
import {ApiService} from "../../services/ApiServices";
import {CreateForm, DataList, EditForm, Filters, Table, zHandler,} from "../../features/handata/__handata";
import {FormField} from "../../features/handata/utils/form-fields";
import {BaseItem} from "../../features/handata/__handata.ts";
import {useQuery} from "react-query";

export type Satellite = BaseItem & {
    name: string;
    type: string;
    planetId: number;
};



export default function SatelliteData() {
    const {create_modal: create, edit_modal: edit} = zHandler();
    const satellite_api = new ApiService<Satellite>(
        {
            category: "Planet/getAll",
            paginate: "Satellite/paginate",
            get: "Satellite/get",
            create: "Satellite/create",
            update: `Satellite/update`,
            delete: "Satellite/delete-soft",
            bulk_delete: "Satellite/bulkDelete",
        },
        axios_instance
    );

    const {data, isLoading} = useQuery("getAll", satellite_api.category);
    const Options = Array.isArray(data) ? data.map((item) => ({
        id: item.id,
        name: item.name,
    })) : [];

    const formFields: FormField[] = [
        {
            type: "text",
            identifier: "name",
            name: "Satellite Name",
            placeholder: "Enter your satellite name",
        },
        {
            type: "text",
            identifier: "type",
            name: "Satellite Type",
            placeholder: "Enter your satellite name",
        },
        {
            type: "select",
            identifier: "planetId",
            name: "Planet Type",
            options: isLoading
                ? [
                    {
                        id: 1,
                        name: "Loading Options...",
                    },
                ]
                : Options.map((item) => ({
                    id: item.id,
                    name: item.name,
                })),
        }
    ];

    return (
        <DataList>
            <Filters
                name="Satellite List"
                bulkDelete={satellite_api.bulk_delete}
            />
            <Table
                headers={["Satellite ID", "Name", "Planet ID"]}
                all={satellite_api.paginate}
                delete={satellite_api.delete}
                dataField={["id", "name", "planetId"]}
            />
            {edit && (
                <EditForm<Satellite>
                    header="Satellite"
                    get={satellite_api.get}
                    update={satellite_api.update}
                    fields={formFields}
                />
            )}
            {create && (
                <CreateForm<Satellite>
                    header="Satellite"
                    api={satellite_api.create}
                    fields={formFields}
                />
            )}
        </DataList>
    );
}
