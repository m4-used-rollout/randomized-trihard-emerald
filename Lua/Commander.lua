-- TPP Commander Mode (Military Mode ][) script
-- For FireRed, Emerald and hacks
-- Commands: 
--  MOVE    - Selects moves 1-4
--  SWITCH  - Selects pokemon 1-6
--  ITEM    - Selects item by id (if present in bag and applicable to battle)
--  ON/WITH - Selects pokemon 1-6 from use item menu, also selects enemy 1 or 2 in double battles
--  CATCH   - Throws the currently selected ball, or Safari Ball in Safari Zone
--  RUN     - Runs from battle

-- ITEM, CATCH, and RUN only apply in battle
-- MOVE should also work for movelearns in and out of battle
-- SWITCH and ON/WITH should operate the party menu whenever it is open
-- (except SWITCH should not operate the party menu when items are being used in battle)

local forceNicknames = true -- Commander Mode will select Yes in response to any command if the Nicknaming prompt is open
local randomizeNicknames = true -- Commander Mode will randomly move the cursor in response to any command if the Nickname screen is open
local debug = false -- Commander Mode will tell you why it chose the button it did
local symFilePath = nil -- Path to the sym file if LoadRomSymbols' default isn't correct

Utils = (loadfile "G3Utils.lua")() -- Required file (Place in same directory)
Lookup = (loadfile "G3Lookups.lua")()  -- Required file (Place in same directory)
Sym = (loadfile "SymParser.lua")()(symFilePath) -- Required file (place in same directory)

-- testing function that can be run from the BizHawk Lua console.
-- example: cmdr("MOVE1")
function cmdr(cmd)
    local input = Parse(cmd)
    joypad.set(input)
    return input
end

-- Addresses Commander Mode uses to look up the game state

-- Emerald
pmAddressesEm = {
    ["Windows"] = Sym.addr("gWindows"),
    ["TargetingCursor"] = Sym.addr("gMultiUsePlayerCursor"),
    ["TargetingControllerFunction"] = Sym.addr("HandleInputChooseTarget"),
    ["MoveSwitchingControllerFunction"] = Sym.addr("HandleMoveSwitching"),
    ["FirstMonBattleController"] = Sym.addr("gBattlerControllerFuncs"), -- gBattlerControllerFuncs[0]
    ["SecondMonBattleController"] = Sym.addr("gBattlerControllerFuncs") + 8, -- gBattlerControllerFuncs[2]
    ["NicknameScreen"] = Sym.addr("gNamingScreenData"), -- sNamingScreen
    ["PokemonSummaryScreen"] = Sym.addr("sMonSummaryScreen"),
    ["PokemonSummaryScreenCallbackOffset"] = 4, -- (sMonSummaryScreen)->callback
    ["SummaryReturnToBattle"] = Sym.addr("ReshowBattleScreenAfterMenu"),
    ["SummaryReturnToParty"] = Sym.addr("sub_81B3894"), -- CB2_ReturnToPartyMenuFromSummaryScreen
    ["SummaryReturnToTMLearn"] = Sym.addr("sub_81B70F0"), -- CB2_ReturnToPartyMenuWhileLearningMove
    ["CursorMoveLearn"] = 0x40c6, -- (sMonSummaryScreen)->firstMoveIndex
    ["DialogText"] = Sym.addr("gStringVar4"),
    ["BattleText"] = Sym.addr("gDisplayedStringBattle"),
    ["BattleFlags"] = Sym.addr("gBattleTypeFlags"),
    ["MenuId"] = Sym.addr("gBattleBufferA"), -- gBattleBufferA[0][0] (see sPlayerBufferCommands for values)
    ["DoubleBattleMenuId"] = Sym.addr("gBattleBufferA") + 0x400, -- gBattleBufferA[2][0] (see sPlayerBufferCommands for values)
    ["YesNoWindowId"] = Sym.addr("sYesNoWindowId"),
    ["BattleMoveLearnState"] = Sym.addr("gBattleScripting") + 0x1f, -- gBattleScripting.learnMoveState
    ["BattleCommunicationState"] = Sym.addr("gBattleCommunication"), -- gBattleCommunication[MULTIUSE_STATE]
    ["CursorYesNo"] = Sym.addr("gBattleCommunication") + 1, -- gBattleCommunication[CURSOR_POSITION]
    ["CursorBattle"] = Sym.addr("gActionSelectionCursor"), -- gActionSelectionCursor[0]
    ["CursorDoubleBattle"] = Sym.addr("gActionSelectionCursor") + 2, -- gActionSelectionCursor[2]
    ["CursorFight"] = Sym.addr("gMoveSelectionCursor"), -- gMoveSelectionCursor[0]
    ["CursorDoubleFight"] = Sym.addr("gMoveSelectionCursor") + 2, -- gMoveSelectionCursor[2]
    ["BagId"] = Sym.addr("gUnknown_0203CE58") + 5, -- gBagPosition.pocket
    ["CursorBagStart"] = Sym.addr("gUnknown_0203CE58") + 8, -- gBagPosition.cursorPosition[]
    ["ScrollBagStart"] = Sym.addr("gUnknown_0203CE58") + 0x12, -- gBagPosition.scrollPosition[]
    ["SaveBlock1Pointer"] = Sym.addr("gSaveBlock1Ptr"),
    ["SaveBlock2Pointer"] = Sym.addr("gSaveBlock2Ptr"),
    ["CurrentMusic"] = Sym.addr("sCurrentMapMusic"),
    ["InBattle"] = Sym.addr("gMain") + 0x439, -- gMain.inBattle
    ["CursorSubmenu"] = Sym.addr("sMenu") + 2, -- sMenu.cursorPos
    ["PartyMenu"] = Sym.addr("gUnknown_0203CEC8"), -- gPartyMenu
    ["BagMenu"] = Sym.addr("gUnknown_0203CE54"), -- gBagMenu
    ["Evolution"] = Sym.addr("sEvoStructPtr"),

    -- Dynamic variables (need to figure out)
    ["CursorContest"] = 0x2003B40,

    ["SecurityKeyOffset"] = 0xAC, -- (gSaveBlock2Ptr)->encryptionKey (only exists in Emerald)
    ["Bag"] = {
        -- ['items'] = { id = 0, offset = 0x560, length = 30 }, -- Vanilla
        ['items'] = { id = 0, offset = 0x49C, length = 0x4F }, -- TriHard
        ['balls'] = { id = 1, offset = 0x650, length = 16 },
        -- ['tms'] = { id = 2 } --no use in battle
        ['berries'] = { id = 3, offset = 0x790, length = 46},
        -- ['key'] = { id = 4 } --no use in battle
    }
}

