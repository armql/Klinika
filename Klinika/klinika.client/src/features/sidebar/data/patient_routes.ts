import {
    Hub,
    PatientConsultationsList,
    PatientDashboard,
    PatientReservations,
    PatientReservationsList
} from "../../../router/pages";
import {Data} from "../../navigation/store/zNavigation";

export const patient_routes: Data[] = [
    {
        id: 1,
        category: "Portal",
        folders: [
            {
                id: 1,
                name: "Home",
                links: [
                    {to: "dashboard", text: "Dashboard", component: PatientDashboard},
                    {to: "reservation", text: "Reservation", component: PatientReservations},
                ],
            },
        ],
    },
    {
        id: 2,
        category: "Data Manage",
        folders: [
            {
                id: 2,
                name: "Reports",
                links: [
                    {to: "reservations-list", text: "Reservations List", component: PatientReservationsList},
                    {to: "consultations-list", text: "Consultations List", component: PatientConsultationsList},
                ],
            },
        ],
    },
    {
        id: 3,
        category: "Community",
        folders: [
            {
                id: 3,
                name: "Learning Center",
                links: [
                    {to: "hub", text: "Patient Hub", component: Hub},
                ],
            },
        ],
    },
];
