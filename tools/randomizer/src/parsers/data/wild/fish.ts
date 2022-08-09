import { group } from "console";
import { Encounter, EncounterWithRate, FishingEncounters, FishMons, FishTimeGroup } from "../../../models/wild";
import ReadWriteParser from "../../readwriteparser";

export default class WildFishParser extends ReadWriteParser<FishingEncounters> {
    private fileHead: string[];
    private fishingLine(line: EncounterWithRate) {
        return `	dbbw ${line.rate.startsWith('100') ? "" : " "}${line.rate}, ${line.level.toString().padStart(17 - (line.rate.length + (line.rate.startsWith('100') ? 0 : 1)))}, ${line.species}`;
    }
    private toEntry(entry: FishMons): string[] {
        return [
            `.${entry.label}_Old:`,
            ...entry.oldRod.map(f => this.fishingLine(f)),
            `.${entry.label}_Good:`,
            ...entry.goodRod.map(f => this.fishingLine(f)),
            `.${entry.label}_Super:`,
            ...entry.superRod.map(f => this.fishingLine(f)),
            ''
        ];
    }
    protected toFile(data: FishingEncounters): string[] {
        return [
            ...this.fileHead,
            ...data.groups.reduce((all, cur) => all.concat(this.toEntry(cur)), new Array<string>()),
            'TimeFishGroups:',
            '	;     day             nite',
            ...data.timeGroups.map((g, i) => `	dbwbw ${g.day.level}, ${g.day.species}, ${g.nite.level.toString().padStart(12 - g.day.species.length)}, ${g.nite.species} ${''.padStart(9 - g.nite.species.length)} ; ${i}`),
            ''
        ]
    }
    protected fromFile(file: string[]): FishingEncounters {
        this.fileHead = file.slice(0, 23);
        const fish: FishingEncounters = {
            groups: [],
            timeGroups: []
        };

        // Fish groups
        file.filter(l => l.endsWith('_Old:')).map(l => /\.(.+?)_Old:/.exec(l)[1]).forEach(label => {
            const entry = {
                label,
                oldRod: [],
                goodRod: [],
                superRod: []
            } as FishMons;
            fish.groups.push(entry);
            const firstLine = file.indexOf(`.${label}_Old:`);
            const lastLine = file.indexOf('', firstLine);
            let currentTime = entry.oldRod;
            file.slice(firstLine + 1, lastLine).forEach(l => {
                switch (l) {
                    case `.${label}_Old:`:
                        currentTime = entry.oldRod;
                        break;
                    case `.${label}_Good:`:
                        currentTime = entry.goodRod;
                        break;
                    case `.${label}_Super:`:
                        currentTime = entry.superRod;
                        break;
                    default:
                        if (l.startsWith('	dbbw')) {
                            const [, rate, level, species] = /dbbw \s*([^,;]+), \s*(\d+), (.+)/.exec(l);
                            currentTime.push({ rate, level: parseInt(level), species });
                        }
                }
            });
        });

        const firstLine = file.indexOf("TimeFishGroups:") + 1;
        const lastLine = file.indexOf('', firstLine);
        file.slice(firstLine + 1, lastLine).forEach(l => {
            if (l.startsWith('	dbwbw')) {
                const group: FishTimeGroup = {
                    day: {} as Encounter,
                    nite: {} as Encounter
                };
                [, group.day.level, group.day.species, group.nite.level, group.nite.species] = /dbwbw (\d+), (.+?), \s*(\d+), ([^\s]+)/.exec(l).map(i => parseInt(i) || i) as any;
                fish.timeGroups.push(group);
            }
        });

        return fish;
    }

}