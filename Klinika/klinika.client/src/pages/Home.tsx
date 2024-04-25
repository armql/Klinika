import { Fragment } from "react";
import { Hero, TechProof, Features } from "../features/home/__home";
export default function Home() {
  return (
    <Fragment>
      <Hero />
      <Features />
      <TechProof />
    </Fragment>
  );
}
