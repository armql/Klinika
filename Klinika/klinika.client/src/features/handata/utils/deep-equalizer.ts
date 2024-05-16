import {BulkItems} from "../store/zForm.ts";

export function deepEqual(obj1: BulkItems | string | number, obj2: BulkItems | string | number): boolean {
    if (typeof obj1 === 'object' && obj1 !== null && typeof obj2 === 'object' && obj2 !== null) {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (const key of keys1) {
            if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
                return false;
            }
        }
    } else if (obj1 !== obj2) {
        return false;
    }

    return true;
}