-- FireRed
pmAddressesFr = {
    ["Windows"] = 0x20204b4, -- gWindows
    ["DialogText"] = 0x2021D18, -- gStringVar4 
    ["BattleText"] = 0x202298C, -- gDisplayedStringBattle 
    ["BattleFlags"] = 0x2022B4C, -- gBattleTypeFlags 
    ["MenuId"] = 0x2022BC4, -- gBattleBufferA[0][0] (see sPlayerBufferCommands for values)
    ["DoubleBattleMenuId"] = 0x2022FC4, -- gBattleBufferA[2][0] (see sPlayerBufferCommands for values)
    ["YesNoWindowId"] = 0x203adf3, -- sYesNoWindowId
    ["BattleMoveLearnState"] = 0x2023fc4 + 0x1f, -- gBattleScripting.learnMoveState
    ["BattleCommunicationState"] = 0x2023e82, -- gBattleCommunication[MULTIUSE_STATE]
    ["CursorYesNo"] = 0x2023E82 + 1, -- gBattleCommunication[CURSOR_POSITION]
    ["CursorBattle"] = 0x2023FF8, -- gActionSelectionCursor[0]
    ["CursorDoubleBattle"] = 0x2023FFA, -- gActionSelectionCursor[2]
    ["CursorFight"] = 0x2023FFC, -- gMoveSelectionCursor[0]
    ["CursorDoubleFight"] = 0x2023FFE, -- gMoveSelectionCursor[2]
    ["BagId"] = 0x203AD02, -- gBagMenuState.pocket
    ["CursorBagStart"] = 0x203AD0A, -- gBagMenuState.cursorPos[]
    ["ScrollBagStart"] = 0x203AD04, -- gBagMenuState.itemsAbove[]
    ["NicknameScreen"] = 0x203998c, -- sNamingScreenData
    ["PokemonSummaryScreen"] = 0x203b140, -- sMonSummaryScreen
    ["PokemonSummaryScreenCallbackOffset"] = 0x32f8, -- (sMonSummaryScreen)->savedCallback
    ["SummaryReturnToBattle"] = 0x8077764, -- ReshowBattleScreenAfterMenu (Rev 0)
    ["SummaryReturnToParty"] = 0x8122dbc, -- CB2_ReturnToPartyMenuFromSummaryScreen (Rev 0)
    ["SummaryReturnToTMLearn"] = 0x8125e84, -- CB2_ReturnToPartyMenuWhileLearningMove (Rev 0)
    ["CursorMoveLearn"] = 0x203b16d, -- sMonSummaryScreen's sibling firstMoveIndex (sUnknown_203B16D)
    ["SaveBlock1Pointer"] = 0x3005008, -- gSaveBlock1Ptr
    ["SaveBlock2Pointer"] = 0x300500c, -- gSaveBlock2Ptr
    ["CurrentMusic"] = 0x3000fc0, -- sCurrentMapMusic
    ["InBattle"] = 0x30030f0 + 0x439, --0x030026F9 -- gMain.inBattle
    ["TargetingCursor"] = 0x3004ff4, -- gMultiUsePlayerCursor
    ["TargetingControllerFunction"] = 0x802e674, -- HandleInputChooseTarget (Rev 0)
    ["MoveSwitchingControllerFunction"] = 0x802ef58, -- HandleMoveSwitching (Rev 0)
    ["FirstMonBattleController"] = 0x3004fe0, -- gBattlerControllerFuncs[0]
    ["SecondMonBattleController"] = 0x3004fe0 + 8, -- gBattlerControllerFuncs[2]
    ["CursorSubmenu"] = 0x20399c2, -- sMenu.cursorPos,
    ["PartyMenu"] = 0x203b0a0, -- gPartyMenu
    ["BagMenuDisplay"] = 0x203ad10, -- sBagMenuDisplay
    ["Evolution"] = 0x2039a20, -- sEvoStructPtr

    ["Bag"] = {
        ['items'] = { id = 0, offset = 0x310, length = 42 },
        -- ['key'] = { id = 1 } --no use in battle
        ['balls'] = { id = 2, offset = 0x430, length = 13 },
        
    }
}
-- FireRed Rev 1
pmAddressesFrRev1 = {
    ["SummaryReturnToBattle"] = 0x8077778, -- ReshowBattleScreenAfterMenu (Rev 1)
    ["SummaryReturnToParty"] = 0x8122e34, -- CB2_ReturnToPartyMenuFromSummaryScreen (Rev 1)
    ["SummaryReturnToTMLearn"] = 0x8125efc, -- CB2_ReturnToPartyMenuWhileLearningMove (Rev 1)
    ["TargetingControllerFunction"] = 0x802e688, -- HandleInputChooseTarget (Rev 1)
    ["MoveSwitchingControllerFunction"] = 0x802ef6c -- HandleMoveSwitching (Rev 1)

}

