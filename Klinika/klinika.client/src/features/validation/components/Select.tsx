import ReactSelect from "react-select";
import {Controller} from "react-hook-form";

type Options = {
    id: number | string;
    name: string;
};

type SelectProps = {
    control: any;
    name: string;
    labelName: string;
    options: Options[] | undefined;
    error: string | undefined;
    hidden?: boolean | undefined;
};

const Select = ({control, name, labelName, options, error, hidden}: SelectProps) => {
    return (
        <div className={`flex w-full flex-col gap-1 relative ${hidden && "hidden"}`}>
            <label htmlFor={name} className="font-medium sm:text-base text-sm text-compact">
                {labelName}*
            </label>
            <Controller
                name={name}
                control={control}
                render={({field}) => (
                    <ReactSelect
                        {...field}
                        options={options}
                        isClearable
                        isSearchable
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary25: 'neutral',
                                primary: 'black',
                            },
                        })}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                height: 45,
                                borderWidth: 2,
                                outlineColor: state.isFocused ?? "6EC841",
                                borderColor: state.isFocused ? '#6EC841' : '#E5E7EB',
                            }),
                        }}
                        onChange={option => field.onChange(option.value)}
                        onBlur={field.onBlur}
                        value={options?.find(option => option.value === field.value)}
                    />
                )}
            />
            <span className="absolute sm:-bottom-5 truncate -bottom-4 px-2 sm:text-sm text-xs text-red-600">
                {error && error}
            </span>
        </div>
    );
};

export default Select;