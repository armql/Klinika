import { Navigate } from "react-router-dom";
import { user } from "../data/user";
import { ReactNode, Suspense } from "react";
import { BlankLoader } from "../router/global";

interface InnerProp {
  children: ReactNode;
  suspense: boolean | false;
}

export default function ProtectedRoutes({ children, suspense }: InnerProp) {
  console.log("Protected Bridge initiated");
  if (!user.token) {
    console.log("Login Condition initiated");
    return <Navigate to="/login" />;
  } else {
    console.log("Layout condition initiated");
    if (suspense) {
      console.log("Layout condition is suspensed");
      return <Suspense fallback={<BlankLoader />}>{children}</Suspense>;
    } else {
      console.log("Layout condition is not suspensed");
      return children;
    }
  }
}
