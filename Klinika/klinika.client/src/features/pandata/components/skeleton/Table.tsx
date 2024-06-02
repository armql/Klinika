import {Check, CircleNotch} from "@phosphor-icons/react";
import {CSSProperties} from "react";

type FilterProps = {
    headers: Array<string>;
    style: CSSProperties | undefined;
};

export default function Table({headers, style}: FilterProps) {
    return (
        <div className="w-full h-[675px] mt-6 rounded-sm">
            <ul
                style={style}
                className={`truncate py-2 px-2 border-b-2 text-compact/40`}
            >
                <li>
                    <label
                        className={`flex truncate justify-center items-center border border-zinc-200 hover:border-zinc-300 overflow-hidden w-5 h-5 rounded-md relative cursor-pointer`}
                    >
                        <input
                            title="Select all items"
                            type="checkbox"
                            name="selectAll"
                            id="selectAll"
                            // checked={allItemsSelected}
                            className={`relative appearance-none bg-white w-full h-full checked:bg-black`}
                        />
                        <span className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  <Check size={14} weight="bold" className="text-white"/>
                </span>
                    </label></li>
                {headers.map((header) => (
                    <li className="truncate" key={header}>
                        {header}
                    </li>
                ))}
                <li className="truncate">Remove item</li>
            </ul>
            <ul
                className={`flex w-full h-full justify-center bg-zinc-50 animate-pulse transition-colors items-center px-2 border-b text-xs py-2.5`}
            >
                <CircleNotch size={64} className="animate-spin" weight="bold"/>
            </ul>
        </div>
    );
}
