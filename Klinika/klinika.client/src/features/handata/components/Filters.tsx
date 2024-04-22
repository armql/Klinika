import {
  ArrowsDownUp,
  FunnelSimple,
  MagnifyingGlass,
  Plus,
} from "@phosphor-icons/react";
import { useFormStore, useHandler } from "../__handata";

type FiltersProps = {
  name: string;
};

export default function Filters({ name }: FiltersProps) {
  const { handleCreatedBy, handleSearch, handleSortOrder, sortOrder } =
    useFormStore();

  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch(e.target.search.value);
  };

  const { openCreate: create } = useHandler();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-medium text-xl text-compact">{name}</h1>
      <div className="w-full flex justify-between items-center rounded-lg bg-zinc-100 p-3">
        <div className="flex gap-2 items-center justify-center">
          <button
            title="Add item"
            onClick={create}
            type="button"
            className="hover:opacity-60"
          >
            <Plus size={22} />
          </button>
          <button
            title="Funnel item"
            type="button"
            onClick={() => handleCreatedBy("admin")}
            className="hover:opacity-60"
          >
            <FunnelSimple size={22} />
          </button>
          <button
            title="Re-order item"
            type="button"
            onClick={() => handleSortOrder(sortOrder ? "desc" : "asc")}
            className="hover:opacity-60"
          >
            <ArrowsDownUp size={22} />
          </button>
        </div>
        <div className="flex gap-1 items-center py-1.5 px-1 rounded-lg bg-white border-2">
          <form
            onSubmit={onSubmit}
            className="flex justify-center items-center gap-0.5"
          >
            <button title="search" type="submit">
              <MagnifyingGlass size={22} className="text-zinc-300" />
            </button>
            <input
              type="search"
              placeholder="Search"
              id="search"
              name="search"
              autoComplete="off"
              className="bg-transparent outline-none"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
