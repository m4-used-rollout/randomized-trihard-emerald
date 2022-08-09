import ReadOnlyParser from "../readonlyparser";

const expectedMonCount = 400;

export default class PokemonConstantsParser extends ReadOnlyParser<string[]> {
    protected fromFile(file: string[]): string[] {
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

    public test() {
        if (this.data.length != expectedMonCount) {
            console.dir(this.data);
            throw new Error(`Got ${this.data.length} Pokemon, expected ${expectedMonCount}`);
        }
    }
}