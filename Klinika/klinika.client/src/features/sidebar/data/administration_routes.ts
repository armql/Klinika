import {
    AdministrationDashboard,
    AdministrationPatientRegistration,
    AdministrationPatientReservation,
    Hub
} from "../../../router/pages";
import {Data} from "../../navigation/store/zNavigation";

export const administration_routes: Data[] = [
    {
        id: 1,
        category: "Portal",
        folders: [
            {
                id: 1,
                name: "Home",
                links: [
                    {to: "dashboard", text: "Dashboard", component: AdministrationDashboard},
                    {
                        to: "patient-registration",
                        text: "Patient Registration",
                        component: AdministrationPatientRegistration
                    },
                    {
                        to: "patient-reservation",
                        text: "Patient Reservation",
                        component: AdministrationPatientReservation
                    },
                ],
            },
        ],
    },
    // {
    //     id: 2,
    //     category: "Data Manage",
    //     folders: [
    //         {
    //             id: 2,
    //             name: "Reports",
    //             links: [
    //                 {to: "reservations-list", text: "Reservations List", component: PatientReservationsList},
    //                 {to: "consultations-list", text: "Consultations List", component: PatientConsultationsList},
    //             ],
    //         },
    //     ],
    // },
    {
        id: 3,
        category: "Community",
        folders: [
            {
                id: 3,
                name: "Learning Center",
                links: [
                    {to: "hub", text: "Administration Hub", component: Hub},
                ],
            },
        ],
    },
];
