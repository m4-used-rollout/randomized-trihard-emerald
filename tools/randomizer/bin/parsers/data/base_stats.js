"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_stats_1 = require("../../models/base_stats");
const readwriteparser_1 = require("../readwriteparser");
class BaseStatsParser extends readwriteparser_1.default {
    fromFile(file) {
        // try {
        const text = file.join("\n");
        const bs = new base_stats_1.default();
        [, bs.stats.hp, bs.stats.atk, bs.stats.def, bs.stats.spd, bs.stats.sat, bs.stats.sdf] = /db\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+)/.exec(text).map(s => parseInt(s));
        [, bs.type1, bs.type2] = /db (.+?), (.+?) ; type/.exec(text);
        [, bs.catchRate] = /db (\d+) ; catch rate/.exec(text).map(s => parseInt(s));
        [, bs.baseExp] = /db (\d+) ; base exp/.exec(text).map(s => parseInt(s));
        [, bs.item1, bs.item2] = /db (.+?), (.+?) ; items/.exec(text);
        [, bs.genderRatio] = /db (.+?) ; gender ratio/.exec(text);
        [, bs.frontDimensions] = /INCBIN "(.+?)"/.exec(text);
        [, bs.eggCycles] = /db (\d+) ; step cycles to hatch/.exec(text).map(s => parseInt(s));
        [, bs.growthRate] = /db (.+?) ; growth rate/.exec(text);
        [, bs.eggGroup1, bs.eggGroup2] = /dn (.+?), (.+?) ; egg groups/.exec(text);
        [, bs.tmhms] = (/tmhm (.+)/.exec(text) || ['', '']).map(s => s.split(", ").filter(t => !!t));
        return bs;
        // }
        // catch (e) {
        //     throw new Error(`Failed to parse ${this.filename}: "${e.message}"`);
        // }
    }
    toFile(bs) {
        return [
            `:	db 0 ; species ID placeholder`,
            ``,
            `	db ${bs.stats.hp.toString().padStart(3)}, ${bs.stats.atk.toString().padStart(3)}, ${bs.stats.def.toString().padStart(3)}, ${bs.stats.spd.toString().padStart(3)}, ${bs.stats.sat.toString().padStart(3)}, ${bs.stats.sdf.toString().padStart(3)}`,
            `	;   hp  atk  def  spd  sat  sdf`,
            ``,
            `	db ${bs.type1}, ${bs.type2} ; type`,
            `	db ${bs.catchRate} ; catch rate`,
            `	db ${bs.baseExp} ; base exp`,
            `	db ${bs.item1}, ${bs.item2} ; items`,
            `	db ${bs.genderRatio} ; gender ratio`,
            `	INCBIN "${bs.frontDimensions}"`,
            `	db ${bs.eggCycles} ; step cycles to hatch`,
            `	db ${bs.growthRate} ; growth rate`,
            `	dn ${bs.eggGroup1}, ${bs.eggGroup2} ; egg groups`,
            ``,
            `	; tm/hm learnset`,
            `	tmhm ${bs.tmhms.join(', ')}`,
            ``,
            `	ds BASE_PADDING_SIZE ; padding`,
            `	assert (@ - :-) == BASE_DATA_SIZE ; end`,
            ``
        ];
    }
}
exports.default = BaseStatsParser;
