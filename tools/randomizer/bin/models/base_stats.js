"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseStats {
    constructor() {
        this.stats = {};
    }
    get bst() {
        return this.stats.hp + this.stats.atk + this.stats.def + this.stats.spd + this.stats.sat + this.stats.sdf;
    }
}
exports.default = BaseStats;
