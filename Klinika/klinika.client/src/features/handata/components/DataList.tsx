import { ReactNode } from "react";

type DataProps = {
  children: ReactNode;
};

export default function DataList({ children }: DataProps) {
  return <section className="w-full h-full relative p-6">{children}</section>;
}
