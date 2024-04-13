import { NotePencil, X, CaretRight, CaretLeft } from "@phosphor-icons/react";
import Skeleton from "./skeleton/Table";
import { usePagination } from "../handata";
import { useEffect, useState } from "react";
import { Specialization } from "../../../pages/developer/SpecializationData";
import axios_instance from "../../../../api/axios";

type TableProps = {
  headers: Array<string>;
};

export default function Table({ headers }: TableProps) {
  const HEADER_COLUMN = headers.length + 3;
  const {
    currentPage,
    setCurrentPage,
    loading,
    totalPages,
    startIndex,
    endIndex,
    max,
    min,
    setDataLength,
    setLoading,
  } = usePagination();
  const [data, setData] = useState<Specialization[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios_instance.get("/data");
        setData(result.data.specializations);
        setDataLength(result.data.specializations.length);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const refined_data = data.slice(startIndex, endIndex);

  if (loading) {
    return <Skeleton column={HEADER_COLUMN} headers={headers} />;
  }

  return (
    <div className="w-full h-[675px] mt-6 rounded-sm">
      <ul
        className={`grid grid-cols-${HEADER_COLUMN} py-2 px-2 border-b-2 text-compact/40`}
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
      <div className="h-full overflow-x-auto bg-zinc-50">
        {refined_data.map((item) => (
          <ul
            key={item.specialization_id}
            className={`grid bg-white grid-cols-${HEADER_COLUMN} hover:bg-zinc-50 transition-colors items-center px-2 border-b text-xs py-2.5`}
          >
            <li>
              <input title="Select item" type="checkbox" />
            </li>
            {Object.keys(item).map((key) => (
              <li key={key}>{item[key]}</li>
            ))}
            <li>
              <button
                title="Edit item"
                type="button"
                className="flex items-center gap-1 px-4 py-1 rounded-lg bg-blue-200 text-blue-950 hover:bg-blue-300"
              >
                <NotePencil size={14} />
                Edit
              </button>
            </li>
            <li>
              <button
                title="Remove item"
                type="button"
                className="flex items-center gap-1 px-4 py-1 rounded-lg bg-red-200 text-red-950 hover:bg-red-300"
              >
                <X size={14} />
                Remove
              </button>
            </li>
          </ul>
        ))}
      </div>
      <div className="flex gap-2 items-center justify-end py-2">
        <button
          title="Previous item page"
          type="button"
          disabled={min}
          className={`hover:bg-zinc-50 px-2 py-2 rounded-md ${
            min ? "cursor-not-allowed opacity-40" : "cursor-pointer"
          }`}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <CaretLeft size={16} weight="bold" />
        </button>
        <ul className="flex gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <li
              key={i}
              className={`px-3 py-1 rounded-md cursor-pointer ${
                i + 1 === currentPage ? "bg-zinc-100" : "hover:bg-zinc-50"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </li>
          ))}
        </ul>
        <button
          title="Next item page"
          type="button"
          disabled={max}
          className={`hover:bg-zinc-50 px-2 py-2 rounded-md ${
            max ? "cursor-not-allowed opacity-40" : "cursor-pointer"
          }`}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <CaretRight size={16} weight="bold" />
        </button>
      </div>
    </div>
  );
}
