import {useState} from 'react';
import {Reorder} from "framer-motion";
import UsersTraffic from "../../features/dashboard/components/UsersTraffic.tsx";
import SimpleStats from "../../features/dashboard/components/SimpleStats.tsx";
import axios_instance from "../../api/axios.ts";
import {useQuery} from "react-query";
import Shortcuts from "../../features/dashboard/components/Shortcuts.tsx";
import VisitorsTraffic from "../../features/dashboard/components/VisitorsTraffic.tsx";

export default function Dashboard() {
    const [stats, setStats] = useState([1, 2, 3, 4]);
    const [metrics, setMetrics] = useState([1, 2]);
    const [shortcuts, setShortcuts] = useState([1, 2, 3])

    const fetchUserCount = async (): Promise<number> => {
        const {data} = await axios_instance.get('Account/count');
        return data;
    };

    const {data: usersCount} = useQuery('userCount', fetchUserCount);

    const data = {
        users: usersCount || 0,
        visits: 0,
        reservations: 0,
        newUsers: 0,
    };

    return (
        <section className="overflow-y-auto">
            <div className="flex flex-col gap-12 p-12 h-full min-w-[1400px]">
                {/* <TextStats /> */}
                <Reorder.Group axis="x" values={stats} onReorder={setStats}
                               className="flex flex-row gap-4 items-center justify-between w-full">
                    {stats.map((item) => (
                        <Reorder.Item key={item} value={item}
                                      className="w-[350px] rounded-md active:border-zinc-300 border-zinc-50 hover:border-zinc-100 active:cursor-grab h-[200px] border-2 border-dashed overflow-hidden">
                            {item === 1 &&
                                <SimpleStats type="users" newValue={data.users}/>}
                            {item === 2 &&
                                <SimpleStats type="visits" newValue={38}/>} {/* Static for now  */}
                            {item === 3 &&
                                <SimpleStats type="reservations" newValue={6}/>} {/* Static for now  */}
                            {item === 4 &&
                                <SimpleStats type="newUsers" newValue={3}/>} {/* Static for now  */}
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
                                    <VisitorsTraffic/>}
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