-- Initialization

pmAddresses = {}

function Init()
    GAME_CODE = string.char(memory.readbyte(0xAC, 'ROM'), memory.readbyte(0xAD, 'ROM'), memory.readbyte(0xAE, 'ROM'), memory.readbyte(0xAF, 'ROM'))
    GAME_VERSION = memory.readbyte(0xBC, 'ROM')

    if GAME_CODE == "BPEE" then -- Emerald
        pmAddresses = pmAddressesEm
        print("Commander ready for Pokemon Emerald")
    elseif GAME_CODE == "BPRE" then -- FireRed
        pmAddresses = Extend(pmAddressesFr, GAME_VERSION == 1 and pmAddressesFrRev1 or {})
        print("Commander ready for Pokemon FireRed rev " .. GAME_VERSION)
    else
        print("Commander Mode does not support this game")
    end
end

function Ptr(addr, offset) return (memory.read_u32_le(addr, 'System Bus') + (offset or 0)) end
function log(str)
    if debug then
        print(str)
    end
end

-- Commander Actions

function MoveUp() return { ["Up"] = true } end
function MoveDown() return { ["Down"] = true } end
function MoveLeft() return { ["Left"] = true } end
function MoveRight() return { ["Right"] = true } end
function Confirm() return { ["A"] = true } end
function Escape() 
    if EvolutionIsHappening() then
        log('But Evolution is happening, so I will do nothing')
        return NoInput()
    end
    return { ["B"] = true }
end
function NoInput() return {} end

-- Commander Logic

function Active()
    -- if EvolutionIsHappening() then
    --     log("Inactive: Evolution in progress")
    --     return false
    -- end
    local battleFlags = memory.read_u32_le(pmAddresses["BattleFlags"], 'System Bus')
    if InBattle() then
        if NicknamingPokemon() then
            log("Inactive: Nicknaming in progress")
            return false    
        end
        log("Active: In battle")
        return true
        
    end
    if InPartyMenu() then
        log("Active: In the party menu")
        return true    
    end
    if AboutToLearnMove() then
        log("Active: About to teach a move")
        return true    
    end
    if AboutToCancelMove() then
        log("Active: About to cancel a movelearn")
        return true
    end
    if InPokemonSummary() then
        log("Active: In the Pokemon Summary Screen")
        return true
    end
    if ContestAppealSelect() then
        log("Active: Selecting contest appeal move")
        return true
    end
    log("Inactive")
    return false
end

function InBattle()
    return bit.band(memory.readbyte(pmAddresses["InBattle"], 'System Bus'), 2) > 0;
