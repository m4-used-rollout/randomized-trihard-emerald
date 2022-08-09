export interface Encounter {
    level: number;
    species: string;
}

export interface EncounterWithRate extends Encounter {
    rate: string;
}

export interface ContestEncounter {
    percent: number;
    species: string;
    minLevel: number;
    maxLevel: number;
}

export default interface Encounters {
    mapId: string;
    mornRate: string;
    dayRate?: string;
    niteRate?: string;
    morn: Encounter[];
    day?: Encounter[];
    nite?: Encounter[];
}

export interface FishingEncounters {
    groups: FishMons[];
    timeGroups: FishTimeGroup[];
}

export interface FishMons {
    label: string;
    oldRod: EncounterWithRate[];
    goodRod: EncounterWithRate[];
    superRod: EncounterWithRate[];
}

export interface FishTimeGroup {
    day: Encounter;
    nite: Encounter;
}

export interface ContestMons extends Array<ContestEncounter> { }

export interface TreeMons {
    label: string;
    common: EncounterWithRate[];
    rare?: EncounterWithRate[];
}