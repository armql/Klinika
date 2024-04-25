import { create } from "zustand";

type Store = {
  dataLength: number;
  loading: boolean;
  currentPage: number | 1;
  itemsPerPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  max: boolean;
  min: boolean;
  setDataLength: (dataLength: number) => void;
  setLoading: (loading: boolean) => void;
  setCurrentPage: (currentPage: number) => void;
  setTotalPages: (totalPages: number) => void;
};

export const zPagination = create<Store>((set) => ({
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
      startIndex: (state.currentPage - 1) * state.itemsPerPage,
      endIndex: state.startIndex + state.itemsPerPage,
      max: state.totalPages === state.currentPage,
    }));
  },
  setTotalPages: (totalPages) => set({ totalPages }),
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
