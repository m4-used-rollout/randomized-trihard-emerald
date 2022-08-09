import { randomInt } from "crypto";
import Move from "../models/move";
import MoveConstantsParser from "../parsers/constants/move_constants";
import MovesParser from "../parsers/data/moves";
import TMHMParser from "../parsers/data/tmhm";
import { PickCascade } from "../utils/pick";

const immutableTMs = ["ROCK_SMASH", "CUT", "FLY", "SURF", "STRENGTH", "FLASH", "WHIRLPOOL", "WATERFALL"];

export default class TMMovesRandomizer implements RandoModule {
    command = "tm-moves"
    helpText = "Randomizes TM and Move Tutor moves, leaving HMs and Rock Smash alone. Replaces non-attacks with non-attacks.";
    operation() {
        const moveConstants = new MoveConstantsParser("constants/move_constants.asm").data;
        const moveLookup: { [key: string]: Move } = {};
        new MovesParser("data/moves/moves.asm").data.forEach((m, i) => moveLookup[moveConstants[i + 1]] = m);
        const tmParser = new TMHMParser("data/moves/tmhm_moves.asm");
        const tms = tmParser.data;

        console.log("Randomizing TMs and Move Tutors");

        let availableMoves = moveConstants.slice(1).filter(m => m != "STRUGGLE" && m != "CHATTY_HP" && m != "CHATTER" && !immutableTMs.includes(m));

        const replaceMoves = (moveList: string[]) => moveList.map(oldMove => {
            if (immutableTMs.includes(oldMove)) {
                console.log(`Not replacing ${oldMove}`)
                return oldMove;
            }

            const oldMoveInfo = moveLookup[oldMove];
            const newMove = PickCascade(availableMoves,
                m => moveLookup[m].doesDamage == oldMoveInfo.doesDamage, // replace non-attacks with non-attacks
                m => m != oldMove // don't pick same move
            ) || oldMove;

            if (oldMove == newMove)
                console.log(`Randomly kept ${oldMove}`);
            else
                console.log(`Replacing ${oldMove} with ${newMove}`);
            return newMove;
        })
        tms.tms = replaceMoves(tms.tms);
        tms.moveTutors = replaceMoves(tms.moveTutors);

        console.log("Finished.");

        tmParser.data = tms;
    }

}