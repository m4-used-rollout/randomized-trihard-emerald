"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pokemon_constants_1 = require("../parsers/constants/pokemon_constants");
const base_stats_1 = require("../parsers/data/base_stats");
const evos_attacks_1 = require("../parsers/data/evos_attacks");
const bug_contest_1 = require("../parsers/data/wild/bug_contest");
const fish_1 = require("../parsers/data/wild/fish");
const grass_water_1 = require("../parsers/data/wild/grass_water");
const treemons_1 = require("../parsers/data/wild/treemons");
const include_list_1 = require("../parsers/include_list");
const splitcollection_1 = require("../parsers/splitcollection");
const pick_1 = require("../utils/pick");
class WildRandomizer {
    constructor() {
        this.command = "wilds";
        this.helpText = "Randomizes wild pokemon. Keeps same distance from final. Tries to match one type with original. Tries to stay within provided BST (100 is default) of original.";
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
        const johtoGrassParser = new grass_water_1.default("data/wild/johto_grass.asm");
        const kantoGrassParser = new grass_water_1.default("data/wild/kanto_grass.asm");
        const johtoWaterParser = new grass_water_1.default("data/wild/johto_water.asm");
        const kantoWaterParser = new grass_water_1.default("data/wild/kanto_water.asm");
        const fishParser = new fish_1.default("data/wild/fish.asm");
        const swarmGrassParser = new grass_water_1.default("data/wild/swarm_grass.asm");
        const swarmWaterParser = new grass_water_1.default("data/wild/swarm_water.asm");
        const bugCatchingContestParser = new bug_contest_1.default("data/wild/bug_contest_mons.asm");
        const treeMonsParser = new treemons_1.default("data/wild/treemons.asm");
        const johto_grass = johtoGrassParser.data;
        const kanto_grass = kantoGrassParser.data;
        const johto_water = johtoWaterParser.data;
        const kanto_water = kantoWaterParser.data;
        const fishmons = fishParser.data;
        const swarm_grass = swarmGrassParser.data;
        const swarm_water = swarmWaterParser.data;
        const bugmons = bugCatchingContestParser.data;
        const treemons = treeMonsParser.data;
        // these are all being copied by reference
        // modify each encounter object and the arrays above will also be modified
        const allEncounterGroups = (0, pick_1.Shuffle)([
            ...johto_grass.map(g => [g.morn, g.day, g.nite].filter(f => !!f)),
            ...kanto_grass.map(g => [g.morn, g.day, g.nite].filter(f => !!f)),
            ...johto_water.map(w => [w.morn]),
            ...kanto_water.map(w => [w.morn]),
            ...fishmons.groups.map(g => [g.oldRod, g.goodRod, g.superRod]),
            ...fishmons.timeGroups.map(g => [[g.day], [g.nite]]),
            ...swarm_grass.map(g => [g.morn, g.day, g.nite].filter(f => !!f)),
            ...swarm_water.map(w => [w.morn]),
            [bugmons],
            ...treemons.map(t => [t.common, t.rare].filter(f => !!f))
        ].flat());
        const totalEncounters = allEncounterGroups.reduce((sum, g) => sum + g.length, 0);
        const mostEncountersInGroup = allEncounterGroups.reduce((max, g) => Math.max(max, g.length), 0);
        let availableMons = [...pokeConstants];
        while (availableMons.length < totalEncounters)
            availableMons.push(...pokeConstants);
        availableMons.push(...pokeConstants);
        availableMons = (0, pick_1.Shuffle)(availableMons);
        //availableMons.length = totalEncounters;
        const sharesType = (mon1, mon2) => [mon1.type1, mon1.type2].some(t => [mon2.type1, mon2.type2].includes(t));
        const replaceMon = (mon) => {
            if (mon == "TIME_GROUP")
                return mon; //don't change those
            const origDistance = distanceLookup[mon];
            const origStats = monStatsLookup[mon];
            return (0, pick_1.PickCascade)(availableMons, m => Math.abs(origStats.bst - monStatsLookup[m].bst) <= bstAbsRange, // Within provided BST range
            // Within provided BST range
            m => m != mon, // Not same mon
            // m => sharesType(origStats, monStatsLookup[m]), // At least one type matches
            // Not same mon
            m => distanceLookup[m] == origDistance) || mon;
        };
        console.log("Randomizing wilds...");
        for (let i = 0; i < mostEncountersInGroup; i++)
            allEncounterGroups.forEach(g => {
                if (g[i])
                    g[i].species = replaceMon(g[i].species);
            });
        console.log(`Randomized ${totalEncounters} encounters in ${allEncounterGroups.length} groups.`);
        console.log("Writing to files...");
        johtoGrassParser.data = johto_grass;
        kantoGrassParser.data = kanto_grass;
        johtoWaterParser.data = johto_water;
        kantoWaterParser.data = kanto_water;
        fishParser.data = fishmons;
        swarmGrassParser.data = swarm_grass;
        swarmWaterParser.data = swarm_water;
        bugCatchingContestParser.data = bugmons;
        treeMonsParser.data = treemons;
        console.log("Finished.");
    }
}
exports.default = WildRandomizer;
