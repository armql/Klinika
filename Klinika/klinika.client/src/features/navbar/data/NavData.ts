import { user } from "../../../data/user";

const patient_data = [
  {
    id: 5,
    to: "logout",
    label: "Logout",
  },
  {
    id: 6,
    to: "profile",
    label: "Profile",
  },
];

export const nav_data = [
  {
    id: 1,
    to: "home",
    label: "Home",
  },
  {
    id: 2,
    to: "help-center",
    label: "Help Center",
  },
  {
    id: 3,
    to: "login",
    label: "Login",
  },
  {
    id: 4,
    to: "register",
    label: "Register",
  },
  // ...(user.token ? patient_data : []),
];
