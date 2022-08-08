
declare type RepoType = 'base'|'the'|'exp';
type LvlLearnset = Array<{ move:string, level:number }>;
type WildPokemon = Array<{ levelMin: number, levelMax: number, species:string}>;
type WildPokemonInfo = {rate:number, infoLabel:string, setLabel:string, set: WildPokemon};

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
		tms: Array<string|number>;
		tutor: string[];
		
		_ref?: string;
	}>;
	lvlTables?: Record<string, LvlLearnset>;
	tmlist?: string[];
	wilds: WildPokemonInfo[];
	
	_type: RepoType;
	_lvlTableType?: string;
	_includeOldUnownData?: boolean;
}