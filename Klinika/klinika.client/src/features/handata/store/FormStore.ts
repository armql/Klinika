import { create } from "zustand";
import { usePagination } from "./PaginationStore";

type FormStore = {
  selectedItems: string[];
  selectedItem: string | null;
  selectItem: (id: string | number) => void;
  deselectItem: (id: string | number) => void;
  selectAll: () => void;
  deselectAll: () => void;
  setSelectedItem: (id: string) => void;
};

export const useFormStore = create<FormStore>((set) => ({
  selectedItems: [],
  selectedItem: null,
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
    const { startIndex, endIndex, dataLength } = usePagination.getState();
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
