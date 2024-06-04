import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import {FunctionComponent, LazyExoticComponent} from "react";

type Link = {
    to: string;
    text: string;
    component: LazyExoticComponent<FunctionComponent>;
};

type Starred = {
    to: string;
    text: string;
};

type Folder = {
    id: number;
    name: string;
    links: Link[];
};

export type Data = {
    id: number;
    category: string;
    folders: Folder[];
};

type State = {
    data: Data[];
    type: string;
    active_link: Starred;
    isCollapsed: boolean;
    sidebar: boolean;
    notification: boolean;
    folder: number[];
    active_category: number[];
    recent_links: Starred[];
    favorite_links: Starred[];
    collapse: () => void;
    setData: (data: Data[]) => void;
    setType: (type: string) => void;
    handleSidebar: () => void;
    handleNotification: () => void;
    handleActiveLink: (label: Starred) => void;
    handleCategory: (id: number) => void;
    handleFolder: (id: number) => void;
    handleRecents: (link: Starred) => void;
    filterRecents: (link: Starred) => void;
    handleFavorites: (link: Starred) => void;
    deselectFavoritenRecents: () => void;
};

type PersistedState = Pick<
    State,
    "active_category" | "folder" | "recent_links" | "favorite_links"
>;

export const zNavigation = create(
    persist<State>(
        (set) => ({
            data: [],
            active_link: {
                to: "/",
                text: "Dashboard",
            },
            type: "",
            isCollapsed: false,
            active_category: [1],
            notification: false,
            sidebar: false,
            folder: [1],
            recent_links: [
                {
                    to: "/",
                    text: "Dashboard",
                },
            ],
            favorite_links: [],
            deselectFavoritenRecents: () =>
                set(() => ({
                    favorite_links: [],
                    recent_links: [
                        {
                            to: "/",
                            text: "Dashboard",
                        },
                    ],
                })),
            filterRecents: (link: Starred) =>
                set((state) => ({
                    recent_links: state.recent_links.filter(
                        (recent) => recent.to !== link.to
                    ),
                })),
            handleFolder: (id: number) =>
                set((state) => {
                    const isActive = state.folder.includes(id);
                    if (isActive) {
                        return {
                            ...state,
                            folder: state.folder.filter((folder_id) => folder_id !== id),
                        };
                    } else {
                        return {
                            ...state,
                            folder: [...state.folder, id],
                        };
                    }
                }),
            handleRecents: (link: Starred) =>
                set((state) => {
                    const isActive = state.recent_links.some(
                        (recent) => recent.to === link.to
                    );
                    let newRecents = [...state.recent_links];
                    if (isActive) {
                        newRecents = newRecents.filter((recent) => recent.to !== link.to);
                    }
                    newRecents = [link, ...newRecents];
                    if (newRecents.length > 3) {
                        newRecents.pop();
                    }
                    return {
                        ...state,
                        recent_links: newRecents,
                    };
                }),
            handleFavorites: (link: Starred) =>
                set((state) => {
                    const isActive = state.favorite_links.some(
                        (favorite) => favorite.to === link.to && favorite.text === link.text
                    );
                    if (isActive) {
                        return {
                            ...state,
                            favorite_links: state.favorite_links.filter(
                                (favorite) =>
                                    favorite.to !== link.to || favorite.text !== link.text
                            ),
                        };
                    } else {
                        return {
                            ...state,
                            favorite_links: [link, ...state.favorite_links],
                        };
                    }
                }),

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
            collapse: () => set((state) => ({isCollapsed: !state.isCollapsed})),
            handleActiveLink: (active: Starred) =>
                set((state) => {
                    if (state.active_link.to !== active.to) {
                        return {active_link: active};
                    }
                    return state;
                }),

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
        }),
        {
            name: "navigation",
            storage: createJSONStorage(() => localStorage),
            partialize: (state: State): PersistedState => ({
                active_category: state.active_category,
                folder: state.folder,
                recent_links: state.recent_links,
                favorite_links: state.favorite_links,
            }),
        }
    )
);
