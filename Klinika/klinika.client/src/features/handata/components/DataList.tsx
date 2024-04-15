import { ReactNode } from "react";
import { Filters } from "../handata";

type DataProps = {
  name: string;
  children: ReactNode;
};

export default function DataList({ name, children }: DataProps) {
  return (
    <section className="w-full h-full relative p-6">
      <Filters name={name} />
      {children}
    </section>
  );
}
