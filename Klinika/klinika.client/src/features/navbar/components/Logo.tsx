import { ReactNode } from "react";

interface InnerProp {
  children: ReactNode;
}

export default function Logo({ children }: InnerProp) {
  return (
    <span className="font-medium font-manrope text-5xl sm:text-start text-center">
      {children}
    </span>
  );
}
