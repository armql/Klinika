import { create } from "zustand";
import { zPagination } from "./zPagination";

type FormStore = {
  selectedItems: string[];
  sortOrder: string;
  createdBy: string;
  search: string;
  selectedItem: string | null;
  selectItem: (id: string | number) => void;
  deselectItem: (id: string | number) => void;
  selectAll: () => void;
  deselectAll: () => void;
  setSelectedItem: (id: string) => void;
  handleSearch: (search: string) => void;
  handleSortOrder: (order: string) => void;
  handleCreatedBy: (createdBy: string) => void;
};

export const zForm = create<FormStore>((set) => ({
  sortOrder: "asc",
  createdBy: "",
  search: "",
  selectedItems: [],
  selectedItem: null,
  handleCreatedBy: (createdBy) => set({ createdBy }),
  handleSortOrder: (order) => set({ sortOrder: order }),
  handleSearch: (search) => set({ search }),
  selectItem: (id) => {
    const stringId = typeof id === "number" ? String(id) : id;
    set((state) => {
      if (!state.selectedItems.includes(stringId)) {
        return { selectedItems: [...state.selectedItems, stringId] };
      }
      return state; // Return the current state if the item is already selected
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
  selectAll: () => {
    const { startIndex, endIndex, dataLength } = zPagination.getState();
    const allIds = Array.from(
      { length: Math.min(endIndex, dataLength) - startIndex },
      (_, i) => String(startIndex + i + 1)
    );
    set({ selectedItems: allIds });
  },
  deselectAll: () => {
    set({ selectedItems: [] });
  },
  setSelectedItem: (id) => set({ selectedItem: id }),
}));
