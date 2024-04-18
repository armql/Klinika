import { forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  htmlFor: string;
  labelName: string;
  placeholder: string | undefined;
  type: string;
  error: string | undefined;
  hidden: boolean | undefined;
} & UseFormRegisterReturn;

const File = forwardRef<HTMLInputElement, InputProps>(function File(
  { htmlFor, labelName, placeholder, type, error, hidden, ...rest },
  ref
) {
  return (
    <div className={`flex flex-col gap-1 relative ${hidden && "hidden"}`}>
      <label
        htmlFor={htmlFor}
        className="font-medium sm:text-base text-sm text-compact"
      >
        {labelName}*
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          ref={ref}
          className={`rounded-md sm:text-base text-sm w-full py-2 font-light placeholder-zinc-500 focus:outline-primary  ${
            error && "border-red-200"
          }`}
          {...rest}
        />
      </div>
      <span className="absolute sm:-bottom-5 truncate -bottom-4 px-2 sm:text-sm text-xs text-red-600">
        {error}
      </span>
    </div>
  );
});

export default File;
