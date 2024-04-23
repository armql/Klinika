import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  AdministrationLayout,
  SpecializedDoctorLayout,
  PrimaryDoctorLayout,
  PatientLayout,
  GuestLayout,
  DeveloperLayout,
  NotFound,
  BlankLoader,
} from "./global";
import {
  Home,
  HelpCenter,
  About,
  Login,
  PatientDashboard,
  DeveloperDashboard,
} from "./pages";
import ProtectedRoutes from "../util/ProtectedRoutes";
import {
  developer_routes,
  patient_routes,
} from "../features/sidebar/__sidebar";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/guest",
    element: (
      <ProtectedRoutes suspense={true}>
        <GuestLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/guest",
        element: <Navigate to="home" />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "help-center",
        element: <HelpCenter />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/administrative",
    element: (
      <ProtectedRoutes suspense={true}>
        <AdministrationLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "/patient",
    element: (
      <ProtectedRoutes suspense={true}>
        <PatientLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/patient",
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <PatientDashboard />,
      },
      ...patient_routes
        .map((category) => {
          return category.folders.map((folder) => {
            return folder.links.map((link) => {
              const Component = link.component;
              return {
                path: link.to,
                element: <Component />,
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
        <SpecializedDoctorLayout />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/primary",
    element: (
      <ProtectedRoutes suspense={true}>
        <PrimaryDoctorLayout />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/development",
    element: (
      <ProtectedRoutes suspense={true}>
        <DeveloperLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/development",
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <DeveloperDashboard />,
      },
      ...developer_routes
        .map((category) => {
          return category.folders.map((folder) => {
            return folder.links.map((link) => {
              const Component = link.component;
              return {
                path: link.to,
                element: <Component />,
              };
            });
          });
        })
        .flat(2),
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
