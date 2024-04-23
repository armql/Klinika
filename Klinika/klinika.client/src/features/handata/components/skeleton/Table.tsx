import { CircleNotch } from "@phosphor-icons/react";
import { CSSProperties } from "react";

type FilterProps = {
  headers: Array<string>;
  style: CSSProperties | undefined;
};

export default function Table({ headers, style }: FilterProps) {
  return (
    <div className="w-full h-[675px] mt-6 rounded-sm">
      <ul
        style={style}
        className={`truncate py-2 px-2 border-b-2 text-compact/40`}
      >
        <li>
          <input title="Select all" type="checkbox" />
        </li>
        {headers.map((header) => (
          <li className="truncate" key={header}>
            {header}
          </li>
        ))}
        <li className="truncate">Edit item</li>
        <li className="truncate">Remove item</li>
      </ul>
      <ul
        className={`flex w-full h-full justify-center bg-zinc-50 animate-pulse transition-colors items-center px-2 border-b text-xs py-2.5`}
      >
        <CircleNotch size={64} className="animate-spin" weight="bold" />
      </ul>
    </div>
  );
}
