import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const HelpCenter = lazy(() => import("../pages/HelpCenter"));
const About = lazy(() => import("../pages/About"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));

export { Home, HelpCenter, About, Register, Login };
