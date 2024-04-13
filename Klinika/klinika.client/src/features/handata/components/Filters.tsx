import {
  ArrowsDownUp,
  FunnelSimple,
  MagnifyingGlass,
  Plus,
} from "@phosphor-icons/react";

type FiltersProps = {
  name: string;
};

export default function Filters({ name }: FiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-medium text-xl text-compact">{name}</h1>
      <div className="w-full flex justify-between items-center rounded-lg bg-zinc-100 p-3">
        <div className="flex gap-2 items-center justify-center">
          <button title="Add item" type="button" className="hover:opacity-60">
            <Plus size={22} />
          </button>
          <button
            title="Funnel item"
            type="button"
            className="hover:opacity-60"
          >
            <FunnelSimple size={22} />
          </button>
          <button
            title="Re-order item"
            type="button"
            className="hover:opacity-60"
          >
            <ArrowsDownUp size={22} />
          </button>
        </div>
        <div className="flex gap-1 py-1.5 px-1 rounded-lg bg-white border-2">
          <MagnifyingGlass size={22} className="text-zinc-300" />
          <input
            type="search"
            placeholder="Search"
            className="bg-transparent outline-none"
          />
        </div>
      </div>
    </div>
  );
}
