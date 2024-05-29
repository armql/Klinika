import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

export type UserData = {
    email: string;
    id: string;
    jwtid: string;
    role: string | "GUEST";
    exp: number;
    iss: string;
    aud: string;
    jwtToken: string;
    refreshToken: string;
};

type StoreProps = {
    data: UserData;
    setData: (data: UserData) => void;
};

export const zAuth = create(
    persist<StoreProps>(
        (set) => ({
            data: {
                email: "",
                id: "",
                jwtid: "",
                role: "GUEST",
                exp: 0,
                iss: "",
                aud: "",
                jwtToken: "",
                refreshToken: "",
            },
            setData: (data: UserData) => set({data}),
        }),
        {
            name: "auth",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
