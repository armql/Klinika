import { Eye, EyeClosed } from "@phosphor-icons/react";
import { forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import useToggle from "../../../hooks/useToggle";

type InputProps = {
  htmlFor: string;
  labelName: string;
  placeholder: string | undefined;
  type: string;
  error: string | undefined;
} & UseFormRegisterReturn;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { htmlFor, labelName, placeholder, type, error, ...props },
  ref
) {
  const { auto, effect } = useToggle();
  return (
    <div className="flex flex-col gap-1 relative">
      <label
        htmlFor={htmlFor}
        className="font-medium sm:text-base text-sm text-compact"
      >
        {labelName}*
      </label>
      <div className="relative">
        <input
          type={type !== "password" ? type : effect ? "text" : type}
          placeholder={placeholder}
          autoComplete="off"
          ref={ref}
          className={`border-2 rounded-md sm:text-base text-sm w-full py-2 px-4 font-light placeholder-zinc-500 focus:outline-primary ${
            error && "border-red-200"
          }`}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={auto}
            className="absolute bottom-0 top-0 right-0 flex justify-center items-center px-2"
          >
            {effect ? <Eye size={24} /> : <EyeClosed size={24} />}
          </button>
        )}
      </div>
      <span className="absolute sm:-bottom-5 truncate -bottom-4 px-2 sm:text-sm text-xs text-red-600">
        {error}
      </span>
    </div>
  );
});

export default Input;
