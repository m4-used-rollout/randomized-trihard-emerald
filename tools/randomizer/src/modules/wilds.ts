import { buildAvailablePokemon, buildEvoLookup, buildPokeConstants, calculateBST } from "../utils/montasks";
import { PickCascade, Shuffle } from "../utils/pick";

export default class WildRandomizer implements RandoModule {
    command = "wilds"
    helpText = "Randomizes wild pokemon. Keeps same distance from final. Tries to match one type with original. Tries to stay within provided BST (100 is default) of original.";
    operation(data: PokemonJson, bstRange = "100") {
        const bstAbsRange = Math.abs(parseInt(bstRange) || 100) / 2;

        calculateBST(data);

        const pokeConstants = buildPokeConstants(data, true);
        const monStatsLookup = data.pokemon;

        const { distanceFromFinalLookup } = buildEvoLookup(data);

        // these are all being copied by reference
        // modify each encounter object and the arrays above will also be modified
        const allEncounterGroups = Shuffle(data.wilds);

        const totalEncounters = allEncounterGroups.reduce((sum, g) => sum + g.set.length, 0);
        const mostEncountersInGroup = allEncounterGroups.reduce((max, g) => Math.max(max, g.set.length), 0);

        //const availableMons = buildAvailablePokemon(data, pokeConstants, totalEncounters, { extraEntropy: true });

        console.log("Randomizing wilds...");

        // for (let i = 0; i < mostEncountersInGroup; i++)
        allEncounterGroups.forEach(g => {
            const availableMons = [...pokeConstants];
            const replaceMon = (mon: string): string => {
                const origDistance = distanceFromFinalLookup[mon];
                const origStats = monStatsLookup[mon].baseStats;
                return PickCascade(availableMons,
                    m => Math.abs(origStats.bst - monStatsLookup[m].baseStats.bst) <= bstAbsRange, // Within provided BST range
                    m => m != mon, // Not same mon
                    // m => sharesType(origStats, monStatsLookup[m].baseStats), // At least one type matches
                    m => distanceFromFinalLookup[m] == origDistance, // Same distance from final (Caterpie always evolves twice)
                ) || mon;
            };
            // if (g.set[i])
            //     g.set[i].species = replaceMon(g.set[i].species);                
            g.set.forEach(s => s.species = replaceMon(s.species));
        });

        console.log(`Randomized ${totalEncounters} encounters in ${allEncounterGroups.length} groups.`);

        console.log("Finished.");
    }

}