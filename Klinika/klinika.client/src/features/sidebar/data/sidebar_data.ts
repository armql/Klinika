import {
  DeveloperDashboard,
  DeveloperSpecializationData,
  DeveloperUserData,
  PatientDashboard,
  PatientReports,
} from "../../../router/pages";
import { Data } from "../../navigation/store/useNavigationStore";

const patient_sidebar_data: Data[] = [
  {
    id: 1,
    category: "Portal",
    links: [
      { to: "dashboard", text: "Dashboard", component: PatientDashboard },
    ],
  },
  {
    id: 2,
    category: "Data Manage",
    links: [{ to: "reports", text: "Reports List", component: PatientReports }],
  },
  {
    id: 3,
    category: "Community",
    links: [
      { to: "learn-more", text: "Learn More", component: PatientReports },
      { to: "ask-question", text: "Ask Questions", component: PatientReports },
    ],
  },
];

const developer_sidebar_data = [
  {
    id: 1,
    category: "Portal",
    links: [
      { to: "dashboard", text: "Dashboard", component: DeveloperDashboard },
    ],
  },
  {
    id: 2,
    category: "Data Manage",
    links: [
      { to: "user-data", text: "User List", component: DeveloperUserData },
      {
        to: "specialization-data",
        text: "Specialization List",
        component: DeveloperSpecializationData,
      },
    ],
  },
  {
    id: 3,
    category: "Community",
    links: [
      { to: "learn-more", text: "Learn More", component: DeveloperUserData },
      {
        to: "ask-question",
        text: "Ask Questions",
        component: DeveloperUserData,
      },
    ],
  },
];

export { developer_sidebar_data, patient_sidebar_data };
