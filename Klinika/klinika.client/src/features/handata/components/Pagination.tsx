import {CaretLeft, CaretRight} from "@phosphor-icons/react";
import {zPagination} from "../__handata";

export default function Pagination() {
    const {currentPage, setCurrentPage, totalPages, max, min} = zPagination();
    return (
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
                <CaretLeft size={16} weight="bold"/>
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
                <CaretRight size={16} weight="bold"/>
            </button>
        </div>
    );
}
