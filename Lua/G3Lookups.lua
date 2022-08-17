local Types = { 
	[0] = "Normal",
	[1] = "Fighting",
	[2] = "Flying",
	[3] = "Poison",
	[4]	= "Ground",
	[5] = "Rock",
	[6] = "Bug",
	[7] = "Ghost",
	[8] = "Steel",
	[9] = "???", -- Some hacks rename this to Fairy
	[10] = "Fire",
	[11] = "Water",
	[12] = "Grass",
	[13] = "Electric",
	[14] = "Psychic",
	[15] = "Ice",
	[16] = "Dragon",
	[17] = "Dark"
}

local EggTypes = { 
	[0] = "",
	[1] = "Monster",
	[2] = "Water 1",
	[3] = "Bug",
	[4] = "Flying",
	[5] = "Field",
	[6] = "Fairy",
	[7] = "Grass",
	[8] = "Human-Like",
	[9] = "Water 3",
	[10] = "Mineral",
	[11] = "Amorphous",
	[12] = "Water 2",
	[13] = "Ditto",
	[14] = "Dragon",
	[15] = "Undiscovered"
}

local TrainerGender = {
	[0] = "Male",
	[1] = "Female"
}

local OriginalGame = {
	[0] = "Colosseum Bonus Disc",
	[1] = "Sapphire",
	[2] = "Ruby",
	[3] = "Emerald",
	[4] = "FireRed",
	[5] = "LeafGreen",
	[15] = "Colosseum or XD"
}

