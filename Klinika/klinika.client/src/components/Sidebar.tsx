import { ReactNode, Fragment, useEffect } from "react";
import {
  patient_sidebar_data as patient,
  developer_sidebar_data as dev,
} from "../features/sidebar/data/sidebar_data";
import { CaretDown } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import { categoryRender } from "../util/category-render";
import { Header, Profile, Resizer } from "../features/sidebar/__sidebar";
import { useNavigation } from "../features/navigation/__navigation";

interface InnerProp {
  user: string;
  children: ReactNode;
}

export default function Sidebar({ user, children }: InnerProp) {
  const {
    sidebar,
    notification,
    isCollapsed,
    handleCategory,
    active_category,
    setData,
    data,
    type,
    setType,
    collapse,
    handleActiveLink,
  } = useNavigation();

  useEffect(() => {
    setType(user);
  }, [user]);

  const filteredData = () => {
    switch (type) {
      case "dev":
        setData(dev);
        break;
      case "patient":
        setData(patient);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    filteredData();
  }, [type]);

  return (
    <div className="z-10 flex flex-row bg-white">
      <div
        className={`z-40 relative border-r-2 transition-all duration-300 overflow-hidden ${
          sidebar ? `${isCollapsed ? "w-20" : "w-80"} max-h-fit` : "h-0 w-0"
        }`}
      >
        <div className="flex items-center justify-center">
          {sidebar && (
            <div className="flex flex-col items-center justify-between w-full px-2 py-1.5">
              <Profile effect={isCollapsed} />
              {/* <Recent
                handler={() => handleRecent(item.to)}
                effect={isCollapsed}
                links={links}
              /> */}
              <div className="flex flex-col justify-between w-full mt-4">
                {data.map((link) => (
                  <Fragment key={link.id}>
                    <button
                      type="button"
                      onClick={() => {
                        handleCategory(link.id);
                        {
                          isCollapsed && collapse();
                        }
                      }}
                      className={`flex w-full select-none items-center justify-around px-2 py-2 text-sm text-black active:bg-gray-50 `}
                    >
                      <div
                        className={`flex items-center ${
                          isCollapsed
                            ? "w-full justify-center hover:opacity-70"
                            : "w-40 justify-start"
                        } gap-1 transition duration-300 ${
                          active_category.includes(link.id)
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
                            active_category.includes(link.id)
                              ? "rotate-180 text-black"
                              : "text-gray-400"
                          }`}
                        >
                          <CaretDown size={14} weight="bold" />
                        </span>
                      )}
                    </button>
                    {!isCollapsed &&
                      active_category.includes(link.id) &&
                      link.links.map((links) => (
                        <div
                          key={links.text}
                          className="flex flex-col gap-2 py-1"
                        >
                          <div className="relative flex flex-col hover:text-sky-900">
                            <NavLink
                              key={links.to}
                              to={links.to}
                              onClick={() => handleActiveLink(links.text)}
                              className={({ isActive }) =>
                                `text-black ${
                                  isActive
                                    ? "translate-x-2 border-l-2 border-gray-400 bg-gray-100 text-gray-900"
                                    : " text-gray-600 hover:text-gray-800"
                                } rounded-sm pl-6 py-2 text-start text-[13px] font-normal transition duration-300`
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
        {sidebar && <Resizer />}

        <Header />
        {children}
      </div>
      <div
        className={`z-40 relative border-l-2 transition-all duration-300 overflow-hidden ${
          notification ? "w-80 max-h-fit" : "h-0 w-0"
        }`}
      ></div>
    </div>
  );
}

// function handleRecent(recent: string) {
//   if (links.recent_links.length <= 3) {
//     setLinks((prev) => {
//       const isActive = prev.recent_links.includes(recent);
//       if (isActive) {
//         return {
//           ...prev,
//           recent_links: prev.recent_links.filter(
//             (recents) => recents !== recent
//           ),
//         };
//       } else {
//         return {
//           ...prev,
//           recent_links: [...prev.recent_links, recent],
//           active_link: recent,
//         };
//       }
//     });
//   } else {
//     console.log("filled stack");
//   }
// }
