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

const router = createBrowserRouter([
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
      <Suspense fallback={<BlankLoader />}>
        <AdministrationLayout />
      </Suspense>
    ),
  },
  {
    path: "/patient",
    element: (
      <Suspense fallback={<BlankLoader />}>
        <PatientLayout />
      </Suspense>
    ),
  },
  {
    path: "/specialized",
    element: (
      <Suspense fallback={<BlankLoader />}>
        <SpecializedDoctorLayout />
      </Suspense>
    ),
  },
  {
    path: "/primary",
    element: (
      <Suspense fallback={<BlankLoader />}>
        <PrimaryDoctorLayout />
      </Suspense>
    ),
  },
  {
    path: "/development",
    element: (
      <Suspense fallback={<BlankLoader />}>
        <DeveloperLayout />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
