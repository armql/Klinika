import {zProfiler} from "../__dashboard.ts";

type WalkthroughBlockProps = {
    id: number;
    label: string;
    title: string;
    image: string;
}

function WalkthroughBlock({id, label, title, image}: WalkthroughBlockProps) {
    const {walkthrough} = zProfiler();
    return (
        <section
            className={`w-full items-center h-[80vh] px-48 my-32 flex justify-center ${walkthrough ? "" : "hidden"}`}>
            <div
                className="flex relative justify-center lg:h-[600px] h-fit lg:flex-row flex-col rounded-3xl overflow-hidden">
                <div className="bg-white p-12 w-[400px] sm:w-[600px] md:w-[800px] lg:w-[400px] xl:w-[600px]">
                <span className="uppercase tracking-wider font-bold text-zinc-800 text-sm">
                     {label}
                </span>
                    <h1 className="text-zinc-800 text-5xl font-bold">
                        {title}
                    </h1>
                </div>
                <div
                    className="w-[400px] sm:w-[600px] md:w-[800px] lg:w-[400px] xl:w-[600px] md:h-full h-[300px] bg-gradient-to-bl from-zinc-800 to-zinc-500 via-zinc-600 border-white">
                    <video src={image} className="object-cover w-full h-full brightness-90" loop autoPlay muted/>
                </div>
                <span
                    className="font-extrabold text-xl absolute top-0 right-0 px-6 py-4 bg-white rounded-bl-3xl">{id}</span>
            </div>

        </section>
    );
}

export default WalkthroughBlock;