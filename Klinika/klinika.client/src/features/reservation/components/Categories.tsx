import {zReservation} from "../store/zReservation.ts";
import {specialization_data} from "../data/specialization_data.ts";
import {Tooltip} from "react-tooltip";
import {Fragment} from "react";

export default function Categories() {
    const {setSpecialization} = zReservation();
    return (
        <div
            className={`w-[800px] h-[800px] border-2 shadow-sm p-12 rounded-3xl flex flex-col gap-6`}>
            <h1 className={`text-3xl font-medium`}>Pick one of the specializations that you want to reserve
                on</h1>

            <div className={`flex flex-row overflow-y-auto py-4 px-2 flex-wrap items-center justify-between gap-6`}>
                {specialization_data.map((item) => (
                    <Fragment key={item.id}>
                        <button
                            type="button"
                            onClick={() => setSpecialization(item)}
                            className={`w-52 h-32 cursor-pointer rounded-md bg-zinc-200 overflow-hidden ring-2 ring-transparent hover:ring-zinc-500 border-zinc-100 flex justify-center items-center relative`}>
                            {item.image && <img src={item.image} alt="Specialization 1"
                                                className="w-full h-full object-contain absolute top-10"/>}
                            <div
                                className="absolute py-2 top-0 left-0 right-0 overflow-clip bottom-0 w-full h-full flex justify-center items-start">
                                <h1 className="text-center px-2 text-xl font-bold text-zinc-800">{item.title}</h1>

                            </div>
                            {item.isAvailable &&

                                <div
                                    data-tooltip-id="free-access-tooltip"
                                    className={`h-3 w-3 absolute top-2 right-2 rounded-full bg-emerald-400 animate-pulse`}/>
                            }
                        </button>
                        {item.isAvailable && <Tooltip
                            style={{
                                backgroundColor: '#f5f5f5',
                                padding: '0.6rem',
                                color: '#323232',
                                display: "flex",
                                flexDirection: "column",
                                gap: 4,
                                zIndex: 40,
                                width: "300px",
                                fillOpacity: 1,
                            }}
                            arrowColor="#323232"
                            id="free-access-tooltip"
                            className="z-40 text-xs">
                            <p>
                                You have access for free reservation to this specialization
                            </p>
                        </Tooltip>}
                    </Fragment>
                ))}
            </div>
        </div>
    );
}
