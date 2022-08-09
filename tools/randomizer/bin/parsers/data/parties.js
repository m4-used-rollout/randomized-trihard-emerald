"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readwriteparser_1 = require("../readwriteparser");
class TrainerParser extends readwriteparser_1.default {
    constructor() {
        super(...arguments);
        this.romGroups = new Array();
    }
    writePartyMember(partyMon, trainer) {
        const text = [
            `	db ${partyMon.level}`,
            `	dw ${partyMon.species}`
        ];
        if (trainer.type.includes("TRAINERTYPE_ITEM"))
            text.push(`	db ${partyMon.item || "NO_ITEM"}`);
        if (trainer.type.includes("TRAINERTYPE_MOVES")) {
            const moves = partyMon.moves || [];
            text.push(`	dw ${moves[0] || "STRUGGLE"}, ${moves[1] || 'NO_MOVE'}, ${moves[2] || 'NO_MOVE'}, ${moves[3] || 'NO_MOVE'}`);
        }
        if (trainer.type.includes("TRAINERTYPE_DVS"))
            text.push(`	bigdw $${(partyMon.dvs || 0x9888).toString(16).toUpperCase().padStart(4, '0')}`);
        if (trainer.type.includes("TRAINERTYPE_STATS")) {
            text.push(`	bigdw ${partyMon.hpStat}`);
            text.push(`	bigdw ${partyMon.atkStat}`);
            text.push(`	bigdw ${partyMon.defStat}`);
            text.push(`	bigdw ${partyMon.spdStat}`);
            text.push(`	bigdw ${partyMon.satStat}`);
            text.push(`	bigdw ${partyMon.sdfStat}`);
        }
        if (trainer.type.includes("TRAINERTYPE_NICKNAME"))
            text.push(`	db "${partyMon.nickname || partyMon.species}@"`, '');
        return text;
    }
    writeTrainer(trainer) {
        if (trainer.specialTrainer) {
            const specialTrainer = [
                `	next_list_item ; ${trainer.constant}`,
                `	db "${trainer.name}@"`,
                ...trainer.specialTrainer
            ];
            if (specialTrainer.includes("	end_list_items"))
                specialTrainer.splice(specialTrainer.indexOf("	end_list_items"), 2);
            return specialTrainer;
        }
        const text = [
            `	next_list_item ; ${trainer.constant}`,
            `	db "${trainer.name}@", ${trainer.type.join(' | ')}`,
            ...trainer.party.reduce((all, cur) => all.concat(...this.writePartyMember(cur, trainer)), new Array()),
            '	db -1 ; end',
            ''
        ];
        if (trainer.type.includes("TRAINERTYPE_LEVEL_OFFSET"))
            text.splice(2, 0, `	dw ${trainer.levelOffsetLabel || "wBattleTentTutorTrainer1LevelOffset"}`, '');
        if (trainer.type.includes("TRAINERTYPE_NICKNAME"))
            text.splice(2, 0, '');
        return text;
    }
    writeClassGroup(classGroup, allTrainers) {
        const trainers = classGroup.trainerConstants.map(c => allTrainers.find(t => t.constant == c));
        return [
            `${classGroup.label}:`,
            ...trainers.reduce((all, cur) => all.concat(...this.writeTrainer(cur)), new Array()),
            '	end_list_items',
            ''
        ];
    }
    writeRomGroup(romGroup, allTrainers) {
        return [
            `SECTION "${romGroup.name}", ROMX`,
            '',
            ...romGroup.contents.reduce((all, cur) => all.concat(...this.writeClassGroup(cur, allTrainers)), new Array())
        ];
    }
    toFile(data) {
        return [
            ...this.fileHead,
            ...this.romGroups.reduce((all, cur) => all.concat(...this.writeRomGroup(cur, data)), new Array())
        ];
    }
    fromFile(file) {
        this.fileHead = file.slice(0, 9);
        const trainers = new Array();
        this.romGroups = file.filter(l => l.startsWith("SECTION"))
            .map(l => /SECTION "([^"]+)", ROMX/.exec(l)[1]).map(name => {
            const firstLine = file.indexOf(`SECTION "${name}", ROMX`);
            const lastLine = file.findIndex((l, i) => i > firstLine && l.startsWith("SECTION"));
            const section = file.slice(firstLine, (lastLine < 0) ? undefined : lastLine);
            return {
                name,
                contents: section.filter(l => l.endsWith(":"))
                    .map(l => /([^:]+):/.exec(l)[1]).map(label => {
                    const firstLine = section.indexOf(`${label}:`);
                    const lastLine = section.indexOf("	end_list_items", firstLine);
                    const group = section.slice(firstLine, (lastLine < 0) ? undefined : lastLine);
                    return {
                        label,
                        trainerConstants: group.filter(l => l.startsWith('	next_list_item'))
                            .map(l => /	next_list_item\s*;\s*(.+)/.exec(l)).map(matches => {
                            const constant = matches[1];
                            const firstLine = section.indexOf(matches[0]);
                            const lastLine = section.findIndex((l, i) => i > firstLine && l.startsWith('	next_list_item'));
                            const tData = section.slice(firstLine, (lastLine < 0) ? undefined : lastLine);
                            const [, name, types] = /	db "([^@"]+)@"(?:, )?(.+)?/.exec(tData[1]);
                            const trainer = {
                                constant: constant.trim(),
                                name,
                                type: (types || "TRAINERTYPE_SPECIAL").split(' | ').map(t => t.trim())
                            };
                            if (trainer.type.includes("TRAINERTYPE_SPECIAL"))
                                trainer.specialTrainer = tData.slice(2);
                            else {
                                if (trainer.type.includes("TRAINERTYPE_LEVEL_OFFSET"))
                                    [, trainer.levelOffsetLabel] = /dw (.+)/.exec(tData[2]);
                                trainer.party = new Array();
                                for (let i = (trainer.levelOffsetLabel ? 3 : 2); i < tData.length && !tData[i].startsWith("	db -1"); i = i) {
                                    while (tData[i].trim().length < 1 && i < tData.length)
                                        i++; //skip empty lines
                                    if (i >= tData.length)
                                        break;
                                    const mon = {};
                                    [, mon.level] = /db \s*(\d+)/.exec(tData[i++]).map(m => parseInt(m));
                                    [, mon.species] = /dw \s*(.+)/.exec(tData[i++]);
                                    if (trainer.type.includes("TRAINERTYPE_ITEM"))
                                        [, mon.item] = /db \s*(.+)/.exec(tData[i++]);
                                    if (trainer.type.includes("TRAINERTYPE_MOVES"))
                                        mon.moves = /dw ([^,]+), ([^,]+), ([^,]+), (.+)/.exec(tData[i++]).slice(1);
                                    if (trainer.type.includes("TRAINERTYPE_DVS"))
                                        [, mon.dvs] = /bigdw \$([0-9A-F]+)/i.exec(tData[i++]).map(dv => parseInt(dv, 16));
                                    if (trainer.type.includes("TRAINERTYPE_STATS")) {
                                        [, mon.hpStat] = /bigdw (\d+)/i.exec(tData[i++]).map(s => parseInt(s));
                                        [, mon.atkStat] = /bigdw (\d+)/i.exec(tData[i++]).map(s => parseInt(s));
                                        [, mon.defStat] = /bigdw (\d+)/i.exec(tData[i++]).map(s => parseInt(s));
                                        [, mon.spdStat] = /bigdw (\d+)/i.exec(tData[i++]).map(s => parseInt(s));
                                        [, mon.satStat] = /bigdw (\d+)/i.exec(tData[i++]).map(s => parseInt(s));
                                        [, mon.sdfStat] = /bigdw (\d+)/i.exec(tData[i++]).map(s => parseInt(s));
                                    }
                                    if (trainer.type.includes("TRAINERTYPE_NICKNAME")) {
                                        [, mon.nickname] = /db "([^@"]+)@"/.exec(tData[i++]);
                                    }
                                    trainer.party.push(mon);
                                    while (tData[i].trim().length < 1 && i < tData.length)
                                        i++; //skip empty lines
                                }
                            }
                            trainers.push(trainer);
                            return constant.trim();
                        })
                    };
                })
            };
        });
        return trainers;
    }
}
exports.default = TrainerParser;
