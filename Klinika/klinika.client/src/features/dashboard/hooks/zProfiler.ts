import {create} from "zustand";

type ProfilerState = {
    steps: number[];
    walkthrough: boolean | undefined,
    setWalkthrough: (status: boolean) => void,
}

const zProfiler = create<ProfilerState>((set) => ({
    steps: [1, 2, 3],
    walkthrough: undefined,
    setWalkthrough: (status) => set({
        walkthrough: status
    }),
}));

export default zProfiler;