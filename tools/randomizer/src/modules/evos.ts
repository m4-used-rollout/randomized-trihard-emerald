import BaseStats from "../models/base_stats";
import EvosAttacks from "../models/evos_attacks";
import PokemonConstantsParser from "../parsers/constants/pokemon_constants";
import BaseStatsParser from "../parsers/data/base_stats";
import EvosAttacksParser from "../parsers/data/evos_attacks";
import IncludeListParser from "../parsers/include_list";
import SplitCollectionParser from "../parsers/splitcollection";
import { PickCascade, Shuffle } from "../utils/pick";

export default class EvolutionRandomizer implements RandoModule {
    command = "evos"
    helpText = "Randomizes pokemon evolutions. Keeps same distance from final (Caterpie will always evolve twice). Tries to match one type with original evo. Tries to stay within provided BST (100 is default) of original evo. Ignores TRADE evos.";
    operation(bstRange = "100") {
        const bstAbsRange = Math.abs(parseInt(bstRange) || 100) / 2;

        const pokeConstants = new PokemonConstantsParser("constants/pokemon_constants.asm").data;
        const monStatsLookup: { [key: string]: BaseStats } = {};
        [...new IncludeListParser("data/pokemon/base_stats_old.asm", BaseStatsParser).data, ...new IncludeListParser("data/pokemon/base_stats_new.asm", BaseStatsParser).data].forEach((s, i) => monStatsLookup[pokeConstants[i]] = s.data);
        const evosAttacksParser = new SplitCollectionParser<EvosAttacks, EvosAttacksParser>(["data/pokemon/evos_attacks_kanto.asm", "data/pokemon/evos_attacks_johto.asm", "data/pokemon/evos_attacks_new.asm"], EvosAttacksParser);

        const evosAttacks = evosAttacksParser.data;

        const evoLookup: { [key: string]: string[] } = {};

        evosAttacks.forEach((e, i) => evoLookup[pokeConstants[i]] = e.evos.map(e => e.species));

        const distanceFromFinal = (mon: string): number => 1 + evoLookup[mon].reduce((max, cur) => Math.max(max, distanceFromFinal(cur)), 0);

        const availableEvos = evosAttacks.map((_, i) => ({ mon: pokeConstants[i], distance: distanceFromFinal(pokeConstants[i]) }));

        const sharesType = (mon1: BaseStats, mon2: BaseStats) => [mon1.type1, mon1.type2].some(t => [mon2.type1, mon2.type2].includes(t));

        const replaceEvo = (mon: string): string => {
            const origDistance = distanceFromFinal(mon);
            const origStats = monStatsLookup[mon];
            return (PickCascade(availableEvos,
                e => e.mon != mon, // Not same mon
                e => e.distance == origDistance, // Same distance from final (Caterpie always evolves twice)
                e => sharesType(origStats, monStatsLookup[e.mon]), // At least one type matches
                e => Math.abs(origStats.bst - monStatsLookup[e.mon].bst) <= bstAbsRange // Within provided BST range
            ) || { mon }).mon;
        };

        const shuffledEA = Shuffle(evosAttacks.map((ea, i) => ({ ea, i }))); // Randomize order so early mons don't necessarily get better picks

        console.log("Randomizing evolutions");
        shuffledEA.filter(ea => ea.ea.evos.length > 0).forEach(ea => {
            const [evo, i] = [ea.ea, ea.i];
            const monName = pokeConstants[i];

            evo.evos = evo.evos.map(e => e.type.indexOf("TRADE") >= 0 ? e : ({ ...e, species: replaceEvo(e.species) }));

            console.log(`${monName} => ${evo.evos.map(e => e.species).join(", ")}`);

            evosAttacksParser.update(i, evo);
        })
        console.log("Finished.");
    }

}