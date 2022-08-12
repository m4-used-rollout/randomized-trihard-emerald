import { Shuffle } from "./pick";

export function buildPokeConstants(data: PokemonJson, filterInvalid = false) {
    return Object.keys(data.pokemon).filter(p => !filterInvalid || (p != "none" && !p.startsWith('old_unown')));
}

export function buildEvoLookup(data: PokemonJson) {
    const evoLookupForward: { [key: string]: string[] } = {};
    const evoLookupBackward: { [key: string]: string | null } = {};
    const pokeConstants = Object.keys(data.pokemon);
    Object.values(data.pokemon).forEach((p, i) => {
        evoLookupForward[pokeConstants[i]] = (p.evolutions || []).map(e => e.species);
        (p.evolutions || []).forEach(e => evoLookupBackward[e.species] = pokeConstants[i]);
    });
    const distanceFromFinal = (mon: string): number => 1 + evoLookupForward[mon].reduce((max, cur) => Math.max(max, distanceFromFinal(cur)), 0);
    const calcEvoStage = (mon: string): number => !evoLookupBackward[mon] ? 0 : (1 + calcEvoStage(evoLookupBackward[mon]));
    const distanceFromFinalLookup: { [key: string]: number } = {};
    pokeConstants.forEach(p => distanceFromFinalLookup[p] = distanceFromFinal(p));
    const evoStageLookup: { [key: string]: number } = {};
    pokeConstants.forEach(p => evoStageLookup[p] = calcEvoStage(p));
    return { evoLookupForward, evoLookupBackward, distanceFromFinalLookup, evoStageLookup };
}

export function hasType(mon: Pokemon["baseStats"], type: string) {
    return [mon.type1, mon.type2].includes(type);
}

export function sharesType(mon1: Pokemon["baseStats"], mon2: Pokemon["baseStats"]) {
    return [mon1.type1, mon1.type2].some(t => hasType(mon2, t));
}

export function calculateBST(data: PokemonJson) {
    const calcBST = (mon: Pokemon["baseStats"]) => mon ? mon.baseHP + mon.baseAttack + mon.baseDefense + mon.baseSpeed + mon.baseSpAttack + mon.baseSpDefense : 0;
    Object.values(data.pokemon).filter(p => p.baseStats).forEach(p => p.baseStats.bst = calcBST(p.baseStats));
}

export const hmMoves = ["CUT", "FLY", "SURF", "STRENGTH", "FLASH", "ROCK_SMASH", "WATERFALL", "DIVE"];

export function buildMoveLookup(data: PokemonJson, excludeHMMoves = false) {
    const availableMoves = data.moves.filter(m => m.id != "struggle" && m.id && !(excludeHMMoves && hmMoves.includes(m.id.toUpperCase())));
    const moveLookup: Record<string, Move> = {};
    availableMoves.forEach(m => moveLookup[m.id] = m);
    return { availableMoves, moveLookup }
}

export function buildAvailablePokemon(data: PokemonJson, pokeConstants = buildPokeConstants(data, true), minSize = pokeConstants.length, options: { minIsMax?: boolean, extraEntropy?: boolean } = {}) {
    let availableMons = [...pokeConstants];
    while (availableMons.length < minSize)
        availableMons.push(...pokeConstants);
    if (options.extraEntropy)
        availableMons.push(...pokeConstants);
    availableMons = Shuffle(availableMons);
    if (options.minIsMax)
        availableMons.length = minSize;
    return availableMons;
}

export function buildAvailableAbilities(data: PokemonJson) {
    return Object.values(data.pokemon).map(p => [p?.baseStats?.ability1, p?.baseStats?.ability2].filter(a => !!a)).flat().filter((a, i, arr) => arr.indexOf(a) == i);
}

export function buildAvailableTypes(data: PokemonJson) {
    return Object.values(data.pokemon).map(p => [p?.baseStats?.type1, p?.baseStats?.type2].filter(t => !!t)).flat().filter((t, i, arr) => arr.indexOf(t) == i);
}