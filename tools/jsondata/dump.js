#! node
const RL = require('readline');
const FS = require('fs');
const PATH = require('path');
/**
 * @typedef {'base'|'the'|'exp'} RepoType
 * 'base' = pret/pokeemerald
 * 'the' = tustin2121/trihard-emerald
 * 'exp' = rh-hideout/pokeemerald-expansion
 */

//------------------------------- Options -------------------------------------

const INPUT_FILE = './output.json';

const BASE_OUTPUT_PATH = '../../src/data/pokemon/';

//-----------------------------------------------------------------------------

const FILES = [
	{
		path: PATH.join(__dirname, BASE_OUTPUT_PATH, 'base_stats.h'),
		fn: dumpBaseStats,
	},{
		path: PATH.join(__dirname, BASE_OUTPUT_PATH, 'egg_moves.h'),
		fn: dumpEggMoves,
	},{
		path: PATH.join(__dirname, BASE_OUTPUT_PATH, 'evolution.h'),
		fn: dumpEvolutions,
	},{
		path: PATH.join(__dirname, BASE_OUTPUT_PATH, 'level_up_learnsets.h'),
		fn: dumpLevelUpLearnset,
	},{
		path: PATH.join(__dirname, BASE_OUTPUT_PATH, 'tmhm_learnsets.h'),
		fn: dumpTMLearnset,
	},{
		path: PATH.join(__dirname, BASE_OUTPUT_PATH, 'tutor_learnsets.h'),
		fn: dumpTutorLearnset,
	},{
		// TODO: Pokedex entires?
	},{
		path: PATH.join(__dirname, BASE_OUTPUT_PATH, 'form_species_tables.h'),
		fn: dumpFormSpecies,
		forRepoTypes: ['exp'],
	},{
		path: PATH.join(__dirname, BASE_OUTPUT_PATH, 'form_change_tables.h'),
		fn: dumpFormChanges,
		forRepoTypes: ['exp'],
	},
];

//-----------------------------------------------------------------------------

const SHARED_HEADER =
`// This file has been auto-generated
`;

/** @type {Record<string, (v:string)=>string >} */
const VALUE_TRANSFORM = {
	'type': (v)=>{ if (!v.startsWith('TYPE_')) return `TYPE_${v.toUpperCase()}`; return v; },
	'move': (v)=>{ if (!v.startsWith('MOVE_')) return `MOVE_${v.toUpperCase()}`; return v; },
	'growthRate': (v)=>{ if (!v.startsWith('GROWTH_')) return `GROWTH_${v.toUpperCase()}`; return v; },
	'eggGroup': (v)=>{ if (!v.startsWith('EGG_GROUP_')) return `EGG_GROUP_${v.toUpperCase()}`; return v; },
	'item': (v)=>{
		if (v === null) return `ITEM_NONE`;
		if (!v.startsWith('ITEM_')) return `ITEM_${v.toUpperCase()}`;
		return v;
	},
	'ability': (v)=>{
		if (v === null) return `ABILITY_NONE`;
		if (!v.startsWith('ABILITY_')) return `ABILITY_${v.toUpperCase()}`; 
		return v; 
	},
	'bodyColor': (v)=>{ if (!v.startsWith('BODY_COLOR_')) return `BODY_COLOR_${v.toUpperCase()}`; return v; },
	'genderRatio': (v)=>{ 
		if (v === null) return `MON_GENDERLESS`;
		return `PERCENT_FEMALE(${v})`;
	},
	'noFlip': (v)=>{ return `${v}`.toUpperCase(); }
};

//-----------------------------------------------------------------------------

/**
 * @param {PokemonJson} data 
 * @param {Record<RepoType, any>} obj 
 */
 function forRepos(data, obj, def=0) {
	if (obj[data._type]) return obj[data._type];
	return def;
}



/**
 * @param {PokemonJson} data 
 * @param {typeof FILES} config 
 */
async function dumpBaseStats(data, config) {
	const out = FS.createWriteStream(config.path, { encoding:'utf8' });
	out.write(SHARED_HEADER);
	out.write(/* c */`
// 255 (MON_GENDERLESS) is reserved for genderless Pokemon.
#define PERCENT_FEMALE(percent) min(254, ((percent * 255) / 100))

const struct BaseStats gBaseStats[] =
{
	[SPECIES_NONE] = {0},

`);
	for (let [name, pkmn] of Object.entries(data.pokemon)) {
		const lines = [];
		if (pkmn._ref) pkmn = data.pokemon[pkmn._ref];
		for (let [key, val] of Object.entries(pkmn.baseStats)) {
			if (VALUE_TRANSFORM[key]) {
				val = VALUE_TRANSFORM[key](val);
			}
			else if (VALUE_TRANSFORM[key.slice(0, -1)]) {
				val = VALUE_TRANSFORM[key.slice(0, -1)](val);
			}
			else if (key == 'abilities') {
				val = val.map(VALUE_TRANSFORM['ability']);
				val = `{${val.join(', ')}}`;
			}
			lines.push(`\t\t.${key} = ${val},\n`);
		}
		
		out.write(`\t[SPECIES_${name.toUpperCase()}] = {\n${lines.join('')}\t},\n\n`);
	}
	out.write(`};\n`);
	out.close();
	console.log(`File written to ${config.path}.`);
	// TODO: Do the fields need to be in order...?
}

