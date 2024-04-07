import { lazy } from "react";
const SpecializedDoctorLayout = lazy(
  () => import("../../src/layouts/SpecializedDoctorLayout")
);
const PrimaryDoctorLayout = lazy(
  () => import("../../src/layouts/PrimaryDoctorLayout")
);
const PatientLayout = lazy(
  () => import("../../src/layouts/AdministrationLayout")
);
const DeveloperLayout = lazy(() => import("../../src/layouts/DeveloperLayout"));
const NotFound = lazy(() => import("../../src/layouts/NotFound"));
const AdministrationLayout = lazy(
  () => import("../../src/layouts/AdministrationLayout")
);
const GuestLayout = lazy(() => import("../../src/layouts/GuestLayout"));
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
