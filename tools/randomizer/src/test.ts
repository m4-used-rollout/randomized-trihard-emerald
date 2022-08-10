import * as FS from 'fs';
import { buildAvailableAbilities, buildAvailablePokemon, buildEvoLookup, buildMoveLookup, buildPokeConstants, calculateBST } from './utils/montasks';

const outputJsonPath = __dirname + "/../../jsondata/output.json";

const testJsonPath = __dirname + "/../test.json";

const data: PokemonJson = JSON.parse(FS.readFileSync(outputJsonPath).toString('utf8'));

calculateBST(data);

const monTaskOutput = {
    pokeConstants: buildPokeConstants(data),
    ...buildEvoLookup(data),
    ...buildMoveLookup(data),
    availablePokemon800: buildAvailablePokemon(data, undefined, 800, { minIsMax: true, extraEntropy: true }),
    availableAbilities: buildAvailableAbilities(data)
};

FS.writeFileSync(testJsonPath, JSON.stringify(monTaskOutput, null, 2));

console.log(`Wrote test output to ${testJsonPath}`);