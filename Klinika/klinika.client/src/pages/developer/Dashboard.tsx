import {useEffect, useState} from 'react';
import {Reorder} from "framer-motion";
import UsersTraffic from "../../features/dashboard/components/UsersTraffic.tsx";
import SimpleStats from "../../features/dashboard/components/SimpleStats.tsx";
import axios_instance from "../../api/axios.ts";
import {useQuery} from "react-query";
import Shortcuts from "../../features/dashboard/components/Shortcuts.tsx";
import ReservationsTraffic from "../../features/dashboard/components/ReservationsTraffic.tsx";

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

    const fetchUserCount = async (): Promise<StatsProps> => {
        const {data} = await axios_instance.get('Account/count');
        return data;
    };

    const {data: statsdata} = useQuery<StatsProps>('userCount', fetchUserCount);
    const [data, setData] = useState({
        users: statsdata?.usersCount || 0,
        specialized: statsdata?.specializedDoctorsCount || 0,
        reservations: statsdata?.reservationsCount || 0,
        patients: statsdata?.patientsCount || 0,
    });

    useEffect(() => {
        if (statsdata) {
            setData({
                users: statsdata.usersCount,
                specialized: statsdata.specializedDoctorsCount,
                reservations: statsdata.reservationsCount,
                patients: statsdata.patientsCount,
            });
        }
    }, [statsdata]);

    return (
        <section className="overflow-y-auto">
            <div className="flex flex-col gap-12 p-12 h-full min-w-[1400px]">
                {/* <TextStats /> */}
                <Reorder.Group axis="x" values={stats} onReorder={setStats}
                               className="flex flex-row gap-4 items-center justify-between w-full">
                    {stats.map((item) => (
                        <Reorder.Item key={item} value={item}
                                      className="w-[350px] rounded-md active:border-zinc-300 border-zinc-50 hover:border-zinc-100 active:cursor-grab h-[200px] border-2 border-dashed overflow-hidden">
                            <SimpleStats type="users" newValue={data.users}/>
                            <SimpleStats type="specialized" newValue={data.specialized}/>
                            <SimpleStats type="reservations" newValue={data.reservations}/>
                            <SimpleStats type="patients" newValue={data.patients}/>
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
                                    <ReservationsTraffic/>}
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