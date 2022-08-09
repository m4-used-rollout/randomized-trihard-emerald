"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readwriteparser_1 = require("../../readwriteparser");
class WildBugContestParser extends readwriteparser_1.default {
    toFile(data) {
        return [
            ...this.fileHead,
            ...data.map(b => `	dbwbb ${b.percent.toString().padStart(2)}, ${b.species}, ${b.minLevel.toString().padStart(12 - b.species.length)}, ${b.maxLevel.toString().padStart(2)}`),
            ''
        ];
    }
    fromFile(file) {
        this.fileHead = file.slice(0, 2);
        return file.filter(l => l.startsWith('	dbwbb')).map(l => {
            const [, percent, species, minLevel, maxLevel] = /dbwbb \s*([\d-]+), (.+?), \s*(\d+), \s*(\d+)/.exec(l);
            return {
                percent: parseInt(percent),
                species,
                minLevel: parseInt(minLevel),
                maxLevel: parseInt(maxLevel)
            };
        });
    }
}
exports.default = WildBugContestParser;
