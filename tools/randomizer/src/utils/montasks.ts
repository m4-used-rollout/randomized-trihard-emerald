import { Shuffle } from "./pick";

export function buildPokeConstants(data: PokemonJson) {
    return Object.keys(data.pokemon).filter(p => p != "none" && !p.startsWith('old_unown'));;
}

export function buildEvoLookup(data: PokemonJson, pokeConstants = buildPokeConstants(data)) {
    const evoLookupForward: { [key: string]: string[] } = {};
    const evoLookupBackward: { [key: string]: string[] } = {};
    Object.values(data.pokemon).forEach((e, i) => evoLookupForward[pokeConstants[i]] = (e.evolutions || []).map(e => e.species));
    pokeConstants.forEach(p => evoLookupBackward[p] = []);
    pokeConstants.forEach(p => evoLookupForward[p].forEach(e => evoLookupBackward[e].push(p)));
    const distanceFromFinal = (mon: string): number => 1 + evoLookupForward[mon].reduce((max, cur) => Math.max(max, distanceFromFinal(cur)), 0);
    const calcEvoStage = (mon: string): number => evoLookupBackward[mon].length;
    const distanceFromFinalLookup: { [key: string]: number } = {};
    pokeConstants.forEach(p => distanceFromFinalLookup[p] = distanceFromFinal(p));
    const evoStageLookup: { [key: string]: number } = {};
    pokeConstants.forEach(p => evoStageLookup[p] = calcEvoStage(p));
    return { evoLookup: evoLookupForward, distanceFromFinalLookup, evoStageLookup };
}

export function sharesType(mon1: Pokemon["baseStats"], mon2: Pokemon["baseStats"]) {
    return [mon1.type1, mon1.type2].some(t => [mon2.type1, mon2.type2].includes(t));
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

export function buildAvailablePokemon(data: PokemonJson, pokeConstants = buildPokeConstants(data), minSize = pokeConstants.length, options: { minIsMax?: boolean, extraEntropy?: boolean } = {}) {
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