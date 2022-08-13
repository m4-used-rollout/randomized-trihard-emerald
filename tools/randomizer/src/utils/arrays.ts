export function dedupe<T>(list: T[]) {
    return list.filter((e, i, arr) => arr.indexOf(e) == i);
}