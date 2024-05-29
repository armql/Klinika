import {create} from "zustand";

type Specialization = {
    id: number,
    title: string,
    image: string,
    isAvailable: boolean,
}

export type TimeSlot = {
    id: number,
    start: string,
    end: string,
}

export type SelectedDoctor = {
    id: number,
    name: string,
    specializations: string,
    schedule: {
        [key: string]: { timeslots: number[] },
    },
}

type State = {
    selectedSpecialization: Specialization | undefined,
    selectedDoctor: SelectedDoctor | undefined,
    setSelectedDoctor: (doctor: SelectedDoctor) => void,
    setSelectedSpecialization: (specialization: Specialization) => void,
    options: boolean | undefined,
    setOptions: (options: boolean) => void,
    reserving: boolean | undefined,
    setReserving: (reserving: boolean) => void,
    selectedDate: Date | null,
    setSelectedDate: (date: Date | null) => void,
    selectedTime: TimeSlot | null,
    setSelectedTime: (time: TimeSlot) => void,

}

export const zReservation = create<State>((set) => ({
    selectedSpecialization: undefined,
    options: undefined,
    reserving: undefined,
    selectedDate: null,
    selectedDoctor: undefined,
    setSelectedDoctor: (doctor: SelectedDoctor) => set({selectedDoctor: doctor}),
    setOptions: (options: boolean) => set({options}),
    setReserving: (reserving: boolean) => set({reserving}),
    setSelectedSpecialization: (specialization: Specialization) => set({selectedSpecialization: specialization}),
    setSelectedDate: (date: Date | null) => set({selectedDate: date}),
    selectedTime: null,
    setSelectedTime: (time: TimeSlot) => set({selectedTime: time}),
}));

export const timeSlots: TimeSlot[] = [
    {id: 1, start: '08:00', end: '08:15'},
    {id: 2, start: '08:15', end: '08:30'},
    {id: 3, start: '08:30', end: '08:45'},
    {id: 4, start: '08:45', end: '09:00'},
    {id: 5, start: '09:00', end: '09:15'},
    {id: 6, start: '09:15', end: '09:30'},
    {id: 7, start: '09:30', end: '09:45'},
    {id: 8, start: '09:45', end: '10:00'},
];