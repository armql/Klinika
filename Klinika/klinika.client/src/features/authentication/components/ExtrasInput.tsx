import { Eye, EyeClosed } from "@phosphor-icons/react";
import React, { Fragment } from "react";

type ExtrasProps = {
  type: string;
  effect: boolean;
  auto: () => void;
};

export default function ExtrasInput({ effect, auto, type }: ExtrasProps) {
  return (
    <Fragment>
      {type === "password" && (
        <Fragment>
          <span className="absolute group-focus:opacity-40 right-4 bottom-0 top-0 flex justify-center items-center z-20">
            <button
              type="button"
              onClick={auto}
              className="flex justify-center items-center outline-none"
            >
              {effect ? <Eye size={24} /> : <EyeClosed size={24} />}
            </button>
          </span>
          {/* <span className="text-sm text-red-400 underline absolute right-0 -top-7">
            Forgot Password
          </span> */}
        </Fragment>
      )}
    </Fragment>
  );
}
