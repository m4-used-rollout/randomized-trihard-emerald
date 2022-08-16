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

const INPUT_FILE = PATH.join(__dirname, 'output.json');

const BASE_PATH = '../../src/data/pokemon/';

//-----------------------------------------------------------------------------

const FILES = [
	{
		path: PATH.join(__dirname, BASE_PATH, 'base_stats.h'),
		fn: dumpBaseStats,
	}, {
		path: PATH.join(__dirname, BASE_PATH, 'egg_moves.h'),
		fn: dumpEggMoves,
	}, {
		path: PATH.join(__dirname, BASE_PATH, 'evolution.h'),
		fn: dumpEvolutions,
	}, {
		path: PATH.join(__dirname, BASE_PATH, 'level_up_learnsets.h'),
		fn: dumpLevelUpLearnset,
	}, {
		path: PATH.join(__dirname, BASE_PATH, '../..', 'party_menu.c'),
		fn: dumpTMMoves,
		startLine: 1533,// forRepos({ the: 1533 }),
		endLine: 1591,//forRepos({ the: 1591 }),
		forRepoTypes: ['the'],
	}, {
		path: PATH.join(__dirname, BASE_PATH, 'tmhm_learnsets.h'),
		fn: dumpTMLearnset,
	}, {
		path: PATH.join(__dirname, BASE_PATH, 'tutor_learnsets.h'),
		fn: dumpTutorLearnset,
	}, {
		path: PATH.join(__dirname, BASE_PATH, '..', 'wild_encounters.h'),
		fn: dumpWildPokemon,
		startLine: 14, // forRepos({ 'the': 14 }),
		endLine: 3260, //forRepos({ 'the': 3260 }),
		forRepoTypes: ['the'],
	}, {
		path: PATH.join(__dirname, BASE_PATH, '..', 'trainer_parties.h'),
		trainerData: PATH.join(__dirname, BASE_PATH, '..', 'trainers.h'),
		fn: dumpTrainerParties,
		forRepoTypes: ['the'],
	}, {
		path: PATH.join(__dirname, BASE_PATH, '../..', 'starter_choose.c'),
		fn: dumpStarters,
		startLine: 131,
		endLine: 133,
		forRepoTypes: ['the'],
	}, {
		path: PATH.join(__dirname, BASE_PATH, '../..', 'starter_choose_tpp.c'),
		fn: dumpStarters,
		startLine: 38,
		endLine: 40,
		forRepoTypes: ['the'],
	}, {
		path: PATH.join(__dirname, BASE_PATH, '../..', 'trade.c'),
		fn: dumpTrades,
		startLine: 1175,
		endLine: 1212,
		forRepoTypes: ['the'],
	}, {
		fn: dumpStatics,
		forRepoTypes: ['the'],
	}, {
		path: PATH.join(__dirname, BASE_PATH, 'form_species_tables.h'),
		fn: dumpFormSpecies,
		forRepoTypes: ['exp'],
	}, {
		path: PATH.join(__dirname, BASE_PATH, 'form_change_tables.h'),
		fn: dumpFormChanges,
		forRepoTypes: ['exp'],
	},
];

//-----------------------------------------------------------------------------


/** @type {Record<string, (v:string)=>string >} */
const VALUE_TRANSFORM = {
	'type': (v) => { if (!v.startsWith('TYPE_')) return `TYPE_${v.toUpperCase()}`; return v; },
	'move': (v) => { if (!v.startsWith('MOVE_')) return `MOVE_${v.toUpperCase()}`; return v; },
	'growthRate': (v) => { if (!v.startsWith('GROWTH_')) return `GROWTH_${v.toUpperCase()}`; return v; },
	'eggGroup': (v) => { if (!v.startsWith('EGG_GROUP_')) return `EGG_GROUP_${v.toUpperCase()}`; return v; },
	'item': (v) => {
		if (v === null) return `ITEM_NONE`;
		if (!v.startsWith('ITEM_')) return `ITEM_${v.toUpperCase()}`;
		return v;
	},
	'ability': (v) => {
		if (v === null) return `ABILITY_NONE`;
		if (!v.startsWith('ABILITY_')) return `ABILITY_${v.toUpperCase()}`;
		return v;
	},
	'bodyColor': (v) => { if (!v.startsWith('BODY_COLOR_')) return `BODY_COLOR_${v.toUpperCase()}`; return v; },
	'genderRatio': (v) => {
		if (v === null) return `MON_GENDERLESS`;
		if (!parseFloat(v)) return v;
		return `PERCENT_FEMALE(${v})`;
	},
	'noFlip': (v) => { return `${v}`.toUpperCase(); }
};

