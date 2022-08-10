import { PickCascade } from "../utils/pick";

const immutableTMs = ["CUT", "FLY", "SURF", "STRENGTH", "FLASH", "ROCK_SMASH", "WATERFALL", "DIVE"];

export default class TMMovesRandomizer implements RandoModule {
    command = "tm-moves"
    helpText = "Randomizes TM and Move Tutor moves, leaving HMs and Rock Smash alone. Replaces non-attacks with non-attacks.";
    operation(data: PokemonJson) {
        const availableMoves = data.moves.filter(m => m.id != "struggle" && m.id && !immutableTMs.includes(m.id.toUpperCase()));
        const moveLookup: Record<string, Move> = {};
        availableMoves.forEach(m => moveLookup[m.id] = m);

        console.log("Randomizing TMs and Move Tutors");

        const replaceMoves = (moveList: string[]) => moveList.map(oldMove => {
            if (!oldMove || immutableTMs.includes(oldMove.toUpperCase())) {
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
        data.tutorList = replaceMoves(data.tutorList.map(m => m.replace('MOVE_', '').toLowerCase())).map(m => `MOVE_${m.toUpperCase()}`);

        console.log("Finished.");

    }

}