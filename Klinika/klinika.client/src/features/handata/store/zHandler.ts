import { create } from "zustand";

type State = {
  global_error: string;
  create_modal: boolean;
  edit_modal: boolean;
  refetch_data: boolean;
  openCreate: () => void;
  closeCreate: () => void;
  openEdit: () => void;
  closeEdit: () => void;
  setGlobalError: (error: string) => void;
};

export const zHandler = create<State>((set) => ({
  global_error: "",
  create_modal: false,
  edit_modal: false,
  refetch_data: false,
  openCreate: () => set((state) => ({ ...state, create_modal: true })),
  closeCreate: () =>
    set((state) => ({
      ...state,
      create_modal: false,
      refetch_data: !state.refetch_data,
    })),
  openEdit: () => set((state) => ({ ...state, edit_modal: true })),
  closeEdit: () =>
    set((state) => ({
      ...state,
      edit_modal: false,
      refetch_data: !state.refetch_data,
    })),
  setGlobalError: (error) =>
    set((state) => ({ ...state, global_error: error })),
}));
