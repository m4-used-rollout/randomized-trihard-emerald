import { EncounterWithRate, TreeMons } from "../../../models/wild";
import ReadWriteParser from "../../readwriteparser";

export default class WildTreeMonParser extends ReadWriteParser<TreeMons[]> {
    private fileHead: string[];
    protected toSet(set: EncounterWithRate[]) {
        return [
            ...set.map(t => `	dbbw ${t.rate.toString().padStart(2)}, ${t.level.toString().padStart(2)}, ${t.species}`),
            '	db -1'
        ]
    }
    protected toEntry(entry: TreeMons) {
        if (!entry.rare) {
            return [
                `${entry.label}:`,
                ...this.toSet(entry.common),
                ''
            ]
        }
        return [
            `${entry.label}:`,
            '; common',
            ...this.toSet(entry.common),
            '; rare',
            ...this.toSet(entry.rare),
            ''
        ]
    }
    protected toFile(data: TreeMons[]): string[] {
        return [
            ...this.fileHead,
            ...data.reduce((all, cur) => all.concat(...this.toEntry(cur)), new Array<string>())
        ]
    }
    protected fromFile(file: string[]): TreeMons[] {
        this.fileHead = file.slice(0, 17);
        return file.filter(l => l.startsWith('	dw ')).map(l => /	dw (.+)/.exec(l)[1])
            .filter(label => label != "TreeMonSet_City") //duplicates Canyon
            .map(label => {
                const entry = {
                    label,
                    common: []
                } as TreeMons;
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