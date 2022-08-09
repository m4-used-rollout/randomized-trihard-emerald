"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readonlyparser_1 = require("../readonlyparser");
const expectedMoveCount = 0x17A + 1;
class MoveConstantsParser extends readonlyparser_1.default {
    fromFile(file) {
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
    test() {
        if (this.data.length != expectedMoveCount) {
            console.dir(this.data);
            throw new Error(`Got ${this.data.length} moves, expected ${expectedMoveCount}`);
        }
    }
}
exports.default = MoveConstantsParser;
