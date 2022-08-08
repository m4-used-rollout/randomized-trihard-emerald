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

/** @type {RepoType} The type of repo this is scraping. There are minor differences. */
const REPO_TYPE = 'the';

/** If we should output the level up tables separately. False will 
 * include them in each pokemon. */
const KEEP_LEARNSET_POINTERS = true;

/** Converts TM learnsets into numbers, for smaller storage. HMs will be 
 * converted to (last TM number)+(HM number). A table of TMs will be output. */
const CONVERT_TMS_TO_NUMS = true;

/** Change macros such as TYPE_*, ABILITY_*, ITEM_*, etc into smaller, lowercase
 * values for the json. */
const MINIMIZE_VALUES = true;

const OUTPUT_FILE = './output.json';

//-----------------------------------------------------------------------------

const BASE_INPUT_PATH = '../../src/data/pokemon/';

// The names of the files to process
const FILES = [
	{
		path: PATH.join(__dirname, BASE_INPUT_PATH, 'base_stats.h'),
		fn: scrapeBaseStats,
		startLine: forRepos({ base: 39, exp: 6, the: 39 }), // skip macro definition at top of file, present in some repos
		endLine: Infinity,
	}, {
		path: PATH.join(__dirname, BASE_INPUT_PATH, 'egg_moves.h'),
		fn: scrapeEggMoves,
		startLine: 6,
		endLine: Infinity,
	}, {
		path: PATH.join(__dirname, BASE_INPUT_PATH, 'evolution.h'),
		fn: scrapeEvolutions,
		startLine: 2,
		endLine: Infinity,
	}, {
		path: PATH.join(__dirname, BASE_INPUT_PATH, 'level_up_learnset_pointers.h'),
		lists: PATH.join(__dirname, BASE_INPUT_PATH, 'level_up_learnsets.h'),
		fn: scrapeLevelUpLearnset,
		startLine: 2,
		endLine: Infinity,
	}, {
		path: PATH.join(__dirname, BASE_INPUT_PATH, 'tmhm_learnsets.h'),
		fn: scrapeTMLearnset,
		startLine: 8,
		endLine: Infinity,
	}, {
		path: PATH.join(__dirname, BASE_INPUT_PATH, 'tutor_learnsets.h'),
		fn: scrapeTutorLearnset,
		startLine: forRepos({ base: 38, exp: 39, the: 70 }), // skipping defines and tutor move array
		endLine: Infinity,
	}, {
		path: PATH.join(__dirname, BASE_INPUT_PATH, '..', 'wild_encounters.h'),
		fn: scrapeWildPokemon,
		startLine: forRepos({ the: 14 }),
		endLine: forRepos({ the: 3260 }),
		forRepoTypes: ['the'],
	}, {
		path: PATH.join(__dirname, BASE_INPUT_PATH, 'form_species_table_pointers.h'),
		lists: PATH.join(__dirname, BASE_INPUT_PATH, 'form_species_tables.h'),
		fn: scrapeFormSpecies,
		startLine: 0,
		endLine: Infinity,
		forRepoTypes: ['exp'],
	}, {
		path: PATH.join(__dirname, BASE_INPUT_PATH, 'form_change_table_pointers.h'),
		lists: PATH.join(__dirname, BASE_INPUT_PATH, 'form_change_tables.h'),
		fn: scrapeFormChanges,
		startLine: 41,
		endLine: Infinity,
		forRepoTypes: ['exp'],
	},
];
const MAX_TMS = forRepos({}, 50); //expansion maybe has 100?

/**
 * @param {Record<RepoType, any>} obj 
 */
function forRepos(obj, def = 0) {
	if (obj[REPO_TYPE]) return obj[REPO_TYPE];
	return def;
}


