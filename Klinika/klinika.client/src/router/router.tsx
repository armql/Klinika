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
} from "./pages";
import { Suspense } from "react";
import ProtectedRoutes from "../lib/ProtectedRoutes";
import { sidebar_data } from "../features/sidebar/data/sidebar_data";
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
      {
        path: "reports",
        element: <PatientReports />,
      },
      // ...sidebar_data.map((link) => {
      //   const Component = link.links[0].component;
      //   return {
      //     path: link.links[0].to,
      //     element: <Component />,
      //   };
      // }),
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
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
