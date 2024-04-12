import { forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type SelectProps = {
  htmlFor: string;
  labelName: string;
  options: Array<string>;
  error: string | undefined;
} & UseFormRegisterReturn;

const Select = forwardRef<HTMLInputElement, SelectProps>(function Input(
  { htmlFor, labelName, options, error, ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1 relative">
      <label
        htmlFor={htmlFor}
        className="font-medium sm:text-base text-sm text-compact"
      >
        {labelName}*
      </label>
      <select
        title="Select a gender"
        {...props}
        ref={ref}
        className={`border-2 rounded-md sm:text-base text-sm w-full py-2 px-2 font-light placeholder-zinc-500 focus:outline-primary`}
      >
        {options.map((data: string) => (
          <option value={data} className="capitalize">
            {data}
          </option>
        ))}
      </select>
      <span className="absolute sm:-bottom-5 truncate -bottom-4 px-2 sm:text-sm text-xs text-red-600">
        {error}
      </span>
    </div>
  );
});

export default Select;
