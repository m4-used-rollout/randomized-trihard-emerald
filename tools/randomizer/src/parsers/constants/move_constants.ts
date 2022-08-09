import ReadOnlyParser from "../readonlyparser";

const expectedMoveCount = 0x17A + 1;

export default class MoveConstantsParser extends ReadOnlyParser<string[]> {
    protected fromFile(file: string[]): string[] {
        const moveConstants = [];
        for (let i = 0; i < file.length; i++) {
            if (file[i] == "NUM_ATTACKS EQU const_value + -1")
                return moveConstants;
            let [, moveconst] = /const ([^\s]+)/.exec(file[i]) || [];
            if (moveconst)
                moveConstants.push(moveconst);
        }
        return moveConstants;
    }

    public test() {
        if (this.data.length != expectedMoveCount) {
            console.dir(this.data);
            throw new Error(`Got ${this.data.length} moves, expected ${expectedMoveCount}`);
        }
    }
}