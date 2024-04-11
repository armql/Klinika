import { PatientDashboard, PatientReports } from "../../../router/pages";
import { router } from "../../../router/router";

export const sidebar_data = [
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
