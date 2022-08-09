"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shuffle = exports.PickCascade = exports.Pick = void 0;
const crypto_1 = require("crypto");
/**
 * Picks a random element from the array, removes it, and returns it.
 * Returns undefined if no applicable elements exist.
 * @param arr The Array to pick from
 * @param filter Only pick from elements that match this criteria
 */
function Pick(arr, filter) {
    const validElements = arr.filter(filter || (_ => true));
    if (validElements.length < 1)
        return undefined;
    const result = validElements[(0, crypto_1.randomInt)(validElements.length)];
    arr.splice(arr.indexOf(result), 1);
    return result;
}
exports.Pick = Pick;
/**
 * Picks a random element from the array, removes it, and returns it.
 * Automatically keeps trying with fewer and fewer of the provided criteria until it gets a result.
 * @param arr The Array to pick from
 * @param criteria Only pick from elements that match this criteria (from most to least important)
 */
function PickCascade(arr, ...criteria) {
    let result;
    do {
        result = Pick(arr, t => criteria.every(c => c(t)));
        criteria.pop(); // discard the least important criteria
    } while (typeof result === "undefined" && criteria.length > 0);
    if (typeof result === "undefined")
        return Pick(arr);
    return result;
}
exports.PickCascade = PickCascade;
function Shuffle(arr) {
    const source = [...arr];
    const dest = [];
    while (source.length)
        dest.push(Pick(source));
    return dest;
}
exports.Shuffle = Shuffle;
