import { X } from "@phosphor-icons/react";

type Props = {
  close: () => void;
  error: string;
};

export default function GlobalError({ close, error }: Props) {
  if (error) {
    return (
      <div className="absolute top-4 right-4 z-20 shadow-sm bg-red-50 sm:w-[400px] sm:h-[100px] rounded-md w-[340px] h-[120px]">
        <div className="flex flex-col p-4 items-start relative">
          <button
            type="button"
            title="Close error modal"
            onClick={close}
            className="absolute right-0 top-0 p-2 hover:opacity-60"
          >
            <X size={20} className="rounded-full" />
          </button>
          <span className="font-medium text-red-900">Error</span>
          <span className="text-red-600 text-sm">{error}</span>
        </div>
      </div>
    );
  }
}
