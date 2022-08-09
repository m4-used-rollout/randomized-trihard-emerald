"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readwriteparser_1 = require("../../readwriteparser");
class WildTreeMonParser extends readwriteparser_1.default {
    toSet(set) {
        return [
            ...set.map(t => `	dbbw ${t.rate.toString().padStart(2)}, ${t.level.toString().padStart(2)}, ${t.species}`),
            '	db -1'
        ];
    }
    toEntry(entry) {
        if (!entry.rare) {
            return [
                `${entry.label}:`,
                ...this.toSet(entry.common),
                ''
            ];
        }
        return [
            `${entry.label}:`,
            '; common',
            ...this.toSet(entry.common),
            '; rare',
            ...this.toSet(entry.rare),
            ''
        ];
    }
    toFile(data) {
        return [
            ...this.fileHead,
            ...data.reduce((all, cur) => all.concat(...this.toEntry(cur)), new Array())
        ];
    }
    fromFile(file) {
        this.fileHead = file.slice(0, 17);
        return file.filter(l => l.startsWith('	dw ')).map(l => /	dw (.+)/.exec(l)[1])
            .filter(label => label != "TreeMonSet_City") //duplicates Canyon
            .map(label => {
            const entry = {
                label,
                common: []
            };
            const firstLine = file.indexOf(`${label}:`);
            const lastLine = file.indexOf('', firstLine);
            let currentSet = entry.common;
            file.slice(firstLine + 1, lastLine).forEach(l => {
                switch (l) {
                    case '; common':
                        currentSet = entry.common;
                        break;
                    case '; rare':
                        currentSet = entry.rare = [];
                        break;
                    default:
                        if (l.startsWith('	dbbw')) {
                            const [, rate, level, species] = /dbbw \s*([^,;]+), \s*(\d+), (.+)/.exec(l);
                            currentSet.push({ rate, level: parseInt(level), species });
                        }
                }
            });
            return entry;
        });
    }
}
exports.default = WildTreeMonParser;
