import { ReactNode, Fragment, useState } from "react";
import useToggle from "../hooks/useToggle";
import {
  patient_sidebar_data as dev,
  developer_sidebar_data as patient,
} from "../features/sidebar/data/sidebar_data";
import { CaretDown } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import { categoryRender } from "../util/category-render";
import { Header, Profile, Resizer } from "../features/sidebar/__sidebar";

interface InnerProp {
  user: string;
  children: ReactNode;
}

type Link = {
  to: string;
  text: string;
};

type LinkProp = {
  active_link: string;
  recent: Link[];
  isRecent: boolean;
  active_category: number[];
  recent_links: string[];
};

export default function Sidebar({ user, children }: InnerProp) {
  const { auto, effect } = useToggle();
  const [links, setLinks] = useState<LinkProp>({
    active_link: "dashboard",
    recent: [{ to: "dashboard", text: "Dashboard" }],
    isRecent: true,
    active_category: [1],
    recent_links: ["dashboard"],
  });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const filtered = user !== "dev" ? dev : patient;

  function handleCategory(id: number) {
    if (isCollapsed) {
      setIsCollapsed(false);
    }
    setLinks((prev) => {
      const isActive = prev.active_category.includes(id);
      if (isActive) {
        return {
          ...prev,
          active_category: prev.active_category.filter(
            (cat_id) => cat_id !== id
          ),
        };
      } else {
        return {
          ...prev,
          active_category: [...prev.active_category, id],
        };
      }
    });
  }

  function handleRecent(recent: string) {
    if (links.recent_links.length <= 3) {
      setLinks((prev) => {
        const isActive = prev.recent_links.includes(recent);
        if (isActive) {
          return {
            ...prev,
            recent_links: prev.recent_links.filter(
              (recents) => recents !== recent
            ),
          };
        } else {
          return {
            ...prev,
            recent_links: [...prev.recent_links, recent],
            active_link: recent,
          };
        }
      });
    } else {
      console.log("filled stack");
    }
  }

  return (
    <div className="z-10 flex flex-row bg-white">
      <div
        className={`z-40 relative border-r-2 transition-all duration-300 overflow-hidden ${
          effect ? `${isCollapsed ? "w-20" : "w-72"} max-h-fit` : "h-0 w-0"
        }`}
      >
        <div className="flex items-center justify-center">
          {effect && (
            <div className="flex flex-col items-center justify-between w-full px-2 py-1.5">
              <Profile effect={isCollapsed} />
              {/* <Recent
                handler={() => handleRecent(item.to)}
                effect={isCollapsed}
                links={links}
              /> */}
              <div className="flex flex-col justify-between w-full mt-4">
                {filtered.map((link) => (
                  <Fragment key={link.id}>
                    <button
                      type="button"
                      onClick={() => handleCategory(link.id)}
                      className={`flex w-full select-none items-center justify-around px-2 py-2 text-sm text-black active:bg-gray-50 `}
                    >
                      <div
                        className={`flex items-center ${
                          isCollapsed
                            ? "w-full justify-center hover:opacity-70"
                            : "w-40 justify-start"
                        } gap-1 transition duration-300 ${
                          links.active_category.includes(link.id)
                            ? "text-black"
                            : "text-neutral-600"
                        }`}
                      >
                        {categoryRender(link.category)}
                        {!isCollapsed && <span>{link.category}</span>}
                      </div>
                      {!isCollapsed && (
                        <span
                          className={`transition duration-500 ${
                            links.active_category.includes(link.id)
                              ? "rotate-180 text-black"
                              : "text-gray-400"
                          }`}
                        >
                          <CaretDown size={14} weight="bold" />
                        </span>
                      )}
                    </button>
                    {!isCollapsed &&
                      links.active_category.includes(link.id) &&
                      link.links.map((links) => (
                        <div className="flex flex-col gap-2 py-1">
                          <div className="relative flex flex-col hover:text-sky-900">
                            <NavLink
                              key={links.to}
                              to={links.to}
                              className={({ isActive }) =>
                                `text-black ${
                                  isActive
                                    ? "translate-x-1 border-l-2 border-gray-400 bg-gray-100 text-gray-900"
                                    : "-translate-x-3 text-gray-600 hover:text-gray-800"
                                } rounded-sm px-4 py-2 text-start text-[13px] font-normal transition duration-300`
                              }
                            >
                              {!isCollapsed && links.text}
                            </NavLink>
                          </div>
                        </div>
                      ))}
                  </Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full relative">
        {effect && (
          <Resizer
            effect={isCollapsed}
            auto={() => setIsCollapsed(!isCollapsed)}
          />
        )}

        <Header auto={auto} effect={effect} />
        {children}
      </div>
    </div>
  );
}