end

function InTrainerBattle()
    local battleFlags = memory.read_u32_le(pmAddresses["BattleFlags"], 'System Bus')
    return bit.band(battleFlags, 8) == 8
end

function InLegendaryBattle()
    local battleFlags = memory.read_u32_le(pmAddresses["BattleFlags"], 'System Bus')
    return bit.band(battleFlags, 0x70007C00) > 0
end

function InDoubleBattle()
    local battleFlags = memory.read_u32_le(pmAddresses["BattleFlags"], 'System Bus')
    return bit.band(battleFlags, 1) == 1 
end

function InSafariBattle()
    local battleFlags = memory.read_u32_le(pmAddresses["BattleFlags"], 'System Bus')
    return bit.band(battleFlags, 0x80) == 0x80
end

function CanUseItems()
    local battleFlags = memory.read_u32_le(pmAddresses["BattleFlags"], 'System Bus')
    return bit.band(battleFlags, 0x100) == 0 --not in battle facility
end

function BattleStateIs(id)
    local battleState = memory.readbyte(pmAddresses["MenuId"], 'System Bus')
    if battleState == 0x35 or battleState == 0x33 then -- PlayerHandleLinkStandbyMsg (Waiting for other mon in double battle) or PlayerHandleSpriteInvisibility (Fainted in double battle)
        if id == 0x35 then -- Treat both as waiting
            return true
        end
        return memory.readbyte(pmAddresses["DoubleBattleMenuId"], 'System Bus') == id
    end
    if not id then
        return battleState
    end
    return battleState == id
end

function InNamingScreen()
    local state = memory.readbyte(Ptr(pmAddresses["NicknameScreen"], 0x1E11), 'System Bus')
    -- 0 STATE_FADE_IN
    -- 1 STATE_WAIT_FADE_IN
    -- 2 STATE_HANDLE_INPUT
    -- 3 STATE_MOVE_TO_OK_BUTTON
    -- 4 STATE_START_PAGE_SWAP
    -- 5 STATE_WAIT_PAGE_SWAP
    -- 6 STATE_PRESSED_OK
    -- 7 STATE_WAIT_SENT_TO_PC_MESSAGE
    -- 8 STATE_FADE_OUT
    -- 9 STATE_EXIT
    return state > 0 and state < 6
end

function DoesWindowExist(windowId) return memory.read_u32_le(pmAddresses["Windows"] + (windowId * 12), 'System Bus') ~= 0xFF end

function InDoubleBattleMenu() return BattleStateIs(0x35) end
function InBattleMenu() return BattleStateIs(0x12) end
function InFightMenu() return BattleStateIs(0x14) end
function InBagMenu() return BattleStateIs(0x15) end
function InBattlePartyMenu() return BattleStateIs(0x16) end
function InPartyMenu() return Ptr(pmAddresses["PartyMenu"] - 4) ~= 0 and Ptr(Ptr(pmAddresses["PartyMenu"] - 4)) ~= 0 end -- sPartyMenuInternal and sPartyMenuInternal->task
function InBagSubmenu() 
    if not InBagMenu() then
        return false
    elseif pmAddresses["BagMenu"] then
        return memory.read_u16_le(Ptr(pmAddresses["BagMenu"], 0x81E), 'System Bus') == 0xFFFF -- gBagMenu->pocketScrollArrowsTask and gBagMenu->pocketSwitchArrowsTask
    elseif pmAddresses["BagMenuDisplay"] then
        return memory.read_u16_le(Ptr(pmAddresses["BagMenuDisplay"], 0x8), 'System Bus') == 0xFFFF -- sBagMenuDisplay->pocketScrollArrowsTask and sBagMenuDisplay->pocketSwitchArrowsTask
    end
    return false
 end
function InPartySubmenu() return InPartyMenu() and memory.readbyte(Ptr(pmAddresses["PartyMenu"] - 4, 12), 'System Bus') ~= 0xFF end -- sPartyMenuInternal->windowId[0]
function InUseItemOnPartyMenu() return InPartyMenu() and memory.readbyte(pmAddresses["PartyMenu"] + 11, 'System Bus') == 3 end -- PartyMenu.action == PARTY_ACTION_USE_ITEM
function InYesNoMenu()
    if InBattle() then
        if NicknamingPokemon() then
            return memory.readbyte(pmAddresses["BattleCommunicationState"], 'System Bus') == 1
        end
        return memory.readbyte(pmAddresses["BattleMoveLearnState"], 'System Bus') == 1
    end
    return DoesWindowExist(memory.readbyte(pmAddresses["YesNoWindowId"], 'System Bus'))
