import { forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  htmlFor: string;
  labelName: string;
  placeholder: string;
  type: string;
  error: string | undefined;
} & UseFormRegisterReturn;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { htmlFor, labelName, placeholder, type, error, ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-2 relative">
      <label htmlFor={htmlFor} className="font-medium">
        {labelName}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        ref={ref}
        className={`border-2 rounded-md w-full py-2 px-4 font-light placeholder-zinc-500 focus:outline-primary ${
          error && "border-red-200"
        }`}
        {...props}
      />
      <span className="absolute -bottom-5 px-2 text-sm text-red-600">
        {error}
      </span>
    </div>
  );
});

export default Input;
