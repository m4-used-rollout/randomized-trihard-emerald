"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_stats_1 = require("../parsers/data/base_stats");
const include_list_1 = require("../parsers/include_list");
const pick_1 = require("../utils/pick");
const immutableTMs = ["ROCK_SMASH", "CUT", "FLY", "SURF", "STRENGTH", "FLASH", "WHIRLPOOL", "WATERFALL"];
class TMCompatRandomizer {
    constructor() {
        this.command = "tm-compat";
        this.helpText = "Randomizes TM and Move Tutor compatibility, leaving HMs and Rock Smash alone.";
    }
    operation() {
        const baseStatParsers = [...new include_list_1.default("data/pokemon/base_stats_old.asm", base_stats_1.default).data, ...new include_list_1.default("data/pokemon/base_stats_new.asm", base_stats_1.default).data];
        let availableTMs = new Array();
        baseStatParsers.forEach(p => p.data.tmhms.forEach(tm => availableTMs.includes(tm) ? null : availableTMs.push(tm)));
        availableTMs = availableTMs.filter(tm => !immutableTMs.includes(tm));
        console.log("Randomizing TM compatibility...");
        baseStatParsers.forEach(p => {
            const replacements = [...availableTMs];
            const data = p.data;
            data.tmhms = data.tmhms.map(tm => {
                if (immutableTMs.includes(tm))
                    return tm;
                return (0, pick_1.PickCascade)(replacements, t => t != tm) || tm;
            });
            p.data = data;
        });
        console.log("Finished.");
    }
}
exports.default = TMCompatRandomizer;
