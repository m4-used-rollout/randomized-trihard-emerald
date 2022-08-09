"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emotes_1 = require("./modules/emotes");
const evos_1 = require("./modules/evos");
const moves_1 = require("./modules/moves");
const tm_compat_1 = require("./modules/tm_compat");
const tm_moves_1 = require("./modules/tm_moves");
const trainers_1 = require("./modules/trainers");
const wilds_1 = require("./modules/wilds");
const modules = [
    new tm_moves_1.default(),
    new tm_compat_1.default(),
    new moves_1.default(),
    new evos_1.default(),
    new wilds_1.default(),
    new trainers_1.default(),
    new emotes_1.default()
];
const command = (process.argv[2] || "").toLowerCase();
process.chdir("..");
(function () {
    if (command) {
        if (command == "all")
            return modules.forEach(m => m.operation(...process.argv.slice(3)));
        let module = modules.find(m => m.command.toLowerCase() == command);
        if (command == "help")
            module = modules.find(m => m.command.toLowerCase() == (process.argv[3] || "").toLowerCase());
        if (module) {
            if (command == "help")
                return console.log(`${module.command}: ${module.helpText}`);
            return module.operation(...process.argv.slice(3));
        }
    }
    return console.log(`Valid commands are: ${modules.map(m => m.command).join(', ')} or all.\nType "help" followed by a module name for more information.`);
})();
