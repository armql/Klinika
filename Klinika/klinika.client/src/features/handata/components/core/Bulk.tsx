import {FileCsv, FilePdf, Stack, StackMinus, StackSimple} from "@phosphor-icons/react";
import {Tooltip} from "react-tooltip";
import Swal from "sweetalert2";
import {zForm, zPagination} from "../../__handata.ts";
import {useState} from "react";

type BulkProps = {
    __delete?: (id: string[]) => Promise<void>;
};

function Bulk({__delete}: BulkProps) {

    const {selectedItems, deselectAll, setConvPDF} = zForm();
    const {setCurrentPage} = zPagination();
    const [effect, setEffect] = useState(false);

    const bulkDeleter = async () => {
        console.log('Delete clicked')
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    if (__delete) {
                        await __delete(selectedItems).then(() => {
                            Swal.fire({
                                icon: "success",
                                title: "Deleted",
                                text: "Successfully deleted",
                            }).then(() => {
                                window.location.reload();
                                deselectAll();
                                setCurrentPage(1);
                            });
                        });
                    }
                }
            })
        } catch (e) {
            console.log(e)
            await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    }

    return (
        <div className="relative flex items-center">
            <button onClick={() => setEffect(!effect)} onBlurCapture={() => setEffect(!effect)}
                    data-tooltip-id="bulk-tooltip"
                    type="button"
                    className="hover:opacity-70">
                {selectedItems.length > 10 ?
                    <Stack size={22}/> :
                    <StackSimple size={22}/>
                }
            </button>
            <span
                className={`absolute -top-2 -right-2 rounded-full text-xs text-center flex justify-center items-center bg-white ${selectedItems.length < 10 ? "px-1.5" : "px-1"}`}>{selectedItems.length}</span>
            <Tooltip id="bulk-tooltip" place='bottom'
                     arrowColor="#E7E9ED"
                     isOpen={effect}
                     className="border"
                     style={{
                         backgroundColor: 'white',
                         borderRadius: '1rem',
                         padding: '0.4rem',
                         color: 'black',
                         display: "flex",
                         flexDirection: "column",
                         gap: 4,
                         zIndex: 10,
                     }} clickable>
                <span className="text-xs px-2 py-0.5 tracking-wider">Bulk options</span>
                <button type="button"
                        onClick={bulkDeleter}
                        className="w-full cursor-pointer flex hover:bg-red-100 justify-start items-center bg-red-50 border border-red-200 text-red-950 px-2 gap-2 py-1 rounded-lg text-xs">
                    <StackMinus size={18}/>Bulk Remove
                </button>
                <button type="button"
                        onClick={() => setConvPDF(true)}
                        className="w-full flex justify-start items-center border hover:bg-zinc-100 bg-zinc-50 px-2 text-zinc-800 gap-2 py-1 rounded-lg text-xs">
                    <FilePdf size={18}/>Bulk to PDF
                </button>
                <button type="button"
                        onClick={() => console.log('Bulk Reorder clicked')}
                        className="w-full flex justify-start items-center border hover:bg-zinc-100 bg-zinc-50 px-2 text-zinc-800 gap-2 py-1 rounded-lg text-xs">
                    <FileCsv size={18}/>Bulk to CSV
                </button>
            </Tooltip>
        </div>
    );
}

export default Bulk;