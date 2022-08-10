
declare type RepoType = 'base' | 'the' | 'exp';

declare interface PokemonJson {
	pokemon: Record<string, Pokemon>;
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

type Pokemon = {
	baseStats: {
		baseHP: number;
		baseAttack: number;
		baseDefense: number;
		baseSpeed: number;
		baseSpAttack: number;
		baseSpDefense: number;
		bst?: number;
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
		genderRatio: string | number;
		eggCycles: number;
		friendship: number;
		growthRate: string;
		eggGroup1: string;
		eggGroup2: string;
		ability1: string;
		ability2: string;
		safariZoneFleeRate: number;
		bodyColor: string;
		noFlip: boolean;
	};
	eggMoves: string[];
	evolutions?: Array<{
		type: string;
		req: string | number;
		species: string;
	}>;
	lvlLearnset: string;
	tms: Array<string | number>;
	tutor: string[];

	_ref?: string;
};

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