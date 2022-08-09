"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readonlyparser_1 = require("../readonlyparser");
const expectedMonCount = 400;
class PokemonConstantsParser extends readonlyparser_1.default {
    fromFile(file) {
        const pokemonConstants = [];
        for (let i = 0; i < file.length; i++) {
            if (file[i] == "NUM_POKEMON EQU const_value + -1")
                return pokemonConstants;
            let [, pokeconst] = /const ([^\s]+)/.exec(file[i]) || [];
            if (pokeconst)
                pokemonConstants.push(pokeconst);
        }
        return pokemonConstants;
    }
    test() {
        if (this.data.length != expectedMonCount) {
            console.dir(this.data);
            throw new Error(`Got ${this.data.length} Pokemon, expected ${expectedMonCount}`);
        }
    }
}
exports.default = PokemonConstantsParser;
