import { PickCascade, Shuffle } from "../utils/pick";

export default class TrainerRandomizer implements RandoModule {
    command = "trainers"
    helpText = "Randomizes trainer pokemon. Shuffles TPP Runmons between TPP trainers. Otherwise, keeps same distance from final. Tries to match one type with original. Tries to stay within provided BST (100 is default) of original.";
    operation(data: PokemonJson, bstRange = "100") {
        const bstAbsRange = Math.abs(parseInt(bstRange) || 100) / 2;

        const pokeConstants = Object.keys(data.pokemon).filter(p => p != "none" && !p.startsWith('old_unown'));
        const monStatsLookup = data.pokemon;

        const evoLookup: { [key: string]: string[] } = {};
        Object.values(data.pokemon).forEach((e, i) => evoLookup[pokeConstants[i]] = (e.evolutions || []).map(e => e.species));

        const distanceFromFinal = (mon: string): number => 1 + evoLookup[mon].reduce((max, cur) => Math.max(max, distanceFromFinal(cur)), 0);
        const distanceLookup: { [key: string]: number } = {};
        pokeConstants.forEach(p=>distanceLookup[p] = distanceFromFinal(p));

        const sharesType = (mon1: Pokemon["baseStats"], mon2: Pokemon["baseStats"]) => [mon1.type1, mon1.type2].some(t => [mon2.type1, mon2.type2].includes(t));

        const calcBST = (mon: Pokemon["baseStats"]) => mon.baseHP + mon.baseAttack + mon.baseDefense + mon.baseSpeed + mon.baseSpAttack + mon.baseSpDefense;
        Object.values(data.pokemon).filter(p => p.baseStats).forEach(p => p.baseStats.bst = calcBST(p.baseStats));

        const trainers = data.trainerParties;

        console.log("Randomizing trainer parties");

        trainers.forEach(t => {
            if (t.type == "TrainerMonItemCustomMoves")
                t.type = "TrainerMonItemDefaultMoves";
            else if (t.type == "TrainerMonNoItemCustomMoves")
                t.type = "TrainerMonNoItemDefaultMoves";
        }); // Remove baked-in moves and use the random movesets

        const totalMons = trainers.reduce((sum, t) => sum + t.party.length, 0);

        let availableMons = [...pokeConstants];
        while (availableMons.length < totalMons)
            availableMons.push(...pokeConstants);
        availableMons = Shuffle(availableMons);
        availableMons.length = totalMons;

        const replaceMon = (mon: string): string => {
            const origDistance = distanceLookup[mon];
            const origStats = monStatsLookup[mon].baseStats;
            return PickCascade(availableMons,
                m => Math.abs(origStats.bst - monStatsLookup[m].baseStats.bst) <= bstAbsRange, // Within provided BST range
                m => m != mon, // Not same mon
                m => sharesType(origStats, monStatsLookup[m].baseStats), // At least one type matches
                m => distanceLookup[m] == origDistance, // Same distance from final (Caterpie always evolves twice)
            ) || mon;
        };

        for (let i = 0; i < 6; i++)
            trainers.forEach(t => {
                if (t.party[i])
                    t.party[i].species = replaceMon(t.party[i].species);
            });

        console.log(`Randomized ${totalMons} trainer mons in ${trainers.length} parties.`);

        console.log("Finished.");
    }

}