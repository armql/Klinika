import { create } from "zustand";

type FormStore = {
  selectedItems: string[];
  sortOrder: string;
  createdBy: string;
  search: string;
  selectedItem: string | null;
  selectItem: (id: string | number) => void;
  deselectItem: (id: string | number) => void;
  selectAll: (ids: string[]) => void;
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
    set({ selectedItems: ids });
  },
  deselectAll: () => {
    set({ selectedItems: [] });
  },
  setSelectedItem: (id) => set({ selectedItem: id }),
}));
