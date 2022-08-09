import { randomInt } from "crypto";

/**
 * Picks a random element from the array, removes it, and returns it.
 * Returns undefined if no applicable elements exist.
 * @param arr The Array to pick from
 * @param filter Only pick from elements that match this criteria
 */
export function Pick<T>(arr: T[], filter?: (item: T) => boolean): T | undefined {
    const validElements = arr.filter(filter || (_ => true));
    if (validElements.length < 1)
        return undefined;
    const result = validElements[randomInt(validElements.length)];
    arr.splice(arr.indexOf(result), 1);
    return result;
}

/**
 * Picks a random element from the array, removes it, and returns it.
 * Automatically keeps trying with fewer and fewer of the provided criteria until it gets a result.
 * @param arr The Array to pick from
 * @param criteria Only pick from elements that match this criteria (from most to least important)
 */
export function PickCascade<T>(arr: T[], ...criteria: ((item: T) => boolean)[]): T | undefined {
    let result: T;
    do {
        result = Pick(arr, t => criteria.every(c => c(t)));
        criteria.pop(); // discard the least important criteria
    } while (typeof result === "undefined" && criteria.length > 0);
    if (typeof result === "undefined")
        return Pick(arr);
    return result;
}

export function Shuffle<T>(arr: T[]): T[] {
    const source = [...arr];
    const dest = [];
    while (source.length)
        dest.push(Pick(source));
    return dest;
}