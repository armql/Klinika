import { Fragment } from "react";
import { Outlet } from "react-router-dom";

export default function SpecializedDoctorLayout() {
  return (
    <Fragment>
      {/* TODO: Header */}
      <main>
        <Outlet />
      </main>
      {/* TODO: Footer */}
    </Fragment>
  );
}
