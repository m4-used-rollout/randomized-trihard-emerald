import { buildMoveLookup } from "../utils/montasks";
import { PickCascade } from "../utils/pick";

export default class LearnsetRandomizer implements RandoModule {
    command = "learnsets"
    helpText = "Randomizes pokemon learnsets. Replaces non-attacks with non-attacks and STAB with STAB. Tries to keep attacks to within 40 power.";
    operation(data: PokemonJson) {
        console.log("Randomizing learnsets");

        const { availableMoves, moveLookup } = buildMoveLookup(data);

        Object.keys(data.pokemon).forEach(k => {
            const mon = data.pokemon[k];

            console.log(k);
            const monStats = mon.baseStats;

            (data.lvlTables[mon.lvlLearnset] || []).forEach(learn => {
                const atk = learn.move;
                const oldMoveInfo = moveLookup[atk];
                const isStab = (m: Move) => m.power > 0 && (m.type == monStats.type1 || m.type == monStats.type2);
                const shouldBeStab = isStab(oldMoveInfo);

                const moves = [...availableMoves];

                const newMove = PickCascade(moves,
                    m => (m.power > 0) == (oldMoveInfo.power > 0), // replace non-attack with non-attack
                    m => !shouldBeStab || isStab(m), // replace STAB with STAB
                    m => Math.abs(m.power - oldMoveInfo.power) < 40,
                    m => m.id != atk // don't pick same move
                );
                if (newMove)
                    learn.move = newMove.id;
            });
        })
        console.log("Finished.");
    }

}