end
function InPokemonSummary() 
    local mainCallback = Ptr(Ptr(pmAddresses["PokemonSummaryScreen"], pmAddresses['PokemonSummaryScreenCallbackOffset'])) - 1
    return mainCallback == pmAddresses['SummaryReturnToParty'] or mainCallback == pmAddresses['SummaryReturnToBattle'] or mainCallback == pmAddresses['SummaryReturnToTMLearn']
end
function TryingToSwitchMoves() return (memory.read_u32_le(pmAddresses["FirstMonBattleController"]) == pmAddresses["MoveSwitchingControllerFunction"] + 1 or (InDoubleBattle() and memory.read_u32_le(pmAddresses["SecondMonBattleController"]) == pmAddresses["MoveSwitchingControllerFunction"] + 1)) end
function InTargetingScreen() return InDoubleBattle() and (memory.read_u32_le(pmAddresses["FirstMonBattleController"]) == pmAddresses["TargetingControllerFunction"] + 1 or memory.read_u32_le(pmAddresses["SecondMonBattleController"]) == pmAddresses["TargetingControllerFunction"] + 1) end
function AtSwitchChangePokemonPrompt() return string.find(Utils.grabTextFromMemory(pmAddresses["BattleText"], 255, 'System Bus'), "Will .+ change\nPokémon?") end
function TriedToSwitchToActivePokemon() return string.find(Utils.grabTextFromMemory(pmAddresses["DialogText"], 255, 'System Bus'), ".+ is already\nin battle!") end
function EvolutionIsHappening() return memory.read_u32_le(pmAddresses["Evolution"], 'System Bus')  > 0 end -- Check to see if sEvoStructPtr is pointing to something

function AboutToLearnMove()
    return string.find(Utils.grabTextFromMemory(pmAddresses["BattleText"], 255, 'System Bus'), "Delete a move to make\nroom for .+?")
        or string.find(Utils.grabTextFromMemory(pmAddresses["DialogText"], 255, 'System Bus'), "Should a move be deleted and\nreplaced with .+?")
end
function AboutToCancelMove()
    return string.find(Utils.grabTextFromMemory(pmAddresses["BattleText"], 255, 'System Bus'), "Stop learning\n.+?")
        or string.find(Utils.grabTextFromMemory(pmAddresses["DialogText"], 255, 'System Bus'), "Stop trying to teach\n.+?")
end
function NicknamingPokemon() return Utils.grabTextFromMemory(pmAddresses["BattleText"], 18, 'System Bus') ==  "Give a nickname to" end
function ContestAppealSelect() return pmAddresses["CursorContest"] and string.find(Utils.grabTextFromMemory(pmAddresses["DialogText"], 255, 'System Bus'), "Which move will be played?") end
function ForcedMonSwitch() return string.find(Utils.grabTextFromMemory(pmAddresses["BattleText"], 255, 'System Bus'):lower(), ("Use next POKéMON?"):lower()) end

function GetBattleCursor() 
    if InDoubleBattleMenu() then
        return memory.readbyte(pmAddresses["CursorDoubleBattle"], 'System Bus')
    end
    return memory.readbyte(pmAddresses["CursorBattle"], 'System Bus')
end
function GetFightCursor() 
    if InDoubleBattleMenu() then
        return memory.readbyte(pmAddresses["CursorDoubleFight"], 'System Bus')
    end
    return memory.readbyte(pmAddresses["CursorFight"], 'System Bus')
end
function GetMoveLearnCursor() 
    if pmAddresses["CursorMoveLearn"] > 0x01000000 then
        return memory.readbyte(pmAddresses["CursorMoveLearn"], 'System Bus') -- FRLG Summary Move Cursor is static
    else
        --Emerald Summary Move Cursor is part of the struct
        return memory.readbyte(Ptr(pmAddresses["PokemonSummaryScreen"], pmAddresses["CursorMoveLearn"]), 'System Bus')
    end
end
function GetYesNoCursor() 
    if InBattle() then -- use gBattleCommunication
        return memory.readbyte(pmAddresses["CursorYesNo"], 'System Bus')    
    end
    -- use sMenu.cursorPos (Submenu Cursor)
    return GetSubmenuCursor()
end
function GetSubmenuCursor() return memory.readbyte(pmAddresses["CursorSubmenu"], 'System Bus') end
function GetContestCursor() return memory.readbyte(pmAddresses["CursorContest"], 'System Bus') end
function GetTargetingCursor() return memory.readbyte(pmAddresses["TargetingCursor"], 'System Bus') end
function GetBagPocket() return memory.readbyte(pmAddresses["BagId"], 'System Bus') end
function GetBagCursor() 
    local bagOffset = memory.readbyte(pmAddresses["BagId"], 'System Bus') * 2
    return memory.readbyte(pmAddresses["CursorBagStart"] + bagOffset, 'System Bus') + memory.readbyte(pmAddresses["ScrollBagStart"] + bagOffset, 'System Bus')
