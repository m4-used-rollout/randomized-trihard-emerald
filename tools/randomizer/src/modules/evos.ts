import { buildEvoLookup, buildPokeConstants, calculateBST, sharesType } from "../utils/montasks";
import { PickCascade, Shuffle } from "../utils/pick";

export default class EvolutionRandomizer implements RandoModule {
    command = "evos"
    helpText = "Randomizes pokemon evolutions. Keeps same distance from final (Caterpie will always evolve twice). Tries to match one type with original evo. Tries to stay within provided BST (100 is default) of original evo. Ignores TRADE evos.";
    operation(data: PokemonJson, bstRange = "100") {
        const bstAbsRange = Math.abs(parseInt(bstRange) || 100) / 2;

        calculateBST(data);

        const pokeConstants = buildPokeConstants(data);
        const monStatsLookup = data.pokemon;

        const { distanceFromFinalLookup } = buildEvoLookup(data, pokeConstants);

        const availableEvos = Object.values(data.pokemon).map((_, i) => ({ mon: pokeConstants[i], distance: distanceFromFinalLookup[pokeConstants[i]] }));

        const replaceEvo = (mon: string): string => {
            const origDistance = distanceFromFinalLookup[mon];
            const origStats = monStatsLookup[mon].baseStats;
            return (PickCascade(availableEvos,
                e => !!(e.mon && monStatsLookup[e.mon]),
                e => e.mon != mon, // Not same mon
                e => e.distance == origDistance, // Same distance from final (Caterpie always evolves twice)
                e => sharesType(origStats, monStatsLookup[e.mon].baseStats), // At least one type matches
                e => Math.abs(origStats.bst - monStatsLookup[e.mon].baseStats.bst) <= bstAbsRange // Within provided BST range
            ) || { mon }).mon;
        };

        const shuffledEA = Shuffle(Object.values(data.pokemon).filter(p => p.baseStats).map((pokemon, i) => ({ evos: pokemon.evolutions || [], i }))); // Randomize order so early mons don't necessarily get better picks

        console.log("Randomizing evolutions");
        shuffledEA.filter(ea => ea.evos.length > 0).forEach(ea => {
            const [evo, i] = [ea, ea.i];
            const monName = pokeConstants[i];

            evo.evos.forEach(e => {
                if (e.type.indexOf("TRADE") >= 0) return;
                e.species = replaceEvo(e.species);
            });

            console.log(`${monName} => ${evo.evos.map(e => e.species).join(", ")}`);
        })
        console.log("Finished.");
    }

}