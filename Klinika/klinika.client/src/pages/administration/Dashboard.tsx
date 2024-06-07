import {useEffect, useState} from 'react';
import {Reorder} from "framer-motion";
import UsersTraffic from "../../features/dashboard/components/UsersTraffic.tsx";
import SimpleStats from "../../features/dashboard/components/SimpleStats.tsx";
import axios_instance from "../../services/axios.ts";
import Shortcuts from "../../features/dashboard/components/Shortcuts.tsx";

type StatsProps = {
    usersCount: number;
    specializedDoctorsCount: number;
    patientsCount: number;
    reservationsCount: number;
}

export default function Dashboard() {
    const [stats, setStats] = useState([1, 2, 3, 4]);
    const [metrics, setMetrics] = useState([1, 2]);
    const [shortcuts, setShortcuts] = useState([1, 2, 3])
    const [statsData, setStatsData] = useState({users: 0, specialized: 0, reservations: 0, patients: 0});
    const fetchUserCount = async (): Promise<StatsProps> => {
        const {data} = await axios_instance.get('Account/count');
        setStatsData(
            {
                users: data.usersCount,
                specialized: data.specializedDoctorsCount,
                reservations: data.reservationsCount,
                patients: data.patientsCount,
            }
        );
    };

    useEffect(() => {
        fetchUserCount();
    }, []);

    return (
        <section className="overflow-y-auto">
            <div className="flex flex-col gap-12 p-12 h-full min-w-[1400px]">
                {/* <TextStats /> */}
                <Reorder.Group axis="x" values={stats} onReorder={setStats}
                               className="flex flex-row gap-4 items-center justify-between w-full">
                    {stats.map((item) => (
                        <Reorder.Item key={item} value={item}
                                      className="w-[350px] rounded-md active:border-zinc-300 border-zinc-50 hover:border-zinc-100 active:cursor-grab h-[200px] border-2 border-dashed overflow-hidden">
                            {item === 1 && <SimpleStats type="users" newValue={statsData.users}/>}
                            {item === 2 && <SimpleStats type="specialized" newValue={statsData.specialized}/>}
                            {item === 3 && <SimpleStats type="reservations" newValue={statsData.reservations}/>}
                            {item === 4 && <SimpleStats type="patients" newValue={statsData.patients}/>}
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
                <Reorder.Group axis="x" values={metrics} onReorder={setMetrics}
                               className="grid grid-cols-2 gap-12 items-center justify-between">
                    {metrics.map((item) => (
                        <Reorder.Item key={item} value={item}
                                      className="w-full rounded-md active:border-zinc-300 border-zinc-50 hover:border-zinc-100 active:cursor-grab h-[350px] border-2 border-dashed overflow-hidden">
                            <div className="bg-zinc-50  w-full h-full flex items-center justify-center">
                                {item === 1 &&
                                    <UsersTraffic/>}
                                {item === 2 &&
                                    <div className="w-full h-full">
                                    </div>
                                }
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
                <Reorder.Group axis="x" values={shortcuts} onReorder={setShortcuts}
                               className="grid grid-cols-3 gap-12 items-center justify-between">
                    {shortcuts.map((item) => (
                        <Reorder.Item key={item} value={item}
                                      className="w-full rounded-md active:border-zinc-300 border-zinc-50 hover:border-zinc-100 active:cursor-grab h-[250px] border-2 border-dashed overflow-hidden">
                            {item === 1 &&
                                <Shortcuts label="Users List" description="Users that are registered in the system"
                                           path="../user-data"/>}
                            {item === 2 &&
                                <Shortcuts label="Blocks List"
                                           description="Blocks of specializations available in the system"
                                           path="../block-data"/>}
                            {item === 3 &&
                                <Shortcuts label="Specializations List"
                                           description="These are the specializations available in the system"
                                           path="../specialization-data"/>}
                        </Reorder.Item>))}
                </Reorder.Group>
            </div>
        </section>
    );
}