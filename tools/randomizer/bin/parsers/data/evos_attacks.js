"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readwriteparser_1 = require("../readwriteparser");
class EvosAttacksParser extends readwriteparser_1.default {
    toEntry(entry) {
        return [
            `${entry.label}:`,
            ...entry.evos.map(e => {
                if (e.stat)
                    return `	dbbbw ${e.type}, ${e.parameter}, ${e.stat}, ${e.species}`;
                return `	dbbw ${e.type}, ${e.parameter}, ${e.species}`;
            }),
            '	db 0 ; no more evolutions',
            ...entry.attacks.map(a => `	dbw ${a.level}, ${a.move}`),
            '	db 0 ; no more level-up moves',
            ''
        ];
    }
    toFile(data) {
        return [
            ...this.fileHead,
            ...data.map(ea => `	dw ${ea.label}`),
            '',
            ...data.reduce((all, ea) => all.concat(...this.toEntry(ea)), [])
        ];
    }
    fromFile(file) {
        this.fileHead = file.slice(0, 3);
        const evosAttacks = new Array();
        file.filter(l => l.startsWith('	dw ')).map(l => /dw (.+)/.exec(l)[1]).forEach(label => {
            const entry = {
                label,
                evos: [],
                attacks: []
            };
            evosAttacks.push(entry);
            const firstLine = file.indexOf(`${label}:`);
            const lastLine = file.indexOf('', firstLine);
            file.slice(firstLine, lastLine).forEach(l => {
                if (l.startsWith('	dbbw')) {
                    const [, type, parameter, species] = /dbbw (.+?), (.+?), (.+)/.exec(l);
                    entry.evos.push({ type, parameter, species });
                }
                else if (l.startsWith('	dbbbw')) {
                    const [, type, parameter, stat, species] = /dbbbw (.+?), (.+?), (.+?), (.+)/.exec(l);
                    entry.evos.push({ type, parameter, stat, species });
                }
                else if (l.startsWith(`	dbw`)) {
                    const [, level, move] = /dbw (.+?), (.+)/.exec(l);
                    entry.attacks.push({ level: parseInt(level), move });
                }
            });
        });
        return evosAttacks;
    }
    test(expectedCount) {
        super.test();
        if (expectedCount && this.data.length != expectedCount)
            throw new Error(`Got ${this.data.length} evos/attacks records, expected ${expectedCount}`);
    }
}
exports.default = EvosAttacksParser;
