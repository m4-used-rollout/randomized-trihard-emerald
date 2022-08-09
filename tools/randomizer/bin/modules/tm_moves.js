"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const move_constants_1 = require("../parsers/constants/move_constants");
const moves_1 = require("../parsers/data/moves");
const tmhm_1 = require("../parsers/data/tmhm");
const pick_1 = require("../utils/pick");
const immutableTMs = ["ROCK_SMASH", "CUT", "FLY", "SURF", "STRENGTH", "FLASH", "WHIRLPOOL", "WATERFALL"];
class TMMovesRandomizer {
    constructor() {
        this.command = "tm-moves";
        this.helpText = "Randomizes TM and Move Tutor moves, leaving HMs and Rock Smash alone. Replaces non-attacks with non-attacks.";
    }
    operation() {
        const moveConstants = new move_constants_1.default("constants/move_constants.asm").data;
        const moveLookup = {};
        new moves_1.default("data/moves/moves.asm").data.forEach((m, i) => moveLookup[moveConstants[i + 1]] = m);
        const tmParser = new tmhm_1.default("data/moves/tmhm_moves.asm");
        const tms = tmParser.data;
        console.log("Randomizing TMs and Move Tutors");
        let availableMoves = moveConstants.slice(1).filter(m => m != "STRUGGLE" && m != "CHATTY_HP" && m != "CHATTER" && !immutableTMs.includes(m));
        const replaceMoves = (moveList) => moveList.map(oldMove => {
            if (immutableTMs.includes(oldMove)) {
                console.log(`Not replacing ${oldMove}`);
                return oldMove;
            }
            const oldMoveInfo = moveLookup[oldMove];
            const newMove = (0, pick_1.PickCascade)(availableMoves, m => moveLookup[m].doesDamage == oldMoveInfo.doesDamage, // replace non-attacks with non-attacks
            // replace non-attacks with non-attacks
            m => m != oldMove // don't pick same move
            ) || oldMove;
            if (oldMove == newMove)
                console.log(`Randomly kept ${oldMove}`);
            else
                console.log(`Replacing ${oldMove} with ${newMove}`);
            return newMove;
        });
        tms.tms = replaceMoves(tms.tms);
        tms.moveTutors = replaceMoves(tms.moveTutors);
        console.log("Finished.");
        tmParser.data = tms;
    }
}
exports.default = TMMovesRandomizer;
