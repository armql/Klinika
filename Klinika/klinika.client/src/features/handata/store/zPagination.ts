import {create} from "zustand";

type Store = {
    loading: boolean;
    currentPage: number | 1;
    itemsPerPage: number;
    totalPages: number;
    max: boolean;
    min: boolean;
    setLoading: (loading: boolean) => void;
    setCurrentPage: (currentPage: number) => void;
    setTotalPages: (totalPages: number) => void;
};

export const zPagination = create<Store>((set) => ({
    loading: true,
    currentPage: 1,
    itemsPerPage: 15,
    totalPages: 0,
    max: false,
    min: true,
    setTotalPages: (totalPages) => {
        set({totalPages});
        set((state) => ({
            max: state.currentPage === state.totalPages,
            min: state.currentPage === 1,
        }));
    },
    setLoading: (loading) => set({loading}),
    setCurrentPage: (currentPage) => {
        set({currentPage});
        set((state) => {
            return {
                max: currentPage === state.totalPages,
                min: currentPage === 1,
            };
        });
    },
}));
