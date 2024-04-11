import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const HelpCenter = lazy(() => import("../pages/HelpCenter"));
const About = lazy(() => import("../pages/About"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const PatientDashboard = lazy(() => import("../pages/patient/Dashboard"));
const PatientReports = lazy(() => import("../pages/patient/ReportsList"));

export {
  Home,
  HelpCenter,
  About,
  Register,
  Login,
  PatientDashboard,
  PatientReports,
};
