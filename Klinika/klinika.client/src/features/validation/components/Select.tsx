import { CaretUpDown } from "@phosphor-icons/react";
import { forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Options = {
  id: number;
  name: string;
};
type SelectProps = {
  htmlFor: string;
  labelName: string;
  options: Options[] | undefined;
  error: string | undefined;
  hidden: boolean | undefined;
} & UseFormRegisterReturn;

const Select = forwardRef<HTMLInputElement, SelectProps>(function Input(
  { htmlFor, labelName, options, error, hidden, ...rest },
  ref
) {
  return (
    <div className={`flex flex-col gap-1 relative${hidden && "hidden"}`}>
      <label
        htmlFor={htmlFor}
        className="font-medium sm:text-base text-sm text-compact"
      >
        {labelName}*
      </label>
      <div className="relative group">
        <select
          title="Select a gender"
          ref={ref}
          {...rest}
          className={`border-2 appearance-none rounded-md sm:text-base text-sm w-full py-2 px-4 font-light placeholder-zinc-500 focus:outline-primary`}
          defaultValue="select"
        >
          <option value="select" disabled>
            Select an option
          </option>
          {options ? (
            options.map((data: Options) => (
              <option key={data.id} value={data.id} className="capitalize">
                {data.name}
              </option>
            ))
          ) : (
            <option>No options received.</option>
          )}
        </select>
        <span className="absolute group-focus:opacity-40 right-4 bottom-0 top-0 flex justify-center items-center">
          <CaretUpDown size={24} />
        </span>
      </div>
      <span className="absolute sm:-bottom-5 truncate -bottom-4 px-2 sm:text-sm text-xs text-red-600">
        {error}
      </span>
    </div>
  );
});

export default Select;
