import { forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import useToggle from "../../../hooks/useToggle";
import ExtrasInput from "./ExtrasInput";

type InputProps = {
  htmlFor: string;
  labelName: string;
  placeholder: string | undefined;
  type: string;
  error: string | undefined;
  hidden: boolean | undefined;
} & UseFormRegisterReturn;

const Textarea = forwardRef<HTMLInputElement, InputProps>(function Textarea(
  { htmlFor, labelName, placeholder, type, error, hidden, ...rest },
  ref
) {
  const { auto, effect } = useToggle();
  return (
    <div className={`flex flex-col gap-1 relative ${hidden && "hidden"}`}>
      <label
        htmlFor={htmlFor}
        className="font-medium sm:text-base text-sm text-compact"
      >
        {labelName}*
      </label>
      <div className="relative">
        <textarea
          placeholder={placeholder}
          autoComplete="off"
          ref={ref}
          className={`border-2 rounded-md sm:text-base text-sm w-full py-2 px-4 font-light placeholder-zinc-500 focus:outline-primary  ${
            error && "border-red-200"
          }`}
          {...rest}
        />
        <ExtrasInput type={type} effect={effect} auto={auto} />
      </div>
      <span className="absolute sm:-bottom-5 truncate -bottom-4 px-2 sm:text-sm text-xs text-red-600">
        {error}
      </span>
    </div>
  );
});

export default Textarea;
