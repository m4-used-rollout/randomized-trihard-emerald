"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pokemon_constants_1 = require("../parsers/constants/pokemon_constants");
const base_stats_1 = require("../parsers/data/base_stats");
const evos_attacks_1 = require("../parsers/data/evos_attacks");
const include_list_1 = require("../parsers/include_list");
const splitcollection_1 = require("../parsers/splitcollection");
const pick_1 = require("../utils/pick");
class EvolutionRandomizer {
    constructor() {
        this.command = "evos";
        this.helpText = "Randomizes pokemon evolutions. Keeps same distance from final (Caterpie will always evolve twice). Tries to match one type with original evo. Tries to stay within provided BST (100 is default) of original evo. Ignores TRADE evos.";
    }
    operation(bstRange = "100") {
        const bstAbsRange = Math.abs(parseInt(bstRange) || 100) / 2;
        const pokeConstants = new pokemon_constants_1.default("constants/pokemon_constants.asm").data;
        const monStatsLookup = {};
        [...new include_list_1.default("data/pokemon/base_stats_old.asm", base_stats_1.default).data, ...new include_list_1.default("data/pokemon/base_stats_new.asm", base_stats_1.default).data].forEach((s, i) => monStatsLookup[pokeConstants[i]] = s.data);
        const evosAttacksParser = new splitcollection_1.default(["data/pokemon/evos_attacks_kanto.asm", "data/pokemon/evos_attacks_johto.asm", "data/pokemon/evos_attacks_new.asm"], evos_attacks_1.default);
        const evosAttacks = evosAttacksParser.data;
        const evoLookup = {};
        evosAttacks.forEach((e, i) => evoLookup[pokeConstants[i]] = e.evos.map(e => e.species));
        const distanceFromFinal = (mon) => 1 + evoLookup[mon].reduce((max, cur) => Math.max(max, distanceFromFinal(cur)), 0);
        const availableEvos = evosAttacks.map((_, i) => ({ mon: pokeConstants[i], distance: distanceFromFinal(pokeConstants[i]) }));
        const sharesType = (mon1, mon2) => [mon1.type1, mon1.type2].some(t => [mon2.type1, mon2.type2].includes(t));
        const replaceEvo = (mon) => {
            const origDistance = distanceFromFinal(mon);
            const origStats = monStatsLookup[mon];
            return ((0, pick_1.PickCascade)(availableEvos, e => e.mon != mon, // Not same mon
            // Not same mon
            e => e.distance == origDistance, // Same distance from final (Caterpie always evolves twice)
            // Same distance from final (Caterpie always evolves twice)
            e => sharesType(origStats, monStatsLookup[e.mon]), // At least one type matches
            // At least one type matches
            e => Math.abs(origStats.bst - monStatsLookup[e.mon].bst) <= bstAbsRange // Within provided BST range
            ) || { mon }).mon;
        };
        const shuffledEA = (0, pick_1.Shuffle)(evosAttacks.map((ea, i) => ({ ea, i }))); // Randomize order so early mons don't necessarily get better picks
        console.log("Randomizing evolutions");
        shuffledEA.filter(ea => ea.ea.evos.length > 0).forEach(ea => {
            const [evo, i] = [ea.ea, ea.i];
            const monName = pokeConstants[i];
            evo.evos = evo.evos.map(e => e.type.indexOf("TRADE") >= 0 ? e : ({ ...e, species: replaceEvo(e.species) }));
            console.log(`${monName} => ${evo.evos.map(e => e.species).join(", ")}`);
            evosAttacksParser.update(i, evo);
        });
        console.log("Finished.");
    }
}
exports.default = EvolutionRandomizer;
