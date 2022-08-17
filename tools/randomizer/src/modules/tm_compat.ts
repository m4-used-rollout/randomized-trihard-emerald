import { hmMoves } from "../utils/montasks";
import { PickCascade } from "../utils/pick";

export default class TMCompatRandomizer implements RandoModule {
    command = "tm-compat"
    helpText = "Randomizes TM and Move Tutor compatibility, leaving HMs and Rock Smash alone.";
    operation(data: PokemonJson) {
        let availableTMs = new Array<string>();
        availableTMs = data.tmlist.filter((tm, i) => tm && !hmMoves.includes(data.tmMoves[i].toUpperCase()));

        console.log("Randomizing TM compatibility...");

        Object.values(data.pokemon).forEach(p => {
            const tmReplacements = [...availableTMs];
            const tutorReplacements = [...data.tutorList];
            p.tms = p.tms ? p.tms.map((tm: number) => {
                if (!tm || hmMoves.includes(data.tmMoves[tm]))
                    return tm;
                return data.tmlist.indexOf(PickCascade(tmReplacements, t => t != data.tmlist[tm]) || data.tmlist[tm]);
            }) : p.tms;
            p.tutor = p.tutor ? p.tutor.map(tutor => PickCascade(tutorReplacements, t => t != tutor) || tutor) : p.tutor;
        });

        console.log("Finished.")
    }

}