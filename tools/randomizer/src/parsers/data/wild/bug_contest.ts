import { ContestMons } from "../../../models/wild";
import ReadWriteParser from "../../readwriteparser";

export default class WildBugContestParser extends ReadWriteParser<ContestMons> {
    private fileHead: string[];
    protected toFile(data: ContestMons): string[] {
        return [
            ...this.fileHead,
            ...data.map(b => `	dbwbb ${b.percent.toString().padStart(2)}, ${b.species}, ${b.minLevel.toString().padStart(12 - b.species.length)}, ${b.maxLevel.toString().padStart(2)}`),
            ''
        ]
    }
    protected fromFile(file: string[]): ContestMons {
        this.fileHead = file.slice(0, 2);
        return file.filter(l => l.startsWith('	dbwbb')).map(l => {
            const [, percent, species, minLevel, maxLevel] = /dbwbb \s*([\d-]+), (.+?), \s*(\d+), \s*(\d+)/.exec(l);
            return {
                percent: parseInt(percent),
                species,
                minLevel: parseInt(minLevel),
                maxLevel: parseInt(maxLevel)
            }
        });
    }

}