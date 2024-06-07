import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {authState} from "../util/authState.ts";

export type UserData = {
    id: string;
    role: string | "GUEST";
};

type StoreProps = {
    data: UserData;
    setData: (data: UserData) => void;
    jwtToken: string | undefined;
    setJwtToken: (jwtToken: string | undefined) => void;
};

export const zAuth = create(
    persist<StoreProps>(
        (set) => ({
            data: {
                id: "",
                role: "GUEST",
            },
            jwtToken: undefined,
            setData: (data: UserData) => {
                set({ data });
                authState.setData(data);
            },
            setJwtToken: (jwtToken: string | undefined) => {
                set({ jwtToken });
                authState.setToken(jwtToken);
            },
        }),
        {
            name: "auth",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ data: state.data })
        }
    )
);