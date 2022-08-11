import { PickCascade } from "../utils/pick";
import { buildAvailablePokemon, buildEvoLookup, buildPokeConstants, calculateBST, sharesType } from "../utils/montasks";

export default class TrainerRandomizer implements RandoModule {
    command = "trainers"
    helpText = "Randomizes trainer pokemon. Shuffles TPP Runmons between TPP trainers. Otherwise, keeps same distance from final. Tries to match one type with original. Tries to stay within provided BST (100 is default) of original.";
    operation(data: PokemonJson, bstRange = "100") {
        const bstAbsRange = Math.abs(parseInt(bstRange) || 100) / 2;

        calculateBST(data);

        const pokeConstants = buildPokeConstants(data, true);
        const monStatsLookup = data.pokemon;

        const { distanceFromFinalLookup } = buildEvoLookup(data);

        const trainers = data.trainerParties;

        console.log("Randomizing trainer parties");

        trainers.forEach(t => {
            if (t.type == "TrainerMonItemCustomMoves")
                t.type = "TrainerMonItemDefaultMoves";
            else if (t.type == "TrainerMonNoItemCustomMoves")
                t.type = "TrainerMonNoItemDefaultMoves";
        }); // Remove baked-in moves and use the random movesets

        const totalMons = trainers.reduce((sum, t) => sum + t.party.length, 0);

        const availableMons = buildAvailablePokemon(data, pokeConstants, totalMons, { minIsMax: true });

        const replaceMon = (mon: string): string => {
            const origDistance = distanceFromFinalLookup[mon];
            const origStats = monStatsLookup[mon].baseStats;
            return PickCascade(availableMons,
                m => Math.abs(origStats.bst - monStatsLookup[m].baseStats.bst) <= bstAbsRange, // Within provided BST range
                m => m != mon, // Not same mon
                m => sharesType(origStats, monStatsLookup[m].baseStats), // At least one type matches
                m => distanceFromFinalLookup[m] == origDistance, // Same distance from final (Caterpie always evolves twice)
            ) || mon;
        };

        for (let i = 0; i < 6; i++)
            trainers.forEach(t => {
                if (t.party[i])
                    t.party[i].species = replaceMon(t.party[i].species);
            });

        console.log(`Randomized ${totalMons} trainer mons in ${trainers.length} parties.`);

        console.log("Finished.");
    }

}