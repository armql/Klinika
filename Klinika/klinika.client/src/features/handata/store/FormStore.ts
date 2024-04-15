import { create } from "zustand";
import { Specialization } from "../../../pages/developer/SpecializationData";

type Store = {
  data: Specialization[];
  selectedItems: string[];
  selectItem: (id: string) => void;
  deselectItem: (id: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  createItem: (item: Specialization) => void;
  deleteItem: (id: string) => void;
  editItem: (id: string, newItem: Specialization) => void;
};

export const useFormStore = create<Store>((set) => ({
  data: [],
  selectedItems: [],
  selectItem: (id) =>
    set((state) => ({ selectedItems: [...state.selectedItems, id] })),
  deselectItem: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter((itemId) => itemId !== id),
    })),
  selectAll: () =>
    set((state) => ({
      selectedItems: state.data.map((item) => item.specialization_id),
    })),
  deselectAll: () => set({ selectedItems: [] }),
  createItem: (item) => set((state) => ({ data: [...state.data, item] })),
  deleteItem: (id) =>
    set((state) => ({
      data: state.data.filter((item) => item.specialization_id !== id),
    })),
  editItem: (id, newItem) =>
    set((state) => ({
      data: state.data.map((item) =>
        item.specialization_id === id ? newItem : item
      ),
    })),
}));
