import { Logo, NavLinks } from "../features/navbar/__navbar";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center xl:px-48 lg:px-24 md:px-12 sm:px-6 px-4 py-6">
      <Logo>Klinika</Logo>
      <NavLinks />
    </nav>
  );
}
