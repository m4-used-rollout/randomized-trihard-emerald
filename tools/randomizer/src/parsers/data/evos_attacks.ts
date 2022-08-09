import EvosAttacks from "../../models/evos_attacks";
import ReadWriteParser from "../readwriteparser";

export default class EvosAttacksParser extends ReadWriteParser<EvosAttacks[]> {
    private fileHead: string[];
    private toEntry(entry: EvosAttacks): string[] {
        return [
            `${entry.label}:`,
            ...entry.evos.map(e => {
                if (e.stat)
                    return `	dbbbw ${e.type}, ${e.parameter}, ${e.stat}, ${e.species}`
                return `	dbbw ${e.type}, ${e.parameter}, ${e.species}`
            }),
            '	db 0 ; no more evolutions',
            ...entry.attacks.map(a => `	dbw ${a.level}, ${a.move}`),
            '	db 0 ; no more level-up moves',
            ''
        ]
    }
    protected toFile(data: EvosAttacks[]): string[] {
        return [
            ...this.fileHead,
            ...data.map(ea => `	dw ${ea.label}`),
            '',
            ...data.reduce((all, ea) => all.concat(...this.toEntry(ea)), [])
        ];
    }
    protected fromFile(file: string[]): EvosAttacks[] {
        this.fileHead = file.slice(0, 3);
        const evosAttacks = new Array<EvosAttacks>();
        file.filter(l => l.startsWith('	dw ')).map(l => /dw (.+)/.exec(l)[1]).forEach(label => {
            const entry: EvosAttacks = {
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

    public test(expectedCount?: number): void {
        super.test();
        if (expectedCount && this.data.length != expectedCount)
            throw new Error(`Got ${this.data.length} evos/attacks records, expected ${expectedCount}`);

    }
}