/**
 * @param {PokemonJson} data 
 * @param {typeof FILES} config 
 */
async function dumpEggMoves(data, config) {
	const out = FS.createWriteStream(config.path, { encoding:'utf8' });
	out.write(SHARED_HEADER);
	out.write(/* c */`
#define EGG_MOVES_SPECIES_OFFSET 20000
#define EGG_MOVES_TERMINATOR 0xFFFF
#define egg_moves(species, moves...) (SPECIES_##species + EGG_MOVES_SPECIES_OFFSET), moves

const u16 gEggMoves[] = {
`);
	for (const [name, pkmn] of Object.entries(data.pokemon)) {
		if (!pkmn.eggMoves) continue;
		const moves = pkmn.eggMoves.map(x=>`MOVE_${x.toUpperCase()}`);
		out.write(`\tegg_moves(${name.toUpperCase()},\n\t\t${moves.join(',\n\t\t')}),\n\n`);
	}
	out.write(`\tEGG_MOVES_TERMINATOR\n};\n`);
	out.close();
	console.log(`File written to ${config.path}.`);
}

/**
 * @param {PokemonJson} data 
 * @param {typeof FILES} config 
 */
async function dumpEvolutions(data, config) {
	const out = FS.createWriteStream(config.path, { encoding:'utf8' });
	out.write(SHARED_HEADER);
	out.write(/* c */`
const struct Evolution gEvolutionTable[NUM_SPECIES][EVOS_PER_MON] =
{
`);
	for (const [name, pkmn] of Object.entries(data.pokemon)) {
		if (!pkmn.evolutions) continue;
		const evos = pkmn.evolutions.map(x=>{
			return `{EVO_${x.type.toUpperCase()}, ${x.req}, SPECIES_${x.species.toUpperCase()}}`;
		});
		out.write(`\t[SPECIES_${name.toUpperCase()}] = {${evos.join(',')}},\n`);
	}
	out.write(`};\n`);
	out.close();
	console.log(`File written to ${config.path}.`);
}

/**
 * @param {PokemonJson} data 
 * @param {typeof FILES} config 
 */
async function dumpLevelUpLearnset(data, config) {
	const out = FS.createWriteStream(config.path, { encoding:'utf8' });
	out.write(SHARED_HEADER);
	out.write(/* c */`
#define LEVEL_UP_MOVE(lvl, moveLearned) {.move = moveLearned, .level = lvl}

`);
	let TABLES = new Map(), PTRS = new Map();
	if (data.lvlTables) {
		for (let [name, table] of Object.entries(data.lvlTables)) {
			let lines = table.map(x=>`\tLEVEL_UP_MOVE(${x.level}, ${VALUE_TRANSFORM['move'](x.move)}),\n`);
			lines.push(`\tLEVEL_UP_END\n`);
			name = _expand(name);
			TABLES.set(name, `static const ${data._lvlTableType} ${name}[] = {\n${lines.join('')}};\n`);
		}
		for (const [name, pkmn] of Object.entries(data.pokemon)) {
			PTRS.set(name, _expand(pkmn.lvlLearnset));
		}
	} else {
		for (const [name, pkmn] of Object.entries(data.pokemon)) {
			let id = `s${name.charAt(0).toUpperCase()}${name.slice(1)}LevelUpLearnset`;
			for (let table of Object.entries(pkmn.lvlLearnset)) {
				let lines = table.map(x=>`\tLEVEL_UP_MOVE(${x.level}, ${VALUE_TRANSFORM['move'](x.move)}),\n`);
				lines.push(`\tLEVEL_UP_END\n`);
				TABLES.set(id, `static const ${data._lvlTableType} ${name}[] = {\n${lines.join('')}};\n`);
			}
			PTRS.set(name, id);
		}
	}
	let first;
	for (const [id, data] of TABLES) {
		out.write(data);
		if (!first) first = id;
	}
	out.write(`
const struct LevelUpMove *const gLevelUpLearnsets[NUM_SPECIES] =
{
	[SPECIES_NONE] = ${first},
`);
	for (const [name, ptr] of PTRS) {
		out.write(`\t[SPECIES_${name.toUpperCase()}] = ${ptr},\n`);
	}
	out.write(`};\n`);
	out.close();
	console.log(`File written to ${config.path}.`);
	return;
	function _expand(name) {
		if (name.startsWith('sLvLS_')) {
			let n = name.slice('sLvLS_'.length);
			n = n.charAt(0).toUpperCase() + n.slice(1);
			return `s${n}LevelUpLearnset`;
		}
		return name;
	}
}

