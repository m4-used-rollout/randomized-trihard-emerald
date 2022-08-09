export interface PartyMon {
    level: number;
    species: string;
    item?: string;
    moves?: string[];
    dvs?: number;
    hpStat?: number;
    atkStat?: number;
    defStat?: number;
    spdStat?: number;
    satStat?: number;
    sdfStat?: number;
    nickname?: string;
}

export type TrainerType = "TRAINERTYPE_NORMAL" | "TRAINERTYPE_ITEM" | "TRAINERTYPE_MOVES" | "TRAINERTYPE_DVS" | "TRAINERTYPE_STATS" | "TRAINERTYPE_NICKNAME" | "TRAINERTYPE_LEVEL_OFFSET" | "TRAINERTYPE_SPECIAL";

export default interface Trainer {
    constant: string;
    name: string;
    type: TrainerType[];
    levelOffsetLabel?: string;
    specialTrainer?: string[];
    party: PartyMon[];
}