import {
  NotePencil,
  X,
  CaretRight,
  CaretLeft,
  Check,
} from "@phosphor-icons/react";
import Skeleton from "./skeleton/Table";
import { usePagination } from "../handata";
import { useFormStore } from "../store/FormStore";
import { useEffect } from "react";
import Swal from "sweetalert2";

type TableProps<T> = {
  headers: Array<string>;
  all: () => Promise<T>;
  delete: (id: string) => Promise<number>;
  dataKey: string;
  handler: boolean;
};

export default function Table<T>({
  headers,
  all,
  dataKey,
  delete: getDeleted,
  handler,
}: TableProps<T>) {
  const additionalColumns = 3;
  const HEADER_COLUMN = headers.length + additionalColumns;
  const {
    currentPage,
    setCurrentPage,
    loading,
    totalPages,
    max,
    min,
    startIndex,
    endIndex,
    setDataLength,
    setLoading,
  } = usePagination();
  const {
    data,
    selectedItems,
    selectItem,
    deselectItem,
    selectAll,
    deselectAll,
  } = useFormStore();
  const fetchData = async () => {
    try {
      const response = await all();
      useFormStore.setState({ data: response[dataKey] });

      setDataLength(response[dataKey].length);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [handler]);

  const deleteItem = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          getDeleted(id).then(() => {
            Swal.fire({
              icon: "success",
              title: "Deleted",
              text: "Succesfuly deleted",
            }).then(() => {
              fetchData();
            });
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const refined_data = data ? data.slice(startIndex, endIndex) : [];

  if (loading) {
    return <Skeleton column={HEADER_COLUMN} headers={headers} />;
  }

  return (
    <div className="w-full h-[675px] mt-6 rounded-sm">
      <ul
        className={`grid grid-cols-${HEADER_COLUMN} py-2 px-2 border-b-2 text-compact/40`}
      >
        <li>
          <label
            className={`flex justify-center items-center border border-zinc-200 hover:border-zinc-300 overflow-hidden w-5 h-5 rounded-md relative cursor-pointer`}
          >
            <input
              title="Select all items"
              type="checkbox"
              checked={selectedItems.length === data.length}
              onChange={(e) => (e.target.checked ? selectAll() : deselectAll())}
              className={`relative appearance-none bg-white w-full h-full checked:bg-black`}
            />
            <span className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
              <Check size={14} weight="bold" className="text-white" />
            </span>
          </label>
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
            className={`grid group bg-white grid-cols-${HEADER_COLUMN} hover:bg-zinc-50 transition-colors items-center px-2 border-b text-xs py-2.5`}
          >
            <li>
              <label
                className={`flex justify-center items-center border border-transparent group-hover:border-zinc-100 overflow-hidden w-5 h-5 rounded-md relative cursor-pointer`}
              >
                <input
                  title="Select item"
                  type="checkbox"
                  checked={selectedItems.includes(item.specialization_id)}
                  onChange={(e) =>
                    e.target.checked
                      ? selectItem(item.specialization_id)
                      : deselectItem(item.specialization_id)
                  }
                  className={`relative appearance-none bg-white w-full h-full checked:bg-black`}
                />
                <span className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  <Check size={14} weight="bold" className=" text-white" />
                </span>
              </label>
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
                onClick={() => deleteItem(item.specialization_id)}
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
