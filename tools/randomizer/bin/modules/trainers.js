"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pokemon_constants_1 = require("../parsers/constants/pokemon_constants");
const base_stats_1 = require("../parsers/data/base_stats");
const evos_attacks_1 = require("../parsers/data/evos_attacks");
const parties_1 = require("../parsers/data/parties");
const include_list_1 = require("../parsers/include_list");
const splitcollection_1 = require("../parsers/splitcollection");
const pick_1 = require("../utils/pick");
class TrainerRandomizer {
    constructor() {
        this.command = "trainers";
        this.helpText = "Randomizes trainer pokemon. Shuffles TPP Runmons between TPP trainers. Otherwise, keeps same distance from final. Tries to match one type with original. Tries to stay within provided BST (100 is default) of original.";
    }
    operation(bstRange = "100") {
        const bstAbsRange = Math.abs(parseInt(bstRange) || 100) / 2;
        console.log("Gathering data...");
        const pokeConstants = new pokemon_constants_1.default("constants/pokemon_constants.asm").data;
        const monStatsLookup = {};
        [...new include_list_1.default("data/pokemon/base_stats_old.asm", base_stats_1.default).data, ...new include_list_1.default("data/pokemon/base_stats_new.asm", base_stats_1.default).data].forEach((s, i) => monStatsLookup[pokeConstants[i]] = s.data);
        const evosAttacks = new splitcollection_1.default(["data/pokemon/evos_attacks_kanto.asm", "data/pokemon/evos_attacks_johto.asm", "data/pokemon/evos_attacks_new.asm"], evos_attacks_1.default).data;
        const evoLookup = {};
        evosAttacks.forEach((e, i) => evoLookup[pokeConstants[i]] = e.evos.map(e => e.species));
        const distanceFromFinal = (mon) => 1 + evoLookup[mon].reduce((max, cur) => Math.max(max, distanceFromFinal(cur)), 0);
        const distanceLookup = {};
        pokeConstants.forEach(p => distanceLookup[p] = distanceFromFinal(p));
        const trainerParser = new parties_1.default("data/trainers/parties.asm");
        const trainers = trainerParser.data;
        console.log("Randomizing TPP trainers");
        const tppTrainers = trainers.filter(t => t.type.includes("TRAINERTYPE_NICKNAME")).map(t => ({
            trainer: t,
            maxLevel: t.party.reduce((max, cur) => Math.max(max, cur.level), 0),
            minLevel: t.party.reduce((min, cur) => Math.min(min, cur.level), 100)
        }));
        const tppRunmons = tppTrainers.reduce((all, cur) => all.concat(...cur.trainer.party), new Array());
        tppRunmons.forEach(m => m.moves = m.moves || ["METRONOME", "NO_MOVE", "NO_MOVE", "NO_MOVE"]); // Fix MARINA's mons
        tppTrainers.forEach(t => {
            t.trainer.type = t.trainer.type.filter(t => t != "TRAINERTYPE_STATS"); // Remove baked-in stats
            t.trainer.party = t.trainer.party.map(p => (0, pick_1.PickCascade)(tppRunmons, mon => mon != p));
            [...t.trainer.party].reverse().forEach((p, i) => p.level = Math.max(t.maxLevel - i, t.minLevel));
        });
        console.log("Randomizing other trainers");
        const otherTrainers = trainers.filter(t => !t.specialTrainer && !t.type.includes("TRAINERTYPE_NICKNAME"));
        otherTrainers.forEach(t => t.type = t.type.filter(t => t != "TRAINERTYPE_MOVES")); // Remove baked-in moves and use the random movesets
        otherTrainers.forEach(t => t.type = t.type.length < 1 ? ["TRAINERTYPE_NORMAL"] : t.type); // Fix trainers with no remaining types
        const totalMons = otherTrainers.reduce((sum, t) => sum + t.party.length, 0);
        let availableMons = [...pokeConstants];
        while (availableMons.length < totalMons)
            availableMons.push(...pokeConstants);
        availableMons = (0, pick_1.Shuffle)(availableMons);
        availableMons.length = totalMons;
        const sharesType = (mon1, mon2) => [mon1.type1, mon1.type2].some(t => [mon2.type1, mon2.type2].includes(t));
        const replaceMon = (mon) => {
            const origDistance = distanceLookup[mon];
            const origStats = monStatsLookup[mon];
            return (0, pick_1.PickCascade)(availableMons, m => Math.abs(origStats.bst - monStatsLookup[m].bst) <= bstAbsRange, // Within provided BST range
            // Within provided BST range
            m => m != mon, // Not same mon
            // Not same mon
            m => sharesType(origStats, monStatsLookup[m]), // At least one type matches
            // At least one type matches
            m => distanceLookup[m] == origDistance) || mon;
        };
        for (let i = 0; i < 6; i++)
            otherTrainers.forEach(t => {
                if (t.party[i])
                    t.party[i].species = replaceMon(t.party[i].species);
            });
        console.log(`Randomized ${totalMons} trainer mons in ${otherTrainers.length} parties.`);
        trainerParser.data = trainers;
        console.log("Finished.");
    }
}
exports.default = TrainerRandomizer;
