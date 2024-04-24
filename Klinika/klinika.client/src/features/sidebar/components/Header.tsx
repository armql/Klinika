import { Bell, SidebarSimple, Star } from "@phosphor-icons/react";
import { zNavigation } from "../../navigation/__navigation";
import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";

type ButtonProps = {
  title: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
};

const Button = ({ title, onClick, children, className }: ButtonProps) => (
  <button title={title} type="button" onClick={onClick} className={className}>
    {children}
  </button>
);

export default function Header() {
  const {
    handleSidebar,
    handleNotification,
    handleFavorites,
    sidebar,
    notification,
    active_link,
    favorite_links,
  } = zNavigation();
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <div className="border-b-2 w-full px-4 py-6 flex items-center justify-between">
      <div className="flex flex-row gap-4">
        <Button
          title="Sidebar button"
          onClick={handleSidebar}
          className="text-black hover:text-black/50 transition-colors"
        >
          <SidebarSimple size={28} weight={sidebar ? "fill" : "duotone"} />
        </Button>
        <Button
          title="Favorite button"
          onClick={() => handleFavorites(active_link)}
          className="text-black hover:text-black/50 transition-colors"
        >
          {favorite_links.some(
            (link) =>
              link.to === active_link.to && link.text === active_link.text
          ) ? (
            <Star size={28} weight="fill" />
          ) : (
            <Star size={28} weight="duotone" />
          )}
        </Button>

        <div className="flex flex-row text-sm items-center gap-2">
          {pathnames[1] !== "dashboard" ? (
            <Link
              to={`/${pathnames[0]}`}
              className="capitalize text-black/40 hover:text-black/50"
            >
              {pathnames[0]}
            </Link>
          ) : (
            <span className="capitalize text-black/40 hover:text-black/50">
              {pathnames[0]}
            </span>
          )}
          <span className="text-black/40">/</span>
          <p className="capitalize">{active_link.text}</p>
        </div>
      </div>
      <Button
        title="Notification button"
        onClick={handleNotification}
        className="text-black hover:text-black/50 transition-colors"
      >
        <Bell size={28} weight={notification ? "fill" : "duotone"} />
      </Button>
    </div>
  );
}