--character map from RSE's encoding to UTF-8
local CharMap = {
	[0x00] = string.char(0x20), -- space
	[0x01] = string.char(0xC3,0x80), -- À
	[0x02] = string.char(0xC3,0x81), -- Á
	[0x03] = string.char(0xC3,0x82), -- Â
	[0x04] = string.char(0xC3,0x87), -- Ç
	[0x05] = string.char(0xC3,0x88), -- È
	[0x06] = string.char(0xC3,0x89), -- É
	[0x07] = string.char(0xC3,0x8A), -- Ê
	[0x08] = string.char(0xC3,0x8B), -- Ë
	[0x09] = string.char(0xC3,0x8C), -- Ì
	[0x0A] = string.char(0xE3,0x81,0x93), -- こ
	[0x0B] = string.char(0xC3,0x8E), -- Î
	[0x0C] = string.char(0xC3,0x8F), -- Ï
	[0x0D] = string.char(0xC3,0x92), -- Ò
	[0x0E] = string.char(0xC3,0x93), -- Ó
	[0x0F] = string.char(0xC3,0x94), -- Ô
	[0x10] = string.char(0xC5,0x92), -- Œ
	[0x11] = string.char(0xC3,0x99), -- Ù
	[0x12] = string.char(0xC3,0x9A), -- Ú
	[0x13] = string.char(0xC3,0x9B), -- Û
	[0x14] = string.char(0xC3,0x91), -- Ñ
	[0x15] = string.char(0xC3,0x9F), -- ß
	[0x16] = string.char(0xC3,0xA0), -- à
	[0x17] = string.char(0xC3,0xA1), -- á
	[0x18] = string.char(0xE3,0x81,0xAD), -- ね
	[0x19] = string.char(0xC3,0xA7), -- ç
	[0x1A] = string.char(0xC3,0xA8), -- è
	[0x1B] = string.char(0xC3,0xA9), -- é
	[0x1C] = string.char(0xC3,0xAA), -- ê
	[0x1D] = string.char(0xC3,0xAB), -- ë
	[0x1E] = string.char(0xC3,0xAC), -- ì
	[0x1F] = string.char(0xE3,0x81,0xBE), -- ま
	[0x20] = string.char(0xC3,0xAE), -- î
	[0x21] = string.char(0xC3,0xAF), -- ï
	[0x22] = string.char(0xC3,0xB2), -- ò
	[0x23] = string.char(0xC3,0xB3), -- ó
	[0x24] = string.char(0xC3,0xB4), -- ô
	[0x25] = string.char(0xC5,0x93), -- œ
	[0x26] = string.char(0xC3,0xB9), -- ù
	[0x27] = string.char(0xC3,0xBA), -- ú
	[0x28] = string.char(0xC3,0xBB), -- û
	[0x29] = string.char(0xC3,0xB1), -- ñ
	[0x2A] = string.char(0xC2,0xBA), -- º
	[0x2B] = string.char(0xC2,0xAA), -- ª
	[0x2C] = "?", -- Unidentifiable superior/superscript character
	[0x2D] = string.char(0x26), -- &
	[0x2E] = string.char(0x2B), -- +
	[0x2F] = string.char(0xE3,0x81,0x82), -- あ
	[0x30] = string.char(0xE3,0x81,0x83), -- ぃ
	[0x31] = string.char(0xE3,0x81,0x85), -- ぅ
	[0x32] = string.char(0xE3,0x81,0x87), -- ぇ
	[0x33] = string.char(0xE3,0x81,0x89), -- ぉ
	[0x34] = string.char(0x4C,0x76), -- Lv
	[0x35] = string.char(0x3D), -- =
	[0x36] = string.char(0xE3,0x82,0x87), -- ょ
	[0x37] = string.char(0xE3,0x81,0x8C), -- が
	[0x38] = string.char(0xE3,0x81,0x8E), -- ぎ
	[0x39] = string.char(0xE3,0x81,0x90), -- ぐ
	[0x3A] = string.char(0xE3,0x81,0x92), -- げ
	[0x3B] = string.char(0xE3,0x81,0x94), -- ご
	[0x3C] = string.char(0xE3,0x81,0x96), -- ざ
	[0x3D] = string.char(0xE3,0x81,0x98), -- じ
	[0x3E] = string.char(0xE3,0x81,0x9A), -- ず
	[0x3F] = string.char(0xE3,0x81,0x9C), -- ぜ
	[0x40] = string.char(0xE3,0x81,0x9E), -- ぞ
	[0x41] = string.char(0xE3,0x81,0xA0), -- だ
	[0x42] = string.char(0xE3,0x81,0xA2), -- ぢ
	[0x43] = string.char(0xE3,0x81,0xA5), -- づ
	[0x44] = string.char(0xE3,0x81,0xA7), -- で
	[0x45] = string.char(0xE3,0x81,0xA9), -- ど
	[0x46] = string.char(0xE3,0x81,0xB0), -- ば
	[0x47] = string.char(0xE3,0x81,0xB3), -- び
	[0x48] = string.char(0xE3,0x81,0xB6), -- ぶ
	[0x49] = string.char(0xE3,0x81,0xB9), -- べ
	[0x4A] = string.char(0xE3,0x81,0xBC), -- ぼ
	[0x4B] = string.char(0xE3,0x81,0xB1), -- ぱ
	[0x4C] = string.char(0xE3,0x81,0xB4), -- ぴ
	[0x4D] = string.char(0xE3,0x81,0xB7), -- ぷ
	[0x4E] = string.char(0xE3,0x81,0xBA), -- ぺ
	[0x4F] = string.char(0xE3,0x81,0xBD), -- ぽ
	[0x50] = string.char(0xE3,0x81,0xA3), -- っ
	[0x51] = string.char(0xC2,0xBF), -- ¿
	[0x52] = string.char(0xC2,0xA1), -- ¡
	[0x53] = "Pk",
	[0x54] = "Mn",
	[0x55] = "Po",
	[0x56] = "Ké",
	[0x57] = "BL",
	[0x58] = "OC",
	[0x59] = "K",
	[0x5A] = string.char(0xC3,0x8D), -- Í
	[0x5B] = string.char(0x25), -- %
	[0x5C] = string.char(0x28), -- (
	[0x5D] = string.char(0x29), -- )
	[0x5E] = string.char(0xE3,0x82,0xBB), -- セ
	[0x5F] = string.char(0xE3,0x82,0xBD), -- ソ
	[0x60] = string.char(0xE3,0x82,0xBF), -- タ
	[0x61] = string.char(0xE3,0x83,0x81), -- チ
	[0x62] = string.char(0xE3,0x83,0x84), -- ツ
	[0x63] = string.char(0xE3,0x83,0x86), -- テ
	[0x64] = string.char(0xE3,0x83,0x88), -- ト
	[0x65] = string.char(0xE3,0x83,0x8A), -- ナ
	[0x66] = string.char(0xE3,0x83,0x8B), -- ニ
	[0x67] = string.char(0xE3,0x83,0x8C), -- ヌ
	[0x68] = string.char(0xC3,0xA2), -- â
	[0x69] = string.char(0xE3,0x83,0x8E), -- ノ
	[0x6A] = string.char(0xE3,0x83,0x8F), -- ハ
	[0x6B] = string.char(0xE3,0x83,0x92), -- ヒ
	[0x6C] = string.char(0xE3,0x83,0x95), -- フ
	[0x6D] = string.char(0xE3,0x83,0x98), -- ヘ
	[0x6E] = string.char(0xE3,0x83,0x9B), -- ホ
	[0x6F] = string.char(0xC3,0xAD), -- í
	[0x70] = string.char(0xE3,0x83,0x9F), -- ミ
	[0x71] = string.char(0xE3,0x83,0xA0), -- ム
	[0x72] = string.char(0xE3,0x83,0xA1), -- メ
	[0x73] = string.char(0xE3,0x83,0xA2), -- モ
	[0x74] = string.char(0xE3,0x83,0xA4), -- ヤ
	[0x75] = string.char(0xE3,0x83,0xA6), -- ユ
	[0x76] = string.char(0xE3,0x83,0xA8), -- ヨ
	[0x77] = string.char(0xE3,0x83,0xA9), -- ラ
	[0x78] = string.char(0xE3,0x83,0xAA), -- リ
	[0x79] = string.char(0xE2,0xAC,0x86), -- ⬆
	[0x7A] = string.char(0xE2,0xAC,0x87), -- ⬇
	[0x7B] = string.char(0xE2,0xAC,0x85), -- ⬅
	[0x7C] = string.char(0xE2,0x9E,0xA1), -- ➡
	[0x7D] = string.char(0xE3,0x83,0xB2), -- ヲ
	[0x7E] = string.char(0xE3,0x83,0xB3), -- ン
	[0x7F] = string.char(0xE3,0x82,0xA1), -- ァ
	[0x80] = string.char(0xE3,0x82,0xA3), -- ィ
	[0x81] = string.char(0xE3,0x82,0xA5), -- ゥ
	[0x82] = string.char(0xE3,0x82,0xA7), -- ェ
	[0x83] = string.char(0xE3,0x82,0xA9), -- ォ
	[0x84] = string.char(0xE3,0x83,0xA3), -- ャ
	[0x85] = string.char(0xE3,0x83,0xA5), -- ュ
	[0x86] = string.char(0xE3,0x83,0xA7), -- ョ
	[0x87] = string.char(0xE3,0x82,0xAC), -- ガ
	[0x88] = string.char(0xE3,0x82,0xAE), -- ギ
	[0x89] = string.char(0xE3,0x82,0xB0), -- グ
	[0x8A] = string.char(0xE3,0x82,0xB2), -- ゲ
	[0x8B] = string.char(0xE3,0x82,0xB4), -- ゴ
	[0x8C] = string.char(0xE3,0x82,0xB6), -- ザ
	[0x8D] = string.char(0xE3,0x82,0xB8), -- ジ
	[0x8E] = string.char(0xE3,0x82,0xBA), -- ズ
	[0x8F] = string.char(0xE3,0x82,0xBC), -- ゼ
	[0x90] = string.char(0xE3,0x82,0xBE), -- ゾ
	[0x91] = string.char(0xE3,0x83,0x80), -- ダ
	[0x92] = string.char(0xE3,0x83,0x82), -- ヂ
	[0x93] = string.char(0xE3,0x83,0x85), -- ヅ
	[0x94] = string.char(0xE3,0x83,0x87), -- デ
	[0x95] = string.char(0xE3,0x83,0x89), -- ド
	[0x96] = string.char(0xE3,0x83,0x90), -- バ
	[0x97] = string.char(0xE3,0x83,0x93), -- ビ
	[0x98] = string.char(0xE3,0x83,0x96), -- ブ
	[0x99] = string.char(0xE3,0x83,0x99), -- ベ
	[0x9A] = string.char(0xE3,0x83,0x9C), -- ボ
	[0x9B] = string.char(0xE3,0x83,0x91), -- パ
	[0x9C] = string.char(0xE3,0x83,0x94), -- ピ
	[0x9D] = string.char(0xE3,0x83,0x97), -- プ
	[0x9E] = string.char(0xE3,0x83,0x9A), -- ペ
	[0x9F] = string.char(0xE3,0x83,0x9D), -- ポ
	[0xA0] = string.char(0xE3,0x83,0x83), -- ッ
	[0xA1] = string.char(0x30), -- 0
	[0xA2] = string.char(0x31), -- 1
	[0xA3] = string.char(0x32), -- 2
	[0xA4] = string.char(0x33), -- 3
	[0xA5] = string.char(0x34), -- 4
	[0xA6] = string.char(0x35), -- 5
	[0xA7] = string.char(0x36), -- 6
	[0xA8] = string.char(0x37), -- 7
	[0xA9] = string.char(0x38), -- 8
	[0xAA] = string.char(0x39), -- 9
	[0xAB] = string.char(0x21), -- !
	[0xAC] = string.char(0x3F), -- ?
	[0xAD] = string.char(0x2E), -- .
	[0xAE] = string.char(0x2D), -- -
	[0xAF] = string.char(0xE3,0x83,0xBB), -- ・
	[0xB0] = string.char(0xE2,0x80,0xA6), -- …
	[0xB1] = string.char(0xE2,0x80,0x9C), -- “
	[0xB2] = string.char(0xE2,0x80,0x9D), -- ”
	[0xB3] = string.char(0xE2,0x80,0x98), -- ‘
	[0xB4] = string.char(0xE2,0x80,0x99), -- ’
	[0xB5] = string.char(0xE2,0x99,0x82), -- ♂
	[0xB6] = string.char(0xE2,0x99,0x80), -- ♀
	[0xB7] = string.char(0x24), -- $
	[0xB8] = string.char(0x2C), -- ,
	[0xB9] = string.char(0xC3,0x97), -- ×
	[0xBA] = string.char(0x2F), -- /
	[0xBB] = string.char(0x41), -- A
	[0xBC] = string.char(0x42), -- B
	[0xBD] = string.char(0x43), -- C
	[0xBE] = string.char(0x44), -- D
	[0xBF] = string.char(0x45), -- E
	[0xC0] = string.char(0x46), -- F
	[0xC1] = string.char(0x47), -- G
	[0xC2] = string.char(0x48), -- H
	[0xC3] = string.char(0x49), -- I
	[0xC4] = string.char(0x4A), -- J
	[0xC5] = string.char(0x4B), -- K
	[0xC6] = string.char(0x4C), -- L
	[0xC7] = string.char(0x4D), -- M
	[0xC8] = string.char(0x4E), -- N
	[0xC9] = string.char(0x4F), -- O
	[0xCA] = string.char(0x50), -- P
	[0xCB] = string.char(0x51), -- Q
	[0xCC] = string.char(0x52), -- R
	[0xCD] = string.char(0x53), -- S
	[0xCE] = string.char(0x54), -- T
	[0xCF] = string.char(0x55), -- U
	[0xD0] = string.char(0x56), -- V
	[0xD1] = string.char(0x57), -- W
	[0xD2] = string.char(0x58), -- X
	[0xD3] = string.char(0x59), -- Y
	[0xD4] = string.char(0x5A), -- Z
	[0xD5] = string.char(0x61), -- a
	[0xD6] = string.char(0x62), -- b
	[0xD7] = string.char(0x63), -- c
	[0xD8] = string.char(0x64), -- d
	[0xD9] = string.char(0x65), -- e
	[0xDA] = string.char(0x66), -- f
	[0xDB] = string.char(0x67), -- g
	[0xDC] = string.char(0x68), -- h
	[0xDD] = string.char(0x69), -- i
	[0xDE] = string.char(0x6A), -- j
	[0xDF] = string.char(0x6B), -- k
	[0xE0] = string.char(0x6C), -- l
	[0xE1] = string.char(0x6D), -- m
	[0xE2] = string.char(0x6E), -- n
	[0xE3] = string.char(0x6F), -- o
	[0xE4] = string.char(0x70), -- p
	[0xE5] = string.char(0x71), -- q
	[0xE6] = string.char(0x72), -- r
	[0xE7] = string.char(0x73), -- s
	[0xE8] = string.char(0x74), -- t
	[0xE9] = string.char(0x75), -- u
	[0xEA] = string.char(0x76), -- v
	[0xEB] = string.char(0x77), -- w
	[0xEC] = string.char(0x78), -- x
	[0xED] = string.char(0x79), -- y
	[0xEE] = string.char(0x7A), -- z
	[0xEF] = string.char(0xE2,0x96,0xB6), -- ▶
	[0xF0] = string.char(0x3A), -- :
	[0xF1] = string.char(0xC3,0x84), -- Ä
	[0xF2] = string.char(0xC3,0x96), -- Ö
	[0xF3] = string.char(0xC3,0x9C), -- Ü
	[0xF4] = string.char(0xC3,0xA4), -- ä
	[0xF5] = string.char(0xC3,0xB6), -- ö
	[0xF6] = string.char(0xC3,0xBC), -- ü
	[0xF7] = string.char(0xE2,0xAC,0x86), -- ⬆
	[0xF8] = string.char(0xE2,0xAC,0x87), -- ⬇
	[0xF9] = string.char(0xE2,0xAC,0x85), -- ⬅
	--nonprintables
	[0xFA] = "",
	[0xFB] = "\n", -- text break
	[0xFC] = "",
	[0xFD] = "",
	[0xFE] = "\n", -- linebreak
	[0xFF] = ""
}

return {
	["Types"] = Types,
	["EggTypes"] = EggTypes,
	["TrainerGender"] = TrainerGender,
	["OriginalGame"] = OriginalGame,
	["CharMap"] = CharMap
}