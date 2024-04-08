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
import { Home, HelpCenter, About, Register, Login } from "./pages";
import { Suspense } from "react";
import ProtectedRoutes from "../lib/ProtectedRoutes";

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
        element: (
          <Suspense>
            <Register />
          </Suspense>
        ),
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
