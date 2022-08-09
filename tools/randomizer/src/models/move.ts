interface MoveData {
    effect: string;
    power: number;
    type: string;
    accuracy: number;
    pp: number;
    effectChance: number;
    name: string;
}

export default class Move implements MoveData {
    effect: string;
    power: number;
    type: string;
    accuracy: number;
    pp: number;
    effectChance: number;
    name: string;

    constructor(data?: MoveData) {
        Object.keys(data || {}).forEach(k => this[k] = data[k]);
    }

    get doesDamage() {
        return this.power > 0;
    }
}