async function scrapeBaseStats(config) {
	let lineNo = 0;
	let state = null, data = {};
	let extra = {};
	/** @type {Map<string, object>} */
	const out = new Map();

	const stream = FS.createReadStream(config.path, { encoding: 'utf8' });
	const readin = RL.createInterface({ input: stream, crlfDelay: Infinity });
	for await (let line of readin) {
		lineNo++;
		if (lineNo < config.startLine) continue;
		if (lineNo > config.endLine) break;

		let res;
		if (state === null && (res = /\[SPECIES_(\w+)\] =(.*)/i.exec(line))) {
			state = res[1].toLowerCase();
			data = {};
			if (/\{0\}/i.test(res[2])) { // empty config
				out.set(state, { baseStats: {} });
				state = null;
			}
			else if (state.startsWith("old_unown")) {
				extra['_includeOldUnownData'] = true;
				out.set(state, { _ref: 'unown', baseStats: {} });
				state = null; // skip the unown forms
			}
			continue;
		}
		if (state && (res = /\s+\.(\w+)\s*\=(.+)$/i.exec(line))) {
			let key = res[1].trim();
			let val = res[2].trim();
			if (val.endsWith(',')) val = val.slice(0, -1); // slice comma
			if (res = /PERCENT_FEMALE\(([\.\d]+)\)/.exec(val)) {
				val = Number.parseFloat(res[1]);
			}
			else if (key === 'abilities') { // for base and exp, THE has ability1/2
				let o = [];
				const r = /ABILITY_(\w+)/gi;
				while ((res = r.exec(val)) !== null) {
					// let x = res[1].toLowerCase();
					// if (x === 'none') x = null;
					// o.push(x);
					o.push(minimize(res[0]));
				}
				val = o;
			}
			else if (/OLD_UNOWN_BASE_STATS/i.test(val)) {
				extra['_includeOldUnownData'] = true;
				continue; // skip the unown stats
			}
			else if (/^\d+$/i.test(val)) {
				val = Number.parseInt(val);
			}
			else if (/^FALSE$/i.test(val)) {
				val = false;
			}
			else if (/^TRUE$/i.test(val)) {
				val = true;
			}
			else if (MINIMIZE_VALUES && /^MON_GENDERLESS$/i.test(val)) {
				val = null;
			}
			else if (res = /^(?:TYPE|EGG_GROUP|ABILITY|ITEM|GROWTH|BODY_COLOR)_([\w\d_]+)$/i.exec(val)) {
				val = minimize(val);
			}
			data[key] = val;
		}
		if (state && /^\},$/i.exec(line.trim())) {
			out.set(state, { baseStats: data });
			state = null;
		}
	}
	if (state) {
		out.set(state, { baseStats: data });
		state = null;
	}
	return Object.assign({ out }, extra);
}

async function scrapeEggMoves(config) {
	let lineNo = 0;
	let state = null, data;
	/** @type {Map<string, object>} */
	const out = new Map();

	const stream = FS.createReadStream(config.path, { encoding: 'utf8' });
	const readin = RL.createInterface({ input: stream, crlfDelay: Infinity });
	for await (let line of readin) {
		lineNo++;
		if (lineNo < config.startLine) continue;
		if (lineNo > config.endLine) break;

		let res;
		if (state === null && (res = /egg_moves\((\w+),/i.exec(line))) {
			state = res[1].toLowerCase();
			data = [];
		}
		if (state && (res = /MOVE_(\w+)(\)?),/i.exec(line))) {
			data.push(minimize(`MOVE_${res[1]}`));
			if (res[2] === ')') {
				out.set(state, { eggMoves: data });
				state = null;
			}
		}
	}
	return out;
}

