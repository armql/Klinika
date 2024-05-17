import {Link} from "react-router-dom";

type ShortProps = {
    label: string;
    description: string;
    path: string;
};

function Shortcuts({label, description, path}: ShortProps) {
    return (
        <div className="p-6 relative flex flex-col gap-4 bg-zinc-100 h-full">
            <div
                className="absolute bottom-0 left-0 right-0 text-xs justify-center items-center font-medium flex flex-row flex-wrap py-4 gap-1">
                <p className="bg-zinc-200 px-4 py-0.5 text-zinc-500 rounded-sm text-center tracking-wider w-[80px]">Create</p>
                <p className="bg-zinc-200 px-4 py-0.5 text-zinc-500 rounded-sm text-center tracking-wider w-[80px]">Read</p>
                <p className="bg-zinc-200 px-4 py-0.5 text-zinc-500 rounded-sm text-center tracking-wider w-[80px]">Update</p>
                <p className="bg-zinc-200 px-4 py-0.5 text-zinc-500 rounded-sm text-center tracking-wider w-[80px]">Delete</p>
                <p className="bg-zinc-200 px-4 py-0.5 text-zinc-500 rounded-sm text-center tracking-wider w-[80px]">Bulk</p>
                <p className="bg-zinc-200 px-4 py-0.5 text-zinc-500 rounded-sm text-center tracking-wider w-[80px]">Search</p>
                <p className="bg-zinc-200 px-4 py-0.5 text-zinc-500 rounded-sm text-center tracking-wider w-[80px]">Filter</p>
            </div>
            <h1 className="text-4xl font-medium">{label}</h1>
            <p className="text-gray-500">{description}</p>
            <div className="mt-2">
                <Link to={path}
                      className="p-2 rounded-xl border border-b-4 bg-white active:border-b-2 hover:border-zinc-300 transition-all duration-300">
                    Navigate
                </Link>
            </div>
        </div>
    );
}

export default Shortcuts;