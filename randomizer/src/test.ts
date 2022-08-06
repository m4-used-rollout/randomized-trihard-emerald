import BaseStatsParser from "./parsers/data/base_stats";
import IncludeListParser from "./parsers/include_list";
import MoveConstantsParser from "./parsers/constants/move_constants";
import PokemonConstantsParser from "./parsers/constants/pokemon_constants";
import MovesParser from "./parsers/data/moves";
import TMHMParser from "./parsers/data/tmhm";
import EvosAttacksParser from "./parsers/data/evos_attacks";
import SplitCollectionParser from "./parsers/splitcollection";
import WildGrassWaterParser from "./parsers/data/wild/grass_water";
import WildFishParser from "./parsers/data/wild/fish";
import WildBugContestParser from "./parsers/data/wild/bug_contest";
import WildTreeMonParser from "./parsers/data/wild/treemons";
import TrainerParser from "./parsers/data/parties";

process.chdir("..");

// NOTE: The default ReadWriteParser test is a round trip where it converts the file's text to data
// then back to text again and compares the output. It expects them to match exactly.
// Some of these round trip tests are commented out below because the files they parse have extra/different
// decoration (comments) and won't match even though they parse perfectly.
// Once the irregular files are run through the randomizer, they will be regular and all commented-out tests should pass.

console.log("Starting tests...");

console.log("Testing PokemonConstantsParser");
new PokemonConstantsParser("constants/pokemon_constants.asm").test();

console.log("Testing MoveConstantsParser");
new MoveConstantsParser("constants/move_constants.asm").test();

console.log("Testing BaseStatsParser");
new BaseStatsParser("data/pokemon/base_stats/azumarill.asm").test();

console.log("Testing IncludeListParser");
const bsOld = new IncludeListParser("data/pokemon/base_stats_old.asm", BaseStatsParser);
bsOld.test(182);
if (!bsOld.data || !bsOld.data[183].data || bsOld.data[183].data.type1 != "WATER") {
    console.dir(bsOld.data[183]);
    throw new Error(`IncludeListParser failed to parse base stats for ${bsOld.data[183]}`);
}

console.log("Testing MovesParser");
new MovesParser("data/moves/moves.asm").test();

console.log("Testing TMHMParser");
new TMHMParser("data/moves/tmhm_moves.asm").test();

console.log("Testing EvosAttacksParser");
new EvosAttacksParser("data/pokemon/evos_attacks_kanto.asm").test(151);
new EvosAttacksParser("data/pokemon/evos_attacks_johto.asm").test(100);
// new EvosAttacksParser("data/pokemon/evos_attacks_new.asm").test(); // File does not have standard comments

console.log("Testing SplitCollectionParser");
new SplitCollectionParser(["data/pokemon/evos_attacks_kanto.asm", "data/pokemon/evos_attacks_johto.asm", "data/pokemon/evos_attacks_new.asm"], EvosAttacksParser).test(260);

console.log("Testing WildGrassWaterParser");
new WildGrassWaterParser("data/wild/johto_grass.asm").test();
new WildGrassWaterParser("data/wild/johto_water.asm").test();
new WildGrassWaterParser("data/wild/kanto_grass.asm").test();
new WildGrassWaterParser("data/wild/kanto_water.asm").test();
// new WildGrassWaterParser("data/wild/swarm_grass.asm").test(); // Includes extra comments
// new WildGrassWaterParser("data/wild/swarm_water.asm").test(); // Includes extra comments

console.log("Testing WildFishParser");
new WildFishParser("data/wild/fish.asm").test();

console.log("Testing WildBugContestParser");
new WildBugContestParser("data/wild/bug_contest_mons.asm").test();

console.log("Testing WildTreeMonParser");
new WildTreeMonParser("data/wild/treemons.asm").test();

// console.log("Testing TrainerParser");
// new TrainerParser("data/trainers/parties.asm").test(); // Too inconsistent to match

console.log("All tests passed");