async function scrapeEvolutions(config) {
	// This sub-function setup was nice and pretty before the stupid async generator
	// made me have to await every fucking function call. DansGame
	let lineNo = 1;
	/** @type {Map<string, object>} */
	const out = new Map();
	const genFn = readFileCharByChar(config);

	// Skip until line 
	while (lineNo < config.startLine) {
		let d = await genFn.next();
		if (d.done) throw new TypeError('Unexpected EOF');
	}
	while (true) {
		if (!await skipOrEOF('[')) break;
		let species = await gather(']');
		await skip('=');
		let evos = await getArray();

		species = species.replace('SPECIES_', '').toLowerCase();
		evos = evos.map(x => ({
			type: (MINIMIZE_VALUES) ? x[0].slice('EVO_'.length) : x[0],
			req: (isNumeric(x[1])) ? Number.parseInt(x[1]) : x[1],
			species: x[2].slice('SPECIES_'.length).toLowerCase(),
		}));
		// console.log(species, evos);
		out.set(species, { evolutions: evos });
	}
	return out;

	/**
	 * Skips characters until it hits the character given
	 * @param {string} char 
	 */
	async function skipOrEOF(char) {
		while (true) {
			const d = await genFn.next();
			if (d.done) return false;
			if (d.value === char) return true;
		}
	}

	/**
	 * Skips characters until it hits the character given
	 * @param {Generator<string, void>} genFn 
	 * @param {string} char 
	 */
	async function skip(char) {
		while (true) {
			const d = await genFn.next();
			if (d.done) throw new TypeError('Unexpected EOF');
			if (d.value === char) return;
		}
	}

	/**
	 * Gathers characters into a string until it hits the character given
	 * @param {string} char 
	 */
	async function gather(char) {
		let str = "";
		while (true) {
			const d = await genFn.next();
			if (d.done) throw new TypeError('Unexpected EOF');
			if (d.value === char) return str;
			str += d.value;
		}
	}

	/**
	 * Recursively gets arrays from "{string,string,...}" formatted data
	 */
	async function getArray() {
		while (true) {
			const d = await genFn.next();
			if (d.done) throw new TypeError('Unexpected EOF');
			if (d.value === '{') {
				let res = await _inner();
				return res;
			}
		}
		return;
		async function _inner() {
			let items = [];
			let currStr = '';
			while (true) {
				const d = await genFn.next();
				if (d.done) throw new TypeError('Unexpected EOF');
				switch (d.value) {
					case '}':
						currStr = currStr.trim();
						if (currStr) {
							items.push(currStr);
							currStr = '';
						}
						return items;
					case '{':
						currStr = currStr.trim();
						if (currStr) throw new SyntaxError('Unexpected { in source file!');
						items.push(await _inner());
						break;
					case ',':
						currStr = currStr.trim();
						if (currStr) {
							items.push(currStr);
							currStr = '';
						}
						break;
					default:
						currStr += d.value;
						break;
				}
			}
		}
	}

	async function* readFileCharByChar(config) {
		const stream = FS.createReadStream(config.path, { encoding: 'utf8' });
		for await (const chunk of stream) {
			for (const char of chunk) {
				if (char === '\n') {
					lineNo++;
					yield ' ';
					continue;
				}
				if (char === '\r') continue;

				yield char;
			}
		}
	}
}

