import axios_instance from "../../api/axios";
import {ApiService} from "../../services/ApiServices";
import {BaseItem, CreateForm, DataList, EditForm, Filters, Table, zHandler,} from "../../features/handata/__handata";
import {FormField} from "../../features/handata/utils/form-fields";

export type Image = BaseItem & {
    fileName: string;
    filePath: string;
    fileUrl: string;
    createdBy: string;
    createdDate: string;
};
const formField: FormField[] = [
    {
        type: "file",
        identifier: "fileName",
        name: "Image",
        placeholder: "Upload your image",
    },
];

export default function ImageData() {
    const {create_modal: create} = zHandler();

    const role_api = new ApiService<Image>(
        {
            paginate: "Image/paginate",
            get: "Image/get",
            create: "Image/create",
            delete: "Image/delete",
            bulk_delete: "Image/bulkDelete",
        },
        axios_instance
    );

    return (
        <DataList>
            <Filters name="Image List"/>
            <Table<Image>
                headers={["Image Id", "File Path", "File Url", "Created By", "Created Date"]}
                all={role_api.paginate}
                delete={role_api.delete}
                dataField={["id", "filePath", "fileUrl", "createdBy", "creationDate"]}
            />
            {create && (
                <CreateForm<Image>
                    header="Identity Role"
                    api={role_api.create}
                    fields={formField}
                />
            )}
        </DataList>
    );
}
