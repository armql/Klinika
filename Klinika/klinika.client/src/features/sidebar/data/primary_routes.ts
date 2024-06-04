import {Hub, PrimaryAppointments, PrimaryDashboard} from "../../../router/pages";
import {Data} from "../../navigation/store/zNavigation";

export const primary_routes: Data[] = [
    {
        id: 1,
        category: "Portal",
        folders: [
            {
                id: 1,
                name: "Home",
                links: [
                    {to: "dashboard", text: "Dashboard", component: PrimaryDashboard},
                    {to: "handle-reports", text: "Reports", component: PrimaryAppointments},
                    {to: "hub", text: "Primary Hub", component: Hub},
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
    //             name: "Workspace",
    //             links: [
    //                 {to: "appointments", text: "Appointments", component: PrimaryAppointments},
    //             ],
    //         },
    //     ],
    // },
    // {
    //     id: 3,
    //     category: "Community",
    //     folders: [
    //         {
    //             id: 3,
    //             name: "Learning Center",
    //             links: [
    //                 {to: "learn-more", text: "Learn More", component: PrimaryAppointments},
    //             ],
    //         },
    //     ],
    // },
];