async function scrapeLevelUpLearnset(config) {
	let lineNo = 0;
	let state = null, data;
	/** @type {Map<string, object>} */
	const out = new Map();
	/** @type {Map<string, object[]>} */
	const lists = new Map();
	let metaData = {};
	// First, load the lists
	{
		const stream = FS.createReadStream(config.lists, { encoding: 'utf8' });
		const readin = RL.createInterface({ input: stream, crlfDelay: Infinity });
		let state = null, data;
		for await (let line of readin) {
			line = line.trim();
			// Unconditional skipping
			if (line.startsWith('#define')) continue;
			if (line.startsWith('//')) continue;
			// When not reading a list...
			if (state === null) {
				let res;
				if (res = /^static const ((?:\w+ )+)(\w+)\[\] = \{$/i.exec(line)) {
					metaData['_lvlTableType'] = res[1].trim();
					state = _shorten(res[2]); data = [];
					continue;
				}
			}
			// When reading a list...
			else {
				let res;
				if (res = /^LEVEL_UP_MOVE\(\s*(\d+),\s*MOVE_(\w+)\),$/i.exec(line)) {
					data.push({ move: minimize(`MOVE_${res[2]}`), level: Number.parseInt(res[1]) });
					continue;
				}
				else if (res = /^LEVEL_UP_END/i.exec(line)) {
					lists.set(state, data);
					state = null;
					continue;
				}
			}
		}
	}
	// Then, load the pointers
	{
		const stream = FS.createReadStream(config.path, { encoding: 'utf8' });
		const readin = RL.createInterface({ input: stream, crlfDelay: Infinity });
		for await (let line of readin) {
			lineNo++;
			if (lineNo < config.startLine) continue;
			if (lineNo > config.endLine) break;

			let res;
			if (res = /\[SPECIES_(\w+)\] = (\w+),$/i.exec(line)) {
				let key = res[1].toLowerCase();
				let val = _shorten(res[2]);

				if (KEEP_LEARNSET_POINTERS) {
					out.set(key, { lvlLearnset: val });
				} else {
					out.set(key, { lvlLearnset: lists.get(val) });
				}
			}
		}
	}
	if (KEEP_LEARNSET_POINTERS) {
		let lvlTables = Object.fromEntries(lists.entries());
		return Object.assign({ lvlTables, out }, metaData);
	} else {
		return Object.assign({ out }, metaData);
	}
	function _shorten(name) {
		let res;
		if (res = /s(\w+)LevelUpLearnset/i.exec(name)) {
			return `sLvLS_${res[1].toLowerCase()}`;
		}
		return name;
	}
}

async function scrapeTMLearnset(config) {
	// Doing the sub function thing again, woo...!
	let lineNo = 1;
	const tmlist = [];
	/** @type {Map<string, object>} */
	const out = new Map();
	const genFn = readFileCharByChar(config);

	// Skip until line 
	while (lineNo < config.startLine) {
		let d = await genFn.next();
		if (d.done) throw new TypeError('Unexpected EOF');
	}
	while (true) {
		if (!await skipOrEOF('[')) break;
		let species = await gather(']');
		await skip('=');
		let set = await getLearnset();

		// Some pokemon don't learn anything, and so have TMHM_LEARNSET(0)
		if (set.length == 1 && set[0] === '0') set = [];

		species = species.replace('SPECIES_', '').toLowerCase();
		set = set.flat();
		if (CONVERT_TMS_TO_NUMS) set = set.map(tm => {
			let res;
			if (res = /^[TH]M(\d{2})_[\w_]+$/i.exec(tm)) {
				let num = Number.parseInt(res[1], 10);
				if (tm.charAt(0) === 'H') num += MAX_TMS;
				tmlist[num] = tm;
				return num;
			}
			return tm;
		}).sort((a, b) => a - b);

		// console.log(species, set);
		out.set(species, { tms: set });
	}
	if (CONVERT_TMS_TO_NUMS) {
		return { out, tmlist };
	}
	return out;

	/**
	 * Skips characters until it hits the character given
	 * @param {string} char 
	 */
	async function skipOrEOF(char) {
		while (true) {
			const d = await genFn.next();
			if (d.done) return false;
			if (d.value === char) return true;
		}
	}

	/**
	 * Skips characters until it hits the character given
	 * @param {Generator<string, void>} genFn 
	 * @param {string} char 
	 */
	async function skip(char) {
		while (true) {
			const d = await genFn.next();
			if (d.done) throw new TypeError('Unexpected EOF');
			if (d.value === char) return;
		}
	}

	/**
	 * Gathers characters into a string until it hits the character given
	 * @param {string} char 
	 */
	async function gather(char) {
		let str = "";
		while (true) {
			const d = await genFn.next();
			if (d.done) throw new TypeError('Unexpected EOF');
			if (d.value === char) return str;
			str += d.value;
		}
	}

	/**
	 * Recursively gets learnsets from "TMHM_LEARNSET( TMHM(string) | ... )" formatted data
	 */
	async function getLearnset() {
		while (true) {
			const d = await genFn.next();
			if (d.done) throw new TypeError('Unexpected EOF');
			let macro = await gather('(');
			if (macro.trim() !== 'TMHM_LEARNSET') throw new TypeError('Error parsing learnsets, unexpected macro!');
			return await _inner();
		}
		return;
		async function _inner() {
			let items = [];
			let currStr = '';
			while (true) {
				const d = await genFn.next();
				if (d.done) throw new TypeError('Unexpected EOF');
				switch (d.value) {
					case ')':
						currStr = currStr.trim();
						if (currStr) {
							items.push(currStr);
							currStr = '';
						}
						return items;
					case '(':
						currStr = currStr.trim();
						if (currStr !== 'TMHM') throw new SyntaxError('Unexpected { in source file!');
						items.push(await _inner());
						currStr = '';
						break;
					case '|':
						currStr = currStr.trim();
						if (currStr) {
							items.push(currStr);
							currStr = '';
						}
						break;
					default:
						currStr += d.value;
						break;
				}
			}
		}
	}

	async function* readFileCharByChar(config) {
		const stream = FS.createReadStream(config.path, { encoding: 'utf8' });
		for await (const chunk of stream) {
			for (const char of chunk) {
				if (char === '\n') {
					lineNo++;
					yield ' ';
					continue;
				}
				if (char === '\r') continue;

				yield char;
			}
		}
	}
}

async function scrapeTutorLearnset(config) {
	// I hate that I'm literally copy-pasting-tweaking this code from TMs for Tutors
	const MARKER = forRepos({ base: '' }, 'TUTOR_LEARNSET'); // Some don't have a macro for tutor learnsets

	let lineNo = 1;
	/** @type {Map<string, object>} */
	const out = new Map();
	const genFn = readFileCharByChar(config);

	// Skip until line 
	while (lineNo < config.startLine) {
		let d = await genFn.next();
		if (d.done) throw new TypeError('Unexpected EOF');
	}
	while (true) {
		if (!await skipOrEOF('[')) break;
		let species = await gather(']');
		await skip('=');
		let set = await getLearnset();

		// Some pokemon don't learn anything, and so have TUTOR_LEARNSET(0)
		if (set.length == 1 && set[0] === '0') set = [];

		species = species.replace('SPECIES_', '').toLowerCase();
		set = set.flat().map(move => {
			let res;
			if (res = /^MOVE_([\w_]+)$/i.exec(move)) {
				return minimize(`MOVE_${res[1]}`);
			}
			return move;
		});

		// console.log(species, set);
		out.set(species, { tutor: set });
	}
	return out;

	/**
	 * Skips characters until it hits the character given
	 * @param {string} char 
	 */
	async function skipOrEOF(char) {
		while (true) {
			const d = await genFn.next();
			if (d.done) return false;
			if (d.value === char) return true;
		}
	}

	/**
	 * Skips characters until it hits the character given
	 * @param {Generator<string, void>} genFn 
	 * @param {string} char 
	 */
	async function skip(char) {
		while (true) {
			const d = await genFn.next();
			if (d.done) throw new TypeError('Unexpected EOF');
			if (d.value === char) return;
		}
	}

	/**
	 * Gathers characters into a string until it hits the character given
	 * @param {string} char 
	 */
	async function gather(char) {
		let str = "";
		while (true) {
			const d = await genFn.next();
			if (d.done) throw new TypeError('Unexpected EOF');
			if (d.value === char) return str;
			str += d.value;
		}
	}

	/**
	 * Recursively gets learnsets from "TUTOR_LEARNSET( TUTOR(string) | ... )" formatted data
	 */
	async function getLearnset() {
		while (true) {
			const d = await genFn.next();
			if (d.done) throw new TypeError('Unexpected EOF');
			let macro = await gather('(');
			// console.log(macro);
			if (macro.trim() !== MARKER) throw new TypeError('Error parsing learnsets, unexpected macro!');
			return await _inner();
		}
		return;
		async function _inner() {
			let items = [];
			let currStr = '';
			while (true) {
				const d = await genFn.next();
				if (d.done) throw new TypeError('Unexpected EOF');
				switch (d.value) {
					case ')':
						currStr = currStr.trim();
						if (currStr) {
							items.push(currStr);
							currStr = '';
						}
						return items;
					case '(':
						currStr = currStr.trim();
						if (currStr !== 'TUTOR') throw new SyntaxError('Unexpected { in source file!');
						items.push(await _inner());
						currStr = '';
						break;
					case '|':
						currStr = currStr.trim();
						if (currStr) {
							items.push(currStr);
							currStr = '';
						}
						break;
					default:
						currStr += d.value;
						break;
				}
			}
		}
	}

	async function* readFileCharByChar(config) {
		const stream = FS.createReadStream(config.path, { encoding: 'utf8' });
		for await (const chunk of stream) {
			for (const char of chunk) {
				if (char === '\n') {
					lineNo++;
					yield ' ';
					continue;
				}
				if (char === '\r') continue;

				yield char;
			}
		}
	}
}

async function scrapeFormSpecies() { } //TODO
async function scrapeFormChanges() { } //TODO

async function scrapeWildPokemon(config) {
	let lineNo = 0;
	/** @type {Map<string, object>} */
	const out = new Map();
	/** @type {Array<WildPokemonInfo>} */
	const wilds = new Array();
	/** @type {WildPokemonInfo} */
	let currWild;

	const stream = FS.createReadStream(config.path, { encoding: 'utf8' });
	const readin = RL.createInterface({ input: stream, crlfDelay: Infinity });
	for await (let line of readin) {
		lineNo++;
		if (lineNo < config.startLine) continue;
		if (lineNo > config.endLine) break;

		let res;
		if (res = /^const struct WildPokemon (.+?)\[\]/.exec(line)) {
			currWild = { setLabel: res[1], set: [] };
			wilds.push(currWild);
		}
		// {3, 3, SPECIES_ZIGZAGOON},
		if (res = /\{(\d+),\s*(\d+),\s*(.+?)\s*\}/i.exec(line))
			currWild.set.push({ levelMin: parseInt(res[1]), levelMax: parseInt(res[2]), species: minimize(res[3]) });
		if (res = /^const struct WildPokemonInfo (.+?) = \{(\d+),\s*(.+?)\}/.exec(line)) {
			let wild = wilds.find(w => w.setLabel == res[3]);
			if (!wild) {
				console.error(`Couldn't find set ${res[3]}, falling back on current wild set ${currWild.setLabel}`);
				wild = currWild;
			}
			wild.infoLabel = res[1];
			wild.rate = parseInt(res[2]);
			//console.log(wild.infoLabel)
		}
	}
	return { out, wilds };
}

function minimize(val) {
	if (!MINIMIZE_VALUES) return val;
	let res;
	if (res = /^(?:TYPE|EGG_GROUP|ABILITY|ITEM|GROWTH|BODY_COLOR|MOVE|SPECIES)_([\w\d_]+)$/i.exec(val)) {
		val = res[1].toLowerCase();
		if (val === 'none') val = null;
	}
	return val;
}

function isNumeric(x) {
	let y = Number.parseInt(x);
	return !Number.isNaN(y);
}

// Runs all functions defined in FILES array and returns them all to the then()
Promise.all(FILES.map(x => {
	if (typeof x.fn !== 'function') return Promise.resolve(); //skip
	if (x.forRepoTypes) {
		const set = new Set(x.forRepoTypes);
		if (!set.has(REPO_TYPE)) return Promise.resolve(); //skip
	}
	return x.fn(x);
})).then(data => {
	/** @type {Map<string, object>} */
	const out = new Map();
	const other = {};
	for (let part of data) {
		if (!part) continue;
		// What's being returned is more than just a map to merge
		if (!(part instanceof Map) && (part.out instanceof Map)) {
			// extract map, push everything else to "other"
			let o = part;
			part = part.out;
			delete o.out;
			Object.assign(other, o);
		}
		if (part instanceof Map) {
			for (const [id, p] of part) {
				let d = out.get(id) || {};
				out.set(id, Object.assign(d, p));
			}
		}
	}

	// Don't put out any info about the "none" pokemon.
	out.delete('none');

	const outStream = FS.createWriteStream(OUTPUT_FILE, { encoding: 'utf8' });
	outStream.write(`{\n"_type":"${REPO_TYPE}",\n"pokemon":{\n`);
	for (const [id, dat] of out) {
		outStream.write(`\t"${id}": ${JSON.stringify(dat)},\n`);

	}
	outStream.write(`\t"none": {}\n}`);
	for (let [key, val] of Object.entries(other)) {
		if (typeof val === 'object' && !Array.isArray(val)) {
			// to make it look a little prittier
			outStream.write(`,\n"${key}": {\n`);
			let i = 0;
			for (let [k, v] of Object.entries(val)) {
				if (i > 0) outStream.write(`,\n`);
				outStream.write(`\t"${k}": ${JSON.stringify(v)}`);
				i++;
			}
			outStream.write(`\n}`);
		} else {
			outStream.write(`,\n"${key}": ${JSON.stringify(val)}`);
		}
	}
	outStream.write(`\n}\n`);
});
