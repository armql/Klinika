// import { TextStats } from "../../features/dashboard/__dashboard";
import {Reorder} from "framer-motion";
import {useState} from "react";

export default function Dashboard() {
    const [stats, setStats] = useState([1, 2, 3, 4]);
    const [metrics, setMetrics] = useState([1, 2]);
    const [shortcuts, setShortcuts] = useState([1, 2, 3])
    return (
        <section className="overflow-y-auto">
            <div className="flex flex-col gap-12 p-12 h-full min-w-[1400px]">
                {/* <TextStats /> */}
                <Reorder.Group axis="x" values={stats} onReorder={setStats}
                               className="flex flex-row gap-4 items-center justify-between w-full">
                    {stats.map((item) => (
                        <Reorder.Item key={item} value={item}
                                      className="w-[350px] rounded-md active:border-zinc-300 active:cursor-grab h-[200px] border-2 border-dashed overflow-hidden">
                            <div className="bg-zinc-50 w-full h-full"></div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
                <Reorder.Group axis="x" values={metrics} onReorder={setMetrics}
                               className="grid grid-cols-2 gap-12 items-center justify-between">
                    {metrics.map((item) => (
                        <Reorder.Item key={item} value={item}
                                      className="w-full rounded-md h-[350px] active:border-zinc-300 active:cursor-grab border-2 border-dashed overflow-hidden">
                            <div className="bg-zinc-50 w-full h-full"></div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
                <Reorder.Group axis="x" values={shortcuts} onReorder={setShortcuts}
                               className="grid grid-cols-3 gap-12 items-center justify-between">
                    {shortcuts.map((item) => (
                        <Reorder.Item key={item} value={item}
                                      className="w-full rounded-md h-[250px] active:border-zinc-300 active:cursor-grab border-2 border-dashed overflow-hidden">
                            <div className="bg-zinc-50 w-full h-full"></div>
                        </Reorder.Item>))}
                </Reorder.Group>
            </div>
        </section>
    );
}
