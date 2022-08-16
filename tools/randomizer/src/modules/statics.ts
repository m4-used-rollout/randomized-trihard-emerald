import { buildEvoLookup, buildPokeConstants, calculateBST, getAllWildPokemon, getAllWildsWithSummedRarity, sharesType } from "../utils/montasks";
import { PickCascade, Shuffle } from "../utils/pick";

export default class StaticMonRandomizer implements RandoModule {
    command = "statics"
    helpText = "Randomizes static encounter/gift pokemon. Tries to stay within provided BST (100 is default) of original.";
    operation(data: PokemonJson, bstRange = "100") {
        const bstAbsRange = Math.abs(parseInt(bstRange) || 100) / 2;

        calculateBST(data);

        const pokeConstants = buildPokeConstants(data, true);
        const monStatsLookup = data.pokemon;

        const wildMons = getAllWildPokemon(data);
        const rareWilds = getAllWildsWithSummedRarity(data).filter(m => m.rate < 50).map(m => m.mon);
        const notInWilds = pokeConstants.filter(p => !wildMons.includes(p));
        const availableMons = Shuffle([...notInWilds, ...rareWilds].filter(m => !data.npcTrades.some(t => t.monOut == m)));

        const replaceMon = (mon: string, mons = availableMons): string => {
            const origStats = monStatsLookup[mon].baseStats;
            return PickCascade(mons,
                m => Math.abs(origStats.bst - monStatsLookup[m].baseStats.bst) <= bstAbsRange, // Within provided BST range
                m => m != mon, // Not same mon
            ) || mon;
        };

        console.log("Randomizing Static encounters and giftmons...");

        data.staticMons.forEach(staticMon => {
            const oldMon = staticMon.mon;
            staticMon.mon = replaceMon(staticMon.mon, availableMons);
            console.log(`${oldMon} => ${staticMon.mon}`);
        });

        console.log("Finished.");
    }

}