import { forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

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
  return (
    <div className="flex flex-col gap-2 relative">
      <label
        htmlFor={htmlFor}
        className="font-medium sm:text-base text-sm text-compact"
      >
        {labelName}*
      </label>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        ref={ref}
        className={`border-2 rounded-md sm:text-base text-sm w-full py-2 px-4 font-light placeholder-zinc-500 focus:outline-primary ${
          error && "border-red-200"
        }`}
        {...props}
      />
      <span className="absolute sm:-bottom-5 truncate -bottom-4 px-2 sm:text-sm text-xs text-red-600">
        {error}
      </span>
    </div>
  );
});

export default Input;
