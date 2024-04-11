import { Timer, X } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

type Props = {
  links: object;
  effect: boolean;
  handler: () => void;
};

export default function Recent({ links, effect, handler }: Props) {
  return (
    <div className="flex flex-col px-2.5 py-1 w-full mt-4">
      <div
        className={`flex px-2 gap-1 items-center ${
          effect ? "justify-center" : "justify-start"
        }`}
      >
        <Timer size={24} weight="duotone" />
        {!effect && <span className="text-sm truncate">Recent Links</span>}
      </div>
      {!effect &&
        links.recent.map((item) => (
          <div
            key={item.to}
            className={`group relative flex flex-row justify-between rounded-lg px-2 hover:text-sky-900`}
          >
            <div
              className={`absolute bottom-0 left-1.5 top-0 flex items-center justify-center transition duration-300`}
            >
              <div
                className={`absolute h-1.5 w-1.5 animate-pulse rounded-full bg-gray-300 transition duration-300`}
              />
            </div>
            <Link
              to={item.to}
              className={`text-black ${
                links.active_link === item.to
                  ? " text-gray-900"
                  : " text-gray-500 group-hover:text-gray-800"
              } rounded-lg px-4 py-2 text-start text-sm font-normal transition duration-300 `}
            >
              {item.text}
            </Link>
            <button
              title="Close recent link"
              type="button"
              className={`flex cursor-pointer items-center justify-center text-gray-300 hover:text-red-200 ${
                links.active_link === item.to
                  ? "text-gray-900"
                  : "text-transparent "
              }`}
              onClick={handler}
            >
              <X
                size={20}
                weight="bold"
                className="hidden group-hover:block group-hover:bg-black group-hover:text-white rounded-full p-0.5"
              />
            </button>
          </div>
        ))}
    </div>
  );
}