//-----------------------------------------------------------------------------

/**
 * @param {PokemonJson} data 
 * @param {Record<RepoType, any>} obj 
 */
function forRepos(data, obj, def = 0) {
	if (obj[data._type]) return obj[data._type];
	return def;
}

const baseStatFields = ["baseHP", "baseAttack", "baseDefense", "baseSpeed", "baseSpAttack", "baseSpDefense",
	"type1", "type2", "catchRate", "expYield", "evYield_HP", "evYield_Attack", "evYield_Defense", "evYield_Speed",
	"evYield_SpAttack", "evYield_SpDefense", "item1", "item2", "genderRatio", "eggCycles", "friendship", "growthRate",
	"eggGroup1", "eggGroup2", "ability1", "ability2", "safariZoneFleeRate", "bodyColor", "noFlip"];

/**
 * @param {PokemonJson} data 
 * @param {typeof FILES} config 
 */
async function dumpBaseStats(data, config) {
	const out = FS.createWriteStream(config.path, { encoding: 'utf8' });
	if (data._type == 'the')
		out.write("// Maximum value for a female Pok�mon is 254 (MON_FEMALE) which is 100% female.\n");
	out.write(/* c */`// 255 (MON_GENDERLESS) is reserved for genderless Pok�mon.
#define PERCENT_FEMALE(percent) min(254, ((percent * 255) / 100))
`);

	if (data._includeOldUnownData)
		out.write(/* c */`
#define OLD_UNOWN_BASE_STATS                \\
    {                                       \\
        .baseHP = 50,                       \\
        .baseAttack = 150,                  \\
        .baseDefense = 50,                  \\
        .baseSpAttack = 150,                \\
        .baseSpDefense = 50,                \\
        .baseSpeed = 150,                   \\
        .type1 = TYPE_NORMAL,               \\
        .type2 = TYPE_NORMAL,               \\
        .catchRate = 3,                     \\
        .expYield = 1,                      \\
        .evYield_HP = 2,                    \\
        .evYield_Attack = 2,                \\
        .evYield_Defense = 2,               \\
        .evYield_Speed = 2,                 \\
        .evYield_SpAttack = 2,              \\
        .evYield_SpDefense = 2,             \\
        .item1 = ITEM_NONE,                 \\
        .item2 = ITEM_NONE,                 \\
        .genderRatio = MON_GENDERLESS,      \\
        .eggCycles = 120,                   \\
        .friendship = 0,                    \\
        .growthRate = GROWTH_MEDIUM_FAST,   \\
        .eggGroup1 = EGG_GROUP_UNDISCOVERED,\\
        .eggGroup2 = EGG_GROUP_UNDISCOVERED,\\
        .ability1 = ABILITY_NONE,           \\
        .ability2 = ABILITY_NONE,           \\
        .safariZoneFleeRate = 0,            \\
        .bodyColor = BODY_COLOR_BLACK,      \\
        .noFlip = FALSE,                    \\
    }
`);

	out.write(/* c */`
const struct BaseStats gBaseStats[] =
{
    [SPECIES_NONE] = {0},

`);
	for (let [name, pkmn] of Object.entries(data.pokemon)) {
		const lastSpecies = Object.entries(data.pokemon).pop()[0] == name;
		const lines = [];
		if (pkmn._ref) pkmn = data.pokemon[pkmn._ref];
		for (let [key, val] of Object.entries(pkmn.baseStats)) {
			if (!baseStatFields.includes(key))
				continue; // Ignore unknown field
			let pad = '';
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
			if (key.endsWith('SpDefense'))
				pad = '';
			else if (key.endsWith('SpAttack'))
				pad = ' ';
			else if (key.endsWith('Speed'))
				pad = '    ';
			else if (key.endsWith('Defense'))
				pad = '  ';
			else if (key.endsWith('Attack'))
				pad = '   ';
			else if (key.endsWith('HP'))
				pad = '       ';
			lines.push(`        .${key}${pad} = ${val},\n`);
		}

		if (data._includeOldUnownData && name.toLowerCase().startsWith("old_unown"))
			out.write(`    [SPECIES_${name.toUpperCase()}] = OLD_UNOWN_BASE_STATS,\n\n`);
		else
			out.write(`    [SPECIES_${name.toUpperCase()}] =\n    {\n${lines.join('')}    }${lastSpecies ? '' : ',\n'}\n`);
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
	const out = FS.createWriteStream(config.path, { encoding: 'utf8' });
	out.write(/* c */`#define EGG_MOVES_SPECIES_OFFSET 20000
#define EGG_MOVES_TERMINATOR 0xFFFF
#define egg_moves(species, moves...) (SPECIES_##species + EGG_MOVES_SPECIES_OFFSET), moves

const u16 gEggMoves[] = {
`);
	for (const [name, pkmn] of Object.entries(data.pokemon)) {
		if (!pkmn.eggMoves) continue;
		const moves = pkmn.eggMoves.map(x => `MOVE_${x.toUpperCase()}`);
		out.write(`    egg_moves(${name.toUpperCase()},\n              ${moves.join(',\n              ')}),\n\n`);
	}
	out.write(`    EGG_MOVES_TERMINATOR\n};\n`);
	out.close();
	console.log(`File written to ${config.path}.`);
}

/**
 * @param {PokemonJson} data 
 * @param {typeof FILES} config 
 */
async function dumpEvolutions(data, config) {
	const out = FS.createWriteStream(config.path, { encoding: 'utf8' });
	out.write(/* c */`const struct Evolution gEvolutionTable[NUM_SPECIES][EVOS_PER_MON] =
{
`);
	for (const [name, pkmn] of Object.entries(data.pokemon)) {
		if (!pkmn.evolutions) continue;
		const evos = pkmn.evolutions.map(x => {
			return `{EVO_${x.type.toUpperCase()}, ${(x.req).toString().padStart(x.type == "LEVEL" ? 2 : 1, ' ')}, SPECIES_${x.species.toUpperCase()}}`;
		});
		out.write(`    ${`[SPECIES_${name.toUpperCase()}]`.padEnd(20, ' ')} = {${evos.join(',\n                            ')}},\n`);
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
	const out = FS.createWriteStream(config.path, { encoding: 'utf8' });
	if (data._type == "the")
		out.write(/* c */`#define LEVEL_UP_MOVE(lvl, move) ((lvl << 9) | move)
#define LEVEL_UP_END 0xffff
`);
	else
		out.write(/* c */`
#define LEVEL_UP_MOVE(lvl, moveLearned) {.move = moveLearned, .level = lvl}
`);
	let TABLES = new Map(), PTRS = new Map();
	if (data.lvlTables) {
		for (let [name, table] of Object.entries(data.lvlTables)) {
			let lines = table.map(x => `    LEVEL_UP_MOVE(${x.level.toString().padStart(2, ' ')}, ${VALUE_TRANSFORM['move'](x.move)}),\n`);
			lines.push(`    LEVEL_UP_END\n`);
			name = _expand(name);
			TABLES.set(name, `\nstatic const ${data._lvlTableType} ${name}[] = {\n${lines.join('')}};\n`);
		}
		for (const [name, pkmn] of Object.entries(data.pokemon)) {
			PTRS.set(name, _expand(pkmn.lvlLearnset));
		}
	} else {
		for (const [name, pkmn] of Object.entries(data.pokemon)) {
			let id = `s${name.charAt(0).toUpperCase()}${name.slice(1)}LevelUpLearnset`.replace('Nidoranf', 'NidoranF').replace('Nidoranm', 'NidoranM').replace('Hooh', 'HoOh');
			for (let table of Object.entries(pkmn.lvlLearnset)) {
				let lines = table.map(x => `    LEVEL_UP_MOVE(${x.level}, ${VALUE_TRANSFORM['move'](x.move)}),\n`);
				lines.push(`    LEVEL_UP_END\n`);
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
	if (data._type != "the") {
		out.write(`
const struct LevelUpMove *const gLevelUpLearnsets[NUM_SPECIES] =
{
	[SPECIES_NONE] = ${first},
`);
		for (const [name, ptr] of PTRS) {
			out.write(`    [SPECIES_${name.toUpperCase()}] = ${ptr},\n`);
		}
		out.write(`};\n`);
	}
	out.close();
	console.log(`File written to ${config.path}.`);
	return;
	function _expand(name) {
		if (name.startsWith('sLvLS_')) {
			let n = name.slice('sLvLS_'.length);
			n = n.charAt(0).toUpperCase() + n.slice(1);
			return `s${n}LevelUpLearnset`.replace('Nidoranf', 'NidoranF').replace('Nidoranm', 'NidoranM').replace('Hooh', 'HoOh');;
		}
		return name;
	}
}

/**
 * @param {PokemonJson} data 
 * @param {typeof FILES} config 
 */
async function dumpTMLearnset(data, config) {
	const out = FS.createWriteStream(config.path, { encoding: 'utf8' });
	out.write(/* c */`#define TMHM_LEARNSET(moves) {(u32)(moves), ((u64)(moves) >> 32)}`)
	if (data._type == "the")
		out.write(/* c */`
#define TMHM(tmhm) ((u64)1 << (ITEM_##tmhm - ITEM_TM01_FOCUS_PUNCH))

// This table determines which TMs and HMs a species is capable of learning.
// Each entry is a 64-bit bit array spread across two 32-bit values, with
// each bit corresponding to a .`);
	else
		out.write(/* c */`
#define TMHM(tmhm) ((u64)1 << (ITEM_##tmhm - ITEM_TM01_FOCUS_PUNCH - ((ITEM_##tmhm > ITEM_TM100) ? 50 : 0)))
`);
	out.write(/* c */`
const u32 gTMHMLearnsets[][2] =
{
    [SPECIES_NONE]        = TMHM_LEARNSET(0),

`);
	const TM_LIST = data.tmlist || [];
	const PREFIX = 'TMHM_LEARNSET';
	for (const [name, pkmn] of Object.entries(data.pokemon)) {
		if (!pkmn.tms) continue;
		const tms = pkmn.tms.map(x => {
			let o = x;
			if (typeof x === 'number') o = TM_LIST[x];
			if (o === undefined) o = `TM${('00' + x).slice(-2)}`;
			return `TMHM(${o})`;
		});
		if (tms.length === 0) tms.push('0');
		out.write(`    ${`[SPECIES_${name.toUpperCase()}]`.padEnd(21, ' ')} = ${PREFIX}(${tms.join('\n                                        | ')}),\n\n`);
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
	const PREFIX = forRepos(data, { base: '' }, 'TUTOR_LEARNSET');
	const MON_LIST = [
		`    [SPECIES_NONE]             = ${PREFIX}(0)`
	];
	for (const [name, pkmn] of Object.entries(data.pokemon)) {
		if (!pkmn.tutor) continue;
		let tutor = pkmn.tutor.map(VALUE_TRANSFORM['move']);
		for (const m of tutor) TUTOR_LIST.add(m);
		tutor = tutor.map(x => `TUTOR(${x})`);
		if (tutor.length === 0) tutor.push('0');
		MON_LIST.push(`    ${`[SPECIES_${name.toUpperCase()}]`.padEnd(26, ' ')} = ${PREFIX}(${tutor.join('\n                                              | ')})`);
	}

	const tutorList = data.tutorList?.length > 0 ? data.tutorList : Array.from(TUTOR_LIST);

	const out = FS.createWriteStream(config.path, { encoding: 'utf8' });
	if (data._type === 'the') {
		// write out defines
		let i = 0;
		for (const move of tutorList) {
			out.write(`#define TUTOR_${move} ${i++}\n`);
		}
	}
	out.write(/* c */`
const u16 gTutorMoves[] =
{
`);
	out.write(tutorList.map(move => `    [TUTOR_${move}] = ${move}`).join(',\n'));
	out.write(/* c */`,
};

#define TUTOR_LEARNSET(moves) ((u32)(moves))
#define TUTOR(move) ((u64)1 << (TUTOR_##move))

static const u32 sTutorLearnsets[] =
{
`);
	out.write(MON_LIST.join(',\n\n'));
	out.write(`,\n\n};\n\n`);
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

/**
 * @param {PokemonJson} data 
 * @param {typeof FILES} config 
 */
async function dumpWildPokemon(data, config) {
	const original = (FS.existsSync(config.path) ? FS.readFileSync(config.path, { encoding: 'utf8' }) : "").split('\n');
	const out = FS.createWriteStream(config.path, { encoding: 'utf8' });
	let lineNo = 0;
	while (lineNo < config.startLine - 1) {
		out.write(original[lineNo++] + '\n');
	}
	const wilds = data.wilds;
	wilds.forEach(w => {
		out.write(`const struct WildPokemon ${w.setLabel}[] =\n{\n`);
		w.set.forEach(s => out.write(`    {${s.levelMin}, ${s.levelMax}, SPECIES_${s.species.toUpperCase()}},\n`));
		out.write('};\n\n');
		if (w.rate == 180)
			out.write('// 180 = 100% encounter rate\n');
		out.write(`const struct WildPokemonInfo ${w.infoLabel} = {${w.rate}, ${w.setLabel}};\n\n`)
	});
	for (let line = config.endLine + 1; line < original.length - 1; out.write(original[line++] + "\n"));
	out.close();
	console.log(`File written to ${config.path}.`);
}

/**
 * @param {PokemonJson} data 
 * @param {typeof FILES} config 
 */
async function dumpTrainerParties(data, config) {
	const original = (FS.existsSync(config.path) ? FS.readFileSync(config.path, { encoding: 'utf8' }) : "").split('\n');
	const out = FS.createWriteStream(config.path, { encoding: 'utf8' });

	const trainers = data.trainerParties;
	trainers.forEach(t => {
		if (data._type == "the" && t.id == "Logan1")
			out.write(`#if TPP_MODE
#define LOGAN_PARTY 2
#define LOGAN_BASE_LEVEL 47
#else
#define LOGAN_PARTY 1
#define LOGAN_BASE_LEVEL 42
#endif
\n`);
		out.write(`static const struct ${t.type} sParty_${t.id}[] = {\n`);
		out.write(t.party.map(p => (p.compiler ? p.compiler + '\n' : '') +
			'    {\n' +
			`    .iv = ${p.iv},\n` +
			`    .lvl = ${p.lvl},\n` +
			`    .species = SPECIES_${p.species.toUpperCase()},\n` +
			(t.type == 'TrainerMonItemCustomMoves' || t.type == 'TrainerMonItemDefaultMoves' ? `    .heldItem = ITEM_${(p.heldItem || "none").toUpperCase()}${t.type == 'TrainerMonItemCustomMoves' ? ',' : ''}\n` : '') +
			(t.type == 'TrainerMonItemCustomMoves' || t.type == 'TrainerMonNoItemCustomMoves' ? `    .moves = ${p.moves.map(m => `MOVE_${(m || "none").toUpperCase()}`).join(', ')}\n` : '') +
			`    }`).join(',\n'));
		out.write('\n};\n\n');
		if (data._type == "the" && t.id == "Logan1")
			out.write(`#undef LOGAN_PARTY
#undef LOGAN_BASE_LEVEL
\n`);
	});
	for (let line = config.endLine + 1; line < original.length - 1; out.write(original[line++] + "\n"));
	out.close();
	console.log(`File written to ${config.path}.`);

	FS.writeFileSync(config.trainerData, FS.readFileSync(config.trainerData, { encoding: "utf8" })
		.replace(/\.party = \{\.([^\s]+?) = sParty_([^\s]+?) }/g, (line, type, tId) => {
			/** @type {TrainerInfo[]} */
			const trainerParties = data.trainerParties;
			const trainer = trainerParties.find(t => t.id == tId);
			return `.party = {.${trainer.type.replace('TrainerMon', '')} = sParty_${trainer.id} }`;
		})
		.replace(/\[(.+?)\] =\s*\{\s*\.partyFlags = (.+?),/g, (line, constant) => {
			/** @type {TrainerInfo[]} */
			const trainerParties = data.trainerParties;
			/** @type {TrainerInfo} */
			const trainer = trainerParties.find(t => t.constant == constant);
			if (trainer)
				return `[${constant}] =
    {
        .partyFlags = ${[trainer.type.indexOf("NoItem") < 0 && "F_TRAINER_PARTY_HELD_ITEM", trainer.type.indexOf("DefaultMoves") < 0 && "F_TRAINER_PARTY_CUSTOM_MOVESET"].filter(f => !!f).join(' | ') || '0'},`;
			return line;
		})
	);

	console.log(`File written to ${config.trainerData}.`);

}

/**
 * @param {PokemonJson} data 
 * @param {typeof FILES} config 
 */
async function dumpTMMoves(data, config) {
	const original = (FS.existsSync(config.path) ? FS.readFileSync(config.path, { encoding: 'utf8' }) : "").split('\n');
	const out = FS.createWriteStream(config.path, { encoding: 'utf8' });
	let lineNo = 0;
	while (lineNo < config.startLine - 1) {
		out.write(original[lineNo++] + '\n');
	}
	const tmMoves = data.tmMoves;
	tmMoves.filter(m => !!m).forEach(m => out.write(`    MOVE_${m.toUpperCase()},\n`));
	for (let line = config.endLine - 1; line < original.length - 1; out.write(original[line++] + "\n"));
	out.close();
	console.log(`File written to ${config.path}.`);
}

/**
 * @param {PokemonJson} data 
 * @param {typeof FILES} config 
 */
async function dumpStarters(data, config) {
	const original = (FS.existsSync(config.path) ? FS.readFileSync(config.path, { encoding: 'utf8' }) : "").split('\n');
	const out = FS.createWriteStream(config.path, { encoding: 'utf8' });
	let lineNo = 0;
	while (lineNo < config.startLine - 1) {
		out.write(original[lineNo++] + '\n');
	}
	const starters = data.starters;
	starters.filter(m => !!m).forEach(m => out.write(`    SPECIES_${m.toUpperCase()},\n`));
	for (let line = config.endLine; line < original.length - 1; out.write(original[line++] + "\n"));
	out.close();
	console.log(`File written to ${config.path}.`);
}

/**
 * @param {PokemonJson} data 
 * @param {typeof FILES} config 
 */
async function dumpTrades(data, config) {
	const original = (FS.existsSync(config.path) ? FS.readFileSync(config.path, { encoding: 'utf8' }) : "").split('\n');

	data.npcTrades.forEach(t => {
		original[t.monInLine - 1] = original[t.monInLine - 1].replace(/SPECIES_([^\s,]+)/g, `SPECIES_${t.monIn.toUpperCase()}`);
		original[t.monOutLine - 1] = original[t.monOutLine - 1].replace(/SPECIES_([^\s,]+)/g, `SPECIES_${t.monOut.toUpperCase()}`);
	})

	FS.writeFileSync(config.path, original.join('\n'), { encoding: 'utf8' });

	console.log(`File written to ${config.path}.`);
}

/**
 * @param {PokemonJson} data 
 * @param {typeof FILES} config 
 */
async function dumpStatics(data, config) {
	data.staticMons.forEach(static => {
		const path = PATH.join(__dirname, static.file);
		if (!FS.existsSync(path))
			throw new Error(`${path} does not exist!`);
		const original = FS.readFileSync(path, { encoding: 'utf8' }).split('\n');

		original[static.monLine - 1] = original[static.monLine - 1].replace(/SPECIES_([^\s,]+)/g, `SPECIES_${static.mon.toUpperCase()}`);

		FS.writeFileSync(path, original.join('\n'), { encoding: 'utf8' });
		console.log(`File written to ${path}.`);
	});
}

new Promise(async (res, rej) => res(require(INPUT_FILE)))

	.then(/** @param {PokemonJson} data */(data) => {
		delete data.pokemon['none']; // remove sentinal
		const REPO_TYPE = data._type;
		if (!REPO_TYPE) throw new ReferenceError('No repo type present on input data, unable to proceed.');

		FS.mkdirSync(PATH.join(__dirname, BASE_PATH), { recursive: true });

		const fns = FILES.map(x => {
			if (typeof x.fn !== 'function') return Promise.resolve(); //skip
			if (x.forRepoTypes) {
				const set = new Set(x.forRepoTypes);
				if (!set.has(REPO_TYPE)) return Promise.resolve(); //skip
			}
			return x.fn(data, x);
		});
	});
