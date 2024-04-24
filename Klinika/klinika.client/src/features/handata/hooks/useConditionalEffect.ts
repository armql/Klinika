import { useEffect, EffectCallback, DependencyList } from "react";

export function useConditionalEffect(
  effect: EffectCallback,
  condition: boolean,
  deps: DependencyList
) {
  useEffect(() => {
    if (condition) {
      return effect();
    }
  }, deps);
}
