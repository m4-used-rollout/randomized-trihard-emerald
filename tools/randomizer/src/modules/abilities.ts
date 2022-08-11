import { buildAvailableAbilities, buildAvailablePokemon, buildEvoLookup, buildPokeConstants } from "../utils/montasks";
import { Pick, PickCascade } from "../utils/pick";

const untouchedAbilities = ["wonder_guard", "forecast"];

export default class AbilitiesRandomizer implements RandoModule {
    command = "abilities"
    helpText = "Randomizes Pokemon abilities";
    operation(data: PokemonJson) {

        const pokemonConstants = buildPokeConstants(data, true);
        const { evoLookupBackward } = buildEvoLookup(data);
        const abilities = buildAvailableAbilities(data).filter(a => !untouchedAbilities.includes(a));
        const availableAbilities = buildAvailablePokemon(data, abilities, pokemonConstants.length * 2, { minIsMax: true });

        console.log("Randomizing abilities...");

        const monsLeft = [...pokemonConstants];

        const randomizeAbilities = (p: string) => {
            const mon = data.pokemon[p];
            if (monsLeft.includes(p))
                monsLeft.splice(monsLeft.indexOf(p), 1);

            if (evoLookupBackward[p] && monsLeft.includes(evoLookupBackward[p]))
                randomizeAbilities(evoLookupBackward[p]);

            const prevoMon = evoLookupBackward[p] && data.pokemon[evoLookupBackward[p]];
            const isStoneEvo = prevoMon?.evolutions?.find(e => e.species == p)?.type == "ITEM";

            if (mon?.baseStats) {
                const replacements = availableAbilities;
                if (!untouchedAbilities.includes(mon.baseStats.ability1)) {
                    mon.baseStats.ability1 = PickCascade(replacements, a => a != mon.baseStats.ability1);
                    if (prevoMon?.baseStats && !untouchedAbilities.includes(prevoMon.baseStats.ability1)) { // 66% chance to use prevo's ability (33% for stone evos)
                        const randomAbility = mon.baseStats.ability1;
                        mon.baseStats.ability1 = Pick([mon.baseStats.ability1, prevoMon.baseStats.ability1, isStoneEvo ? mon.baseStats.ability1 : prevoMon.baseStats.ability1]);
                        if (randomAbility != mon.baseStats.ability1)
                            availableAbilities.push(randomAbility);
                    }
                }
                if (!untouchedAbilities.includes(mon.baseStats.ability2) && !(untouchedAbilities.includes(mon.baseStats.ability1) && !mon.baseStats.ability2)) {
                    mon.baseStats.ability2 = PickCascade(replacements, a => a != mon.baseStats.ability2, a => a != mon.baseStats.ability1);
                    if (prevoMon?.baseStats && !untouchedAbilities.includes(prevoMon.baseStats.ability2)) {  // 66% chance to use prevo's ability (33% for stone evos)
                        const randomAbility = mon.baseStats.ability1;
                        mon.baseStats.ability2 = Pick([mon.baseStats.ability2, prevoMon.baseStats.ability2, isStoneEvo ? mon.baseStats.ability2 : prevoMon.baseStats.ability2]);
                        if (randomAbility != mon.baseStats.ability2)
                            availableAbilities.push(randomAbility);
                    }
                }
            }

            console.log(`${p}: [ ${mon?.baseStats?.ability1}, ${mon?.baseStats?.ability2}]`);
        };

        while (monsLeft.length > 0)
            randomizeAbilities(monsLeft.shift());

        console.log("Finished.")
    }

}