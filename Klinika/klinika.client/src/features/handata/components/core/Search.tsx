import {MagnifyingGlass} from "@phosphor-icons/react";
import {FormEvent} from "react";
import {useConditionalEffect} from "../../hooks/useConditionalEffect.ts";
import {zForm} from "../../__handata.ts";

function Search() {
    const {handleSearch, search} = zForm();
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearch((e.target as HTMLFormElement).search.value);
    };

    useConditionalEffect(
        () => {
            return () => handleSearch("");
        },
        search.length > 0,
        []
    );

    return (
        <div className="flex gap-1 items-center py-1.5 px-1 rounded-lg bg-white border-2">
            <form
                onSubmit={onSubmit}
                className="flex justify-center items-center gap-0.5"
            >
                <button title="search" type="submit">
                    <MagnifyingGlass size={22} className="text-zinc-300"/>
                </button>
                <input
                    type="search"
                    placeholder="Search"
                    id="search"
                    name="search"
                    autoComplete="off"
                    className="bg-transparent outline-none"
                />
            </form>
        </div>
    );
}

export default Search;