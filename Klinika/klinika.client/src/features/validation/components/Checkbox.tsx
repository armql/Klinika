import { forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  htmlFor: string;
  labelName: string;
  error: string | undefined;
} & UseFormRegisterReturn;

const Checkbox = forwardRef<HTMLInputElement, InputProps>(function Checkbox(
  { htmlFor, labelName, error, ...rest },
  ref
) {
  return (
    <div className="flex flex-row px-1 gap-2 items-center">
      <input
        type="checkbox"
        ref={ref}
        className={`border-2 rounded-sm sm:text-base text-sm font-lights`}
        {...rest}
      />
      <label
        htmlFor={htmlFor}
        className="font-medium sm:text-base text-sm text-compact/70"
      >
        {labelName}
      </label>
      <span>{error}</span>
    </div>
  );
});

export default Checkbox;
