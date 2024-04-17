import { create } from "zustand";
import { FunctionComponent, LazyExoticComponent } from "react";

type Link = {
  to: string;
  text: string;
  component: LazyExoticComponent<FunctionComponent>;
};

export type Data = {
  id: number;
  category: string;
  links: Link[];
};

type State = {
  data: Data[];
  type: string;
  active_link: string;
  isCollapsed: boolean;
  sidebar: boolean;
  notification: boolean;
  active_category: number[];
  collapse: () => void;
  setData: (data: Data[]) => void;
  setType: (type: string) => void;
  handleSidebar: () => void;
  handleNotification: () => void;
  handleCategory: (id: number) => void;
  handleActiveLink: (label: string) => void;
};

export const useNavigation = create<State>((set) => ({
  data: [],
  active_link: "dashboard",
  type: "",
  isCollapsed: false,
  active_category: [1],
  notification: false,
  sidebar: false,
  collapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  handleActiveLink: (label) =>
    set((state) => ({ ...state, active_link: label })),
  setData: (data: Data[]) =>
    set((state) => ({
      ...state,
      data: data,
    })),
  setType: (type: string) =>
    set((state) => ({
      ...state,
      type: type,
    })),
  handleSidebar: () =>
    set((state) => ({
      sidebar: !state.sidebar,
    })),
  handleNotification: () =>
    set((state) => ({
      notification: !state.notification,
    })),
  handleCategory: (id: number) =>
    set((state) => {
      const isActive = state.active_category.includes(id);
      if (isActive) {
        return {
          ...state,
          active_category: state.active_category.filter(
            (cat_id) => cat_id !== id
          ),
        };
      } else {
        return {
          ...state,
          active_category: [...state.active_category, id],
        };
      }
    }),
}));
