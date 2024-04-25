import { Fragment } from "react";
import {
  Hero,
  TechProof,
  Features,
  Testimonial,
  CTA,
} from "../features/home/__home";
export default function Home() {
  return (
    <Fragment>
      <Hero />
      <Features />
      <TechProof />
      <Testimonial />
      <CTA />
    </Fragment>
  );
}
