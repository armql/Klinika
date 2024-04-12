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
          <button
            type="button"
            onClick={auto}
            className="absolute bottom-0 top-0 right-0 flex justify-center items-center px-2"
          >
            {effect ? <Eye size={24} /> : <EyeClosed size={24} />}
          </button>
          {/* <span className="text-sm text-red-400 underline absolute right-0 -top-7">
            Forgot Password
          </span> */}
        </Fragment>
      )}
    </Fragment>
  );
}
