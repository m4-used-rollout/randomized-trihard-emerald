import * as FS from 'fs';
import { dedupe } from './utils/arrays';
import { buildPokeConstants } from './utils/montasks';
const outputJsonPath = __dirname + "/../../jsondata/output.json";

const data: PokemonJson = JSON.parse(FS.readFileSync(outputJsonPath).toString('utf8'));

const pokeConstants = buildPokeConstants(data, true);

const wildPokemon = dedupe(data.wilds.map(w => w.set.map(s => s.species)).flat());
function getEvos(mon: string) {
    return [mon, ...(data.pokemon[mon]?.evolutions || []).filter(e => e.type != "TRADE").map(e => getEvos(e.species)).flat()];
}
const wildAndEvos = dedupe(wildPokemon.map(w => getEvos(w)).flat());

const unavailableInWild = pokeConstants.filter(p => !wildAndEvos.includes(p));

const trainerMons = dedupe(data.trainerParties.map(p => p.party.map(m => m.species)).flat());

const monsWithoutTrainers = pokeConstants.filter(p => !trainerMons.includes(p));

const monsNeverSeen = dedupe([...unavailableInWild, ...monsWithoutTrainers].filter(m => unavailableInWild.includes(m) && monsWithoutTrainers.includes(m)));

console.log(`${unavailableInWild.length} Pokemon that cannot be obtained in the wild: ${unavailableInWild.join(', ')}`);
console.log(`${monsWithoutTrainers.length} Pokemon that no trainers have: ${monsWithoutTrainers.join(', ')}`);
console.log(`${monsNeverSeen.length} Pokemon that will never be seen: ${monsNeverSeen.join(', ')}`);