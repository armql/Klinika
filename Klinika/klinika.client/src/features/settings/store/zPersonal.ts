import {create} from "zustand";
import {persist} from "zustand/middleware";

export type Account = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImage: number;
    image: string;
}

type StoreProps = {
    data: Account | null;
    setData: (data: Account | null) => void;
};

export const zPersonal = create<StoreProps>(persist(
    (set) => ({
        data: null,
        setData: (data: Account) => set({data}),
    }),
    {
        name: 'content',
    }
));