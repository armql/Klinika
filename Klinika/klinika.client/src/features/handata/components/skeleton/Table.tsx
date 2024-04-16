import { CircleNotch } from "@phosphor-icons/react";

type FilterProps = {
  headers: Array<string>;
  column: number;
};

export default function Table({ headers, column }: FilterProps) {
  return (
    <div className="w-full h-[675px] mt-6 rounded-sm">
      <ul
        className={`grid grid-cols-${column} py-2 px-2 border-b-2 text-compact/40`}
      >
        <li>
          <input title="Select all" type="checkbox" />
        </li>
        {headers.map((header) => (
          <li key={header}>{header}</li>
        ))}
        <li>Edit item</li>
        <li>Remove item</li>
      </ul>
      <ul
        className={`flex w-full h-full justify-center bg-zinc-50 animate-pulse transition-colors items-center px-2 border-b text-xs py-2.5`}
      >
        <CircleNotch size={64} className="animate-spin" weight="bold" />
      </ul>
    </div>
  );
}
