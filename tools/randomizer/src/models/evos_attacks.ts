export interface Evolution {
    type: string,
    parameter: string,
    species: string
}

export interface MoveLearn {
    level: number;
    move: string;
}

export default interface EvosAttacks {
    label: string;
    evos: Evolution[];
    attacks: MoveLearn[];
}