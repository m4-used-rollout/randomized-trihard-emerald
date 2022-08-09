import ChatterEmotesRandomizer from "./modules/emotes";
import EvolutionRandomizer from "./modules/evos";
import LearnsetRandomizer from "./modules/moves";
import TMCompatRandomizer from "./modules/tm_compat";
import TMMovesRandomizer from "./modules/tm_moves";
import TrainerRandomizer from "./modules/trainers";
import WildRandomizer from "./modules/wilds";

const modules: RandoModule[] = [
    new TMMovesRandomizer(),
    new TMCompatRandomizer(),
    new LearnsetRandomizer(),
    new EvolutionRandomizer(),
    new WildRandomizer(),
    new TrainerRandomizer(),
    new ChatterEmotesRandomizer()
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