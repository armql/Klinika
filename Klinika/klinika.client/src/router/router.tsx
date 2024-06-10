import {createBrowserRouter, Navigate} from "react-router-dom";
import {
    AdministrationLayout,
    DeveloperLayout,
    GuestLayout,
    NotFound,
    PatientLayout,
    PrimaryDoctorLayout,
    SpecializedDoctorLayout,
} from "./global";
import {
    About,
    AdministrationDashboard,
    DeveloperDashboard,
    HelpCenter,
    Home,
    Login,
    PatientDashboard,
    PrimaryDashboard,
    Settings,
    SpecializedDashboard,
} from "./pages";
import ProtectedRoutes from "../util/ProtectedRoutes";
import {
    administration_routes,
    developer_routes,
    patient_routes,
    primary_routes,
    specialized_routes
} from "../features/sidebar/__sidebar";
import Register from "../pages/Register";

export const router = createBrowserRouter([
    {
        path: "/guest",
        element: (
            <ProtectedRoutes suspense={true}>
                <GuestLayout/>
            </ProtectedRoutes>
        ),
        children: [
            {
                path: "/guest",
                element: <Navigate to="home"/>,
            },
            {
                path: "home",
                element: <Home/>,
            },
            {
                path: "help-center",
                element: <HelpCenter/>,
            },
            {
                path: "about",
                element: <About/>,
            },
            {
                path: "login",
                element: <Login/>,
            },
            {
                path: "register",
                element: <Register/>,
            },
        ],
    },
    {
        path: "/administration",
        element: (
            <ProtectedRoutes suspense={true}>
                <AdministrationLayout/>
            </ProtectedRoutes>
        ),

        children: [
            {
                path: "/administration",
                element: <Navigate to="dashboard"/>,
            },
            {
                path: "dashboard",
                element: <AdministrationDashboard/>,
            },
            {
                path: "settings",
                element: <Settings/>,
            },
            ...administration_routes
                .map((category) => {
                    return category.folders.map((folder) => {
                        return folder.links.map((link) => {
                            return {
                                path: link.to,
                                element: <link.component/>,
                            };
                        });
                    });
                })
                .flat(2),
        ],
    },
    {
        path: "/patient",
        element: (
            <ProtectedRoutes suspense={true}>
                <PatientLayout/>
            </ProtectedRoutes>
        ),
        children: [
            {
                path: "/patient",
                element: <Navigate to="dashboard"/>,
            },
            {
                path: "dashboard",
                element: <PatientDashboard/>,
            },
            {
                path: "settings",
                element: <Settings/>,
            },
            ...patient_routes
                .map((category) => {
                    return category.folders.map((folder) => {
                        return folder.links.map((link) => {
                            return {
                                path: link.to,
                                element: <link.component/>,
                            };
                        });
                    });
                })
                .flat(2),
        ],
    },
    {
        path: "/specialized",
        element: (
            <ProtectedRoutes suspense={true}>
                <SpecializedDoctorLayout/>
            </ProtectedRoutes>
        ),
        children: [
            {
                path: "/specialized",
                element: <Navigate to="dashboard"/>,
            },
            {
                path: "dashboard",
                element: <SpecializedDashboard/>,
            },
            {
                path: "settings",
                element: <Settings/>,
            },
            ...specialized_routes
                .map((category) => {
                    return category.folders.map((folder) => {
                        return folder.links.map((link) => {
                            return {
                                path: link.to,
                                element: <link.component/>,
                            };
                        });
                    });
                })
                .flat(2),
        ],
    },
    {
        path: "/primary",
        element: (
            <ProtectedRoutes suspense={true}>
                <PrimaryDoctorLayout/>
            </ProtectedRoutes>
        ),
        children: [
            {
                path: "/primary",
                element: <Navigate to="dashboard"/>,
            },
            {
                path: "dashboard",
                element: <PrimaryDashboard/>,
            },
            {
                path: "settings",
                element: <Settings/>,
            },
            ...primary_routes
                .map((category) => {
                    return category.folders.map((folder) => {
                        return folder.links.map((link) => {
                            return {
                                path: link.to,
                                element: <link.component/>,
                            };
                        });
                    });
                })
                .flat(2),
        ],
    },
    {
        path: "/development",
        element: (
            <ProtectedRoutes suspense={true}>
                <DeveloperLayout/>
            </ProtectedRoutes>
        ),
        children: [
            {
                path: "/development",
                element: <Navigate to="dashboard"/>,
            },
            {
                path: "dashboard",
                element: <DeveloperDashboard/>,
            },
            {
                path: "settings",
                element: <Settings/>,
            },
            ...developer_routes
                .map((category) => {
                    return category.folders.map((folder) => {
                        return folder.links.map((link) => {
                            return {
                                path: link.to,
                                element: <link.component/>,
                            };
                        });
                    });
                })
                .flat(2),
        ],
    },
    {
        path: "*",
        element: <NotFound/>,
    },
]);
