import BaseStats from "../models/base_stats";
import EvosAttacks from "../models/evos_attacks";
import { ContestEncounter, Encounter } from "../models/wild";
import PokemonConstantsParser from "../parsers/constants/pokemon_constants";
import BaseStatsParser from "../parsers/data/base_stats";
import EvosAttacksParser from "../parsers/data/evos_attacks";
import WildBugContestParser from "../parsers/data/wild/bug_contest";
import WildFishParser from "../parsers/data/wild/fish";
import WildGrassWaterParser from "../parsers/data/wild/grass_water";
import WildTreeMonParser from "../parsers/data/wild/treemons";
import IncludeListParser from "../parsers/include_list";
import SplitCollectionParser from "../parsers/splitcollection";
import { PickCascade, Shuffle } from "../utils/pick";

export default class WildRandomizer implements RandoModule {
    command = "wilds"
    helpText = "Randomizes wild pokemon. Keeps same distance from final. Tries to match one type with original. Tries to stay within provided BST (100 is default) of original.";
    operation(bstRange = "100") {
        const bstAbsRange = Math.abs(parseInt(bstRange) || 100) / 2;

        console.log("Gathering data...");

        const pokeConstants = new PokemonConstantsParser("constants/pokemon_constants.asm").data;
        const monStatsLookup: { [key: string]: BaseStats } = {};
        [...new IncludeListParser("data/pokemon/base_stats_old.asm", BaseStatsParser).data, ...new IncludeListParser("data/pokemon/base_stats_new.asm", BaseStatsParser).data].forEach((s, i) => monStatsLookup[pokeConstants[i]] = s.data);
        const evosAttacks = new SplitCollectionParser<EvosAttacks, EvosAttacksParser>(["data/pokemon/evos_attacks_kanto.asm", "data/pokemon/evos_attacks_johto.asm", "data/pokemon/evos_attacks_new.asm"], EvosAttacksParser).data;
        const evoLookup: { [key: string]: string[] } = {};
        evosAttacks.forEach((e, i) => evoLookup[pokeConstants[i]] = e.evos.map(e => e.species));
        const distanceFromFinal = (mon: string): number => 1 + evoLookup[mon].reduce((max, cur) => Math.max(max, distanceFromFinal(cur)), 0);
        const distanceLookup: { [key: string]: number } = {};
        pokeConstants.forEach(p => distanceLookup[p] = distanceFromFinal(p));

        const johtoGrassParser = new WildGrassWaterParser("data/wild/johto_grass.asm");
        const kantoGrassParser = new WildGrassWaterParser("data/wild/kanto_grass.asm");
        const johtoWaterParser = new WildGrassWaterParser("data/wild/johto_water.asm");
        const kantoWaterParser = new WildGrassWaterParser("data/wild/kanto_water.asm");
        const fishParser = new WildFishParser("data/wild/fish.asm");
        const swarmGrassParser = new WildGrassWaterParser("data/wild/swarm_grass.asm");
        const swarmWaterParser = new WildGrassWaterParser("data/wild/swarm_water.asm");
        const bugCatchingContestParser = new WildBugContestParser("data/wild/bug_contest_mons.asm");
        const treeMonsParser = new WildTreeMonParser("data/wild/treemons.asm");

        const johto_grass = johtoGrassParser.data;
        const kanto_grass = kantoGrassParser.data;
        const johto_water = johtoWaterParser.data;
        const kanto_water = kantoWaterParser.data;
        const fishmons = fishParser.data;
        const swarm_grass = swarmGrassParser.data;
        const swarm_water = swarmWaterParser.data;
        const bugmons = bugCatchingContestParser.data;
        const treemons = treeMonsParser.data;

        type CommonEncounter = { species: string };

        // these are all being copied by reference
        // modify each encounter object and the arrays above will also be modified
        const allEncounterGroups: CommonEncounter[][] = Shuffle([
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
        availableMons = Shuffle(availableMons);
        //availableMons.length = totalEncounters;

        const sharesType = (mon1: BaseStats, mon2: BaseStats) => [mon1.type1, mon1.type2].some(t => [mon2.type1, mon2.type2].includes(t));

        const replaceMon = (mon: string): string => {
            if (mon == "TIME_GROUP")
                return mon; //don't change those
            const origDistance = distanceLookup[mon];
            const origStats = monStatsLookup[mon];
            return PickCascade(availableMons,
                m => Math.abs(origStats.bst - monStatsLookup[m].bst) <= bstAbsRange, // Within provided BST range
                m => m != mon, // Not same mon
                // m => sharesType(origStats, monStatsLookup[m]), // At least one type matches
                m => distanceLookup[m] == origDistance, // Same distance from final (Caterpie always evolves twice)
            ) || mon;
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