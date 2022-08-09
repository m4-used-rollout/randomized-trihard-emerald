import BaseStatsParser from "./parsers/data/base_stats";
import IncludeListParser from "./parsers/include_list";
import MoveConstantsParser from "./parsers/constants/move_constants";
import PokemonConstantsParser from "./parsers/constants/pokemon_constants";
import MovesParser from "./parsers/data/moves";
import TMHMParser from "./parsers/data/tmhm";
import Pokemon from "./models/pokemon";
import EvosAttacksParser from "./parsers/data/evos_attacks";
import SplitCollectionParser from "./parsers/splitcollection";
import EvosAttacks from "./models/evos_attacks";
import WildGrassWaterParser from "./parsers/data/wild/grass_water";
import WildFishParser from "./parsers/data/wild/fish";
import WildBugContestParser from "./parsers/data/wild/bug_contest";
import WildTreeMonParser from "./parsers/data/wild/treemons";
import TrainerParser from "./parsers/data/parties";

process.chdir("..");

const pokeConstants = new PokemonConstantsParser("constants/pokemon_constants.asm").data;
const moveConstants = new MoveConstantsParser("constants/move_constants.asm").data;
const evosAttacks = new SplitCollectionParser<EvosAttacks, EvosAttacksParser>(["data/pokemon/evos_attacks_kanto.asm", "data/pokemon/evos_attacks_johto.asm", "data/pokemon/evos_attacks_new.asm"], EvosAttacksParser).data;

const allWilds = {
    grass: [...new WildGrassWaterParser("data/wild/johto_grass.asm").data, ...new WildGrassWaterParser("data/wild/kanto_grass.asm").data],
    surf: [...new WildGrassWaterParser("data/wild/johto_water.asm").data, ...new WildGrassWaterParser("data/wild/kanto_water.asm").data],
    fish: new WildFishParser("data/wild/fish.asm").data,
    swarms: [...new WildGrassWaterParser("data/wild/swarm_grass.asm").data, ...new WildGrassWaterParser("data/wild/swarm_water.asm").data],
    bugCatchingContest: new WildBugContestParser("data/wild/bug_contest_mons.asm").data,
    treeMons: new WildTreeMonParser("data/wild/treemons.asm").data
}

const allMons: Pokemon[] = [...new IncludeListParser("data/pokemon/base_stats_old.asm", BaseStatsParser).data, ...new IncludeListParser("data/pokemon/base_stats_new.asm", BaseStatsParser).data]
    .map((b, i) => (<Pokemon>{
        id: i + 1,
        species: pokeConstants[i],
        baseStats: b.data,
        evos: evosAttacks[i].evos,
        movelearns: evosAttacks[i].attacks
    }));

const allMoves = new MovesParser("data/moves/moves.asm").data.map((m, i) => ({
    id: i + 1,
    ...m,
    name: moveConstants[i + 1]
}));

const allData = {
    moves: allMoves,
    pokemon: allMons,
    tms: new TMHMParser("data/moves/tmhm_moves.asm").data,
    trainers: new TrainerParser("data/trainers/parties.asm").data,
    wilds: allWilds
}

console.log(JSON.stringify(allData, null, 2));