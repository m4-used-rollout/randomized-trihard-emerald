import { buildMoveLookup, hmMoves } from "../utils/montasks";
import { PickCascade } from "../utils/pick";


export default class TMMovesRandomizer implements RandoModule {
    command = "tm-moves"
    helpText = "Randomizes TM and Move Tutor moves, leaving HMs and Rock Smash alone. Replaces non-attacks with non-attacks.";
    operation(data: PokemonJson) {

        const { availableMoves, moveLookup } = buildMoveLookup(data, true);

        console.log("Randomizing TMs and Move Tutors");

        const replaceMoves = (moveList: string[]) => moveList.map(oldMove => {
            if (!oldMove || hmMoves.includes(oldMove.toUpperCase())) {
                console.log(`Not replacing ${oldMove}`)
                return oldMove;
            }

            const oldMoveInfo = moveLookup[oldMove];
            const newMove = PickCascade(availableMoves,
                m => m.power > 0 == oldMoveInfo.power > 0, // replace non-attacks with non-attacks
                m => m.id != oldMove // don't pick same move
            ) || oldMoveInfo;

            if (oldMove == newMove.id)
                console.log(`Randomly kept ${oldMove}`);
            else
                console.log(`Replacing ${oldMove} with ${newMove.id}`);
            return newMove.id;
        })
        data.tmMoves = replaceMoves(data.tmMoves);
        const oldTutorList = [...data.tutorList];
        data.tutorList = replaceMoves(data.tutorList.map(m => m.replace('MOVE_', '').toLowerCase())).map(m => `MOVE_${m.toUpperCase()}`);

        // update tutor constants
        Object.values(data.pokemon).forEach(p => p.tutor = p.tutor && p.tutor.map(t => data.tutorList[oldTutorList.indexOf(t)]));

        console.log("Finished.");

    }

}