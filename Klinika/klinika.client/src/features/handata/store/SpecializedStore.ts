import { create } from "zustand";
import { Specialization } from "../../../pages/developer/SpecializationData";

type SpecializedStore = {
  specialization: Specialization[];
  loading: boolean;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  max: boolean;
  min: boolean;
  setSpecialization: (specialization: Specialization[]) => void;
  setLoading: (loading: boolean) => void;
  setCurrentPage: (currentPage: number) => void;
};

export const useSpecialized = create<SpecializedStore>((set) => ({
  specialization: [],
  loading: true,
  currentPage: 1,
  itemsPerPage: 15,
  totalPages: 0,
  startIndex: 0,
  endIndex: 0,
  max: false,
  min: true,
  setSpecialization: (specialization) => {
    console.log("Setting specialization:", specialization);
    set({ specialization });
    set((state) => ({
      totalPages: Math.ceil(specialization.length / state.itemsPerPage),
      startIndex: (state.currentPage - 1) * state.itemsPerPage,
      endIndex: state.startIndex + state.itemsPerPage,
      max: state.totalPages === state.currentPage,
    }));
  },
  setLoading: (loading) => set({ loading }),
  setCurrentPage: (currentPage) => {
    console.log("Setting current page:", currentPage);
    set({ currentPage });
    set((state) => ({
      startIndex: (currentPage - 1) * state.itemsPerPage,
      endIndex: state.startIndex + state.itemsPerPage,
      max: state.totalPages === currentPage,
      min: currentPage === 1,
    }));
  },
}));
