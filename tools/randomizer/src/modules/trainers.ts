import BaseStats from "../models/base_stats";
import EvosAttacks from "../models/evos_attacks";
import { PartyMon } from "../models/trainers";
import PokemonConstantsParser from "../parsers/constants/pokemon_constants";
import BaseStatsParser from "../parsers/data/base_stats";
import EvosAttacksParser from "../parsers/data/evos_attacks";
import TrainerParser from "../parsers/data/parties";
import IncludeListParser from "../parsers/include_list";
import SplitCollectionParser from "../parsers/splitcollection";
import { PickCascade, Shuffle } from "../utils/pick";

export default class TrainerRandomizer implements RandoModule {
    command = "trainers"
    helpText = "Randomizes trainer pokemon. Shuffles TPP Runmons between TPP trainers. Otherwise, keeps same distance from final. Tries to match one type with original. Tries to stay within provided BST (100 is default) of original.";
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

        const trainerParser = new TrainerParser("data/trainers/parties.asm");

        const trainers = trainerParser.data;

        console.log("Randomizing TPP trainers");

        const tppTrainers = trainers.filter(t => t.type.includes("TRAINERTYPE_NICKNAME")).map(t => ({
            trainer: t,
            maxLevel: t.party.reduce((max, cur) => Math.max(max, cur.level), 0),
            minLevel: t.party.reduce((min, cur) => Math.min(min, cur.level), 100)
        }));
        const tppRunmons = tppTrainers.reduce((all, cur) => all.concat(...cur.trainer.party), new Array<PartyMon>());
        tppRunmons.forEach(m => m.moves = m.moves || ["METRONOME", "NO_MOVE", "NO_MOVE", "NO_MOVE"]); // Fix MARINA's mons

        tppTrainers.forEach(t => {
            t.trainer.type = t.trainer.type.filter(t => t != "TRAINERTYPE_STATS"); // Remove baked-in stats
            t.trainer.party = t.trainer.party.map(p => PickCascade(tppRunmons, mon => mon != p));
            [...t.trainer.party].reverse().forEach((p, i) => p.level = Math.max(t.maxLevel - i, t.minLevel));
        });

        console.log("Randomizing other trainers");

        const otherTrainers = trainers.filter(t => !t.specialTrainer && !t.type.includes("TRAINERTYPE_NICKNAME"));

        otherTrainers.forEach(t => t.type = t.type.filter(t => t != "TRAINERTYPE_MOVES")); // Remove baked-in moves and use the random movesets
        otherTrainers.forEach(t => t.type = t.type.length < 1 ? ["TRAINERTYPE_NORMAL"] : t.type); // Fix trainers with no remaining types


        const totalMons = otherTrainers.reduce((sum, t) => sum + t.party.length, 0);

        let availableMons = [...pokeConstants];
        while (availableMons.length < totalMons)
            availableMons.push(...pokeConstants);
        availableMons = Shuffle(availableMons);
        availableMons.length = totalMons;

        const sharesType = (mon1: BaseStats, mon2: BaseStats) => [mon1.type1, mon1.type2].some(t => [mon2.type1, mon2.type2].includes(t));

        const replaceMon = (mon: string): string => {
            const origDistance = distanceLookup[mon];
            const origStats = monStatsLookup[mon];
            return PickCascade(availableMons,
                m => Math.abs(origStats.bst - monStatsLookup[m].bst) <= bstAbsRange, // Within provided BST range
                m => m != mon, // Not same mon
                m => sharesType(origStats, monStatsLookup[m]), // At least one type matches
                m => distanceLookup[m] == origDistance, // Same distance from final (Caterpie always evolves twice)
            ) || mon;
        };

        for (let i = 0; i < 6; i++)
            otherTrainers.forEach(t => {
                if (t.party[i])
                    t.party[i].species = replaceMon(t.party[i].species);
            });

        console.log(`Randomized ${totalMons} trainer mons in ${otherTrainers.length} parties.`);

        trainerParser.data = trainers;

        console.log("Finished.");
    }

}