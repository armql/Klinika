import axios_instance from "../../services/axios.ts";
import {ApiService} from "../../services/ApiServices";
import {CreateForm, DataList, EditForm, Filters, Table, zHandler,} from "../../features/handata/__handata";
import {FormField} from "../../features/handata/utils/form-fields";
import {BaseItem} from "../../features/handata/__handata.ts";
import {useQuery} from "react-query";

export type SpecializedDoctor = BaseItem & {
    id: string;
    specializationId: number;
};

export default function SpecializedDoctorData() {
    const {create_modal: create, edit_modal: edit} = zHandler();
    const specialization_api = new ApiService<SpecializedDoctor>(
        {
            paginate: "SpecializedDoctor/paginate",
            get: "SpecializedDoctor/get",
            create: "SpecializedDoctor/create",
            update: `SpecializedDoctor/update`,
            delete: "SpecializedDoctor/delete",
            bulk_delete: "SpecializedDoctor/bulkDelete",
            category: "Account/getAll",
            category2: "Specialization/getAll",
        },
        axios_instance
    );
    const {data: categoryData, isLoading: isCategoryLoading} = useQuery("category", specialization_api.category);
    const {data: category2Data, isLoading: isCategory2Loading} = useQuery("category2", specialization_api.category2);


    // Check if categoryData and category2Data are arrays
    const categoryOptions = Array.isArray(categoryData) ? categoryData.map((item) => ({
        id: item.id,
        name: item.firstName + " " + item.lastName,
    })) : [];
    const category2Options = Array.isArray(category2Data) ? category2Data.map((item) => ({
        id: item.id,
        name: item.name,
    })) : [];

    const formFields: FormField[] = [
        {
            type: "select",
            identifier: "id",
            name: "User Id",
            options: isCategoryLoading
                ? [
                    {
                        id: 1,
                        name: "Loading Options...",
                    },
                ]
                : categoryOptions,
        },
        {
            type: "select",
            identifier: "specializationId",
            name: "Specialization",
            options: isCategory2Loading
                ? [
                    {
                        id: 1,
                        name: "Loading Options...",
                    },
                ]
                : category2Options,
        },
    ];

    return (
        <DataList>
            <Filters
                name="Specialized Doctor List"
                bulkDelete={specialization_api.bulk_delete}
            />
            <Table
                headers={["Specialized Doctor ID", "Specialization ID"]}
                all={specialization_api.paginate}
                delete={specialization_api.delete}
                dataField={["id", "specializationId"]}
            />
            {edit && (
                <EditForm<SpecializedDoctor>
                    header="Specialized Doctor"
                    get={specialization_api.get}
                    update={specialization_api.update}
                    fields={formFields}
                />
            )}
            {create && (
                <CreateForm<SpecializedDoctor>
                    header="Specialized Doctor"
                    api={specialization_api.create}
                    fields={formFields}
                />
            )}
        </DataList>
    );
}