import {useEffect} from 'react';
import {zMetrics} from '../store/zMetrics';

type StatsProps = {
    type: string;
    newValue: number;
}

type Stat = {
    label: string;
    value: number;
    boostPercentage: number;
    // icon: JSX.Element;
}

type Stats = {
    [key: string]: Stat;
}

function SimpleStats({type, newValue}: StatsProps) {
    const {setNewValue, boostPercentages, values} = zMetrics();

    const stats: Stats = {
        users: {
            label: 'Users',
            value: values['users'],
            boostPercentage: boostPercentages['users'],
            // icon: (
            //     boostPercentages['users'] >= 0 ?
            //         <TrendUp size={64} className="text-emerald-500"/> :
            //         <TrendDown size={64} className="text-red-500"/>
            // )
        },
        specialized: {
            label: 'Specialized Doctor',
            value: values['specialized'],
            boostPercentage: boostPercentages['specialized'],
            // icon: (
            //     boostPercentages['specialized'] >= 0 ?
            //         <TrendUp size={64} className="text-emerald-500"/> :
            //         <TrendDown size={64} className="text-red-500"/>
            // )
        },
        reservations: {
            label: 'Reservations',
            value: values['reservations'],
            boostPercentage: boostPercentages['reservations'],
            // icon: (
            //     boostPercentages['reservations'] >= 0 ?
            //         <TrendUp size={64} className="text-emerald-500"/> :
            //         <TrendDown size={64} className="text-red-500"/>
            // )
        },
        patients: {
            label: 'Patients',
            value: values['patients'],
            boostPercentage: boostPercentages['patients'],
            // icon: (
            //     boostPercentages['patients'] >= 0 ?
            //         <TrendUp size={64} className="text-emerald-500"/> :
            //         <TrendDown size={64} className="text-red-500"/>
            // )
        }
    }

    useEffect(() => {
        setNewValue(type, newValue);
    }, [newValue]); // eslint-disable-line -- Intentional suppress

    const currentStat = stats[type];
    return (
        <div className="bg-zinc-50 w-full h-full justify-between items-end py-4 flex flex-row px-6">
            <div className="flex flex-col h-full justify-center gap-6">
                <h1 className="text-3xl font-medium text-zinc-700">{currentStat.label}</h1>
                <p className={`text-zinc-700 text-4xl font-semibold ${currentStat.value === 0 && "bg-zinc-100 rounded-full text-transparent animate-pulse"}`}>{currentStat.value}</p>
            </div>
            {/*<div className="flex flex-col items-end h-full justify-end">*/}
            {/*    <p className="tracking-wide font-medium">{currentStat.boostPercentage}%</p>*/}
            {/*    {currentStat.icon}*/}
            {/*</div>*/}
        </div>
    );
}

export default SimpleStats;