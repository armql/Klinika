import { Fragment } from "react";
import { Outlet } from "react-router-dom";

export default function PrimaryDoctorLayout() {
  return (
    <Fragment>
      {/* TODO: Header */}
      <main className="relative overflow-hidden">
        <Outlet />
      </main>
      {/* TODO: Footer */}
    </Fragment>
  );
}
