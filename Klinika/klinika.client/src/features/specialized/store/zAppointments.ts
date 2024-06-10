import {create} from "zustand";

type Appointments = {
    id: number;
    patientFullName: string;
    reasonOfConsultation: string;
    date: string,
    slot: number,
};

type State = {
    form: Appointments | null;
    setForm: (form: Appointments | null) => void;
}

export const zAppointments = create<State>((set) => ({
    form: null,
    setForm: (form: Appointments | null) => set({form}),
}));