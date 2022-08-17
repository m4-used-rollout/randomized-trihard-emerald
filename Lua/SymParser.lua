-- Parses the symbol files generated from a GBA ELF.
-- Used for easy access to labeled addresses as pulled from the assembly for a ROM, such as pret/pokefirered or pret/pokeemerald.

local function ParseSymbolFile(symText) 
    local symData = {}
    for addr, size, b, symbol in string.gmatch(symText,"(%w+) (%w+) (%w) ([%w._]+)") do --example: 0203d154 00000004 B gUnknown_0203CF28
        symData[symbol] = tonumber(addr, 16)
    end
    function symData.addr(symbol)
        if not symData[symbol] then
            print("Missing symbol: " .. symbol)
        end
        return symData[symbol]
    end
    return symData
end

local function LoadRomSymbols(symFilePath)
    if not symFilePath then
        if gameinfo then --BizHawk
            symFilePath = "../" .. gameinfo.getromname() .. '.sym'
        else
            print("Null file path given to Sym Parser")
            return ParseSymbolFile("")
        end
	end
    local symFile = io.open(symFilePath, 'r')
    local symText = ""
    if symFile then
        symText = symFile:read("*all")
        symFile:close()
    else
        print("Could not find file " .. symFilePath)
    end
    return ParseSymbolFile(symText)
end

return LoadRomSymbols