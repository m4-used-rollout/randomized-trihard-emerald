import BaseStats from "./base_stats";
import { Evolution, MoveLearn } from "./evos_attacks";

export default interface Pokemon {
    id: number;
    species: string;
    baseStats: BaseStats;
    evos: Evolution[];
    movelearns: MoveLearn[];
}