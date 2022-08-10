import { buildAvailableAbilities } from "../utils/montasks";
import { PickCascade } from "../utils/pick";

const untouchedAbilities = ["wonder_guard"];

export default class AbilitiesRandomizer implements RandoModule {
    command = "abilities"
    helpText = "Randomizes Pokemon abilities";
    operation(data: PokemonJson) {

        const availableAbilities = buildAvailableAbilities(data).filter(a => !untouchedAbilities.includes(a));
        console.log("Randomizing abilities...");

        Object.values(data.pokemon).forEach(p => {
            if (p?.baseStats) {
                const replacements = [...availableAbilities];
                if (!untouchedAbilities.includes(p.baseStats.ability1))
                    p.baseStats.ability1 = PickCascade(replacements, a => a != p.baseStats.ability1);
                if (!untouchedAbilities.includes(p.baseStats.ability2) && !(untouchedAbilities.includes(p.baseStats.ability1) && !p.baseStats.ability2))
                    p.baseStats.ability2 = PickCascade(replacements, a => a != p.baseStats.ability2);
            }
        });

        console.log("Finished.")
    }

}