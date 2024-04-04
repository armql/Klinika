import { NavLink } from "react-router-dom";
import { nav_data } from "../data/NavData";
import { Fragment } from "react";
import BarIcon from "../../home/assets/icons/BarIcon";
export default function NavLinks() {
  return (
    <Fragment>
      <ul className="gap-4 sm:flex hidden">
        {nav_data.map((item) => (
          <li key={item.id} className="">
            <NavLink
              to={item.to}
              disabled={({ isActive }) => isActive}
              className={({ isActive }) =>
                `p-2 ${
                  isActive
                    ? "font-medium"
                    : "hover:text-compact/70 text-compact"
                } ${
                  item.to === "register" &&
                  "bg-primary text-black hover:bg-primary/90 rounded-md"
                } ${isActive && "cursor-default"}`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      {/* <div className="fixed bottom-0 p-4 flex justify-center items-center left-0 right-0">
        <button
          type="button"
          // onClick={() => }
          className="block sm:hidden bg-white p-4 rounded-full transition-all"
        >
          <BarIcon />
        </button>
      </div> */}
    </Fragment>
  );
}
