
declare type RepoType = 'base' | 'the' | 'exp';

declare interface PokemonJson {
	pokemon: Record<string, {
		baseStats: Record<string, any>;
		eggMoves: string[];
		evolutions?: Array<{
			type: string;
			req: string | number;
			species: string;
		}>;
		lvlLearnset: string | LvlLearnset;
		tms: Array<string | number>;
		tutor: string[];

		_ref?: string;
	}>;
	lvlTables?: Record<string, LvlLearnset>;
	moves: Move[];
	items: Item[];
	starters: string[];
	tmlist?: string[];
	tmMoves: string[];
	tutorList?: string[];
	wilds: WildPokemonInfo[];
	trainerParties: TrainerInfo[];

	_type: RepoType;
	_lvlTableType?: string;
	_includeOldUnownData?: boolean;
}

type LvlLearnset = Array<{ move: string, level: number }>;
type WildPokemon = Array<{ levelMin: number, levelMax: number, species: string }>;
type WildPokemonInfo = { rate: number, infoLabel: string, setLabel: string, set: WildPokemon };
type TrainerInfo = {
	id: string;
	type: "TrainerMonNoItemDefaultMoves" | "TrainerMonItemDefaultMoves" | "TrainerMonNoItemCustomMoves" | "TrainerMonItemCustomMoves";
	party: TrainerPartyMember[];
}
type TrainerPartyMember = {
	compiler?: string;
	iv: number;
	lvl: string;
	species: string;
	heldItem?: string;
	moves?: string[];
};
type Move = {
	id: string;
	effect: string;
	power: number;
	type: string;
	accuracy: number;
	pp: number;
	secondaryEffectChance: number;
	target: string;
	priority: number;
	flags: string[];
};
type Item = {
	name: string;
	itemId: string;
	price: number;
	pocket: string;
	type: number;
	battleUsage?: number;
	battleUseFunc?: string;
	fieldUseFunc?: string;
	secondaryId: number;
}