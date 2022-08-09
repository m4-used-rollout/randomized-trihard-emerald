"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_stats_1 = require("./parsers/data/base_stats");
const include_list_1 = require("./parsers/include_list");
const move_constants_1 = require("./parsers/constants/move_constants");
const pokemon_constants_1 = require("./parsers/constants/pokemon_constants");
const moves_1 = require("./parsers/data/moves");
const tmhm_1 = require("./parsers/data/tmhm");
const evos_attacks_1 = require("./parsers/data/evos_attacks");
const splitcollection_1 = require("./parsers/splitcollection");
const grass_water_1 = require("./parsers/data/wild/grass_water");
const fish_1 = require("./parsers/data/wild/fish");
const bug_contest_1 = require("./parsers/data/wild/bug_contest");
const treemons_1 = require("./parsers/data/wild/treemons");
const parties_1 = require("./parsers/data/parties");
process.chdir("..");
const pokeConstants = new pokemon_constants_1.default("constants/pokemon_constants.asm").data;
const moveConstants = new move_constants_1.default("constants/move_constants.asm").data;
const evosAttacks = new splitcollection_1.default(["data/pokemon/evos_attacks_kanto.asm", "data/pokemon/evos_attacks_johto.asm", "data/pokemon/evos_attacks_new.asm"], evos_attacks_1.default).data;
const allWilds = {
    grass: [...new grass_water_1.default("data/wild/johto_grass.asm").data, ...new grass_water_1.default("data/wild/kanto_grass.asm").data],
    surf: [...new grass_water_1.default("data/wild/johto_water.asm").data, ...new grass_water_1.default("data/wild/kanto_water.asm").data],
    fish: new fish_1.default("data/wild/fish.asm").data,
    swarms: [...new grass_water_1.default("data/wild/swarm_grass.asm").data, ...new grass_water_1.default("data/wild/swarm_water.asm").data],
    bugCatchingContest: new bug_contest_1.default("data/wild/bug_contest_mons.asm").data,
    treeMons: new treemons_1.default("data/wild/treemons.asm").data
};
const allMons = [...new include_list_1.default("data/pokemon/base_stats_old.asm", base_stats_1.default).data, ...new include_list_1.default("data/pokemon/base_stats_new.asm", base_stats_1.default).data]
    .map((b, i) => ({
    id: i + 1,
    species: pokeConstants[i],
    baseStats: b.data,
    evos: evosAttacks[i].evos,
    movelearns: evosAttacks[i].attacks
}));
const allMoves = new moves_1.default("data/moves/moves.asm").data.map((m, i) => ({
    id: i + 1,
    ...m,
    name: moveConstants[i + 1]
}));
const allData = {
    moves: allMoves,
    pokemon: allMons,
    tms: new tmhm_1.default("data/moves/tmhm_moves.asm").data,
    trainers: new parties_1.default("data/trainers/parties.asm").data,
    wilds: allWilds
};
console.log(JSON.stringify(allData, null, 2));
