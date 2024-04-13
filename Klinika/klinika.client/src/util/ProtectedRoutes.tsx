import { Navigate } from "react-router-dom";
import { user } from "../data/user";
import { ReactNode, Suspense } from "react";
import { BlankLoader } from "../router/global";

interface InnerProp {
  children: ReactNode;
  suspense: boolean | false;
}

export default function ProtectedRoutes({ children, suspense }: InnerProp) {
  if (!user.token) {
    return <Navigate to="/login" />;
  } else {
    if (suspense) {
      return <Suspense fallback={<BlankLoader />}>{children}</Suspense>;
    } else {
      return children;
    }
  }
}
