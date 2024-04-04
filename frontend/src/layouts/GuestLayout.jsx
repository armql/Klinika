import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";

export default function GuestLayout() {
  return (
    <Fragment>
      <Navbar />
      <main className="relative">
        <Outlet />
        {/* <Background /> */}
      </main>
      <Footer />
    </Fragment>
  );
}
