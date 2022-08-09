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
process.chdir("..");
// NOTE: The default ReadWriteParser test is a round trip where it converts the file's text to data
// then back to text again and compares the output. It expects them to match exactly.
// Some of these round trip tests are commented out below because the files they parse have extra/different
// decoration (comments) and won't match even though they parse perfectly.
// Once the irregular files are run through the randomizer, they will be regular and all commented-out tests should pass.
console.log("Starting tests...");
console.log("Testing PokemonConstantsParser");
new pokemon_constants_1.default("constants/pokemon_constants.asm").test();
console.log("Testing MoveConstantsParser");
new move_constants_1.default("constants/move_constants.asm").test();
console.log("Testing BaseStatsParser");
new base_stats_1.default("data/pokemon/base_stats/azumarill.asm").test();
console.log("Testing IncludeListParser");
const bsOld = new include_list_1.default("data/pokemon/base_stats_old.asm", base_stats_1.default);
bsOld.test(182);
if (!bsOld.data || !bsOld.data[183].data || bsOld.data[183].data.type1 != "WATER") {
    console.dir(bsOld.data[183]);
    throw new Error(`IncludeListParser failed to parse base stats for ${bsOld.data[183]}`);
}
console.log("Testing MovesParser");
new moves_1.default("data/moves/moves.asm").test();
console.log("Testing TMHMParser");
new tmhm_1.default("data/moves/tmhm_moves.asm").test();
console.log("Testing EvosAttacksParser");
new evos_attacks_1.default("data/pokemon/evos_attacks_kanto.asm").test(151);
new evos_attacks_1.default("data/pokemon/evos_attacks_johto.asm").test(100);
// new EvosAttacksParser("data/pokemon/evos_attacks_new.asm").test(); // File does not have standard comments
console.log("Testing SplitCollectionParser");
new splitcollection_1.default(["data/pokemon/evos_attacks_kanto.asm", "data/pokemon/evos_attacks_johto.asm", "data/pokemon/evos_attacks_new.asm"], evos_attacks_1.default).test(260);
console.log("Testing WildGrassWaterParser");
new grass_water_1.default("data/wild/johto_grass.asm").test();
new grass_water_1.default("data/wild/johto_water.asm").test();
new grass_water_1.default("data/wild/kanto_grass.asm").test();
new grass_water_1.default("data/wild/kanto_water.asm").test();
// new WildGrassWaterParser("data/wild/swarm_grass.asm").test(); // Includes extra comments
// new WildGrassWaterParser("data/wild/swarm_water.asm").test(); // Includes extra comments
console.log("Testing WildFishParser");
new fish_1.default("data/wild/fish.asm").test();
console.log("Testing WildBugContestParser");
new bug_contest_1.default("data/wild/bug_contest_mons.asm").test();
console.log("Testing WildTreeMonParser");
new treemons_1.default("data/wild/treemons.asm").test();
// console.log("Testing TrainerParser");
// new TrainerParser("data/trainers/parties.asm").test(); // Too inconsistent to match
console.log("All tests passed");
