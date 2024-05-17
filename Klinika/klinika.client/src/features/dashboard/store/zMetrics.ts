import {create} from 'zustand';
import {persist} from "zustand/middleware";

type State = {
    values: { [type: string]: number };
    boostPercentages: { [type: string]: number };
    setNewValue: (type: string, value: number) => void;
};

const store =
    (set) => ({
            values: {"users": 0, "visits": 0, "reservations": 0, "newUsers": 0},
            boostPercentages: {"users": 0, "visits": 0, "reservations": 0, "newUsers": 0},
            setNewValue: (type: string, value: number) => set((state: State) => {
                const oldValue = state.values[type] || 0;
                if (oldValue === value) {
                    return state;
                }
                let newBoostPercentage = 0;
                if (oldValue !== 0) {
                    newBoostPercentage = 100 * Math.log(1 + (value - oldValue) / oldValue);
                }
                newBoostPercentage = parseFloat(newBoostPercentage.toFixed(2));
                return {
                    values: {
                        ...state.values,
                        [type]: value
                    },
                    boostPercentages: {
                        ...state.boostPercentages,
                        [type]: newBoostPercentage
                    }
                };
            }),
        }
    );

export const zMetrics = create(persist<State>(store, {
    name: 'metrics-data',
}));