import {zProfiler} from "../__dashboard.ts";
import WalkthroughBlock from "./WalkthroughBlock.tsx";
import {useRef} from "react";

export default function Walkthrough() {
    const {steps, walkthrough, setWalkthrough} = zProfiler();
    const bottomRef = useRef(null);

    const scrollToBottom = () => {
        bottomRef.current && bottomRef.current.scrollIntoView({behavior: "smooth"});
    };

    const handleWalkthroughClick = () => {
        scrollToBottom();
        const timer = setTimeout(() => {
            setWalkthrough(true);
        }, 300);

        return () => clearTimeout(timer);
    };

    return (
        <div
            className="w-full h-full relative flex justify-center items-center flex-col bg-gradient-to-tl from-zinc-400 via-white to-zinc-300"
        >
            <section className="w-screen h-screen items-center justify-center flex">
                <div
                    className={`animate-lively shadow-md bg-gradient-to-r from-rose-500 via-amber-500 to-violet-500 rounded-3xl p-6 border-dashed border-green-950 w-[800px] min-w-[400px] overflow-hidden h-[500px] flex justify-center items-center ${
                        walkthrough === undefined ? "" : walkthrough ? "animate-pulse transition-all duration-700" : "animate-pulse hidden delay-1000 duration-1000"
                    }`}>
                    <div
                        className="flex flex-col gap-4 w-full h-full bg-opacity-80 backdrop-blur-sm bg-white items-center justify-center md:px-24 px-4 rounded-3xl">
                        <h1 className="md:text-8xl text-6xl text-center font-semibold text-zinc-800">Welcome to our
                            system!</h1>
                        <p className="text-center md:text-base text-sm md:px-12 px-2 text-zinc-800 tracking-wide font-medium">
                            You can choose to get a walkthrough on how the system works or you can go straight to the
                            dashboard and explore on
                            your
                            own?
                        </p>
                        <div className="flex flex-row gap-4 py-2">
                            <button
                                type="button"
                                onClick={handleWalkthroughClick}
                                className={`border-2 py-2 px-4 text-zinc-800 rounded-lg border-zinc-800 md:text-base text-sm shadow-2xl border-b-4 hover:bg-white font-medium ${walkthrough === undefined ? "" : walkthrough ? "bg-zinc-100" : ""}`}>
                                Get a walkthrough
                            </button>
                            <button
                                type="button"
                                onClick={() => setWalkthrough(false)}
                                className="py-2 md:text-base text-sm hover:opacity-80 px-4 text-zinc-800 rounded-lg font-medium"
                            >
                                Go to dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <div
                ref={bottomRef}
                className={`bg-gradient-to-r animate-lively rounded-t-[64px] ${walkthrough ? "-translate-y-1 h-full" : "h-0"} ease-in-out transition-all duration-1000 from-rose-500 via-amber-500 to-violet-500 `}>
                <WalkthroughBlock
                    id={steps[0]}
                    title="This is how you can navigate and move around the system, with many features, preferences"
                    label="Navigation"
                    image="https://www.screen.studio/videos/features/smooth-cursor-movement.mp4"/>
                <WalkthroughBlock
                    id={steps[1]}
                    title="This is your Dashboard page where you can view all your data and manage your account."
                    label="Dashboard" image="https://www.screen.studio/videos/features/smooth-cursor-movement.mp4"/>
                <WalkthroughBlock
                    id={steps[2]}
                    title="This is your Reservations page where you can view all your reservations and manage your bookings."
                    label="Reservations" image="https://www.screen.studio/videos/hero/hero-demo.mp4"/>
            </div>
            {/* walkthrough && -- deprecated intentionally
                <div className="fixed top-0 bottom-0 flex justify-center items-center right-0 p-4">
                    <div
                        className="bg-white overflow-hidden flex justify-center items-start w-[200px] bg-opacity-80 backdrop-blur-sm h-fit rounded-2xl">
                        <ul className="flex flex-col w-full p-1.5 gap-1.5 font-medium overflow-y-auto">
                            <li className="text-center tracking-wider text-zinc-800 bg-white px-8 py-2 rounded-xl">Navigation</li>
                            <li className="text-center tracking-wider text-zinc-800 bg-transparent px-8 py-2 rounded-xl">Dashboard</li>
                            <li className="text-center tracking-wider text-zinc-800 bg-transparent px-8 py-2 rounded-xl">Reservations
                            </li>
                            <li className="text-center tracking-wider text-zinc-800 bg-transparent px-8 py-2 rounded-xl">Data
                                Portals
                            </li>
                        </ul>
                    </div>
                </div> */}
        </div>
    );
}
