import { create } from "zustand";

type Store = {
  dataLength: number;
  loading: boolean;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  max: boolean;
  min: boolean;
  setDataLength: (dataLength: number) => void;
  setLoading: (loading: boolean) => void;
  setCurrentPage: (currentPage: number) => void;
};

export const usePagination = create<Store>((set) => ({
  dataLength: 0,
  loading: true,
  currentPage: 1,
  itemsPerPage: 15,
  totalPages: 0,
  startIndex: 0,
  endIndex: 0,
  max: false,
  min: true,
  setDataLength: (dataLength) => {
    set({ dataLength });
    set((state) => ({
      totalPages: Math.ceil(dataLength / state.itemsPerPage),
      startIndex: (state.currentPage - 1) * state.itemsPerPage,
      endIndex: state.startIndex + state.itemsPerPage,
      max: state.totalPages === state.currentPage,
    }));
  },
  setLoading: (loading) => set({ loading }),
  setCurrentPage: (currentPage) => {
    set({ currentPage });
    set((state) => {
      const startIndex = (currentPage - 1) * state.itemsPerPage;
      return {
        startIndex: startIndex,
        endIndex: startIndex + state.itemsPerPage,
        max: state.totalPages === currentPage,
        min: currentPage === 1,
      };
    });
  },
}));
