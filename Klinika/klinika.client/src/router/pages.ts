import {lazy} from "react";

const Home = lazy(() => import("../pages/Home"));
const HelpCenter = lazy(() => import("../pages/HelpCenter"));
const About = lazy(() => import("../pages/About"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const PatientDashboard = lazy(() => import("../pages/patient/Dashboard"));
const PatientReports = lazy(() => import("../pages/patient/ReportsList"));
const DeveloperDashboard = lazy(() => import("../pages/developer/Dashboard"));
const DeveloperUserData = lazy(() => import("../pages/developer/UserData"));
const DeveloperSpecializationData = lazy(() => import("../pages/developer/SpecializationData"));
const DeveloperRoleData = lazy(() => import("../pages/developer/RoleData"));
const DeveloperHelpCenterData = lazy(() => import("../pages/developer/HelpCenterData"));
const DeveloperHelpCenterCategoryData = lazy(() => import("../pages/developer/HelpCenterCategoryData"));
const DeveloperServiceDeskData = lazy(() => import("../pages/developer/ServiceDeskData"));
const DeveloperBlockData = lazy(() => import("../pages/developer/BlockData"));
const DeveloperSettings = lazy(() => import("../pages/developer/Settings"));
// const DeveloperUserRolesData = lazy(() => import("../pages/developer/UserRolesData"));
const PatientReservations = lazy(() => import("../pages/patient/Reservations"));

const DeveloperReservationData = lazy(() => import("../pages/developer/ReservationData"));

const DeveloperConsultationData = lazy(() => import("../pages/developer/ConsultationData"));

const DeveloperSpecializedDoctorData = lazy(() => import("../pages/developer/SpecializedDoctorData"));

const DeveloperPatientData = lazy(() => import("../pages/developer/PatientData"));

export {
    Home,
    HelpCenter,
    About,
    Register,
    Login,
    PatientDashboard,
    PatientReports,
    DeveloperDashboard,
    DeveloperUserData,
    DeveloperSpecializationData,
    DeveloperRoleData,
    DeveloperHelpCenterData,
    DeveloperHelpCenterCategoryData,
    DeveloperServiceDeskData,
    DeveloperBlockData,
    DeveloperSettings,
    PatientReservations,
    DeveloperUserRolesData,
    DeveloperReservationData,
    DeveloperConsultationData,
    DeveloperSpecializedDoctorData,
    DeveloperPatientData
};
