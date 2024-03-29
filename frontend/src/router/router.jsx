import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import GuestLayout from "../layouts/GuestLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
  },
  /*
    TODO: Phase 1
   * Integration of all roles layouts,
   * All layouts must be wrapped with suspense to avoid instant rendering, 
   */
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