end
function GetPartyCursor() 
    local cursor = memory.readbyte(pmAddresses["PartyMenu"] + 9, 'System Bus') -- PartyMenu.slotId
    if cursor == 7 then
        return 6 -- range is 0-5 but cancel is 7
    end
    return cursor
end

function MoveRectMenu(start, dest, complete)
    if start == dest then
        return (complete or Confirm)()
    elseif start == 0 then
        if dest == 1 then -- avoid dest 1 otherwise (Bag)
            return MoveRight()
        end
        return MoveDown()
    elseif start == 1 then
        if dest == 3 then
            return MoveDown()
        end
        return MoveLeft()
    elseif start == 2 then
        if dest == 3 then --avoid dest 3 otherwise (Run)
            return MoveRight()
        end
        return MoveUp()
    end
    if dest == 1 then
        return MoveUp()
    end
    return MoveLeft()
end

function MoveListMenu(start, dest, length, complete, prev, next)
    local dist = dest - start
    length = length or 4
    --log("Moving List Menu: Current: ".. start .. " Destination: ".. dest .. " Distance: " .. dist .. " Length: ".. length)
    if dist == 0 then
        return (complete or Confirm)()
    elseif (dist > 0 and dist <= (length / 2)) or dist <= (0 - (length / 2)) then
        return (next or MoveDown)()
    end
    return (prev or MoveUp)()
end

function MoveToFight(move)
    log('MOVE' .. move)
    if ForcedMonSwitch() then
        log("Switching after fainted mon")
        if InBattlePartyMenu() then
            log("In party menu already, wait for SWITCH commands")
            return NoInput()
        elseif GetYesNoCursor() == 0 then
            log("Yes we want to use next Pokemon")
            return Confirm()
        end
        log("Avoiding running from wild battle by saying no to switching")
        return MoveUp()
    elseif InTargetingScreen() then
        log("Double battle target selection")
        if GetFightCursor() == move - 1 then
            log("Correct move selected, waiting for ON to pick target")
            --return Confirm() -- blindly attack first target
            return NoInput() -- wait for choice
        end
    elseif InFightMenu() then
        if TryingToSwitchMoves() then
            log("Cancelling move swap")
            return Escape()
        end
        log("In fight menu, selecting move " .. move)
        return MoveRectMenu(GetFightCursor(), move - 1)
    elseif InBattleMenu() then
        log("In battle menu, moving to Fight menu")
        return MoveRectMenu(GetBattleCursor(), 0)
    elseif AboutToCancelMove() then
        log("No, we want to learn this move")
        return Escape()
    elseif AboutToLearnMove() or (InPokemonSummary() and not InBattle()) then
        log("In summary screen or about to learn move")
        if InPokemonSummary() then
            log("Pick move ".. move .. " from move list")
            return MoveListMenu(GetMoveLearnCursor(), move - 1, 5)
        elseif InYesNoMenu() then
            if GetYesNoCursor() == 0 then
                log("Yes we want to learn this move")
                return Confirm()
            end
            log("Avoiding saying no to move learn")
            return MoveUp()
        end
        log("Advancing text")
        return Confirm()
    elseif ContestAppealSelect() then
        log("Selecting move " .. move .. " in contest")
        return MoveListMenu(GetContestCursor(), move - 1)
    end
    if InBattle() then
        log("Not in Battle or Fight menu, hitting B")
        return Escape()
    end
    log("Not in battle or teaching moves, doing nothing")
    return NoInput()
end

itemCache = nil
pocketCache = nil
function DigestItems(items)
    itemCache = {}
    pocketCache = {}
    for p,parr in pairs(items) do
        local pocket = pmAddresses['Bag'][p].id
        if pocket ~= nil then
            pocketCache[pocket] = {}
            for slot,i in ipairs(parr) do
                itemCache[i['id']] = { ['pocket'] = pocket, ['slot'] =  slot }
                pocketCache[pocket][slot] = i
            end
        end
    end
end

function UpdateItems()
    log("Updating item cache...")
    local sBlock1Addr = Ptr(pmAddresses["SaveBlock1Pointer"])
    local securityKey = 0
    if pmAddresses['SecurityKeyOffset'] then
        securityKey = memory.read_u32_le(Ptr(pmAddresses["SaveBlock2Pointer"], pmAddresses['SecurityKeyOffset']))
    end
	local halfKey = securityKey % 0x10000
    local items = { }
    for pocket,data in pairs(pmAddresses['Bag']) do
        items[pocket] = Utils.getItemCollection(sBlock1Addr + data.offset, data.length, halfKey)
    end
    DigestItems(items)
