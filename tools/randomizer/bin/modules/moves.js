"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const move_constants_1 = require("../parsers/constants/move_constants");
const pokemon_constants_1 = require("../parsers/constants/pokemon_constants");
const base_stats_1 = require("../parsers/data/base_stats");
const evos_attacks_1 = require("../parsers/data/evos_attacks");
const moves_1 = require("../parsers/data/moves");
const include_list_1 = require("../parsers/include_list");
const splitcollection_1 = require("../parsers/splitcollection");
const pick_1 = require("../utils/pick");
class LearnsetRandomizer {
    constructor() {
        this.command = "learnsets";
        this.helpText = "Randomizes pokemon learnsets. Replaces non-attacks with non-attacks and STAB with STAB. Tries to keep attacks to within 40 power.";
    }
    operation() {
        const moveConstants = new move_constants_1.default("constants/move_constants.asm").data;
        const moveLookup = {};
        new moves_1.default("data/moves/moves.asm").data.forEach((m, i) => moveLookup[moveConstants[i + 1]] = m);
        const pokeConstants = new pokemon_constants_1.default("constants/pokemon_constants.asm").data;
        const monStatsLookup = [...new include_list_1.default("data/pokemon/base_stats_old.asm", base_stats_1.default).data, ...new include_list_1.default("data/pokemon/base_stats_new.asm", base_stats_1.default).data].map(m => m.data);
        const evosAttacksParser = new splitcollection_1.default(["data/pokemon/evos_attacks_kanto.asm", "data/pokemon/evos_attacks_johto.asm", "data/pokemon/evos_attacks_new.asm"], evos_attacks_1.default);
        const evosAttacks = evosAttacksParser.data;
        console.log("Randomizing learnsets");
        evosAttacks.forEach((mon, i) => {
            let availableMoves = moveConstants.slice(1).filter(m => m != "STRUGGLE" && m != "CHATTY_HP");
            console.log(pokeConstants[i]);
            const monStats = monStatsLookup[i];
            const attacks = /*Shuffle*/ (mon.attacks.map(atk => atk.move.split(' ').shift())).map(atk => {
                const oldMoveInfo = moveLookup[atk];
                const isStab = (m) => m.doesDamage && (m.type == monStats.type1 || m.type == monStats.type2);
                const shouldBeStab = isStab(oldMoveInfo);
                const newMove = (0, pick_1.PickCascade)(availableMoves, m => moveLookup[m].doesDamage == oldMoveInfo.doesDamage, // replace non-attack with non-attack
                // replace non-attack with non-attack
                m => !shouldBeStab || isStab(moveLookup[m]), // replace STAB with STAB
                // replace STAB with STAB
                m => Math.abs(moveLookup[m].power - oldMoveInfo.power) < 40, m => m != atk // don't pick same move
                );
                return newMove || atk;
            });
            mon.attacks = mon.attacks.map(atk => {
                atk.move = attacks.shift() || atk.move;
                return atk;
            });
            evosAttacksParser.update(i, mon);
        });
        console.log("Finished.");
    }
}
exports.default = LearnsetRandomizer;