/**
 * @param {PokemonJson} data 
 * @param {typeof FILES} config 
 */
async function dumpTMLearnset(data, config) {
	const out = FS.createWriteStream(config.path, { encoding:'utf8' });
	out.write(SHARED_HEADER);
	out.write(/* c */`
#define TMHM_LEARNSET(moves) {(u32)(moves), ((u64)(moves) >> 32)}
#define TMHM(tmhm) ((u64)1 << (ITEM_##tmhm - ITEM_TM01_FOCUS_PUNCH - ((ITEM_##tmhm > ITEM_TM100) ? 50 : 0)))

const u32 gTMHMLearnsets[][2] =
{
	[SPECIES_NONE] = TMHM_LEARNSET(0),
`);
	const TM_LIST = data.tmlist || [];
	const PREFIX = 'TMHM_LEARNSET';
	for (const [name, pkmn] of Object.entries(data.pokemon)) {
		if (!pkmn.tms) continue;
		const tms = pkmn.tms.map(x=>{
			let o = x;
			if (typeof x === 'number') o = TM_LIST[x];
			if (o === undefined) o = `TM${('00'+x).slice(-2)}`;
			return `TMHM(${o})`;
		});
		if (tms.length === 0) tms.push('0');
		out.write(`\t[SPECIES_${name.toUpperCase()}] = ${PREFIX}(${tms.join(' | ')}),\n`);
	}
	out.write(`};\n`);
	out.close();
	console.log(`File written to ${config.path}.`);
}

/**
 * @param {PokemonJson} data 
 * @param {typeof FILES} config 
 */
async function dumpTutorLearnset(data, config) {
	const TUTOR_LIST = new Set();
	const PREFIX = forRepos(data, { base:'' }, 'TUTOR_LEARNSET');
	const MON_LIST = [
		`\t[SPECIES_NONE] = ${PREFIX}(0),\n`
	];
	for (const [name, pkmn] of Object.entries(data.pokemon)) {
		if (!pkmn.tutor) continue;
		let tutor = pkmn.tutor.map(VALUE_TRANSFORM['move']);
		for (const m of tutor) TUTOR_LIST.add(m);
		tutor = tutor.map(x=>`TUTOR(${x})`);
		if (tutor.length === 0) tutor.push('0');
		MON_LIST.push(`\t[SPECIES_${name.toUpperCase()}] = ${PREFIX}(${tutor.join(' | ')}),\n`);
	}
	
	const out = FS.createWriteStream(config.path, { encoding:'utf8' });
	out.write(SHARED_HEADER);
	if (data._type === 'the') {
		// write out defines
		let i = 0;
		for (const move of TUTOR_LIST) {
			out.write(`#define TUTOR_${move} ${i++}\n`);
		}
	}
	out.write(/* c */`
const u16 gTutorMoves[] =
{
`);
	for (const move of TUTOR_LIST) {
		out.write(`\t[TUTOR_${move}] = ${move},\n`);
	}
	out.write(/* c */`
};

#define TUTOR_LEARNSET(moves) ((u32)(moves))
#define TUTOR(move) ((u64)1 << (TUTOR_##move))

static const u32 sTutorLearnsets[] =
{
`);
	out.write(MON_LIST.join(''));
	out.write(`};\n`);
	out.close();
	console.log(`File written to ${config.path}.`);
}

/**
 * @param {PokemonJson} data 
 * @param {typeof FILES} config 
 */
async function dumpFormSpecies(data, config) {
	
}

/**
 * @param {PokemonJson} data 
 * @param {typeof FILES} config 
 */
async function dumpFormChanges(data, config) {
	
}

new Promise(async (res, rej)=>res(require(INPUT_FILE)))

.then(/** @param {PokemonJson} data */ (data)=>{
	delete data.pokemon['none']; // remove sentinal
	const REPO_TYPE = data._type;
	if (!REPO_TYPE) throw new ReferenceError('No repo type present on input data, unable to proceed.');
	
	FS.mkdirSync(PATH.join(__dirname, BASE_OUTPUT_PATH), { recursive:true });
	
	const fns = FILES.map(x=>{
		if (typeof x.fn !== 'function') return Promise.resolve(); //skip
		if (x.forRepoTypes) {
			const set = new Set(x.forRepoTypes);
			if (!set.has(REPO_TYPE)) return Promise.resolve(); //skip
		}
		return x.fn(data, x);
	});
});
