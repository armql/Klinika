import {
    DeveloperBlockData,
    DeveloperConsultationData,
    DeveloperDashboard,
    DeveloperHelpCenterCategoryData,
    DeveloperHelpCenterData,
    DeveloperImageData,
    DeveloperPatientData,
    DeveloperPrimaryDoctorData,
    DeveloperReservationData,
    DeveloperRoleData,
    DeveloperServiceDeskData,
    DeveloperSpecializationData,
    DeveloperSpecializedDoctorData,
    DeveloperUserData,
    DeveloperPlanetData,
    Hub, DeveloperSatelliteData,
} from "../../../router/pages";
import {Data} from "../../navigation/store/zNavigation";

export const developer_routes: Data[] = [
    {
        id: 1,
        category: "Portal",
        folders: [
            {
                id: 1,
                name: "Dashboard",
                links: [
                    {to: "dashboard", text: "Dashboard", component: DeveloperDashboard},
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
                name: "User",
                links: [
                    {to: "user-data", text: "User List", component: DeveloperUserData},
                    {to: "role-data", text: "Role List", component: DeveloperRoleData},
                    // { to: "user-roles-data", text: "User Roles List", component: DeveloperUserRolesData },
                ],
            },
            {
                id: 3,
                name: "Specialization",
                links: [
                    {
                        to: "specialization-data",
                        text: "Specialization List",
                        component: DeveloperSpecializationData,
                    },
                ],
            },
            {
                id: 5,
                name: "Help Center",
                links: [
                    {
                        to: "helpcenter-data",
                        text: "Help Center List",
                        component: DeveloperHelpCenterData,
                    },
                    {
                        to: "helpcentercategory-data",
                        text: "Help Center Category List",
                        component: DeveloperHelpCenterCategoryData,
                    },
                ],
            },
            {
                id: 7,
                name: "Service Desk",
                links: [
                    {
                        to: "servicedesk-data",
                        text: "Service Desk List",
                        component: DeveloperServiceDeskData,
                    },
                    {
                        to: "block-data",
                        text: "Block List",
                        component: DeveloperBlockData,
                    },
                ],
            },
            {
                id: 8,
                name: "Reservation",
                links: [
                    {
                        to: "reservation-data",
                        text: "Reservation List",
                        component: DeveloperReservationData,
                    },
                    {
                        to: "consultation-data",
                        text: "Consultation List",
                        component: DeveloperConsultationData,
                    },
                ],
            },
            {
                id: 10,
                name: "Roles",
                links: [
                    {
                        to: "specialized-doctor-data",
                        text: "Specialized Doctor List",
                        component: DeveloperSpecializedDoctorData,
                    },
                    {
                        to: "primary-doctor-data",
                        text: "Primary Doctor List",
                        component: DeveloperPrimaryDoctorData,
                    },
                    {
                        to: "patient-data",
                        text: "Patient List",
                        component: DeveloperPatientData,
                    },

                ],
            },
            {
                id: 11,
                name: "Images",
                links: [
                    {
                        to: "image-data",
                        text: "Images List",
                        component: DeveloperImageData,
                    },
                ],
            },
            {
                id: 12,
                name: "Planets & Satellites",
                links: [
                    {
                        to: "planets-data",
                        text: "Planets List",
                        component: DeveloperPlanetData,
                    },
                    {
                        to: "satellites-data",
                        text: "Satellites List",
                        component: DeveloperSatelliteData,
                    },
                ],
            },
        ],
    },
    {
        id: 3,
        category: "Community",
        folders: [
            {
                id: 6,
                name: "Learning Center",
                links: [
                    {to: "hub", text: "Developer Hub", component: Hub},
                ],
            },
        ],
    },
];
