import { Navigate, useLocation } from "react-router-dom";
import { ReactNode, Suspense } from "react";
import { BlankLoader } from "../router/global";
import { zAuth } from "../store/zAuth";
import { routes } from "./roles-routes";

interface InnerProp {
  children: ReactNode;
  suspense: boolean | false;
}
export default function ProtectedRoutes({ children, suspense }: InnerProp) {
  const { pathname } = useLocation();
  const { data } = zAuth();

  const identifiedRole = data.role;
  if (!pathname.includes(routes[identifiedRole])) {
    return <Navigate to={routes[identifiedRole]} />;
  }

  if (suspense) {
    return <Suspense fallback={<BlankLoader />}>{children}</Suspense>;
  } else {
    return children;
  }
}
