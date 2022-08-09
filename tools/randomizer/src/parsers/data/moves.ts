
import Move from "../../models/move";
import ReadWriteParser from "../readwriteparser";

const expectedMoveCount = 0x17A;

export default class MovesParser extends ReadWriteParser<Move[]> {
    private fileHead: string[];
    protected toFile(data: Move[]): string[] {
        return [
            ...this.fileHead,
            ...data.map(m => `	move ${m.effect}, ${m.power.toString().padStart(29 - m.effect.length)}, ${m.type}, ${m.accuracy.toString().padStart(11 - m.type.length)}, ${m.pp.toString().padStart(2)}, ${m.effectChance.toString().padStart(3)} ;${m.name}`),
            ''
        ];
    }
    protected fromFile(file: string[]): Move[] {
        const moveExp = /move (.+?), \s*(\d+), (.+?), \s*(\d+), \s*(\d+), \s*(\d+) ;(.+)/;
        this.fileHead = file.slice(0, file.findIndex(l => moveExp.test(l)));
        return file.filter(l => moveExp.test(l)).map(m => {
            const [, effect, power, type, accuracy, pp, effectChance, name] = moveExp.exec(m);
            return new Move({
                effect,
                power: parseInt(power),
                type,
                accuracy: parseInt(accuracy),
                pp: parseInt(pp),
                effectChance: parseInt(effectChance),
                name
            })
        });
    }

    public test(): void {
        super.test();
        if (this.data.length != expectedMoveCount)
            throw new Error(`Got ${this.data.length} moves, expected ${expectedMoveCount}`);
    }
}