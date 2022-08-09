"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Move {
    constructor(data) {
        Object.keys(data || {}).forEach(k => this[k] = data[k]);
    }
    get doesDamage() {
        return this.power > 0;
    }
}
exports.default = Move;
