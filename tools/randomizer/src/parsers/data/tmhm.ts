import TMHM from "../../models/tmhm";
import ReadWriteParser from "../readwriteparser";

const expectedTMCount = 50;
const expectedHMCount = 7;
const expectedTutorCount = 29;

export default class TMHMParser extends ReadWriteParser<TMHM> {
    protected toFile(data: TMHM): string[] {
        return [
            'TMHMMoves:',
            '; entries correspond to *_TMNUM enums (see constants/item_constants.asm)',
            '; TMs',
            ...data.tms.map(m => `	dw ${m}`),
            '; HMs',
            ...data.hms.map(m => `	dw ${m}`),
            'MoveTutorMoves:',
            ...data.moveTutors.map(m => `	dw ${m}`),
            '	dw 0 ; end',
            ''
        ]
    }
    protected fromFile(file: string[]): TMHM {
        const mapping: TMHM = { tms: [], hms: [], moveTutors: [] };
        let currentList = mapping.tms;
        for (let i = 3; i < file.length - 1; i++) {
            switch (file[i]) {
                case "; TMs":
                    currentList = mapping.tms;
                    break;
                case "; HMs":
                    currentList = mapping.hms;
                    break;
                case "MoveTutorMoves:":
                    currentList = mapping.moveTutors;
                    break;
                case '	dw 0 ; end':
                    return mapping;
                default:
                    currentList.push(/dw (.+)/.exec(file[i])[1]);
            }
        }
        return mapping;
    }

    public test(): void {
        super.test();
        if (this.data.tms.length != expectedTMCount)
            throw new Error(`Got ${this.data.tms.length} TMs, expected ${expectedTMCount}`);
        if (this.data.hms.length != expectedHMCount)
            throw new Error(`Got ${this.data.hms.length} HMs, expected ${expectedHMCount}`);
        if (this.data.moveTutors.length != expectedTutorCount)
            throw new Error(`Got ${this.data.moveTutors.length} Move Tutor moves, expected ${expectedTutorCount}`);
    }

}