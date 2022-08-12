import { Pick, PickCascade } from "../utils/pick";
import { buildAvailablePokemon, buildAvailableTypes, buildEvoLookup, buildPokeConstants, calculateBST, hasType, sharesType } from "../utils/montasks";

const trainerGroups: Record<string, { type: string, trainers: string[] }> = {
    "Rustboro Gym": { type: "rock", trainers: ["Josh", "Tommy", "Marc", "Roxanne"] },
    "Dewford Gym": { type: "fighting", trainers: ["Laura", "Lilith", "Brenden", "Takao", "Cristian", "Jocelyn", "Brawly"] },
    "Mauville Gym": { type: "electric", trainers: ["Vivian", "Kirk", "Ben", "Angelo", "Shawn", "Wattson"] },
    "Lavaridge Gym": { type: "fire", trainers: ["Jeff", "Jace", "Eli", "Cole", "Gerald", "Axle", "Keegan", "Danielle", "Flannery"] },
    "Petalburg Gym": { type: "normal", trainers: ["Randall", "Mary", "Parker", "Alexia", "George", "Jody", "Berke", "Norman"] },
    "Fortree Gym": { type: "flying", trainers: ["Humberto", "Jared", "Ashely", "Flint", "Edwardo", "Darius", "Winona"] },
    "Mossdeep Gym": { type: "psychic", trainers: ["Preston", "Maura", "Samantha", "Macey", "Blake", "Clifford", "Kathleen", "Nicholas", "Nate", "Virgil", "Sylvia", "Hannah", "Tate&Liza"] },
    "Sootopolis Gym": { type: "water", trainers: ["Connie", "Andrea", "Daphne", "Annika", "Tiffany", "Crissy", "Bethany", "Olivia", "Brianna", "Bridget", "Juan"] }
}

// Leave the rivals alone
const trainersKeepType = ["Brendan", "May"];

export default class TrainerRandomizer implements RandoModule {
    command = "trainers"
    helpText = "Randomizes trainer pokemon. Keeps same distance from final. Assigns each trainer a type. Tries to stay within provided BST (100 is default) of original.";
    operation(data: PokemonJson, bstRange = "100") {
        const bstAbsRange = Math.abs(parseInt(bstRange) || 100) / 2;

        calculateBST(data);

        const pokeConstants = buildPokeConstants(data, true);
        const monStatsLookup = data.pokemon;

        const { distanceFromFinalLookup } = buildEvoLookup(data);

        const types = buildAvailableTypes(data);

        const trainers = data.trainerParties;

        const trainerTypes: Record<string, Record<string, string>> = {};

        console.log("Randomizing trainer parties");

        trainers.forEach(t => {
            if (t.type == "TrainerMonItemCustomMoves")
                t.type = "TrainerMonItemDefaultMoves";
            else if (t.type == "TrainerMonNoItemCustomMoves")
                t.type = "TrainerMonNoItemDefaultMoves";
        }); // Remove baked-in moves and use the random movesets

        const totalMons = trainers.reduce((sum, t) => sum + t.party.length, 0);

        //const availableMons = buildAvailablePokemon(data, pokeConstants, totalMons, { extraEntropy: true });

        function getAssignedTrainerGroupType(trainerName: string): string | undefined {
            return (Object.values(trainerGroups).filter(g => g.trainers.includes(trainerName)).shift() || { trainers: new Array<string>() }).trainers.map(t => Object.values(trainerTypes[t] || {})).flat().filter(t => !!t).shift();
        }

        function getOriginalTrainerGroupType(trainerName: string): string | undefined {
            return (Object.values(trainerGroups).filter(g => g.trainers.includes(trainerName)).shift() || { type: undefined }).type;
        }

        function isInTrainerGroup(trainerName: string) {
            return Object.values(trainerGroups).some(g => g.trainers.includes(trainerName));
        }

        function getTrainerGroupName(trainerName: string) {
            return Object.keys(trainerGroups).filter(k => trainerGroups[k].trainers.includes(trainerName)).shift() || "";
        }

        // if trainer is in a group, returns the selected types of the other groups. Otherwise returns an empty arrayD
        function getOtherAssignedTrainerGroupTypes(trainerName: string): string[] {
            if (isInTrainerGroup(trainerName)) {
                return Object.values(trainerGroups).filter(g => !g.trainers.includes(trainerName)).map(g => getAssignedTrainerGroupType(g.trainers[0])).filter(t => !!t);
            }
            return [];
        }

        trainers.forEach(t => {
            trainerTypes[t.trainerName] = trainerTypes[t.trainerName] || {};
            const typesToAvoid = [getOriginalTrainerGroupType(t.trainerName), ...getOtherAssignedTrainerGroupTypes(t.trainerName)];
            const trainerType = trainerTypes[t.trainerName][t.trainerClass] = trainerTypes[t.trainerName][t.trainerClass] || getAssignedTrainerGroupType(t.trainerName) || Pick([...types].filter(t => !typesToAvoid.includes(t)));
            t["randomizerAssignedType"] = trainerType;
            if (isInTrainerGroup(t.trainerName))
                console.log(`Assigned ${t.trainerName} ${trainerType} type (${getTrainerGroupName(t.trainerName)})`);
            const availableMons = [...pokeConstants];
            const replaceMon = (mon: string, type?: string): string => {
                const origDistance = distanceFromFinalLookup[mon];
                const origStats = monStatsLookup[mon].baseStats;
                return PickCascade(availableMons,
                    m => Math.abs(origStats.bst - monStatsLookup[m].baseStats.bst) <= bstAbsRange, // Within provided BST range
                    type ? m => hasType(monStatsLookup[m].baseStats, type) : m => sharesType(origStats, monStatsLookup[m].baseStats), // At least one type matches
                    m => m != mon, // Not same mon
                    m => distanceFromFinalLookup[m] == origDistance, // Same distance from final (Caterpie always evolves twice)
                ) || mon;
            };
            t.party.forEach(p => {
                p.species = replaceMon(p.species, trainersKeepType.includes(t.trainerName) ? undefined : trainerType);
                p["randomizerAssignedType"] = trainerType;
            });
        });

        console.log(`Randomized ${totalMons} trainer mons in ${trainers.length} parties.`);

        console.log("Finished.");
    }

}