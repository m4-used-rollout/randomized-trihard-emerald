import { randomInt } from "crypto";
import BaseStatsParser from "../parsers/data/base_stats";
import IncludeListParser from "../parsers/include_list";
import { PickCascade } from "../utils/pick";


const immutableTMs = ["ROCK_SMASH", "CUT", "FLY", "SURF", "STRENGTH", "FLASH", "WHIRLPOOL", "WATERFALL"];

export default class TMCompatRandomizer implements RandoModule {
    command = "tm-compat"
    helpText = "Randomizes TM and Move Tutor compatibility, leaving HMs and Rock Smash alone.";
    operation() {
        const baseStatParsers = [...new IncludeListParser("data/pokemon/base_stats_old.asm", BaseStatsParser).data, ...new IncludeListParser("data/pokemon/base_stats_new.asm", BaseStatsParser).data];
        let availableTMs = new Array<string>();
        baseStatParsers.forEach(p => p.data.tmhms.forEach(tm => availableTMs.includes(tm) ? null : availableTMs.push(tm)));
        availableTMs = availableTMs.filter(tm => !immutableTMs.includes(tm));

        console.log("Randomizing TM compatibility...");

        baseStatParsers.forEach(p => {
            const replacements = [...availableTMs];
            const data = p.data;
            data.tmhms = data.tmhms.map(tm => {
                if (immutableTMs.includes(tm))
                    return tm;
                return PickCascade(replacements, t => t != tm) || tm;
            })
            p.data = data;
        });

        console.log("Finished.")
    }

}