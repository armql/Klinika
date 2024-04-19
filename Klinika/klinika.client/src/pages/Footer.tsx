import { Copyright } from "@phosphor-icons/react";
import { footer_data } from "../features/navigation/__navigation";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary/60 py-16 md:px-24 px-12 w-screen">
      <div className="flex lg:flex-row flex-col gap-6 justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-4xl font-medium">Klinika</span>
          <p className="line-clamp-5 max-w-[400px] text-compact/60">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            minus quae placeat, accusamus, deleniti culpa velit labore id
            accusantium blanditiis suscipit, autem nostrum. Ratione libero sequi
            error fugit incidunt assumenda!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-nowrap flex-wrap xl:gap-32 lg:gap-24 md:gap-24 sm:gap-12 gap-12">
          <div className="flex flex-col gap-1">
            <span className="font-medium text-xl">Our System</span>
            <ul className="flex flex-col gap-0.5">
              {footer_data.map((link) => (
                <li
                  key={link.id}
                  className="text-compact/70 hover:text-compact/90 z-10 cursor-pointer"
                >
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-medium text-xl">Shortcuts</span>
            <ul className="flex flex-col gap-0.5">
              {footer_data.map((link) => (
                <li
                  key={link.id}
                  className="text-compact/70 hover:text-compact/90 z-10 cursor-pointer"
                >
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-medium text-xl">Resources</span>
            <ul className="flex flex-col gap-0.5">
              {footer_data.map((link) => (
                <li
                  key={link.id}
                  className="text-compact/70 hover:text-compact/90 z-10 cursor-pointer"
                >
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <dl className="w-full h-0.5 bg-compact rounded-full mt-8" />
      <div className="flex md:flex-row flex-col gap-12 justify-between items-end pt-8">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-medium text-xl text-compact/90">
            Together for a better you
          </h3>
          <p className="text-compact/60">
            Healthcare is not just a privilege, it's a fundamental human right.
          </p>
        </div>
        <div className="flex items-center gap-0.5 text-compact">
          <Copyright size={20} weight="fill" />{" "}
          <span>2077 Klinika, All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
