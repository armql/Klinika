import {PatientDashboard, PatientReports, PatientReservations} from "../../../router/pages";
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
                    {to: "reports", text: "Reports List", component: PatientReports},
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
                    {to: "learn-more", text: "Learn More", component: PatientReports},
                    {
                        to: "ask-question",
                        text: "Ask Questions",
                        component: PatientReports,
                    },
                ],
            },
        ],
    },
];
