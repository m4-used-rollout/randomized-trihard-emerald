import Encounters from "../../../models/wild";
import ReadWriteParser from "../../readwriteparser";


export default class WildGrassWaterParser extends ReadWriteParser<Encounters[]> {
    private fileHead: string[];

    private toEntry(entry: Encounters): string[] {
        if (entry.day && entry.nite) {
            return [
                `	map_id ${entry.mapId}`,
                `	db ${entry.mornRate}, ${entry.dayRate}, ${entry.niteRate} ; encounter rates: morn/day/nite`,
                `	; morn`,
                ...entry.morn.map(m => `	dbw ${m.level}, ${m.species}`),
                `	; day`,
                ...entry.day.map(m => `	dbw ${m.level}, ${m.species}`),
                `	; nite`,
                ...entry.nite.map(m => `	dbw ${m.level}, ${m.species}`),
                ''
            ];
        }
        return [
            `	map_id ${entry.mapId}`,
            `	db ${entry.mornRate} ; encounter rate`,
            ...entry.morn.map(m => `	dbw ${m.level}, ${m.species}`),
            ''
        ];
    }
    protected toFile(data: Encounters[]): string[] {
        return [
            ...this.fileHead,
            ...data.reduce((all, cur) => all.concat(...this.toEntry(cur)), new Array<string>()),
            '	db -1 ; end',
            ''
        ]
    }
    protected fromFile(file: string[]): Encounters[] {
        this.fileHead = file.slice(0, 4);
        const wild = new Array<Encounters>();
        file.filter(l => l.startsWith('	map_id')).map(l => /map_id (.+)/.exec(l)[1]).forEach(mapId => {
            const entry = {
                mapId
            } as Encounters;
            wild.push(entry);
            const firstLine = file.indexOf(`	map_id ${mapId}`) + 1;
            const lastLine = file.indexOf('', firstLine);
            [, entry.mornRate, entry.dayRate, entry.niteRate] = /db ([^,;]+)(?:, )?([^,;]+)?(?:, )?([^,;]+)? ; encounter rate/.exec(file[firstLine]).map(s => s && s.trim());
            let currentTime = entry.morn = [];
            file.slice(firstLine + 1, lastLine).forEach(l => {
                switch (l) {
                    case "	; morn":
                        currentTime = entry.morn;
                        break;
                    case "	; day":
                        entry.day = entry.day || [];
                        currentTime = entry.day;
                        break;
                    case "	; nite":
                        entry.nite = entry.nite || [];
                        currentTime = entry.nite;
                        break;
                    default:
                        if (l.startsWith('	dbw')) {
                            const [, level, species] = /dbw (\d+), (.+)/.exec(l);
                            currentTime.push({ level: parseInt(level), species });
                        }
                }
            });
        });
        return wild;
    }

}