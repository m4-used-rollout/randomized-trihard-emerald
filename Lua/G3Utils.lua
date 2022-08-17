-- BizHawk uses 24-bit memory addresses and splits the memory up into 'domains'
local MemSwitch = { [0x00] = "BIOS", [0x02] = "EWRAM", [0x03] = "IWRAM", [0x05] = "PALRAM", [0x06] = "VRAM", [0x07] = "OAM", [0x08] = "ROM" }
function switchDomainAndGetLocalPointer(globalPtr)
    if globalPtr == 0 then
        memory.usememorydomain("EWRAM")
        return 0
    end
	memory.usememorydomain(MemSwitch[bit.rshift(globalPtr, 24)])
	return globalPtr % 0x1000000
end

function getDexFlagged(startAddr, lenBytes)
	local dex = {}
	for i = 0, lenBytes - 1 do
		local byte = memory.readbyte(startAddr + i)
		for b = 0, 7 do
			if bit.band(byte, bit.lshift(1, b)) ~= 0 then
				table.insert(dex, i * 8 + b + 1)
			end
		end
	end
	return dex
end

function getItemCollection(startAddr, length, key)
	if not key then
		key = 0
	end
	local list = {}
	for i=0,length - 1 do
		local id = memory.read_u16_le(startAddr + (4 * i))
		if id > 0 then
			table.insert(list, {
				["id"] = id,
				["count"] = bit.bxor(key, memory.read_u16_le(startAddr + (4 * i) + 2))
			})
		end
	end
	return list
end


function getOptions(startAddr)
	local options = {}
	local firstByte = memory.readbyte(startAddr)
	if firstByte == 0 then
		options["button_mode"] = "Normal"
	elseif firstByte == 1 then
		options["button_mode"] = "LR"
	elseif firstByte == 2 then
		options["button_mode"] = "L=A"
	end
	local secondByte = memory.readbyte(startAddr + 1)
	options["frame"] = bit.rshift(secondByte, 3) + 1
	secondByte = secondByte % 4
	if secondByte == 2 then
		options["text_speed"] = "Fast"
	elseif secondByte == 1 then
		options["text_speed"] = "Med"
	else
		options["text_speed"] = "Slow"
	end
	local thirdByte = memory.readbyte(startAddr + 2)
	if thirdByte % 2 > 0 then
		options["sound"] = "Stereo"
	else
		options["sound"] = "Mono"
	end
	if bit.band(thirdByte, 2) > 0 then
		options["battle_style"] = "Set"
	else
		options["battle_style"] = "Shift"
	end
	if bit.band(thirdByte, 4) > 0 then
		options["battle_scene"] = "Off"
	else
		options["battle_scene"] = "On"
	end
	return options
end

function grabTextFromMemory(startAddr, length, memoryDomain)
	if memoryDomain ~= nil then
		memory.usememorydomain(memoryDomain)
	end
	if startAddr + length > memory.getmemorydomainsize() then --prevent overreads
		return bizstring.hex(startAddr)
	end
	local strBytes = memory.readbyterange(startAddr, length)
	local str = ""
	for i=0,length do
		if (strBytes[i]) then
			str = str .. string.char(strBytes[i])
		end
	end
	return translateRSEChars(str)
end

-- example: translateRSEChars(string.char(199, 0, 174, 174, 174, 186, 180, 186, 180, 165, 187, 255))
-- Pokémon's name is "M ---/’/’4"
-- BizHawk's console prints "M ---/â€™/â€™4"
-- BizHawk's console doesn't understand UTF-8, but the script does
RSECharmap = (loadfile "G3Lookups.lua")().CharMap
function translateRSEChars(rawStr)
	local outStr = ""
	for i=0,string.len(rawStr)-1 do
		local byte = string.byte(rawStr,i+1)
		if (byte == 0xFF) then
			return outStr
		end
		outStr = outStr .. RSECharmap[byte]
	end
	return outStr
end

function decryptDataSubstructure(startAddr, key, checkSum, forceReturn)
	local decryptedData = {}
    for i=0,11 do
        local dword = bit.bxor(memory.read_u32_le(startAddr + i * 4),key) 
        for j=0,3 do
            table.insert(decryptedData, bit.band(bit.rshift(dword, (j * 8)), 0xFF))
        end
    end
    local sum = 0
    for i=1,24 do
        sum = (sum + (bit.lshift(decryptedData[i * 2], 8) + decryptedData[i * 2 - 1])) % 65536
    end
    if sum == checkSum or forceReturn == true then
		return decryptedData
	end
	--print(string.format("Error decoding Pokemon data: Calculated sum = %d, Read checksum = %d", sum, checkSum)) 
	return nil
end

function descrambleDataSubstructure(scrambledData, pv)
	if (scrambledData == nil) then
		return nil
	end
	local map = DataOrder[pv % 24]
	local descrambled = {}
	for i=0,3 do
		local mapChar = map:sub(i+1, i+1)
		descrambled[mapChar] = {}
		for j=0,11 do
			descrambled[mapChar][j] = scrambledData[(12 * i) + j + 1]
		end
	end
	return descrambled
end

--this is the order the 12-byte blocks are in, based on personality value % 24
DataOrder = {
	[0] = "GAEM",
	[1] = "GAME",
	[2] = "GEAM",
	[3] = "GEMA",
	[4] = "GMAE",
	[5] = "GMEA",
	[6] = "AGEM",
	[7] = "AGME",
	[8] = "AEGM",	
	[9] = "AEMG",
	[10] = "AMGE",
	[11] = "AMEG",
	[12] = "EGAM",
	[13] = "EGMA",
	[14] = "EAGM",
	[15] = "EAMG",
	[16] = "EMGA",
	[17] = "EMAG",
	[18] = "MGAE",
	[19] = "MGEA",
	[20] = "MAGE",
	[21] = "MAEG",
	[22] = "MEGA",
	[23] = "MEAG"
}

return {
    ["switchDomainAndGetLocalPointer"] = switchDomainAndGetLocalPointer,
    ["getDexFlagged"] = getDexFlagged,
    ["getItemCollection"] = getItemCollection,
    ["getOptions"] = getOptions,
    ["grabTextFromMemory"] = grabTextFromMemory,
    ["translateRSEChars"] = translateRSEChars,
    ["decryptDataSubstructure"] = decryptDataSubstructure,
    ["descrambleDataSubstructure"] = descrambleDataSubstructure
}