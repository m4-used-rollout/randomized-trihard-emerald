export default class BaseStats {
    baseHP: number;
    baseAttack: number;
    baseDefense: number;
    baseSpeed: number;
    baseSpAttack: number;
    baseSpDefense: number;
    type1: string;
    type2: string;
    catchRate: number;
    expYield: number;
    evYield_HP: number;
    evYield_Attack: number;
    evYield_Defense: number;
    evYield_Speed: number;
    evYield_SpAttack: number;
    evYield_SpDefense: number;
    item1: string;
    item2: string;
    genderRatio: string;
    eggCycles: number;
    friendship: number;
    growthRate: string;
    eggGroup1: string;
    eggGroup2: string;
    ability1: string;
    ability2: string;
    safariZoneFleeRate: string;
    bodyColor: string;
    noFlip: string;

    get bst() {
        return this.baseHP + this.baseAttack + this.baseDefense + this.baseSpeed + this.baseSpAttack + this.baseSpDefense;
    }
}