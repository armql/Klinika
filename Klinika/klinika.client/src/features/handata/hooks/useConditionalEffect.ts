import {DependencyList, EffectCallback, useEffect} from "react";

export function useConditionalEffect(
    effect: EffectCallback,
    condition: boolean,
    deps: DependencyList
) {
    useEffect(() => {
        if (condition) {
            return effect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- This is intentional cause of infinite loops
    }, deps);
}
