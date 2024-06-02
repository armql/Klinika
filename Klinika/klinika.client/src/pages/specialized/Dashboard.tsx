import {Notebook, TrendUp, UserPlus} from "@phosphor-icons/react";

export default function Dashboard() {
    return (
        <section className="xl:p-12 lg:p-8 md:p-6 p-4 bg-zinc-100 w-full h-full">
            <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4">
                        <div
                            className="flex flex-row gap-8 bg-white w-96 rounded-xl h-24 p-4 justify-start items-center  border-2">
                            <Notebook size={48} weight="duotone" className="bg-zinc-100 rounded-xl p-2"/>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-zinc-500 text-sm font-medium">
                                    Total Appointments
                                </h3>
                                <div className="flex flex-row gap-4 items-center">
                                    <p className="font-semibold text-xl">99999</p>
                                    <div className="flex flex-row gap-1 text-green-800 text-xs items-end">
                                        +8.9% <TrendUp size={18}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex flex-row gap-8 bg-white w-96 rounded-xl h-24 p-4 justify-start items-center  border-2">
                            <UserPlus size={48} weight="duotone" className="bg-zinc-100 rounded-xl p-2"/>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-zinc-500 text-sm font-medium">
                                    New Patients
                                </h3>
                                <div className="flex flex-row gap-4 items-center">
                                    <p className="font-semibold text-xl">99999</p>
                                    <div className="flex flex-row gap-1 text-green-800 text-xs items-end">
                                        +3.9% <TrendUp size={18}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-full border-2 h-80 bg-white rounded-xl flex justify-center items-center text-2xl">
                        CHART: Patient visits by gender
                    </div>
                    <div
                        className="w-full border-2 h-80 bg-white rounded-xl flex justify-center items-center text-2xl">
                        CHART: Patient visits by gender
                    </div>
                </div>
                <div className="w-full border-2 h-[769px] bg-white rounded-xl">
                    <h1 className="flex justify-center items-center w-full text-center h-full text-2xl"> Simple
                        Calendar, and any
                        announcements
                    </h1>
                </div>
            </div>
        </section>
    );
}