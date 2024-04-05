import { lazy } from "react";
const SpecializedDoctorLayout = lazy(() =>
  import("../layouts/SpecializedDoctorLayout")
);
const PrimaryDoctorLayout = lazy(() =>
  import("../layouts/PrimaryDoctorLayout")
);
const PatientLayout = lazy(() => import("../layouts/AdministrationLayout"));
const DeveloperLayout = lazy(() => import("../layouts/DeveloperLayout"));
const NotFound = lazy(() => import("../layouts/NotFound"));
const AdministrationLayout = lazy(() =>
  import("../layouts/AdministrationLayout")
);
const GuestLayout = lazy(() => import("../layouts/GuestLayout"));
import { BlankLoader } from "../features/layouts/__layout";
export {
  AdministrationLayout,
  SpecializedDoctorLayout,
  PrimaryDoctorLayout,
  PatientLayout,
  GuestLayout,
  DeveloperLayout,
  NotFound,
  BlankLoader,
};
