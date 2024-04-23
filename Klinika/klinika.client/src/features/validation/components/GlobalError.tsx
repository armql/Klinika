import { X } from "@phosphor-icons/react";
import { zHandler } from "../../handata/__handata";

export default function GlobalError() {
  const { global_error, setGlobalError } = zHandler();
  if (global_error) {
    return (
      <div className="absolute top-4 right-4 z-20 shadow-sm bg-red-50 sm:w-[400px] sm:h-[100px] rounded-md w-[340px] h-[120px]">
        <div className="flex flex-col p-4 items-start relative">
          <button
            type="button"
            title="Close error modal"
            onClick={() => setGlobalError("")}
            className="absolute right-0 top-0 p-2 hover:opacity-60"
          >
            <X size={20} className="rounded-full" />
          </button>
          <span className="font-medium text-red-900">Error</span>
          <span className="text-red-600 text-sm">{global_error}</span>
        </div>
      </div>
    );
  }
}
