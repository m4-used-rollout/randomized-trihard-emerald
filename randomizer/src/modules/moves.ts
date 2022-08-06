import { randomInt } from "crypto";
import BaseStats from "../models/base_stats";
import EvosAttacks from "../models/evos_attacks";
import Move from "../models/move";
import MoveConstantsParser from "../parsers/constants/move_constants";
import PokemonConstantsParser from "../parsers/constants/pokemon_constants";
import BaseStatsParser from "../parsers/data/base_stats";
import EvosAttacksParser from "../parsers/data/evos_attacks";
import MovesParser from "../parsers/data/moves";
import IncludeListParser from "../parsers/include_list";
import SplitCollectionParser from "../parsers/splitcollection";
import { PickCascade, Shuffle } from "../utils/pick";

export default class LearnsetRandomizer implements RandoModule {
    command = "learnsets"
    helpText = "Randomizes pokemon learnsets. Replaces non-attacks with non-attacks and STAB with STAB. Tries to keep attacks to within 40 power.";
    operation() {
        const moveConstants = new MoveConstantsParser("constants/move_constants.asm").data;

        const moveLookup: { [key: string]: Move } = {};
        new MovesParser("data/moves/moves.asm").data.forEach((m, i) => moveLookup[moveConstants[i + 1]] = m);

        const pokeConstants = new PokemonConstantsParser("constants/pokemon_constants.asm").data;
        const monStatsLookup = [...new IncludeListParser("data/pokemon/base_stats_old.asm", BaseStatsParser).data, ...new IncludeListParser("data/pokemon/base_stats_new.asm", BaseStatsParser).data].map(m => m.data);

        const evosAttacksParser = new SplitCollectionParser<EvosAttacks, EvosAttacksParser>(["data/pokemon/evos_attacks_kanto.asm", "data/pokemon/evos_attacks_johto.asm", "data/pokemon/evos_attacks_new.asm"], EvosAttacksParser);

        const evosAttacks = evosAttacksParser.data;

        console.log("Randomizing learnsets");

        evosAttacks.forEach((mon, i) => {
            let availableMoves = moveConstants.slice(1).filter(m => m != "STRUGGLE" && m != "CHATTY_HP");
            console.log(pokeConstants[i]);
            const monStats = monStatsLookup[i];

            const attacks = /*Shuffle*/(mon.attacks.map(atk => atk.move.split(' ').shift())).map(atk => {
                const oldMoveInfo = moveLookup[atk];
                const isStab = (m: Move) => m.doesDamage && (m.type == monStats.type1 || m.type == monStats.type2);
                const shouldBeStab = isStab(oldMoveInfo);

                const newMove = PickCascade(availableMoves,
                    m => moveLookup[m].doesDamage == oldMoveInfo.doesDamage, // replace non-attack with non-attack
                    m => !shouldBeStab || isStab(moveLookup[m]), // replace STAB with STAB
                    m => Math.abs(moveLookup[m].power - oldMoveInfo.power) < 40,
                    m => m != atk // don't pick same move
                );
                return newMove || atk;
            });

            mon.attacks = mon.attacks.map(atk => {
                atk.move = attacks.shift() || atk.move;
                return atk;
            })

            evosAttacksParser.update(i, mon);
        })
        console.log("Finished.");
    }

}