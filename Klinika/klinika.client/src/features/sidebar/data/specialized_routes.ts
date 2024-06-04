import {Hub, SpecializedAppointments, SpecializedDashboard} from "../../../router/pages";
import {Data} from "../../navigation/store/zNavigation";

export const specialized_routes: Data[] = [
    {
        id: 1,
        category: "Portal",
        folders: [
            {
                id: 1,
                name: "Home",
                links: [
                    {to: "dashboard", text: "Dashboard", component: SpecializedDashboard},
                    // {to: "reservation", text: "Reservation", component: PatientReservations},
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
                name: "Workspace",
                links: [
                    {to: "appointments", text: "Appointments", component: SpecializedAppointments},
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
                    {to: "hub", text: "Specialized Hub", component: Hub},
                ],
            },
        ],
    },
];