end

function MoveToBag(pocket, item)
    log("Requested item is in pocket " .. pocket .. " at slot " .. item)
    if ForcedMonSwitch() then
        log("Switching after fainted mon")
        if InBattlePartyMenu() then
            log("In party menu already, wait for SWITCH commands")
            return NoInput()
        elseif GetYesNoCursor() == 0 then
            log("Yes we want to use next Pokemon")
            return Confirm()
        end
        log("Avoiding running from wild battle by saying no to switching")
        return MoveUp()
    elseif pocket == pmAddresses['Bag']['balls'].id and InTrainerBattle() or CanUseItems() ~= true then 
        log("Refusing to help throw balls at trainers")
        return NoInput() --don't be a thief
    elseif InBagMenu() then
        log("In Bag")
        if pocket == nil then
            log("Destination pocket unknown, blindly hitting A")
            return Confirm()
        end
        local pDist = pocket - GetBagPocket()
        if pDist == 0 then
            log("In correct pocket")
            local cursor = GetBagCursor() + 1
            if item == nil or item == cursor then
                log("On correct item")
                if InBagSubmenu() then
                    log("Inside Use menu")
                    if GetSubmenuCursor() > 0 then
                        log("Moving to Use")
                        return MoveUp()
                    elseif InUseItemOnPartyMenu() then
                        log("Party menu open to use item, waiting for ON commands")
                        return NoInput()
                    end
                    log("Using item")
                    pmLastUsedBagPocket = pocket
                    pmLastUsedBagSlot = item
                    itemCache = nil --used item, rebuild item cache next time
                    return Confirm()
                elseif InUseItemOnPartyMenu() then
                    log("Party menu open to use item, waiting for ON commands")
                    return NoInput()
                end
                log("Selecting item")
                return Confirm()
            elseif InBagSubmenu() then
                log("Currently trying to use wrong item, backing out")
                return Escape()
            elseif cursor < item then
                log("Item is below cursor")
                return MoveDown()
            end
            log("Item is above cursor")
            return MoveUp()
        elseif InBagSubmenu() then
            log("Currently trying to use item in wrong pocket, backing out")
            return Escape()
        elseif (pDist > 0 and pDist < 3) or pDist < -2 then
            --Emerald wraps, FireRed does not
            log("Destination pocket is to the right")
            return MoveRight()
        end
        log("Destination pocket is to the left")
        return MoveLeft()
    elseif InBattleMenu() then
        log("Moving to Bag")
        return MoveRectMenu(GetBattleCursor(), 1)
    end
    if InBattle() then
        log("Not in Battle or Bag menu, hitting B")
        return Escape()
    end
    log("Not in battle, doing nothing")
    return NoInput()
end

function MoveToParty(slot, inPartyOverride)
    log("ON/WITH/SWITCH" .. slot)
    if InPartyMenu() or inPartyOverride == true then
        log("In party menu")
        if InPokemonSummary() or TriedToSwitchToActivePokemon() then
            log("In summary screen or tried to send out a mon already out, backing out")
            return Escape()
        elseif slot == nil then
            log("No party slot provided, doing nothing")
            return NoInput()
        end
        local cDist = (slot - 1) - GetPartyCursor()
        if cDist == 0 then
            log("On Pokemon " .. slot)
            if InPartySubmenu() then
                log("Inside Switch menu")
                if GetSubmenuCursor() > 0 then
                    log("Moving to Switch")
                    return MoveUp()
                end
                log("Switching")
                return Confirm()
            end
            log("Selecting Pokemon")
            return Confirm()
        elseif InPartySubmenu() then
            log("Switch menu is open for wrong Pokemon")
            return Escape()
        elseif (cDist > 0 and cDist < 4) or cDist < -4 then
            log("Desired Pokemon is below cursor")
            return MoveDown()
        end
        log("Desired Pokemon is above cursor")
        return MoveUp()
    elseif AtSwitchChangePokemonPrompt() then
        log("Being asked if we want to switch Pokemon")
        if GetYesNoCursor() == 0 then
            log("Yes we do")
            return Confirm()
        end
        log("Moving to Yes")
        return MoveUp()
    elseif ForcedMonSwitch() then
        log("Switching after fainted mon")
        if GetYesNoCursor() == 0 then
            log("Yes we want to use next Pokemon")
            return Confirm()
        end
        log("Avoiding running from wild battle by saying no to switching")
        return MoveUp()
    elseif inPartyOverride == false then
        log("Wait, maybe not actually in party menu, no input")
        return NoInput()
    elseif InBattleMenu() then
        log("Moving to Switch menu")
        return MoveRectMenu(GetBattleCursor(), 2)
    end
    log("Not in Battle or party menu, hitting B")
    return Escape()
