import { buildEvoLookup, buildPokeConstants, calculateBST, sharesType } from "../utils/montasks";
import { PickCascade, Shuffle } from "../utils/pick";

export default class StarterRandomizer implements RandoModule {
    command = "starters"
    helpText = "Randomizes starter pokemon. Keeps same evo stage. Tries to match one type with original. Tries to stay within provided BST (100 is default) of original.";
    operation(data: PokemonJson, bstRange = "100") {
        const bstAbsRange = Math.abs(parseInt(bstRange) || 100) / 2;

        calculateBST(data);

        const pokeConstants = buildPokeConstants(data);
        const monStatsLookup = data.pokemon;

        const { evoStageLookup } = buildEvoLookup(data, pokeConstants);

        let availableMons = Shuffle([...pokeConstants]);

        const avoidStarters = ["bulbasaur", "charmander", "squirtle", "pikachu", "chikorita", "cyndaquil", "totodile", "treecko", "torchic", "mudkip"];

        const replaceMon = (mon: string): string => {
            const origStats = monStatsLookup[mon].baseStats;
            return PickCascade(availableMons,
                m => Math.abs(origStats.bst - monStatsLookup[m].baseStats.bst) <= bstAbsRange, // Within provided BST range
                m => m != mon, // Not same mon
                m => !avoidStarters.includes(m), // avoid vanilla starters
                m => sharesType(origStats, monStatsLookup[m].baseStats), // At least one type matches
                m => evoStageLookup[m] == evoStageLookup[mon], // Same evolution stage (Butterfree has two evolutions before it)
            ) || mon;
        };

        console.log("Randomizing starters...");

        for (let i = 0; i < data.starters.length; i++)
            data.starters[i] = replaceMon(data.starters[i]);

        console.log(`New starters: ${data.starters.join(', ')}`);

        console.log("Finished.");
    }

}