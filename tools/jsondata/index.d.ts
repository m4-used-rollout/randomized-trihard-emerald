
declare type RepoType = 'base'|'the'|'exp';
type LvlLearnset = Array<{ move:string, level:number }>;

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
	
	_type: RepoType;
	_lvlTableType?: string;
	_includeOldUnownData?: boolean
};