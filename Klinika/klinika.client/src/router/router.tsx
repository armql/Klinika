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
  PatientReports,
  DeveloperDashboard,
} from "./pages";
import { Suspense } from "react";
import ProtectedRoutes from "../lib/ProtectedRoutes";
import {
  developer_sidebar_data,
  patient_sidebar_data,
} from "../features/sidebar/data/sidebar_data";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<BlankLoader />}>
        <GuestLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="home" />,
      },
      {
        path: "home",
        element: (
          <Suspense>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "help-center",
        element: (
          <Suspense>
            <HelpCenter />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense>
            <About />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense>
            <Login />
          </Suspense>
        ),
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
      ...patient_sidebar_data
        .map((category) => {
          return category.links.map((link) => {
            const Component = link.component;
            return {
              path: link.to,
              element: <Component />,
            };
          });
        })
        .flat(),
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
      ...developer_sidebar_data
        .map((category) => {
          return category.links.map((link) => {
            const Component = link.component;
            return {
              path: link.to,
              element: <Component />,
            };
          });
        })
        .flat(),
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
