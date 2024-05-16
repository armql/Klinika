import {create} from "zustand";
import {deepEqual} from "../utils/deep-equalizer";

export interface BulkItems {
    [key: string]: string | number;
}

type FormStore = {
    selectedItemData: BulkItems[];
    selectedItems: string[];
    sortOrder: string;
    createdBy: string;
    search: string;
    convPDF: boolean;
    headers: string[];
    selectedItem: string | number | null;
    selectItem: (id: string | number) => void;
    deselectItem: (id: string | number) => void;
    selectAll: (ids: string[]) => void;
    deselectAll: () => void;
    setSelectedItem: (id: string | number) => void;
    handleSearch: (search: string) => void;
    handleSortOrder: (order: string) => void;
    handleCreatedBy: (createdBy: string) => void;
    setAllSelectedItemData: (data: BulkItems[]) => void;
    setOneSelectedItemData: (data: BulkItems) => void;
    setConvPDF: (convPDF: boolean) => void;
    setHeaders: (headers: string[]) => void;
};

export const zForm = create<FormStore>((set) => ({
    selectedItemData: [],
    sortOrder: "asc",
    createdBy: "",
    search: "",
    selectedItems: [],
    selectedItem: null,
    convPDF: false,
    headers: [],
    setHeaders: (headers) => set({headers}),
    setConvPDF: (convPDF) => set({convPDF}),
    handleCreatedBy: (createdBy) => set({createdBy}),
    handleSortOrder: (order) => set({sortOrder: order}),
    handleSearch: (search) => set({search}),
    selectItem: (id) => {
        const stringId = typeof id === "number" ? String(id) : id;
        set((state) => {
            if (!state.selectedItems.includes(stringId)) {
                return {selectedItems: [...state.selectedItems, stringId]};
            }
            return state;
        });
    },
    deselectItem: (id) => {
        const stringId = typeof id === "number" ? String(id) : id;
        set((state) => ({
            selectedItems: state.selectedItems.filter(
                (itemId) => itemId !== stringId
            ),
        }));
    },
    selectAll: (ids: string[]) => {
        set({selectedItems: ids});
    },
    deselectAll: () => {
        set({selectedItems: []});
    },
    setSelectedItem: (id) => set({selectedItem: id}),
    setAllSelectedItemData: (data: BulkItems[]) => {
        set((state) => {
            const newData: BulkItems[] = [];
            for (const item of data) {
                const stringItem: BulkItems = {};
                for (const key in item) {
                    stringItem[String(key)] = String(item[key]);
                }
                const exists = state.selectedItemData.some((existingItem) => existingItem.id === stringItem.id);
                if (!exists) {
                    newData.push(stringItem);
                }
            }
            if (state.selectedItemData.length >= 15) {
                return {selectedItemData: []};
            } else {
                return {selectedItemData: [...state.selectedItemData, ...newData]};
            }
        });
    },
    setOneSelectedItemData: (data: BulkItems) => {
        set((state) => {
            const saltedData: BulkItems = {};
            for (const key in data) {
                saltedData[String(key)] = String(data[key]);
            }

            const exists = state.selectedItemData.some((item) => deepEqual(item, saltedData));
            if (exists) {
                return {selectedItemData: state.selectedItemData.filter((item) => !deepEqual(item, saltedData))};
            } else {
                return {selectedItemData: [...state.selectedItemData, saltedData]};
            }
        });
    },

}));
