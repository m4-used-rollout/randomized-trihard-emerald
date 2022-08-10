import { PickCascade, Shuffle } from "../utils/pick";

export default class EvolutionRandomizer implements RandoModule {
    command = "evos"
    helpText = "Randomizes pokemon evolutions. Keeps same distance from final (Caterpie will always evolve twice). Tries to match one type with original evo. Tries to stay within provided BST (100 is default) of original evo. Ignores TRADE evos.";
    operation(data: PokemonJson, bstRange = "100") {
        const bstAbsRange = Math.abs(parseInt(bstRange) || 100) / 2;

        const pokeConstants = Object.keys(data.pokemon).filter(p => p != "none" && !p.startsWith('old_unown'));
        const monStatsLookup = data.pokemon;

        const evoLookup: { [key: string]: string[] } = {};

        Object.values(data.pokemon).forEach((e, i) => evoLookup[pokeConstants[i]] = (e.evolutions || []).map(e => e.species));

        const distanceFromFinal = (mon: string): number => 1 + evoLookup[mon].reduce((max, cur) => Math.max(max, distanceFromFinal(cur)), 0);

        const availableEvos = Object.values(data.pokemon).map((_, i) => ({ mon: pokeConstants[i], distance: distanceFromFinal(pokeConstants[i]) }));

        const sharesType = (mon1: Pokemon["baseStats"], mon2: Pokemon["baseStats"]) => [mon1.type1, mon1.type2].some(t => [mon2.type1, mon2.type2].includes(t));

        const calcBST = (mon: Pokemon["baseStats"]) => mon ? mon.baseHP + mon.baseAttack + mon.baseDefense + mon.baseSpeed + mon.baseSpAttack + mon.baseSpDefense : 0;
        Object.values(data.pokemon).filter(p => p.baseStats).forEach(p => p.baseStats.bst = calcBST(p.baseStats));

        const replaceEvo = (mon: string): string => {
            const origDistance = distanceFromFinal(mon);
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