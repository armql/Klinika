import {ArrowsDownUp, FunnelSimple, Plus,} from "@phosphor-icons/react";
import {zForm, zHandler} from "../__handata";
import Bulk from "./core/Bulk.tsx";
import Search from "./core/Search.tsx";

type FiltersProps = {
    name: string;
    bulkDelete?: (id: string[]) => Promise<void>;
};

export default function Filters({name, bulkDelete}: FiltersProps) {
    const {handleCreatedBy, handleSortOrder, sortOrder, selectedItems, handleSearch, search} =
        zForm();
    const {openCreate: create} = zHandler();


    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-medium text-xl text-compact">{name}</h1>
            <div className="w-full flex justify-between items-center rounded-lg bg-zinc-100 p-3">
                <div className="flex gap-2 items-center justify-center">
                    <button
                        title="Add item"
                        onClick={create}
                        type="button"
                        className="hover:opacity-60"
                    >
                        <Plus size={22}/>
                    </button>
                    <button
                        title="Funnel items"
                        type="button"
                        onClick={() => handleSearch(search === "_byLowId" ? "_byHighId" : "_byLowId")}
                        className="hover:opacity-60"
                    >
                        <FunnelSimple size={22}/>
                    </button>
                    <button
                        title="Re-order items"
                        type="button"
                        onClick={() => handleSearch(search === "_byAsc" ? "_byDesc" : "_byAsc")}
                        className="hover:opacity-60"
                    >
                        <ArrowsDownUp size={22}/>
                    </button>
                    {selectedItems.length > 0 && (
                        <Bulk __delete={bulkDelete}/>
                    )}
                </div>
                <Search/>
            </div>
        </div>
    );
}
