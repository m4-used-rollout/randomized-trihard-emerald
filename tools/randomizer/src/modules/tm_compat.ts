import { randomInt } from "crypto";
import { PickCascade } from "../utils/pick";


const immutableTMs = ["CUT", "FLY", "SURF", "STRENGTH", "FLASH", "ROCK_SMASH", "WATERFALL", "DIVE"];

export default class TMCompatRandomizer implements RandoModule {
    command = "tm-compat"
    helpText = "Randomizes TM and Move Tutor compatibility, leaving HMs and Rock Smash alone.";
    operation(data: PokemonJson) {
        let availableTMs = new Array<string>();
        availableTMs = data.tmlist.filter((tm, i) => tm && !immutableTMs.includes(data.tmMoves[i].toUpperCase()));

        console.log("Randomizing TM compatibility...");

        Object.values(data.pokemon).forEach(p => {
            const replacements = [...availableTMs];
            p.tms = p.tms ? p.tms.map((tm: number) => {
                if (!tm || immutableTMs.includes(data.tmMoves[tm]))
                    return tm;
                return data.tmlist.indexOf(PickCascade(replacements, t => t != data.tmlist[tm]) || data.tmlist[tm]);
            }) : p.tms;
        });

        console.log("Finished.")
    }

}