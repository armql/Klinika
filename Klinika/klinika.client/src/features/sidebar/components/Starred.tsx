import { Sparkle, X } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { zNavigation } from "../../navigation/__navigation";
import useToggle from "../../../hooks/useToggle";
type Link = {
  to: string;
  text: string;
};
export default function Starred() {
  const {
    isCollapsed,
    recent_links,
    favorite_links,
    collapse,
    handleActiveLink,
    handleFavorites,
    filterRecents,
  } = zNavigation();
  const { effect, close, open } = useToggle();
  const data = effect ? favorite_links : recent_links;

  function handler(item: Link) {
    if (effect) {
      handleFavorites(item);
    } else {
      filterRecents(item);
    }
  }
  return (
    <div className="flex flex-col px-2 py-1 w-full mt-4">
      <div className={`flex px-2 gap-1 items-center justify-start`}>
        {!isCollapsed ? (
          <div className="flex flex-row gap-12">
            <button
              type="button"
              onClick={close}
              className={`truncate ${
                effect ? "text-compact/60" : "text-compact/80"
              }`}
            >
              Recent
            </button>
            <button
              type="button"
              onClick={open}
              className={`truncate ${
                effect ? "text-compact/80" : "text-compact/60"
              }`}
            >
              Favorite
            </button>
          </div>
        ) : (
          <button
            title="Open starred"
            type="button"
            className="group"
            onClick={collapse}
          >
            <Sparkle
              size={28}
              weight="duotone"
              className="group-hover:opacity-80"
            />
          </button>
        )}
      </div>
      {!isCollapsed && (
        <div
          className={`transition-all duration-700 flex justify-start py-2 items-start flex-col overflow-y-auto max-h-[7rem] min-h-[7rem]`}
        >
          {data.length > 0 ? (
            data.map((item) => (
              <div
                key={item.to}
                className={`group w-full relative flex flex-row justify-between rounded-lg px-2 hover:text-zinc-900 `}
              >
                <div
                  className={`absolute bottom-0 left-3.5 top-0 flex items-center justify-center transition duration-300`}
                >
                  <div
                    className={`absolute h-1.5 w-1.5 animate-pulse rounded-full bg-gray-300 transition duration-300`}
                  />
                </div>
                <Link
                  to={item.to}
                  onClick={() => handleActiveLink(item)}
                  className={`text-black rounded-lg px-4 py-1.5 text-start text-sm`}
                >
                  {item.text}
                </Link>
                <button
                  title={`Close ${effect ? "favorite" : "recent"} link`}
                  type="button"
                  className={`flex cursor-pointer items-center justify-center text-gray-300 hover:text-red-200`}
                  onClick={() => handler(item)}
                >
                  <X
                    size={16}
                    weight="bold"
                    className="hidden group-hover:block group-hover:bg-black group-hover:text-white rounded-full p-0.5"
                  />
                </button>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-compact/60">
                No {effect ? "favorite" : "recent"} links.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
