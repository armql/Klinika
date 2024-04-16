import { create } from "zustand";
import { usePagination } from "./PaginationStore";

type FormStore = {
  selectedItems: number[];
  selectedItem: number | null;
  selectItem: (id: string) => void;
  deselectItem: (id: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  setSelectedItem: (id: string) => void;
};

export const useFormStore = create<FormStore>((set) => ({
  selectedItems: [],
  selectedItem: null,
  selectItem: (id) =>
    set((state) => ({ selectedItems: [...state.selectedItems, id] })),
  deselectItem: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter((itemId) => itemId !== id),
    })),
  selectAll: () => {
    const { startIndex, endIndex, dataLength } = usePagination.getState();
    const allIds = Array.from(
      { length: Math.min(endIndex, dataLength) - startIndex },
      (_, i) => startIndex + i + 1
    );
    set({ selectedItems: allIds });
  },
  deselectAll: () => {
    set({ selectedItems: [] });
  },
  setSelectedItem: (id) => set({ selectedItem: id }),
}));
