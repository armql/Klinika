import Walkthrough from "../../features/dashboard/components/Walkthrough.tsx";
import {Fragment} from "react";
import {zProfiler} from "../../features/dashboard/__dashboard.ts";
import {HandWaving, PencilSimple} from "@phosphor-icons/react";

export default function Dashboard() {
    const {walkthrough} = zProfiler();
    return (
        <Fragment>
            {walkthrough === undefined ? <Walkthrough/> : walkthrough ? <Walkthrough/> : (
                <Fragment>
                    <section className="flex gap-8 flex-col justify-start items-start p-12">
                        <h1 className="text-5xl text-zinc-800 font-bold">Dashboard</h1>
                        <div
                            className="sm:w-[500px] w-fit h-fit flex justify-center items-start p-0.5 overflow-hidden bg-gradient-to-tr from-zinc-200 to-zinc-300 via-zinc-100 rounded-[26px] animate-lively">
                            <div className="w-full h-full bg-white rounded-3xl p-8 bg-opacity-80 backdrop-blur-lg">

                                <h1 className="font-medium text-lg flex gap-6 items-center"><HandWaving size={64}
                                                                                                        weight="duotone"/>Welcome
                                    [name]
                                    you have
                                    [notifications], and
                                    [reservations] at the moment.</h1>
                            </div>
                        </div>
                        <div
                            className="w-full h-[600px] bg-gradient-to-tr from-zinc-200 to-zinc-300 via-zinc-100 rounded-[26px] animate-lively relative overflow-hidden p-0.5">

                            <div
                                className="w-full flex justify-center items-center h-full bg-white rounded-3xl p-8 bg-opacity-60 backdrop-blur-sm md:flex-row flex-col gap-4">

                                <h1 className="text-2xl text-zinc-800 text-center font-bold">You haven't saved all of
                                    the
                                    information
                                    needed yet to get appointed.</h1>
                                <button
                                    className="border-2 border-b-4 px-4 py-2 rounded-lg flex gap-2 items-center border-zinc-800 hover:bg-white">
                                    Go to profile <PencilSimple size={20} weight="bold"/>
                                </button>
                            </div>
                        </div>
                    </section>
                </Fragment>
            )}
        </Fragment>
    );
}
