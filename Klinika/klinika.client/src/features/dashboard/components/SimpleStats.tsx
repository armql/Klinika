import {TrendDown, TrendUp} from "@phosphor-icons/react";
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
    icon: JSX.Element;
}

type Stats = {
    [key: string]: Stat;
}

function SimpleStats({type, newValue}: StatsProps) {
    const {setNewValue, boostPercentages, values} = zMetrics();

    const stats: Stats = {
        users: {
            label: 'Users',
            value: values['users'] || 0,
            boostPercentage: boostPercentages['users'] || 0,
            icon: (
                boostPercentages['users'] >= 0 ?
                    <TrendUp size={64} className="text-emerald-500"/> :
                    <TrendDown size={64} className="text-red-500"/>
            )
        },
        visits: {
            label: 'Visits',
            value: values['visits'] || 0,
            boostPercentage: boostPercentages['visits'] || 0,
            icon: (
                boostPercentages['visits'] >= 0 ?
                    <TrendUp size={64} className="text-emerald-500"/> :
                    <TrendDown size={64} className="text-red-500"/>
            )
        },
        reservations: {
            label: 'Reservations',
            value: values['reservations'] || 0,
            boostPercentage: boostPercentages['reservations'] || 0,
            icon: (
                boostPercentages['reservations'] >= 0 ?
                    <TrendUp size={64} className="text-emerald-500"/> :
                    <TrendDown size={64} className="text-red-500"/>
            )
        },
        newUsers: {
            label: 'New Users',
            value: values['newUsers'] || 0,
            boostPercentage: boostPercentages['newUsers'] || 0,
            icon: (
                boostPercentages['newUsers'] >= 0 ?
                    <TrendUp size={64} className="text-emerald-500"/> :
                    <TrendDown size={64} className="text-red-500"/>
            )
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
                <p className="text-zinc-700 text-4xl font-semibold">{currentStat.value}</p>
            </div>
            <div className="flex flex-col items-end h-full justify-end">
                <p className="tracking-wide font-medium">{currentStat.boostPercentage}%</p>
                {currentStat.icon}
            </div>
        </div>
    );
}

export default SimpleStats;