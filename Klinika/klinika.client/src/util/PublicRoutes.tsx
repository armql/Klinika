import { Navigate, useLocation } from "react-router-dom";
import { ReactNode, Suspense } from "react";
import { BlankLoader } from "../router/global";
import useAuthStore from "../store/AuthStore";
import { routes } from "./roles-routes";

interface InnerProp {
  children: ReactNode;
  suspense: boolean | false;
}

export default function PublicRoutes({ children, suspense }: InnerProp) {
  const { data } = useAuthStore();
  const { pathname } = useLocation();

  const identifiedrole = data.role;
  const finalized_routing = routes[identifiedrole];
  console.log(finalized_routing);

  if (!pathname.includes(finalized_routing)) {
    return <Navigate to={finalized_routing} />;
  }

  if (suspense) {
    return <Suspense fallback={<BlankLoader />}>{children}</Suspense>;
  } else {
    return children;
  }
}
