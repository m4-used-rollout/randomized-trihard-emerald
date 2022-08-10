import { PickCascade, Shuffle } from "../utils/pick";

export default class StarterRandomizer implements RandoModule {
    command = "starters"
    helpText = "Randomizes starter pokemon. Keeps same distance from final. Tries to match one type with original. Tries to stay within provided BST (100 is default) of original.";
    operation(data: PokemonJson, bstRange = "100") {
        const bstAbsRange = Math.abs(parseInt(bstRange) || 100) / 2;

        const pokeConstants = Object.keys(data.pokemon).filter(p => p != "none" && !p.startsWith('old_unown'));
        const monStatsLookup = data.pokemon;

        const evoLookup: { [key: string]: string[] } = {};
        Object.values(data.pokemon).forEach((e, i) => evoLookup[pokeConstants[i]] = (e.evolutions || []).map(e => e.species));

        const distanceFromFinal = (mon: string): number => 1 + evoLookup[mon].reduce((max, cur) => Math.max(max, distanceFromFinal(cur)), 0);
        const distanceLookup: { [key: string]: number } = {};
        pokeConstants.forEach(p => distanceLookup[p] = distanceFromFinal(p));

        const sharesType = (mon1: Pokemon["baseStats"], mon2: Pokemon["baseStats"]) => [mon1.type1, mon1.type2].some(t => [mon2.type1, mon2.type2].includes(t));

        const calcBST = (mon: Pokemon["baseStats"]) => mon.baseHP + mon.baseAttack + mon.baseDefense + mon.baseSpeed + mon.baseSpAttack + mon.baseSpDefense;
        Object.values(data.pokemon).filter(p => p.baseStats).forEach(p => p.baseStats.bst = calcBST(p.baseStats));

        let availableMons = Shuffle([...pokeConstants]);

        const replaceMon = (mon: string): string => {
            const origDistance = distanceLookup[mon];
            const origStats = monStatsLookup[mon].baseStats;
            return PickCascade(availableMons,
                m => Math.abs(origStats.bst - monStatsLookup[m].baseStats.bst) <= bstAbsRange, // Within provided BST range
                m => m != mon, // Not same mon
                m => sharesType(origStats, monStatsLookup[m].baseStats), // At least one type matches
                m => distanceLookup[m] == origDistance, // Same distance from final (Caterpie always evolves twice)
            ) || mon;
        };

        console.log("Randomizing starters...");

        for (let i = 0; i < data.starters.length; i++)
            data.starters[i] = replaceMon(data.starters[i]);

        console.log(`New starters: ${data.starters.join(', ')}`);

        console.log("Finished.");
    }

}