import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function PatientLayout() {
  return (
    <Fragment>
      {/* TODO: Header */}
      <Sidebar>
        <main className="relative overflow-hidden">
          <Outlet />
        </main>
      </Sidebar>
      {/* TODO: Footer */}
    </Fragment>
  );
}