end

function MoveToRun()
    log("RUN")
    if InTrainerBattle() or InLegendaryBattle() then
        log("Refusing to help run from a trainer or legendary Pokemon")
        return NoInput()
    elseif InBattleMenu() and not ForcedMonSwitch() then
        log("Moving to Run")
        return MoveRectMenu(GetBattleCursor(), 3)
    end
    if InBattle() then
        log("Not in Battle menu, hitting B")
        return Escape()
    end
    log("Not in battle, doing nothing")
    return NoInput()
end

function OnWith(num)
    if InTargetingScreen() then
        log("ON/WITH" .. num)
        log("On target screen in double battle")
        -- Battle participants:  3 1
        --                      0 2
        -- Target Selection:  1 2
        --                   X X
        local target = 0
        if num == 1 then
            target = 3
        elseif num == 2 then
            target = 1
        else
            log("Refusing to target ally")
            return NoInput() -- Only 1 and 2 are valid
        end
        local cursor = GetTargetingCursor()
        if cursor == target then
            log("Selecting target")
            return Confirm()
        elseif target == 3 and cursor == 1 then
            log("Target is to the left")
            return MoveLeft()
        elseif target == 1 and cursor == 3 then
            log("Target is to the right")
            return MoveRight()
        else -- Cursor is on ally
            if target == 1 then
                log("Target is above cursor")
                return MoveUp()
            end
            log("Target is below cursor (yes, really)")
            return MoveDown()
        end
    else
        return MoveToParty(num, InUseItemOnPartyMenu())
    end
end

function Catch()
    log("CATCH")
    if InTrainerBattle() then
        log("Refusing to throw balls at trainers")
        return NoInput()
    elseif InSafariBattle() then
        log("In Safari Zone, mapping to MOVE1")
        return MoveToFight(1)
    end
    local bagCount = 1 + GetBagCursor()
    if itemCache == nil then
        UpdateItems()
    end
    if pocketCache ~= nil then
        bagCount = 0
        for i,v in ipairs(pocketCache[pmAddresses['Bag']['balls'].id]) do
            bagCount = i
        end
        if bagCount == 0 then
            log("Nothing to throw")
            return NoInput()
        end
    end
    log("Moving to Balls pocket and using whatever ball is selected")
    return MoveToBag(pmAddresses['Bag']['balls'].id, math.min(GetBagCursor() + 1, bagCount))
end

function MoveToItem(id)
    log("ITEM" .. id)
    if itemCache == nil then
        UpdateItems()
    end
    local location = itemCache[id]
    if location ~= nil then
        return MoveToBag(location['pocket'], location['slot'])
    end
    log("Item not accessible")
    return NoInput()
end

function RunCommand(cmd, num)
    if forceNicknames and NicknamingPokemon() then
        if InNamingScreen() then
            if randomizeNicknames then
                log("Randomizing nickname cursor")
                return ({MoveUp, MoveLeft, MoveDown, MoveRight})[math.random(1, 4)]()
            end
            log("On nickname screen, doing nothing")
            return NoInput()
        elseif InYesNoMenu() then
            if GetYesNoCursor() == 0 then
                log("Forcing Nickname")
                return Confirm()
            end
            log("Moving to Yes to force Nickname")
            return MoveUp()
        end
    end

    cmd = string.upper(cmd)
    if Active() and commands[cmd] ~= nil then
        return commands[cmd](num)
    else
        itemCache = nil
    end
    return NoInput()
end

function Parse(cmd)
    local out
    pcall(function() out = RunCommand(string.match(cmd, '%a+'), tonumber(string.match(cmd, '%d+'))) end)
    return out
end

function Extend(tbl1, tbl2) 
    for k,v in pairs(tbl2) do
        tbl1[k] = v
    end
    return tbl1
end

commands = {
    ["MOVE"] = MoveToFight,
    ["SWITCH"] = MoveToParty,
    ["ITEM"] = MoveToItem,
    ["ON"] = OnWith,
    ["WITH"] = OnWith,
    ["CATCH"] = Catch,
    ["RUN"] = MoveToRun
}

Init()

event.onloadstate(Init) -- Reinit Commander whenever a state is loaded

-- Exported calls to be used by other modules
return {
    ["Parse"] = Parse, -- Returns the joypad button table Commander recommends based on the submitted command
    ["TestInput"] = cmdr, -- Parses and then executes the returned joypad button table
    ["DigestItems"] = DigestItems, -- If using an external script to read the bag, call this to update the item cache more frequently
    ["Extend"] = Extend -- Useful function for merging Lua tables
}