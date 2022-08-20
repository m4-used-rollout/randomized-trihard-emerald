// const rom data

/*This file consists of several parts.
 *First, the actual tables that define the available Pokemon and their level ranges.
 *Second, the headers for each area that links the tables to the actual maps.
 *Third, Battle Pyramid-specific tables and headers.
 *Fourth, Battle Pike-specific tables and headers.
 *And then finally, Feebas-related data.
 *You can search for // to jump between the sections.
 */
 
 //Start of regular Pokemon tables.

const struct WildPokemon gRoute101_LandMons[] =
{
    {2, 2, SPECIES_SEEDOT},
    {2, 2, SPECIES_SKITTY},
    {2, 2, SPECIES_LOTAD},
    {3, 3, SPECIES_CLEFFA},
    {3, 3, SPECIES_WINGULL},
    {3, 3, SPECIES_LEDYBA},
    {3, 3, SPECIES_WHISMUR},
    {3, 3, SPECIES_MARILL},
    {2, 2, SPECIES_DIGLETT},
    {2, 2, SPECIES_HOOTHOOT},
    {3, 3, SPECIES_WOOPER},
    {3, 3, SPECIES_ANORITH},
};

const struct WildPokemonInfo gRoute101_LandMonsInfo = {20, gRoute101_LandMons};

const struct WildPokemon gRoute102_LandMons[] =
{
    {3, 3, SPECIES_DIGLETT},
    {3, 3, SPECIES_SEEDOT},
    {4, 4, SPECIES_TOGEPI},
    {4, 4, SPECIES_RALTS},
    {3, 3, SPECIES_CATERPIE},
    {4, 4, SPECIES_PIDGEY},
    {3, 3, SPECIES_SENTRET},
    {3, 3, SPECIES_WINGULL},
    {4, 4, SPECIES_SPEAROW},
    {4, 4, SPECIES_ZUBAT},
    {4, 4, SPECIES_PARAS},
    {3, 3, SPECIES_IGGLYBUFF},
};

const struct WildPokemonInfo gRoute102_LandMonsInfo = {20, gRoute102_LandMons};

const struct WildPokemon gRoute102_WaterMons[] =
{
    {20, 30, SPECIES_LEDYBA},
    {10, 20, SPECIES_SLUGMA},
    {30, 35, SPECIES_BARBOACH},
    {5, 10, SPECIES_PINECO},
    {20, 30, SPECIES_SKIPLOOM},
};

const struct WildPokemonInfo gRoute102_WaterMonsInfo = {4, gRoute102_WaterMons};

const struct WildPokemon gRoute102_FishingMons[] =
{
    {5, 10, SPECIES_CASCOON},
    {5, 10, SPECIES_MAGNEMITE},
    {10, 30, SPECIES_FEEBAS},
    {10, 30, SPECIES_SHROOMISH},
    {10, 30, SPECIES_NUMEL},
    {25, 30, SPECIES_GULPIN},
    {30, 35, SPECIES_PHANPY},
    {20, 25, SPECIES_CLAMPERL},
    {35, 40, SPECIES_KOFFING},
    {40, 45, SPECIES_SHELLDER},
};

const struct WildPokemonInfo gRoute102_FishingMonsInfo = {30, gRoute102_FishingMons};

const struct WildPokemon gRoute103_LandMons[] =
{
    {2, 2, SPECIES_METAPOD},
    {3, 3, SPECIES_SUNKERN},
    {3, 3, SPECIES_RATTATA},
    {4, 4, SPECIES_WOOPER},
    {2, 2, SPECIES_VENONAT},
    {3, 3, SPECIES_SWINUB},
    {3, 3, SPECIES_CASCOON},
    {4, 4, SPECIES_TAILLOW},
    {3, 3, SPECIES_SPEAROW},
    {3, 3, SPECIES_SMOOCHUM},
    {4, 4, SPECIES_NINCADA},
    {3, 4, SPECIES_CORPHISH},
};

const struct WildPokemonInfo gRoute103_LandMonsInfo = {20, gRoute103_LandMons};

const struct WildPokemon gRoute103_WaterMons[] =
{
    {5, 35, SPECIES_NUZLEAF},
    {10, 30, SPECIES_HOOTHOOT},
    {15, 25, SPECIES_PSYDUCK},
    {25, 30, SPECIES_AZUMARILL},
    {25, 30, SPECIES_MANTINE},
};

const struct WildPokemonInfo gRoute103_WaterMonsInfo = {4, gRoute103_WaterMons};

const struct WildPokemon gRoute103_FishingMons[] =
{
    {5, 10, SPECIES_MARILL},
    {5, 10, SPECIES_PSYDUCK},
    {10, 30, SPECIES_ZIGZAGOON},
    {10, 30, SPECIES_LILEEP},
    {10, 30, SPECIES_PORYGON},
    {30, 35, SPECIES_NINETALES},
    {30, 35, SPECIES_GLOOM},
    {25, 30, SPECIES_ONIX},
    {35, 40, SPECIES_PUPITAR},
    {40, 45, SPECIES_ANORITH},
};

const struct WildPokemonInfo gRoute103_FishingMonsInfo = {30, gRoute103_FishingMons};

const struct WildPokemon gRoute104_LandMons[] =
{
    {4, 4, SPECIES_SLUGMA},
    {4, 4, SPECIES_ZUBAT},
    {5, 5, SPECIES_TAILLOW},
    {5, 5, SPECIES_KIRLIA},
    {4, 4, SPECIES_FEEBAS},
    {5, 5, SPECIES_SILCOON},
    {4, 4, SPECIES_NUMEL},
    {5, 5, SPECIES_MEDITITE},
    {4, 4, SPECIES_DODUO},
    {4, 5, SPECIES_VENONAT},
    {3, 3, SPECIES_SNUBBULL},
    {5, 5, SPECIES_BAGON},
};

const struct WildPokemonInfo gRoute104_LandMonsInfo = {20, gRoute104_LandMons};

const struct WildPokemon gRoute104_WaterMons[] =
{
    {10, 30, SPECIES_KIRLIA},
    {15, 25, SPECIES_MEDITITE},
    {15, 25, SPECIES_NATU},
    {25, 30, SPECIES_RAICHU},
    {25, 30, SPECIES_DEWGONG},
};

const struct WildPokemonInfo gRoute104_WaterMonsInfo = {4, gRoute104_WaterMons};

const struct WildPokemon gRoute104_FishingMons[] =
{
    {5, 10, SPECIES_ZIGZAGOON},
    {5, 10, SPECIES_KAKUNA},
    {10, 30, SPECIES_CASCOON},
    {10, 30, SPECIES_SILCOON},
    {10, 30, SPECIES_WOOPER},
    {25, 30, SPECIES_SUNKERN},
    {30, 35, SPECIES_POOCHYENA},
    {20, 25, SPECIES_SWINUB},
    {35, 40, SPECIES_TOGEPI},
    {40, 45, SPECIES_SLUGMA},
};

const struct WildPokemonInfo gRoute104_FishingMonsInfo = {30, gRoute104_FishingMons};

const struct WildPokemon gRoute105_WaterMons[] =
{
    {5, 35, SPECIES_SNUBBULL},
    {10, 30, SPECIES_SWINUB},
    {15, 25, SPECIES_SNORUNT},
    {25, 30, SPECIES_ARBOK},
    {25, 30, SPECIES_GRANBULL},
};

const struct WildPokemonInfo gRoute105_WaterMonsInfo = {4, gRoute105_WaterMons};

const struct WildPokemon gRoute105_FishingMons[] =
{
    {5, 10, SPECIES_KAKUNA},
    {5, 10, SPECIES_SHROOMISH},
    {10, 30, SPECIES_SLUGMA},
    {10, 30, SPECIES_PINECO},
    {10, 30, SPECIES_DRAGONAIR},
    {25, 30, SPECIES_FLAAFFY},
    {30, 35, SPECIES_VIGOROTH},
    {20, 25, SPECIES_METANG},
    {35, 45, SPECIES_IVYSAUR},
    {10, 40, SPECIES_MAGMAR},
};

const struct WildPokemonInfo gRoute105_FishingMonsInfo = {30, gRoute105_FishingMons};

const struct WildPokemon gRoute110_LandMons[] =
{
    {12, 12, SPECIES_HOOTHOOT},
    {12, 12, SPECIES_DROWZEE},
    {12, 12, SPECIES_MAGNEMITE},
    {13, 13, SPECIES_VOLTORB},
    {13, 13, SPECIES_YANMA},
    {13, 13, SPECIES_MACHOP},
    {13, 13, SPECIES_MURKROW},
    {13, 13, SPECIES_SKIPLOOM},
    {12, 12, SPECIES_GULPIN},
    {12, 12, SPECIES_ELECTRIKE},
    {12, 12, SPECIES_BUTTERFREE},
    {13, 13, SPECIES_BEAUTIFLY},
};

const struct WildPokemonInfo gRoute110_LandMonsInfo = {20, gRoute110_LandMons};

const struct WildPokemon gRoute110_WaterMons[] =
{
    {5, 35, SPECIES_KOFFING},
    {10, 30, SPECIES_SLOWPOKE},
    {15, 25, SPECIES_SWABLU},
    {25, 30, SPECIES_PARASECT},
    {25, 30, SPECIES_SNEASEL},
};

const struct WildPokemonInfo gRoute110_WaterMonsInfo = {4, gRoute110_WaterMons};

const struct WildPokemon gRoute110_FishingMons[] =
{
    {5, 10, SPECIES_CASCOON},
    {5, 10, SPECIES_ONIX},
    {10, 30, SPECIES_TYROGUE},
    {10, 30, SPECIES_KABUTO},
    {10, 30, SPECIES_MACHOKE},
    {25, 30, SPECIES_PUPITAR},
    {30, 35, SPECIES_HAUNTER},
    {20, 25, SPECIES_METANG},
    {35, 40, SPECIES_ELEKID},
    {40, 45, SPECIES_GROVYLE},
};

const struct WildPokemonInfo gRoute110_FishingMonsInfo = {30, gRoute110_FishingMons};

const struct WildPokemon gRoute111_LandMons[] =
{
    {20, 20, SPECIES_SNORUNT},
    {20, 20, SPECIES_HOPPIP},
    {21, 21, SPECIES_PHANPY},
    {21, 21, SPECIES_BELLSPROUT},
    {19, 19, SPECIES_SWINUB},
    {21, 21, SPECIES_MAGNEMITE},
    {19, 19, SPECIES_CLAMPERL},
    {19, 19, SPECIES_POLIWAG},
    {20, 20, SPECIES_VULPIX},
    {20, 20, SPECIES_STARYU},
    {22, 22, SPECIES_DODUO},
    {22, 22, SPECIES_SKIPLOOM},
};

const struct WildPokemonInfo gRoute111_LandMonsInfo = {10, gRoute111_LandMons};

const struct WildPokemon gRoute111_WaterMons[] =
{
    {20, 30, SPECIES_SHROOMISH},
    {10, 20, SPECIES_NINCADA},
    {30, 35, SPECIES_HOOTHOOT},
    {5, 10, SPECIES_MAKUHITA},
    {20, 30, SPECIES_NIDORINO},
};

const struct WildPokemonInfo gRoute111_WaterMonsInfo = {4, gRoute111_WaterMons};

const struct WildPokemon gRoute111_RockSmashMons[] =
{
    {10, 15, SPECIES_HORSEA},
    {5, 10, SPECIES_LARVITAR},
    {15, 20, SPECIES_BELLSPROUT},
    {15, 20, SPECIES_TREECKO},
    {15, 20, SPECIES_NIDORAN_M},
};

const struct WildPokemonInfo gRoute111_RockSmashMonsInfo = {20, gRoute111_RockSmashMons};

const struct WildPokemon gRoute111_FishingMons[] =
{
    {5, 10, SPECIES_METAPOD},
    {5, 10, SPECIES_KRABBY},
    {10, 30, SPECIES_SUNKERN},
    {10, 30, SPECIES_SEEL},
    {10, 30, SPECIES_SPOINK},
    {25, 30, SPECIES_DUSKULL},
    {30, 35, SPECIES_PINECO},
    {20, 25, SPECIES_WINGULL},
    {35, 40, SPECIES_RATTATA},
    {40, 45, SPECIES_NATU},
};

const struct WildPokemonInfo gRoute111_FishingMonsInfo = {30, gRoute111_FishingMons};

const struct WildPokemon gRoute112_LandMons[] =
{
    {15, 15, SPECIES_GROWLITHE},
    {15, 15, SPECIES_VULPIX},
    {15, 15, SPECIES_FEEBAS},
    {14, 14, SPECIES_SKITTY},
    {14, 14, SPECIES_NINCADA},
    {14, 14, SPECIES_ELECTRIKE},
    {16, 16, SPECIES_VOLTORB},
    {16, 16, SPECIES_SLUGMA},
    {16, 16, SPECIES_VENONAT},
    {16, 16, SPECIES_DUSKULL},
    {16, 16, SPECIES_HOUNDOUR},
    {14, 16, SPECIES_EKANS},
};

const struct WildPokemonInfo gRoute112_LandMonsInfo = {20, gRoute112_LandMons};

const struct WildPokemon gRoute113_LandMons[] =
{
    {15, 15, SPECIES_MAGCARGO},
    {15, 15, SPECIES_CORSOLA},
    {15, 15, SPECIES_CASCOON},
    {14, 14, SPECIES_ILLUMISE},
    {14, 14, SPECIES_DELIBIRD},
    {14, 14, SPECIES_DIGLETT},
    {16, 16, SPECIES_MAWILE},
    {16, 16, SPECIES_MARILL},
    {16, 16, SPECIES_WOBBUFFET},
    {16, 16, SPECIES_VENOMOTH},
    {14, 16, SPECIES_ALTARIA},
    {16, 16, SPECIES_NINETALES},
};

const struct WildPokemonInfo gRoute113_LandMonsInfo = {20, gRoute113_LandMons};

const struct WildPokemon gRoute114_LandMons[] =
{
    {16, 16, SPECIES_LOUDRED},
    {16, 16, SPECIES_SEEDOT},
    {17, 17, SPECIES_NUZLEAF},
    {15, 15, SPECIES_KOFFING},
    {15, 15, SPECIES_ZUBAT},
    {16, 16, SPECIES_SANDSHREW},
    {16, 16, SPECIES_STARYU},
    {18, 18, SPECIES_CUBONE},
    {17, 17, SPECIES_DEWGONG},
    {15, 15, SPECIES_OCTILLERY},
    {17, 17, SPECIES_GIRAFARIG},
    {15, 15, SPECIES_SLOWPOKE},
};

const struct WildPokemonInfo gRoute114_LandMonsInfo = {20, gRoute114_LandMons};

const struct WildPokemon gRoute114_WaterMons[] =
{
    {20, 30, SPECIES_ZIGZAGOON},
    {10, 20, SPECIES_WINGULL},
    {30, 35, SPECIES_BARBOACH},
    {5, 10, SPECIES_CASCOON},
    {20, 30, SPECIES_KABUTO},
};

const struct WildPokemonInfo gRoute114_WaterMonsInfo = {4, gRoute114_WaterMons};

const struct WildPokemon gRoute114_RockSmashMons[] =
{
    {10, 15, SPECIES_TORCHIC},
    {5, 10, SPECIES_NIDORAN_F},
    {15, 20, SPECIES_PIDGEY},
    {15, 20, SPECIES_NIDORAN_M},
    {15, 20, SPECIES_LARVITAR},
};

const struct WildPokemonInfo gRoute114_RockSmashMonsInfo = {20, gRoute114_RockSmashMons};

const struct WildPokemon gRoute114_FishingMons[] =
{
    {5, 10, SPECIES_TOGEPI},
    {5, 10, SPECIES_TAILLOW},
    {10, 30, SPECIES_KAKUNA},
    {10, 30, SPECIES_MEDITITE},
    {10, 30, SPECIES_KRABBY},
    {25, 30, SPECIES_SURSKIT},
    {30, 35, SPECIES_SPOINK},
    {20, 25, SPECIES_VOLTORB},
    {35, 40, SPECIES_DROWZEE},
    {40, 45, SPECIES_CORPHISH},
};

const struct WildPokemonInfo gRoute114_FishingMonsInfo = {30, gRoute114_FishingMons};

const struct WildPokemon gRoute116_LandMons[] =
{
    {6, 6, SPECIES_TYROGUE},
    {6, 6, SPECIES_LOTAD},
    {6, 6, SPECIES_SWABLU},
    {7, 7, SPECIES_BULBASAUR},
    {7, 7, SPECIES_LEDYBA},
    {6, 6, SPECIES_SHUPPET},
    {7, 7, SPECIES_SANDSHREW},
    {8, 8, SPECIES_SHELLDER},
    {7, 7, SPECIES_KAKUNA},
    {8, 8, SPECIES_JIGGLYPUFF},
    {7, 7, SPECIES_REMORAID},
    {8, 8, SPECIES_ELECTRIKE},
};

const struct WildPokemonInfo gRoute116_LandMonsInfo = {20, gRoute116_LandMons};

const struct WildPokemon gRoute117_LandMons[] =
{
    {13, 13, SPECIES_TOGEPI},
    {13, 13, SPECIES_TOTODILE},
    {14, 14, SPECIES_MAKUHITA},
    {14, 14, SPECIES_GASTLY},
    {13, 13, SPECIES_SENTRET},
    {13, 13, SPECIES_POLIWAG},
    {13, 13, SPECIES_MINUN},
    {13, 13, SPECIES_PILOSWINE},
    {14, 14, SPECIES_CHIMECHO},
    {14, 14, SPECIES_SABLEYE},
    {13, 13, SPECIES_VENOMOTH},
    {13, 13, SPECIES_CATERPIE},
};

const struct WildPokemonInfo gRoute117_LandMonsInfo = {20, gRoute117_LandMons};

const struct WildPokemon gRoute117_WaterMons[] =
{
    {20, 30, SPECIES_SNORUNT},
    {10, 20, SPECIES_CASCOON},
    {30, 35, SPECIES_EKANS},
    {5, 10, SPECIES_SENTRET},
    {20, 30, SPECIES_KABUTO},
};

const struct WildPokemonInfo gRoute117_WaterMonsInfo = {4, gRoute117_WaterMons};

const struct WildPokemon gRoute117_FishingMons[] =
{
    {5, 10, SPECIES_MAKUHITA},
    {5, 10, SPECIES_PIDGEOTTO},
    {10, 30, SPECIES_CASCOON},
    {10, 30, SPECIES_NIDORINA},
    {10, 30, SPECIES_DUSKULL},
    {25, 30, SPECIES_CHINCHOU},
    {30, 35, SPECIES_WINGULL},
    {20, 25, SPECIES_SWABLU},
    {35, 40, SPECIES_SMOOCHUM},
    {40, 45, SPECIES_PSYDUCK},
};

const struct WildPokemonInfo gRoute117_FishingMonsInfo = {30, gRoute117_FishingMons};

const struct WildPokemon gRoute118_LandMons[] =
{
    {24, 24, SPECIES_RATTATA},
    {24, 24, SPECIES_EEVEE},
    {26, 26, SPECIES_TOGEPI},
    {26, 26, SPECIES_SPOINK},
    {26, 26, SPECIES_BEAUTIFLY},
    {26, 26, SPECIES_SOLROCK},
    {25, 25, SPECIES_SPEAROW},
    {25, 25, SPECIES_CORPHISH},
    {26, 26, SPECIES_TAILLOW},
    {26, 26, SPECIES_SNORUNT},
    {27, 27, SPECIES_MEDITITE},
    {25, 25, SPECIES_MAROWAK},
};

const struct WildPokemonInfo gRoute118_LandMonsInfo = {20, gRoute118_LandMons};

const struct WildPokemon gRoute118_WaterMons[] =
{
    {5, 35, SPECIES_BALTOY},
    {10, 30, SPECIES_SANDSHREW},
    {15, 25, SPECIES_CARVANHA},
    {25, 30, SPECIES_NINJASK},
    {25, 30, SPECIES_LICKITUNG},
};

const struct WildPokemonInfo gRoute118_WaterMonsInfo = {4, gRoute118_WaterMons};

const struct WildPokemon gRoute118_FishingMons[] =
{
    {5, 10, SPECIES_TOGEPI},
    {5, 10, SPECIES_BARBOACH},
    {10, 30, SPECIES_SUNKERN},
    {10, 30, SPECIES_SPOINK},
    {10, 30, SPECIES_SHUPPET},
    {30, 35, SPECIES_ELECTABUZZ},
    {30, 35, SPECIES_PIKACHU},
    {20, 25, SPECIES_STARYU},
    {35, 40, SPECIES_SKIPLOOM},
    {40, 45, SPECIES_WYNAUT},
};

const struct WildPokemonInfo gRoute118_FishingMonsInfo = {30, gRoute118_FishingMons};

const struct WildPokemon gRoute124_WaterMons[] =
{
    {5, 35, SPECIES_PIDGEOTTO},
    {10, 30, SPECIES_PARAS},
    {15, 25, SPECIES_SNUBBULL},
    {25, 30, SPECIES_PRIMEAPE},
    {25, 30, SPECIES_DODRIO},
};

const struct WildPokemonInfo gRoute124_WaterMonsInfo = {4, gRoute124_WaterMons};

const struct WildPokemon gRoute124_FishingMons[] =
{
    {5, 10, SPECIES_ZIGZAGOON},
    {5, 10, SPECIES_VENONAT},
    {10, 30, SPECIES_WOOPER},
    {10, 30, SPECIES_SANDSHREW},
    {10, 30, SPECIES_LAIRON},
    {30, 35, SPECIES_SEVIPER},
    {30, 35, SPECIES_MARSHTOMP},
    {25, 30, SPECIES_CHARMELEON},
    {35, 40, SPECIES_ONIX},
    {40, 45, SPECIES_SHELGON},
};

const struct WildPokemonInfo gRoute124_FishingMonsInfo = {30, gRoute124_FishingMons};

const struct WildPokemon gPetalburgWoods_LandMons[] =
{
    {5, 5, SPECIES_RATTATA},
    {5, 5, SPECIES_WEEDLE},
    {5, 5, SPECIES_PSYDUCK},
    {6, 6, SPECIES_WOOPER},
    {5, 5, SPECIES_FEEBAS},
    {5, 5, SPECIES_SLUGMA},
    {6, 6, SPECIES_IGGLYBUFF},
    {6, 6, SPECIES_CUBONE},
    {5, 5, SPECIES_SNUBBULL},
    {5, 5, SPECIES_GEODUDE},
    {6, 6, SPECIES_BARBOACH},
    {6, 6, SPECIES_HOPPIP},
};

const struct WildPokemonInfo gPetalburgWoods_LandMonsInfo = {20, gPetalburgWoods_LandMons};

const struct WildPokemon gRusturfTunnel_LandMons[] =
{
    {6, 6, SPECIES_WEEDLE},
    {7, 7, SPECIES_PICHU},
    {6, 6, SPECIES_PIDGEY},
    {6, 6, SPECIES_MAREEP},
    {7, 7, SPECIES_LOTAD},
    {7, 7, SPECIES_NIDORAN_M},
    {5, 5, SPECIES_SEEDOT},
    {8, 8, SPECIES_SLAKOTH},
    {5, 5, SPECIES_TRAPINCH},
    {8, 8, SPECIES_ZUBAT},
    {5, 5, SPECIES_IGGLYBUFF},
    {5, 8, SPECIES_LUNATONE},
};

const struct WildPokemonInfo gRusturfTunnel_LandMonsInfo = {10, gRusturfTunnel_LandMons};

const struct WildPokemon gGraniteCave_1F_LandMons[] =
{
    {7, 7, SPECIES_NIDORAN_M},
    {8, 8, SPECIES_KAKUNA},
    {7, 7, SPECIES_SENTRET},
    {8, 8, SPECIES_CLEFFA},
    {9, 9, SPECIES_SILCOON},
    {8, 8, SPECIES_TRAPINCH},
    {10, 10, SPECIES_SURSKIT},
    {6, 6, SPECIES_NINCADA},
    {7, 7, SPECIES_TORCHIC},
    {8, 8, SPECIES_SQUIRTLE},
    {6, 6, SPECIES_BULBASAUR},
    {9, 9, SPECIES_DRATINI},
};

const struct WildPokemonInfo gGraniteCave_1F_LandMonsInfo = {10, gGraniteCave_1F_LandMons};

const struct WildPokemon gGraniteCave_B1F_LandMons[] =
{
    {9, 9, SPECIES_WEEDLE},
    {10, 10, SPECIES_BELLSPROUT},
    {9, 9, SPECIES_BULBASAUR},
    {11, 11, SPECIES_TORCHIC},
    {10, 10, SPECIES_RALTS},
    {9, 9, SPECIES_TRAPINCH},
    {10, 10, SPECIES_WYNAUT},
    {11, 11, SPECIES_MAGIKARP},
    {10, 10, SPECIES_QUAGSIRE},
    {10, 10, SPECIES_LEDIAN},
    {9, 9, SPECIES_RATICATE},
    {11, 11, SPECIES_DELIBIRD},
};

const struct WildPokemonInfo gGraniteCave_B1F_LandMonsInfo = {10, gGraniteCave_B1F_LandMons};

const struct WildPokemon gMtPyre_1F_LandMons[] =
{
    {27, 27, SPECIES_VENONAT},
    {28, 28, SPECIES_LOMBRE},
    {26, 26, SPECIES_CLAMPERL},
    {25, 25, SPECIES_SLUGMA},
    {29, 29, SPECIES_KIRLIA},
    {24, 24, SPECIES_GOLDEEN},
    {23, 23, SPECIES_NATU},
    {22, 22, SPECIES_GULPIN},
    {29, 29, SPECIES_PIKACHU},
    {24, 24, SPECIES_CORPHISH},
    {29, 29, SPECIES_EKANS},
    {24, 24, SPECIES_SHELLDER},
};

const struct WildPokemonInfo gMtPyre_1F_LandMonsInfo = {10, gMtPyre_1F_LandMons};

const struct WildPokemon gVictoryRoad_1F_LandMons[] =
{
    {40, 40, SPECIES_SCYTHER},
    {40, 40, SPECIES_JUMPLUFF},
    {40, 40, SPECIES_VIGOROTH},
    {40, 40, SPECIES_PHANPY},
    {36, 36, SPECIES_HOPPIP},
    {36, 36, SPECIES_KIRLIA},
    {38, 38, SPECIES_SEADRA},
    {38, 38, SPECIES_TROPIUS},
    {36, 36, SPECIES_MUDKIP},
    {36, 36, SPECIES_ZUBAT},
    {36, 36, SPECIES_CHARMANDER},
    {36, 36, SPECIES_WEEDLE},
};

const struct WildPokemonInfo gVictoryRoad_1F_LandMonsInfo = {10, gVictoryRoad_1F_LandMons};

const struct WildPokemon gSafariZone_South_LandMons[] =
{
    {25, 25, SPECIES_CHARMANDER},
    {27, 27, SPECIES_TREECKO},
    {25, 25, SPECIES_MAGCARGO},
    {27, 27, SPECIES_HUNTAIL},
    {25, 25, SPECIES_GROWLITHE},
    {25, 25, SPECIES_SHELLDER},
    {25, 25, SPECIES_OMANYTE},
    {27, 27, SPECIES_VOLBEAT},
    {25, 25, SPECIES_BARBOACH},
    {27, 27, SPECIES_MASQUERAIN},
    {27, 27, SPECIES_SPOINK},
    {29, 29, SPECIES_LUNATONE},
};

const struct WildPokemonInfo gSafariZone_South_LandMonsInfo = {25, gSafariZone_South_LandMons};

const struct WildPokemon gUnderwater2_WaterMons[] =
{
    {20, 30, SPECIES_SNUBBULL},
    {20, 30, SPECIES_MEDITITE},
    {30, 35, SPECIES_GULPIN},
    {30, 35, SPECIES_WHISCASH},
    {30, 35, SPECIES_TYPHLOSION},
};

const struct WildPokemonInfo gUnderwater2_WaterMonsInfo = {4, gUnderwater2_WaterMons};

const struct WildPokemon gAbandonedShip_Rooms_B1F_WaterMons[] =
{
    {5, 35, SPECIES_MAGNEMITE},
    {5, 35, SPECIES_ONIX},
    {5, 35, SPECIES_GRIMER},
    {5, 35, SPECIES_BALTOY},
    {30, 35, SPECIES_EXPLOUD},
};

const struct WildPokemonInfo gAbandonedShip_Rooms_B1F_WaterMonsInfo = {4, gAbandonedShip_Rooms_B1F_WaterMons};

const struct WildPokemon gAbandonedShip_Rooms_B1F_FishingMons[] =
{
    {5, 10, SPECIES_MAKUHITA},
    {5, 10, SPECIES_VOLTORB},
    {10, 30, SPECIES_MARILL},
    {10, 30, SPECIES_LILEEP},
    {10, 30, SPECIES_CLEFAIRY},
    {25, 30, SPECIES_KOFFING},
    {30, 35, SPECIES_BARBOACH},
    {30, 35, SPECIES_STEELIX},
    {25, 30, SPECIES_VICTREEBEL},
    {20, 25, SPECIES_CHARIZARD},
};

const struct WildPokemonInfo gAbandonedShip_Rooms_B1F_FishingMonsInfo = {20, gAbandonedShip_Rooms_B1F_FishingMons};

const struct WildPokemon gGraniteCave_B2F_LandMons[] =
{
    {10, 10, SPECIES_TRAPINCH},
    {11, 11, SPECIES_DRATINI},
    {10, 10, SPECIES_MUDKIP},
    {11, 11, SPECIES_IGGLYBUFF},
    {12, 12, SPECIES_MAREEP},
    {10, 10, SPECIES_BULBASAUR},
    {10, 10, SPECIES_WOBBUFFET},
    {11, 11, SPECIES_CASTFORM},
    {12, 12, SPECIES_PARASECT},
    {10, 10, SPECIES_UNOWN},
    {12, 12, SPECIES_SUDOWOODO},
    {10, 10, SPECIES_MINUN},
};

const struct WildPokemonInfo gGraniteCave_B2F_LandMonsInfo = {10, gGraniteCave_B2F_LandMons};

const struct WildPokemon gGraniteCave_B2F_RockSmashMons[] =
{
    {10, 15, SPECIES_DRATINI},
    {10, 20, SPECIES_VOLBEAT},
    {5, 10, SPECIES_HOPPIP},
    {15, 20, SPECIES_TRAPINCH},
    {15, 20, SPECIES_BELDUM},
};

const struct WildPokemonInfo gGraniteCave_B2F_RockSmashMonsInfo = {20, gGraniteCave_B2F_RockSmashMons};

const struct WildPokemon gFieryPath_LandMons[] =
{
    {15, 15, SPECIES_NINCADA},
    {15, 15, SPECIES_SPOINK},
    {16, 16, SPECIES_TENTACOOL},
    {15, 15, SPECIES_BELDUM},
    {15, 15, SPECIES_VICTREEBEL},
    {15, 15, SPECIES_MEDITITE},
    {16, 16, SPECIES_EXEGGCUTE},
    {16, 16, SPECIES_HORSEA},
    {14, 14, SPECIES_SCIZOR},
    {16, 16, SPECIES_GOREBYSS},
    {14, 14, SPECIES_BARBOACH},
    {14, 14, SPECIES_LILEEP},
};

const struct WildPokemonInfo gFieryPath_LandMonsInfo = {10, gFieryPath_LandMons};

const struct WildPokemon gMeteorFalls_B1F_2R_LandMons[] =
{
    {33, 33, SPECIES_WARTORTLE},
    {35, 35, SPECIES_IVYSAUR},
    {30, 30, SPECIES_SQUIRTLE},
    {35, 35, SPECIES_HITMONCHAN},
    {35, 35, SPECIES_ODDISH},
    {37, 37, SPECIES_VENOMOTH},
    {25, 25, SPECIES_TRAPINCH},
    {39, 39, SPECIES_VOLBEAT},
    {38, 38, SPECIES_MACHOKE},
    {40, 40, SPECIES_SEALEO},
    {38, 38, SPECIES_METANG},
    {40, 40, SPECIES_COMBUSKEN},
};

const struct WildPokemonInfo gMeteorFalls_B1F_2R_LandMonsInfo = {10, gMeteorFalls_B1F_2R_LandMons};

const struct WildPokemon gMeteorFalls_B1F_2R_WaterMons[] =
{
    {30, 35, SPECIES_BAYLEEF},
    {30, 35, SPECIES_SHELGON},
    {25, 35, SPECIES_STANTLER},
    {15, 25, SPECIES_CRAWDAUNT},
    {5, 15, SPECIES_ELECTABUZZ},
};

const struct WildPokemonInfo gMeteorFalls_B1F_2R_WaterMonsInfo = {4, gMeteorFalls_B1F_2R_WaterMons};

const struct WildPokemon gMeteorFalls_B1F_2R_FishingMons[] =
{
    {5, 10, SPECIES_ZIGZAGOON},
    {5, 10, SPECIES_KABUTO},
    {10, 30, SPECIES_MAKUHITA},
    {10, 30, SPECIES_CUBONE},
    {10, 30, SPECIES_VULPIX},
    {25, 30, SPECIES_SHUPPET},
    {30, 35, SPECIES_PIKACHU},
    {30, 35, SPECIES_GRANBULL},
    {35, 40, SPECIES_GOLEM},
    {40, 45, SPECIES_GLIGAR},
};

const struct WildPokemonInfo gMeteorFalls_B1F_2R_FishingMonsInfo = {30, gMeteorFalls_B1F_2R_FishingMons};

const struct WildPokemon gJaggedPass_LandMons[] =
{
    {21, 21, SPECIES_VULPIX},
    {21, 21, SPECIES_WYNAUT},
    {21, 21, SPECIES_HORSEA},
    {20, 20, SPECIES_MANKEY},
    {20, 20, SPECIES_SWABLU},
    {20, 20, SPECIES_NIDORAN_M},
    {21, 21, SPECIES_NATU},
    {22, 22, SPECIES_GASTLY},
    {22, 22, SPECIES_SPEAROW},
    {22, 22, SPECIES_KABUTO},
    {22, 22, SPECIES_MEDITITE},
    {22, 22, SPECIES_PSYDUCK},
};

const struct WildPokemonInfo gJaggedPass_LandMonsInfo = {20, gJaggedPass_LandMons};

const struct WildPokemon gRoute106_WaterMons[] =
{
    {5, 35, SPECIES_DROWZEE},
    {10, 30, SPECIES_MAKUHITA},
    {15, 25, SPECIES_DUSKULL},
    {25, 30, SPECIES_DODRIO},
    {25, 30, SPECIES_EXPLOUD},
};

const struct WildPokemonInfo gRoute106_WaterMonsInfo = {4, gRoute106_WaterMons};

const struct WildPokemon gRoute106_FishingMons[] =
{
    {5, 10, SPECIES_METAPOD},
    {5, 10, SPECIES_SANDSHREW},
    {10, 30, SPECIES_SENTRET},
    {10, 30, SPECIES_NIDORINO},
    {10, 30, SPECIES_METANG},
    {25, 30, SPECIES_PORYGON},
    {30, 35, SPECIES_MAGBY},
    {20, 25, SPECIES_OMANYTE},
    {35, 40, SPECIES_CROCONAW},
    {40, 45, SPECIES_CHARMELEON},
};

const struct WildPokemonInfo gRoute106_FishingMonsInfo = {30, gRoute106_FishingMons};

const struct WildPokemon gRoute107_WaterMons[] =
{
    {5, 35, SPECIES_MAGBY},
    {10, 30, SPECIES_SHROOMISH},
    {15, 25, SPECIES_SMOOCHUM},
    {25, 30, SPECIES_SABLEYE},
    {25, 30, SPECIES_ARBOK},
};

const struct WildPokemonInfo gRoute107_WaterMonsInfo = {4, gRoute107_WaterMons};

const struct WildPokemon gRoute107_FishingMons[] =
{
    {5, 10, SPECIES_WOOPER},
    {5, 10, SPECIES_SANDSHREW},
    {10, 30, SPECIES_SUNKERN},
    {10, 30, SPECIES_GULPIN},
    {10, 30, SPECIES_OMANYTE},
    {25, 30, SPECIES_CHARMELEON},
    {30, 35, SPECIES_GRAVELER},
    {20, 25, SPECIES_FLAAFFY},
    {35, 40, SPECIES_LAIRON},
    {40, 45, SPECIES_ONIX},
};

const struct WildPokemonInfo gRoute107_FishingMonsInfo = {30, gRoute107_FishingMons};

const struct WildPokemon gRoute108_WaterMons[] =
{
    {5, 35, SPECIES_KOFFING},
    {10, 30, SPECIES_TOGEPI},
    {15, 25, SPECIES_LEDYBA},
    {25, 30, SPECIES_NOCTOWL},
    {25, 30, SPECIES_LOUDRED},
};

const struct WildPokemonInfo gRoute108_WaterMonsInfo = {4, gRoute108_WaterMons};

const struct WildPokemon gRoute108_FishingMons[] =
{
    {5, 10, SPECIES_WOOPER},
    {5, 10, SPECIES_NIDORINO},
    {10, 30, SPECIES_SPINARAK},
    {10, 30, SPECIES_MAGBY},
    {10, 30, SPECIES_METANG},
    {25, 30, SPECIES_BAYLEEF},
    {30, 35, SPECIES_LAIRON},
    {20, 25, SPECIES_GRAVELER},
    {35, 40, SPECIES_FLAAFFY},
    {40, 45, SPECIES_SHELGON},
};

const struct WildPokemonInfo gRoute108_FishingMonsInfo = {30, gRoute108_FishingMons};

const struct WildPokemon gRoute109_WaterMons[] =
{
    {5, 35, SPECIES_PIKACHU},
    {10, 30, SPECIES_SWABLU},
    {15, 25, SPECIES_NINCADA},
    {25, 30, SPECIES_VENOMOTH},
    {25, 30, SPECIES_FURRET},
};

const struct WildPokemonInfo gRoute109_WaterMonsInfo = {4, gRoute109_WaterMons};

const struct WildPokemon gRoute109_FishingMons[] =
{
    {5, 10, SPECIES_SPINARAK},
    {5, 10, SPECIES_GRIMER},
    {10, 30, SPECIES_METAPOD},
    {10, 30, SPECIES_SWABLU},
    {10, 30, SPECIES_GROVYLE},
    {25, 30, SPECIES_SEALEO},
    {30, 35, SPECIES_PUPITAR},
    {20, 25, SPECIES_LAIRON},
    {35, 40, SPECIES_HAUNTER},
    {40, 45, SPECIES_LOUDRED},
};

const struct WildPokemonInfo gRoute109_FishingMonsInfo = {30, gRoute109_FishingMons};

const struct WildPokemon gRoute115_LandMons[] =
{
    {23, 23, SPECIES_DUSKULL},
    {23, 23, SPECIES_RATTATA},
    {25, 25, SPECIES_HOUNDOUR},
    {24, 24, SPECIES_SHUPPET},
    {25, 25, SPECIES_BARBOACH},
    {25, 25, SPECIES_XATU},
    {24, 24, SPECIES_MEDITITE},
    {25, 25, SPECIES_LEDYBA},
    {24, 24, SPECIES_SMOOCHUM},
    {24, 24, SPECIES_SLUGMA},
    {26, 26, SPECIES_DODUO},
    {25, 25, SPECIES_SKITTY},
};

const struct WildPokemonInfo gRoute115_LandMonsInfo = {20, gRoute115_LandMons};

const struct WildPokemon gRoute115_WaterMons[] =
{
    {5, 35, SPECIES_PIKACHU},
    {10, 30, SPECIES_PSYDUCK},
    {15, 25, SPECIES_KIRLIA},
    {25, 30, SPECIES_PILOSWINE},
    {25, 30, SPECIES_GLALIE},
};

const struct WildPokemonInfo gRoute115_WaterMonsInfo = {4, gRoute115_WaterMons};

const struct WildPokemon gRoute115_FishingMons[] =
{
    {5, 10, SPECIES_WOOPER},
    {5, 10, SPECIES_PINECO},
    {10, 30, SPECIES_METAPOD},
    {10, 30, SPECIES_SMOOCHUM},
    {10, 30, SPECIES_CROCONAW},
    {25, 30, SPECIES_ONIX},
    {30, 35, SPECIES_WARTORTLE},
    {20, 25, SPECIES_KADABRA},
    {35, 40, SPECIES_HAUNTER},
    {40, 45, SPECIES_ELEKID},
};

const struct WildPokemonInfo gRoute115_FishingMonsInfo = {30, gRoute115_FishingMons};

const struct WildPokemon gNewMauville_Inside_LandMons[] =
{
    {24, 24, SPECIES_DROWZEE},
    {24, 24, SPECIES_ELECTRIKE},
    {25, 25, SPECIES_NUZLEAF},
    {25, 25, SPECIES_SNUBBULL},
    {23, 23, SPECIES_TENTACOOL},
    {23, 23, SPECIES_BARBOACH},
    {26, 26, SPECIES_RHYHORN},
    {26, 26, SPECIES_ELEKID},
    {22, 22, SPECIES_SMOOCHUM},
    {22, 22, SPECIES_KIRLIA},
    {26, 26, SPECIES_POLIWRATH},
    {26, 26, SPECIES_GOLDUCK},
};

const struct WildPokemonInfo gNewMauville_Inside_LandMonsInfo = {10, gNewMauville_Inside_LandMons};

const struct WildPokemon gRoute119_LandMons[] =
{
    {25, 25, SPECIES_MAKUHITA},
    {25, 25, SPECIES_WOBBUFFET},
    {27, 27, SPECIES_MAGIKARP},
    {25, 25, SPECIES_CHARMANDER},
    {27, 27, SPECIES_MURKROW},
    {26, 26, SPECIES_NIDORAN_F},
    {27, 27, SPECIES_HORSEA},
    {24, 24, SPECIES_TRAPINCH},
    {25, 25, SPECIES_PERSIAN},
    {26, 26, SPECIES_HUNTAIL},
    {27, 27, SPECIES_CAMERUPT},
    {25, 25, SPECIES_HARIYAMA},
};

const struct WildPokemonInfo gRoute119_LandMonsInfo = {15, gRoute119_LandMons};

const struct WildPokemon gRoute119_WaterMons[] =
{
    {5, 35, SPECIES_ELECTRIKE},
    {10, 30, SPECIES_KIRLIA},
    {15, 25, SPECIES_EKANS},
    {25, 30, SPECIES_GIRAFARIG},
    {25, 30, SPECIES_VOLBEAT},
};

const struct WildPokemonInfo gRoute119_WaterMonsInfo = {4, gRoute119_WaterMons};

const struct WildPokemon gRoute119_FishingMons[] =
{
    {5, 10, SPECIES_MAKUHITA},
    {5, 10, SPECIES_BALTOY},
    {10, 30, SPECIES_SILCOON},
    {10, 30, SPECIES_CLEFAIRY},
    {10, 30, SPECIES_BARBOACH},
    {25, 30, SPECIES_CLAMPERL},
    {30, 35, SPECIES_HOUNDOUR},
    {20, 25, SPECIES_OMANYTE},
    {35, 40, SPECIES_DODUO},
    {40, 45, SPECIES_PIKACHU},
};

const struct WildPokemonInfo gRoute119_FishingMonsInfo = {30, gRoute119_FishingMons};

const struct WildPokemon gRoute120_LandMons[] =
{
    {25, 25, SPECIES_FEEBAS},
    {25, 25, SPECIES_WHISCASH},
    {27, 27, SPECIES_GIRAFARIG},
    {25, 25, SPECIES_BULBASAUR},
    {25, 25, SPECIES_CASCOON},
    {26, 26, SPECIES_BAGON},
    {27, 27, SPECIES_TOTODILE},
    {27, 27, SPECIES_MAKUHITA},
    {25, 25, SPECIES_CASTFORM},
    {27, 27, SPECIES_POLIWRATH},
    {25, 25, SPECIES_SLOWKING},
    {25, 25, SPECIES_PICHU},
};

const struct WildPokemonInfo gRoute120_LandMonsInfo = {20, gRoute120_LandMons};

const struct WildPokemon gRoute120_WaterMons[] =
{
    {20, 30, SPECIES_DIGLETT},
    {10, 20, SPECIES_ZIGZAGOON},
    {30, 35, SPECIES_SURSKIT},
    {5, 10, SPECIES_MEDITITE},
    {20, 30, SPECIES_ELEKID},
};

const struct WildPokemonInfo gRoute120_WaterMonsInfo = {4, gRoute120_WaterMons};

const struct WildPokemon gRoute120_FishingMons[] =
{
    {5, 10, SPECIES_MARILL},
    {5, 10, SPECIES_SEEL},
    {10, 30, SPECIES_SPINARAK},
    {10, 30, SPECIES_SKIPLOOM},
    {10, 30, SPECIES_SWINUB},
    {25, 30, SPECIES_NATU},
    {30, 35, SPECIES_KRABBY},
    {20, 25, SPECIES_CARVANHA},
    {35, 40, SPECIES_CHINCHOU},
    {40, 45, SPECIES_NUMEL},
};

const struct WildPokemonInfo gRoute120_FishingMonsInfo = {30, gRoute120_FishingMons};

const struct WildPokemon gRoute121_LandMons[] =
{
    {26, 26, SPECIES_MARILL},
    {26, 26, SPECIES_GULPIN},
    {26, 26, SPECIES_LANTURN},
    {28, 28, SPECIES_CARVANHA},
    {28, 28, SPECIES_TORKOAL},
    {26, 26, SPECIES_BELLSPROUT},
    {28, 28, SPECIES_TRAPINCH},
    {28, 28, SPECIES_NIDORINO},
    {26, 26, SPECIES_NUMEL},
    {27, 27, SPECIES_GOLDEEN},
    {28, 28, SPECIES_SLUGMA},
    {25, 25, SPECIES_TOGETIC},
};

const struct WildPokemonInfo gRoute121_LandMonsInfo = {20, gRoute121_LandMons};

const struct WildPokemon gRoute121_WaterMons[] =
{
    {5, 35, SPECIES_LILEEP},
    {10, 30, SPECIES_NINCADA},
    {15, 25, SPECIES_SMOOCHUM},
    {25, 30, SPECIES_MAWILE},
    {25, 30, SPECIES_HITMONTOP},
};

const struct WildPokemonInfo gRoute121_WaterMonsInfo = {4, gRoute121_WaterMons};

const struct WildPokemon gRoute121_FishingMons[] =
{
    {5, 10, SPECIES_ZIGZAGOON},
    {5, 10, SPECIES_MAGNEMITE},
    {10, 30, SPECIES_METAPOD},
    {10, 30, SPECIES_STARYU},
    {10, 30, SPECIES_IVYSAUR},
    {25, 30, SPECIES_SEADRA},
    {30, 35, SPECIES_MARSHTOMP},
    {20, 25, SPECIES_BAYLEEF},
    {35, 40, SPECIES_LILEEP},
    {40, 45, SPECIES_FLAAFFY},
};

const struct WildPokemonInfo gRoute121_FishingMonsInfo = {30, gRoute121_FishingMons};

const struct WildPokemon gRoute122_WaterMons[] =
{
    {5, 35, SPECIES_NUMEL},
    {10, 30, SPECIES_SHUPPET},
    {15, 25, SPECIES_MEOWTH},
    {25, 30, SPECIES_QWILFISH},
    {25, 30, SPECIES_ARBOK},
};

const struct WildPokemonInfo gRoute122_WaterMonsInfo = {4, gRoute122_WaterMons};

const struct WildPokemon gRoute122_FishingMons[] =
{
    {5, 10, SPECIES_SILCOON},
    {5, 10, SPECIES_STARYU},
    {10, 30, SPECIES_SWINUB},
    {10, 30, SPECIES_CACNEA},
    {10, 30, SPECIES_PORYGON},
    {30, 35, SPECIES_HYPNO},
    {30, 35, SPECIES_QUILAVA},
    {25, 30, SPECIES_LOUDRED},
    {35, 40, SPECIES_VIGOROTH},
    {40, 45, SPECIES_ANORITH},
};

const struct WildPokemonInfo gRoute122_FishingMonsInfo = {30, gRoute122_FishingMons};

const struct WildPokemon gRoute123_LandMons[] =
{
    {26, 26, SPECIES_FEEBAS},
    {26, 26, SPECIES_VULPIX},
    {26, 26, SPECIES_CORSOLA},
    {28, 28, SPECIES_SURSKIT},
    {28, 28, SPECIES_PLUSLE},
    {26, 26, SPECIES_SLAKOTH},
    {28, 28, SPECIES_BELLSPROUT},
    {28, 28, SPECIES_ONIX},
    {26, 26, SPECIES_BARBOACH},
    {27, 27, SPECIES_SPEAROW},
    {28, 28, SPECIES_PIKACHU},
    {25, 25, SPECIES_ABSOL},
};

const struct WildPokemonInfo gRoute123_LandMonsInfo = {20, gRoute123_LandMons};

const struct WildPokemon gRoute123_WaterMons[] =
{
    {5, 35, SPECIES_MEOWTH},
    {10, 30, SPECIES_SHELLDER},
    {15, 25, SPECIES_NATU},
    {25, 30, SPECIES_MEDICHAM},
    {25, 30, SPECIES_GLALIE},
};

const struct WildPokemonInfo gRoute123_WaterMonsInfo = {4, gRoute123_WaterMons};

const struct WildPokemon gRoute123_FishingMons[] =
{
    {5, 10, SPECIES_KAKUNA},
    {5, 10, SPECIES_SHUPPET},
    {10, 30, SPECIES_CASCOON},
    {10, 30, SPECIES_EKANS},
    {10, 30, SPECIES_METANG},
    {25, 30, SPECIES_PORYGON},
    {30, 35, SPECIES_COMBUSKEN},
    {20, 25, SPECIES_MACHOKE},
    {35, 40, SPECIES_ELEKID},
    {40, 45, SPECIES_GROWLITHE},
};

const struct WildPokemonInfo gRoute123_FishingMonsInfo = {30, gRoute123_FishingMons};

const struct WildPokemon gMtPyre_2F_LandMons[] =
{
    {27, 27, SPECIES_SEEL},
    {28, 28, SPECIES_GOLDEEN},
    {26, 26, SPECIES_SWABLU},
    {25, 25, SPECIES_MEOWTH},
    {29, 29, SPECIES_MARILL},
    {24, 24, SPECIES_EKANS},
    {23, 23, SPECIES_VULPIX},
    {22, 22, SPECIES_BARBOACH},
    {29, 29, SPECIES_GRIMER},
    {24, 24, SPECIES_SMOOCHUM},
    {29, 29, SPECIES_RHYHORN},
    {24, 24, SPECIES_KOFFING},
};

const struct WildPokemonInfo gMtPyre_2F_LandMonsInfo = {10, gMtPyre_2F_LandMons};

const struct WildPokemon gMtPyre_3F_LandMons[] =
{
    {27, 27, SPECIES_ELECTRIKE},
    {28, 28, SPECIES_PSYDUCK},
    {26, 26, SPECIES_HOOTHOOT},
    {25, 25, SPECIES_BALTOY},
    {29, 29, SPECIES_PIKACHU},
    {24, 24, SPECIES_GOLDEEN},
    {23, 23, SPECIES_GRIMER},
    {22, 22, SPECIES_SHELLDER},
    {29, 29, SPECIES_SKIPLOOM},
    {24, 24, SPECIES_CHINCHOU},
    {29, 29, SPECIES_VIBRAVA},
    {24, 24, SPECIES_DODUO},
};

const struct WildPokemonInfo gMtPyre_3F_LandMonsInfo = {10, gMtPyre_3F_LandMons};

const struct WildPokemon gMtPyre_4F_LandMons[] =
{
    {27, 27, SPECIES_SWINUB},
    {28, 28, SPECIES_WINGULL},
    {26, 26, SPECIES_GULPIN},
    {25, 25, SPECIES_KRABBY},
    {29, 29, SPECIES_ELECTRIKE},
    {24, 24, SPECIES_GRIMER},
    {23, 23, SPECIES_NUZLEAF},
    {22, 22, SPECIES_DIGLETT},
    {27, 27, SPECIES_DROWZEE},
    {27, 27, SPECIES_PIKACHU},
    {25, 25, SPECIES_EKANS},
    {29, 29, SPECIES_NATU},
};

const struct WildPokemonInfo gMtPyre_4F_LandMonsInfo = {10, gMtPyre_4F_LandMons};

const struct WildPokemon gMtPyre_5F_LandMons[] =
{
    {27, 27, SPECIES_MEDITITE},
    {28, 28, SPECIES_SEEL},
    {26, 26, SPECIES_SPOINK},
    {25, 25, SPECIES_BALTOY},
    {29, 29, SPECIES_SLUGMA},
    {24, 24, SPECIES_ELECTRIKE},
    {23, 23, SPECIES_GOLDEEN},
    {22, 22, SPECIES_DUSKULL},
    {27, 27, SPECIES_EXEGGCUTE},
    {27, 27, SPECIES_EEVEE},
    {25, 25, SPECIES_VULPIX},
    {29, 29, SPECIES_MANKEY},
};

const struct WildPokemonInfo gMtPyre_5F_LandMonsInfo = {10, gMtPyre_5F_LandMons};

const struct WildPokemon gMtPyre_6F_LandMons[] =
{
    {27, 27, SPECIES_KRABBY},
    {28, 28, SPECIES_REMORAID},
    {26, 26, SPECIES_SURSKIT},
    {25, 25, SPECIES_MEOWTH},
    {29, 29, SPECIES_CLAMPERL},
    {24, 24, SPECIES_MEDITITE},
    {23, 23, SPECIES_NUMEL},
    {22, 22, SPECIES_SHROOMISH},
    {27, 27, SPECIES_SMOOCHUM},
    {27, 27, SPECIES_HOUNDOUR},
    {25, 25, SPECIES_SKITTY},
    {29, 29, SPECIES_GRIMER},
};

const struct WildPokemonInfo gMtPyre_6F_LandMonsInfo = {10, gMtPyre_6F_LandMons};

const struct WildPokemon gMtPyre_Exterior_LandMons[] =
{
    {27, 27, SPECIES_PHANPY},
    {27, 27, SPECIES_VENONAT},
    {28, 28, SPECIES_SPEAROW},
    {29, 29, SPECIES_SEEL},
    {29, 29, SPECIES_SWABLU},
    {27, 27, SPECIES_TENTACOOL},
    {29, 29, SPECIES_JIGGLYPUFF},
    {25, 25, SPECIES_NUZLEAF},
    {27, 27, SPECIES_VULPIX},
    {27, 27, SPECIES_GOLDEEN},
    {26, 26, SPECIES_TAILLOW},
    {28, 28, SPECIES_DUSKULL},
};

const struct WildPokemonInfo gMtPyre_Exterior_LandMonsInfo = {10, gMtPyre_Exterior_LandMons};

const struct WildPokemon gMtPyre_Summit_LandMons[] =
{
    {28, 28, SPECIES_SNUBBULL},
    {29, 29, SPECIES_MEOWTH},
    {27, 27, SPECIES_LEDYBA},
    {26, 26, SPECIES_GULPIN},
    {30, 30, SPECIES_PSYDUCK},
    {25, 25, SPECIES_PINECO},
    {24, 24, SPECIES_MAGNEMITE},
    {28, 28, SPECIES_TENTACOOL},
    {26, 26, SPECIES_DIGLETT},
    {30, 30, SPECIES_CACNEA},
    {28, 28, SPECIES_MR_MIME},
    {28, 28, SPECIES_DELCATTY},
};

const struct WildPokemonInfo gMtPyre_Summit_LandMonsInfo = {10, gMtPyre_Summit_LandMons};

const struct WildPokemon gGraniteCave_StevensRoom_LandMons[] =
{
    {7, 7, SPECIES_SEEDOT},
    {8, 8, SPECIES_SPINARAK},
    {7, 7, SPECIES_WYNAUT},
    {8, 8, SPECIES_PICHU},
    {9, 9, SPECIES_CASCOON},
    {8, 8, SPECIES_NIDORAN_F},
    {10, 10, SPECIES_PARAS},
    {6, 6, SPECIES_MARILL},
    {7, 7, SPECIES_BULBASAUR},
    {8, 8, SPECIES_CHIKORITA},
    {7, 7, SPECIES_ABRA},
    {8, 8, SPECIES_CYNDAQUIL},
};

const struct WildPokemonInfo gGraniteCave_StevensRoom_LandMonsInfo = {10, gGraniteCave_StevensRoom_LandMons};

const struct WildPokemon gRoute125_WaterMons[] =
{
    {5, 35, SPECIES_SHROOMISH},
    {10, 30, SPECIES_VULPIX},
    {15, 25, SPECIES_TOGEPI},
    {25, 30, SPECIES_FURRET},
    {25, 30, SPECIES_MAWILE},
};

const struct WildPokemonInfo gRoute125_WaterMonsInfo = {4, gRoute125_WaterMons};

const struct WildPokemon gRoute125_FishingMons[] =
{
    {5, 10, SPECIES_TOGEPI},
    {5, 10, SPECIES_CUBONE},
    {10, 30, SPECIES_SLUGMA},
    {10, 30, SPECIES_POLIWHIRL},
    {10, 30, SPECIES_HAUNTER},
    {30, 35, SPECIES_FURRET},
    {30, 35, SPECIES_MARSHTOMP},
    {25, 30, SPECIES_COMBUSKEN},
    {35, 40, SPECIES_SEADRA},
    {40, 45, SPECIES_PUPITAR},
};

const struct WildPokemonInfo gRoute125_FishingMonsInfo = {30, gRoute125_FishingMons};

const struct WildPokemon gRoute126_WaterMons[] =
{
    {5, 35, SPECIES_SNUBBULL},
    {10, 30, SPECIES_DIGLETT},
    {15, 25, SPECIES_GULPIN},
    {25, 30, SPECIES_PILOSWINE},
    {25, 30, SPECIES_DUSCLOPS},
};

const struct WildPokemonInfo gRoute126_WaterMonsInfo = {4, gRoute126_WaterMons};

const struct WildPokemon gRoute126_FishingMons[] =
{
    {5, 10, SPECIES_TOGEPI},
    {5, 10, SPECIES_CACNEA},
    {10, 30, SPECIES_SPINARAK},
    {10, 30, SPECIES_SANDSHREW},
    {10, 30, SPECIES_GROVYLE},
    {30, 35, SPECIES_SKARMORY},
    {30, 35, SPECIES_BAYLEEF},
    {25, 30, SPECIES_PUPITAR},
    {35, 40, SPECIES_PONYTA},
    {40, 45, SPECIES_VIGOROTH},
};

const struct WildPokemonInfo gRoute126_FishingMonsInfo = {30, gRoute126_FishingMons};

const struct WildPokemon gRoute127_WaterMons[] =
{
    {5, 35, SPECIES_CHINCHOU},
    {10, 30, SPECIES_SNUBBULL},
    {15, 25, SPECIES_DIGLETT},
    {25, 30, SPECIES_MAWILE},
    {25, 30, SPECIES_SOLROCK},
};

const struct WildPokemonInfo gRoute127_WaterMonsInfo = {4, gRoute127_WaterMons};

const struct WildPokemon gRoute127_FishingMons[] =
{
    {5, 10, SPECIES_CASCOON},
    {5, 10, SPECIES_PSYDUCK},
    {10, 30, SPECIES_MAKUHITA},
    {10, 30, SPECIES_SANDSHREW},
    {10, 30, SPECIES_LILEEP},
    {30, 35, SPECIES_GLALIE},
    {30, 35, SPECIES_LOUDRED},
    {25, 30, SPECIES_HAUNTER},
    {35, 40, SPECIES_ELEKID},
    {40, 45, SPECIES_WEEPINBELL},
};

const struct WildPokemonInfo gRoute127_FishingMonsInfo = {30, gRoute127_FishingMons};

const struct WildPokemon gRoute128_WaterMons[] =
{
    {5, 35, SPECIES_ELEKID},
    {10, 30, SPECIES_EKANS},
    {15, 25, SPECIES_SNUBBULL},
    {25, 30, SPECIES_BELLOSSOM},
    {25, 30, SPECIES_LICKITUNG},
};

const struct WildPokemonInfo gRoute128_WaterMonsInfo = {4, gRoute128_WaterMons};

const struct WildPokemon gRoute128_FishingMons[] =
{
    {5, 10, SPECIES_ZIGZAGOON},
    {5, 10, SPECIES_NUZLEAF},
    {10, 30, SPECIES_SENTRET},
    {10, 30, SPECIES_UNOWN},
    {10, 30, SPECIES_DRAGONAIR},
    {30, 35, SPECIES_DELIBIRD},
    {30, 35, SPECIES_VIGOROTH},
    {30, 35, SPECIES_PLUSLE},
    {35, 40, SPECIES_CHARMELEON},
    {40, 45, SPECIES_ONIX},
};

const struct WildPokemonInfo gRoute128_FishingMonsInfo = {30, gRoute128_FishingMons};

const struct WildPokemon gRoute129_WaterMons[] =
{
    {5, 35, SPECIES_NIDORINA},
    {10, 30, SPECIES_SPINARAK},
    {15, 25, SPECIES_SWINUB},
    {25, 30, SPECIES_SNEASEL},
    {25, 30, SPECIES_SWALOT},
};

const struct WildPokemonInfo gRoute129_WaterMonsInfo = {4, gRoute129_WaterMons};

const struct WildPokemon gRoute129_FishingMons[] =
{
    {5, 10, SPECIES_SWINUB},
    {5, 10, SPECIES_SHELLDER},
    {10, 30, SPECIES_SPINARAK},
    {10, 30, SPECIES_CARVANHA},
    {10, 30, SPECIES_SEALEO},
    {30, 35, SPECIES_GRUMPIG},
    {30, 35, SPECIES_MAGBY},
    {25, 30, SPECIES_COMBUSKEN},
    {35, 40, SPECIES_OMANYTE},
    {40, 45, SPECIES_KABUTO},
};

const struct WildPokemonInfo gRoute129_FishingMonsInfo = {30, gRoute129_FishingMons};

const struct WildPokemon gRoute130_LandMons[] =
{
    {30, 30, SPECIES_LEDYBA},
    {35, 35, SPECIES_TYROGUE},
    {25, 25, SPECIES_SENTRET},
    {40, 40, SPECIES_SPEAROW},
    {20, 20, SPECIES_SPINARAK},
    {45, 45, SPECIES_DUSKULL},
    {15, 15, SPECIES_PIKACHU},
    {50, 50, SPECIES_EKANS},
    {10, 10, SPECIES_WINGULL},
    {5, 5, SPECIES_RATTATA},
    {10, 10, SPECIES_MAKUHITA},
    {5, 5, SPECIES_SANDSHREW},
};

const struct WildPokemonInfo gRoute130_LandMonsInfo = {20, gRoute130_LandMons};

const struct WildPokemon gRoute130_WaterMons[] =
{
    {5, 35, SPECIES_PARAS},
    {10, 30, SPECIES_EKANS},
    {15, 25, SPECIES_POOCHYENA},
    {25, 30, SPECIES_MURKROW},
    {25, 30, SPECIES_PERSIAN},
};

const struct WildPokemonInfo gRoute130_WaterMonsInfo = {4, gRoute130_WaterMons};

const struct WildPokemon gRoute130_FishingMons[] =
{
    {5, 10, SPECIES_SWINUB},
    {5, 10, SPECIES_SNUBBULL},
    {10, 30, SPECIES_ZIGZAGOON},
    {10, 30, SPECIES_DROWZEE},
    {10, 30, SPECIES_SEADRA},
    {30, 35, SPECIES_ARMALDO},
    {30, 35, SPECIES_PORYGON},
    {25, 30, SPECIES_VIGOROTH},
    {35, 40, SPECIES_CHARMELEON},
    {40, 45, SPECIES_FLAAFFY},
};

const struct WildPokemonInfo gRoute130_FishingMonsInfo = {30, gRoute130_FishingMons};

const struct WildPokemon gRoute131_WaterMons[] =
{
    {5, 35, SPECIES_CORPHISH},
    {10, 30, SPECIES_SLOWPOKE},
    {15, 25, SPECIES_MARILL},
    {28, 30, SPECIES_PLUSLE},
    {25, 30, SPECIES_MAGNETON},
};

const struct WildPokemonInfo gRoute131_WaterMonsInfo = {4, gRoute131_WaterMons};

const struct WildPokemon gRoute131_FishingMons[] =
{
    {5, 10, SPECIES_FEEBAS},
    {5, 10, SPECIES_SHELLDER},
    {10, 30, SPECIES_SPINARAK},
    {10, 30, SPECIES_DROWZEE},
    {10, 30, SPECIES_CHANSEY},
    {30, 35, SPECIES_HOUNDOOM},
    {30, 35, SPECIES_LILEEP},
    {25, 30, SPECIES_ONIX},
    {35, 40, SPECIES_QUILAVA},
    {40, 45, SPECIES_COMBUSKEN},
};

const struct WildPokemonInfo gRoute131_FishingMonsInfo = {30, gRoute131_FishingMons};

const struct WildPokemon gRoute132_WaterMons[] =
{
    {5, 35, SPECIES_DODUO},
    {10, 30, SPECIES_JIGGLYPUFF},
    {15, 25, SPECIES_EKANS},
    {25, 30, SPECIES_MIGHTYENA},
    {25, 30, SPECIES_LICKITUNG},
};

const struct WildPokemonInfo gRoute132_WaterMonsInfo = {4, gRoute132_WaterMons};

const struct WildPokemon gRoute132_FishingMons[] =
{
    {5, 10, SPECIES_SPINARAK},
    {5, 10, SPECIES_NUMEL},
    {10, 30, SPECIES_TYROGUE},
    {10, 30, SPECIES_SNUBBULL},
    {10, 30, SPECIES_SEADRA},
    {30, 35, SPECIES_SCIZOR},
    {30, 35, SPECIES_QUILAVA},
    {25, 30, SPECIES_DRATINI},
    {35, 40, SPECIES_PORYGON},
    {40, 45, SPECIES_METANG},
};

const struct WildPokemonInfo gRoute132_FishingMonsInfo = {30, gRoute132_FishingMons};

const struct WildPokemon gRoute133_WaterMons[] =
{
    {5, 35, SPECIES_GULPIN},
    {10, 30, SPECIES_DUSKULL},
    {15, 25, SPECIES_DODUO},
    {25, 30, SPECIES_OCTILLERY},
    {25, 30, SPECIES_SNEASEL},
};

const struct WildPokemonInfo gRoute133_WaterMonsInfo = {4, gRoute133_WaterMons};

const struct WildPokemon gRoute133_FishingMons[] =
{
    {5, 10, SPECIES_SENTRET},
    {5, 10, SPECIES_SMOOCHUM},
    {10, 30, SPECIES_SWINUB},
    {10, 30, SPECIES_ELECTRIKE},
    {10, 30, SPECIES_WEEPINBELL},
    {30, 35, SPECIES_KECLEON},
    {30, 35, SPECIES_VIGOROTH},
    {25, 30, SPECIES_PIDGEY},
    {35, 40, SPECIES_SEADRA},
    {40, 45, SPECIES_MAGBY},
};

const struct WildPokemonInfo gRoute133_FishingMonsInfo = {30, gRoute133_FishingMons};

const struct WildPokemon gRoute134_WaterMons[] =
{
    {5, 35, SPECIES_KRABBY},
    {10, 30, SPECIES_PIKACHU},
    {15, 25, SPECIES_BALTOY},
    {25, 30, SPECIES_VOLBEAT},
    {25, 30, SPECIES_CORSOLA},
};

const struct WildPokemonInfo gRoute134_WaterMonsInfo = {4, gRoute134_WaterMons};

const struct WildPokemon gRoute134_FishingMons[] =
{
    {5, 10, SPECIES_TYROGUE},
    {5, 10, SPECIES_SANDSHREW},
    {10, 30, SPECIES_TOGEPI},
    {10, 30, SPECIES_CACNEA},
    {10, 30, SPECIES_SEALEO},
    {30, 35, SPECIES_CHIMECHO},
    {30, 35, SPECIES_CHANSEY},
    {25, 30, SPECIES_GEODUDE},
    {35, 40, SPECIES_ONIX},
    {40, 45, SPECIES_WARTORTLE},
};

const struct WildPokemonInfo gRoute134_FishingMonsInfo = {30, gRoute134_FishingMons};

const struct WildPokemon gAbandonedShip_HiddenFloorCorridors_WaterMons[] =
{
    {5, 35, SPECIES_SMOOCHUM},
    {5, 35, SPECIES_EKANS},
    {5, 35, SPECIES_FLAAFFY},
    {5, 35, SPECIES_EEVEE},
    {30, 35, SPECIES_MANTINE},
};

const struct WildPokemonInfo gAbandonedShip_HiddenFloorCorridors_WaterMonsInfo = {4, gAbandonedShip_HiddenFloorCorridors_WaterMons};

const struct WildPokemon gAbandonedShip_HiddenFloorCorridors_FishingMons[] =
{
    {5, 10, SPECIES_SENTRET},
    {5, 10, SPECIES_LOMBRE},
    {10, 30, SPECIES_SLUGMA},
    {10, 30, SPECIES_NUZLEAF},
    {10, 30, SPECIES_SNUBBULL},
    {25, 30, SPECIES_BARBOACH},
    {30, 35, SPECIES_SHELLDER},
    {30, 35, SPECIES_TAUROS},
    {25, 30, SPECIES_VENUSAUR},
    {20, 25, SPECIES_GOLDUCK},
};

const struct WildPokemonInfo gAbandonedShip_HiddenFloorCorridors_FishingMonsInfo = {20, gAbandonedShip_HiddenFloorCorridors_FishingMons};

const struct WildPokemon gSeafloorCavern_Room1_LandMons[] =
{
    {30, 30, SPECIES_HORSEA},
    {31, 31, SPECIES_WEEDLE},
    {32, 32, SPECIES_MAREEP},
    {33, 33, SPECIES_NIDORAN_F},
    {28, 28, SPECIES_CATERPIE},
    {29, 29, SPECIES_LOTAD},
    {34, 34, SPECIES_WHISMUR},
    {35, 35, SPECIES_TRAPINCH},
    {34, 34, SPECIES_MACHOKE},
    {35, 35, SPECIES_CROCONAW},
    {33, 33, SPECIES_VIGOROTH},
    {36, 36, SPECIES_SHELGON},
};

const struct WildPokemonInfo gSeafloorCavern_Room1_LandMonsInfo = {4, gSeafloorCavern_Room1_LandMons};

const struct WildPokemon gSeafloorCavern_Room2_LandMons[] =
{
    {30, 30, SPECIES_SEEDOT},
    {31, 31, SPECIES_WHISMUR},
    {32, 32, SPECIES_MAREEP},
    {33, 33, SPECIES_TRAPINCH},
    {28, 28, SPECIES_HORSEA},
    {29, 29, SPECIES_NIDORAN_F},
    {34, 34, SPECIES_WEEDLE},
    {35, 35, SPECIES_LOTAD},
    {34, 34, SPECIES_DRAGONAIR},
    {35, 35, SPECIES_PUPITAR},
    {33, 33, SPECIES_CROCONAW},
    {36, 36, SPECIES_CHARMELEON},
};

const struct WildPokemonInfo gSeafloorCavern_Room2_LandMonsInfo = {4, gSeafloorCavern_Room2_LandMons};

const struct WildPokemon gSeafloorCavern_Room3_LandMons[] =
{
    {30, 30, SPECIES_WURMPLE},
    {31, 31, SPECIES_LOTAD},
    {32, 32, SPECIES_PICHU},
    {33, 33, SPECIES_WHISMUR},
    {28, 28, SPECIES_CLEFFA},
    {29, 29, SPECIES_SLAKOTH},
    {34, 34, SPECIES_HORSEA},
    {35, 35, SPECIES_NIDORAN_F},
    {34, 34, SPECIES_GROVYLE},
    {35, 35, SPECIES_IVYSAUR},
    {33, 33, SPECIES_SHELGON},
    {36, 36, SPECIES_MACHOKE},
};

const struct WildPokemonInfo gSeafloorCavern_Room3_LandMonsInfo = {4, gSeafloorCavern_Room3_LandMons};

const struct WildPokemon gSeafloorCavern_Room4_LandMons[] =
{
    {30, 30, SPECIES_PIDGEY},
    {31, 31, SPECIES_IGGLYBUFF},
    {32, 32, SPECIES_WEEDLE},
    {33, 33, SPECIES_CATERPIE},
    {28, 28, SPECIES_TRAPINCH},
    {29, 29, SPECIES_RALTS},
    {34, 34, SPECIES_SPHEAL},
    {35, 35, SPECIES_HORSEA},
    {34, 34, SPECIES_QUILAVA},
    {35, 35, SPECIES_MARSHTOMP},
    {33, 33, SPECIES_BAYLEEF},
    {36, 36, SPECIES_IVYSAUR},
};

const struct WildPokemonInfo gSeafloorCavern_Room4_LandMonsInfo = {4, gSeafloorCavern_Room4_LandMons};

const struct WildPokemon gSeafloorCavern_Room5_LandMons[] =
{
    {30, 30, SPECIES_TRAPINCH},
    {31, 31, SPECIES_PIDGEY},
    {32, 32, SPECIES_IGGLYBUFF},
    {33, 33, SPECIES_SLAKOTH},
    {28, 28, SPECIES_WHISMUR},
    {29, 29, SPECIES_NIDORAN_F},
    {34, 34, SPECIES_WEEDLE},
    {35, 35, SPECIES_SPHEAL},
    {34, 34, SPECIES_VIGOROTH},
    {35, 35, SPECIES_HAUNTER},
    {33, 33, SPECIES_MARSHTOMP},
    {36, 36, SPECIES_SHELGON},
};

const struct WildPokemonInfo gSeafloorCavern_Room5_LandMonsInfo = {4, gSeafloorCavern_Room5_LandMons};

const struct WildPokemon gSeafloorCavern_Room6_LandMons[] =
{
    {30, 30, SPECIES_TRAPINCH},
    {31, 31, SPECIES_MAREEP},
    {32, 32, SPECIES_NIDORAN_M},
    {33, 33, SPECIES_PIDGEY},
    {28, 28, SPECIES_WEEDLE},
    {29, 29, SPECIES_PICHU},
    {34, 34, SPECIES_SLAKOTH},
    {35, 35, SPECIES_WURMPLE},
    {34, 34, SPECIES_PUPITAR},
    {35, 35, SPECIES_HAUNTER},
    {33, 33, SPECIES_DRAGONAIR},
    {36, 36, SPECIES_WARTORTLE},
};

const struct WildPokemonInfo gSeafloorCavern_Room6_LandMonsInfo = {4, gSeafloorCavern_Room6_LandMons};

const struct WildPokemon gSeafloorCavern_Room6_WaterMons[] =
{
    {5, 35, SPECIES_VIBRAVA},
    {5, 35, SPECIES_IGGLYBUFF},
    {30, 35, SPECIES_NIDORAN_F},
    {30, 35, SPECIES_VIGOROTH},
    {30, 35, SPECIES_QUILAVA},
};

const struct WildPokemonInfo gSeafloorCavern_Room6_WaterMonsInfo = {4, gSeafloorCavern_Room6_WaterMons};

const struct WildPokemon gSeafloorCavern_Room6_FishingMons[] =
{
    {5, 10, SPECIES_MARILL},
    {5, 10, SPECIES_MANKEY},
    {10, 30, SPECIES_CASCOON},
    {10, 30, SPECIES_SEEL},
    {10, 30, SPECIES_WEEPINBELL},
    {25, 30, SPECIES_FLAAFFY},
    {30, 35, SPECIES_IVYSAUR},
    {20, 25, SPECIES_LOUDRED},
    {35, 40, SPECIES_CROCONAW},
    {40, 45, SPECIES_ELEKID},
};

const struct WildPokemonInfo gSeafloorCavern_Room6_FishingMonsInfo = {10, gSeafloorCavern_Room6_FishingMons};

const struct WildPokemon gSeafloorCavern_Room7_LandMons[] =
{
    {30, 30, SPECIES_HOPPIP},
    {31, 31, SPECIES_NIDORAN_M},
    {32, 32, SPECIES_SPHEAL},
    {33, 33, SPECIES_PICHU},
    {28, 28, SPECIES_WEEDLE},
    {29, 29, SPECIES_NIDORAN_F},
    {34, 34, SPECIES_CATERPIE},
    {35, 35, SPECIES_PIDGEY},
    {34, 34, SPECIES_LAIRON},
    {35, 35, SPECIES_SHELGON},
    {33, 33, SPECIES_BAYLEEF},
    {36, 36, SPECIES_SCYTHER},
};

const struct WildPokemonInfo gSeafloorCavern_Room7_LandMonsInfo = {4, gSeafloorCavern_Room7_LandMons};

const struct WildPokemon gSeafloorCavern_Room7_WaterMons[] =
{
    {5, 35, SPECIES_VENONAT},
    {5, 35, SPECIES_PIDGEY},
    {30, 35, SPECIES_WEEDLE},
    {30, 35, SPECIES_IVYSAUR},
    {30, 35, SPECIES_METANG},
};

const struct WildPokemonInfo gSeafloorCavern_Room7_WaterMonsInfo = {4, gSeafloorCavern_Room7_WaterMons};

const struct WildPokemon gSeafloorCavern_Room7_FishingMons[] =
{
    {5, 10, SPECIES_MARILL},
    {5, 10, SPECIES_EXEGGCUTE},
    {10, 30, SPECIES_SLUGMA},
    {10, 30, SPECIES_PHANPY},
    {10, 30, SPECIES_LAIRON},
    {25, 30, SPECIES_SHELGON},
    {30, 35, SPECIES_MARSHTOMP},
    {20, 25, SPECIES_BAYLEEF},
    {35, 40, SPECIES_NIDORINO},
    {40, 45, SPECIES_FLAAFFY},
};

const struct WildPokemonInfo gSeafloorCavern_Room7_FishingMonsInfo = {10, gSeafloorCavern_Room7_FishingMons};

const struct WildPokemon gSeafloorCavern_Room8_LandMons[] =
{
    {30, 30, SPECIES_IGGLYBUFF},
    {31, 31, SPECIES_SPHEAL},
    {32, 32, SPECIES_CLEFFA},
    {33, 33, SPECIES_WHISMUR},
    {28, 28, SPECIES_NIDORAN_F},
    {29, 29, SPECIES_RALTS},
    {34, 34, SPECIES_TRAPINCH},
    {35, 35, SPECIES_LOTAD},
    {34, 34, SPECIES_SEADRA},
    {35, 35, SPECIES_IVYSAUR},
    {33, 33, SPECIES_VIGOROTH},
    {36, 36, SPECIES_SHELGON},
};

const struct WildPokemonInfo gSeafloorCavern_Room8_LandMonsInfo = {4, gSeafloorCavern_Room8_LandMons};

const struct WildPokemon gSeafloorCavern_Entrance_WaterMons[] =
{
    {5, 35, SPECIES_GULPIN},
    {5, 35, SPECIES_PICHU},
    {30, 35, SPECIES_SEEDOT},
    {30, 35, SPECIES_CHANSEY},
    {30, 35, SPECIES_IVYSAUR},
};

const struct WildPokemonInfo gSeafloorCavern_Entrance_WaterMonsInfo = {4, gSeafloorCavern_Entrance_WaterMons};

const struct WildPokemon gSeafloorCavern_Entrance_FishingMons[] =
{
    {5, 10, SPECIES_SPINARAK},
    {5, 10, SPECIES_SLOWPOKE},
    {10, 30, SPECIES_METAPOD},
    {10, 30, SPECIES_EEVEE},
    {10, 30, SPECIES_SHELGON},
    {25, 30, SPECIES_NIDORINO},
    {30, 35, SPECIES_GLOOM},
    {20, 25, SPECIES_WEEPINBELL},
    {35, 40, SPECIES_CHARMELEON},
    {40, 45, SPECIES_SEALEO},
};

const struct WildPokemonInfo gSeafloorCavern_Entrance_FishingMonsInfo = {10, gSeafloorCavern_Entrance_FishingMons};

const struct WildPokemon gCaveOfOrigin_Entrance_LandMons[] =
{
    {30, 30, SPECIES_PIDGEY},
    {31, 31, SPECIES_WEEDLE},
    {32, 32, SPECIES_HORSEA},
    {33, 33, SPECIES_IGGLYBUFF},
    {28, 28, SPECIES_LOTAD},
    {29, 29, SPECIES_PICHU},
    {34, 34, SPECIES_WURMPLE},
    {35, 35, SPECIES_TRAPINCH},
    {34, 34, SPECIES_BAYLEEF},
    {35, 35, SPECIES_IVYSAUR},
    {33, 33, SPECIES_CHARMELEON},
    {36, 36, SPECIES_SEALEO},
};

const struct WildPokemonInfo gCaveOfOrigin_Entrance_LandMonsInfo = {4, gCaveOfOrigin_Entrance_LandMons};

const struct WildPokemon gCaveOfOrigin_1F_LandMons[] =
{
    {30, 30, SPECIES_HORSEA},
    {31, 31, SPECIES_PICHU},
    {32, 32, SPECIES_PIDGEY},
    {30, 30, SPECIES_LEDIAN},
    {32, 32, SPECIES_LUVDISC},
    {34, 34, SPECIES_MAWILE},
    {33, 33, SPECIES_SEEDOT},
    {34, 34, SPECIES_NIDORAN_M},
    {34, 34, SPECIES_SEADRA},
    {35, 35, SPECIES_MACHOKE},
    {33, 33, SPECIES_PUPITAR},
    {36, 36, SPECIES_HAUNTER},
};

const struct WildPokemonInfo gCaveOfOrigin_1F_LandMonsInfo = {4, gCaveOfOrigin_1F_LandMons};

const struct WildPokemon gCaveOfOrigin_UnusedRubySapphireMap1_LandMons[] =
{
    {30, 30, SPECIES_CLEFFA},
    {31, 31, SPECIES_RALTS},
    {32, 32, SPECIES_TRAPINCH},
    {30, 30, SPECIES_WIGGLYTUFF},
    {32, 32, SPECIES_LICKITUNG},
    {34, 34, SPECIES_DUNSPARCE},
    {33, 33, SPECIES_NIDORAN_M},
    {34, 34, SPECIES_WHISMUR},
    {34, 34, SPECIES_COMBUSKEN},
    {35, 35, SPECIES_SCYTHER},
    {33, 33, SPECIES_CHANSEY},
    {36, 36, SPECIES_VIGOROTH},
};

const struct WildPokemonInfo gCaveOfOrigin_UnusedRubySapphireMap1_LandMonsInfo = {4, gCaveOfOrigin_UnusedRubySapphireMap1_LandMons};

const struct WildPokemon gCaveOfOrigin_UnusedRubySapphireMap2_LandMons[] =
{
    {30, 30, SPECIES_WEEDLE},
    {31, 31, SPECIES_IGGLYBUFF},
    {32, 32, SPECIES_TRAPINCH},
    {30, 30, SPECIES_DUGTRIO},
    {32, 32, SPECIES_WIGGLYTUFF},
    {34, 34, SPECIES_MAWILE},
    {33, 33, SPECIES_MAREEP},
    {34, 34, SPECIES_WHISMUR},
    {34, 34, SPECIES_VIGOROTH},
    {35, 35, SPECIES_METANG},
    {33, 33, SPECIES_WARTORTLE},
    {36, 36, SPECIES_SEALEO},
};

const struct WildPokemonInfo gCaveOfOrigin_UnusedRubySapphireMap2_LandMonsInfo = {4, gCaveOfOrigin_UnusedRubySapphireMap2_LandMons};

const struct WildPokemon gCaveOfOrigin_UnusedRubySapphireMap3_LandMons[] =
{
    {30, 30, SPECIES_PIDGEY},
    {31, 31, SPECIES_CLEFFA},
    {32, 32, SPECIES_HORSEA},
    {30, 30, SPECIES_MASQUERAIN},
    {32, 32, SPECIES_RATICATE},
    {34, 34, SPECIES_CHIMECHO},
    {33, 33, SPECIES_WURMPLE},
    {34, 34, SPECIES_NIDORAN_F},
    {34, 34, SPECIES_COMBUSKEN},
    {35, 35, SPECIES_DRAGONAIR},
    {33, 33, SPECIES_METANG},
    {36, 36, SPECIES_MARSHTOMP},
};

const struct WildPokemonInfo gCaveOfOrigin_UnusedRubySapphireMap3_LandMonsInfo = {4, gCaveOfOrigin_UnusedRubySapphireMap3_LandMons};

const struct WildPokemon gNewMauville_Entrance_LandMons[] =
{
    {24, 24, SPECIES_SANDSHREW},
    {24, 24, SPECIES_CACNEA},
    {25, 25, SPECIES_ELECTRIKE},
    {25, 25, SPECIES_HOUNDOUR},
    {23, 23, SPECIES_TEDDIURSA},
    {23, 23, SPECIES_GROWLITHE},
    {26, 26, SPECIES_VIBRAVA},
    {26, 26, SPECIES_SHROOMISH},
    {22, 22, SPECIES_MAGBY},
    {22, 22, SPECIES_VULPIX},
    {22, 22, SPECIES_KABUTO},
    {22, 22, SPECIES_GULPIN},
};

const struct WildPokemonInfo gNewMauville_Entrance_LandMonsInfo = {10, gNewMauville_Entrance_LandMons};

const struct WildPokemon gSafariZone_Southwest_LandMons[] =
{
    {25, 25, SPECIES_HORSEA},
    {27, 27, SPECIES_NIDORAN_F},
    {25, 25, SPECIES_MANTINE},
    {27, 27, SPECIES_HARIYAMA},
    {25, 25, SPECIES_TENTACOOL},
    {27, 27, SPECIES_OMANYTE},
    {25, 25, SPECIES_PORYGON},
    {27, 27, SPECIES_GRANBULL},
    {25, 25, SPECIES_BALTOY},
    {27, 27, SPECIES_YANMA},
    {27, 27, SPECIES_KIRLIA},
    {29, 29, SPECIES_BUTTERFREE},
};

const struct WildPokemonInfo gSafariZone_Southwest_LandMonsInfo = {25, gSafariZone_Southwest_LandMons};

const struct WildPokemon gSafariZone_Southwest_WaterMons[] =
{
    {20, 30, SPECIES_NATU},
    {20, 30, SPECIES_BALTOY},
    {30, 35, SPECIES_OMANYTE},
    {30, 35, SPECIES_SNORUNT},
    {30, 35, SPECIES_GRIMER},
};

const struct WildPokemonInfo gSafariZone_Southwest_WaterMonsInfo = {9, gSafariZone_Southwest_WaterMons};

const struct WildPokemon gSafariZone_Southwest_FishingMons[] =
{
    {5, 10, SPECIES_WOOPER},
    {5, 10, SPECIES_SLOWPOKE},
    {10, 30, SPECIES_TYROGUE},
    {10, 25, SPECIES_MEDITITE},
    {10, 30, SPECIES_TENTACOOL},
    {25, 30, SPECIES_KOFFING},
    {30, 35, SPECIES_RHYHORN},
    {30, 35, SPECIES_FORRETRESS},
    {35, 40, SPECIES_ELECTRODE},
    {25, 30, SPECIES_VICTREEBEL},
};

const struct WildPokemonInfo gSafariZone_Southwest_FishingMonsInfo = {35, gSafariZone_Southwest_FishingMons};

const struct WildPokemon gSafariZone_North_LandMons[] =
{
    {27, 27, SPECIES_GROWLITHE},
    {27, 27, SPECIES_MUDKIP},
    {29, 29, SPECIES_SANDSHREW},
    {29, 29, SPECIES_HORSEA},
    {27, 27, SPECIES_GRIMER},
    {29, 29, SPECIES_METANG},
    {31, 31, SPECIES_GROVYLE},
    {29, 29, SPECIES_LOMBRE},
    {29, 29, SPECIES_SEAKING},
    {27, 27, SPECIES_HOUNDOOM},
    {31, 31, SPECIES_VENOMOTH},
    {29, 29, SPECIES_RAICHU},
};

const struct WildPokemonInfo gSafariZone_North_LandMonsInfo = {25, gSafariZone_North_LandMons};

const struct WildPokemon gSafariZone_North_RockSmashMons[] =
{
    {10, 15, SPECIES_ARON},
    {5, 10, SPECIES_HORSEA},
    {15, 20, SPECIES_MUDKIP},
    {20, 25, SPECIES_LARVITAR},
    {25, 30, SPECIES_PIDGEY},
};

const struct WildPokemonInfo gSafariZone_North_RockSmashMonsInfo = {25, gSafariZone_North_RockSmashMons};

const struct WildPokemon gSafariZone_Northwest_LandMons[] =
{
    {27, 27, SPECIES_NIDORINA},
    {27, 27, SPECIES_BULBASAUR},
    {29, 29, SPECIES_VOLTORB},
    {29, 29, SPECIES_CYNDAQUIL},
    {27, 27, SPECIES_PHANPY},
    {29, 29, SPECIES_RHYHORN},
    {31, 31, SPECIES_CHARMELEON},
    {29, 29, SPECIES_GROWLITHE},
    {29, 29, SPECIES_SHIFTRY},
    {27, 27, SPECIES_TENTACRUEL},
    {31, 31, SPECIES_MEDICHAM},
    {29, 29, SPECIES_BANETTE},
};

const struct WildPokemonInfo gSafariZone_Northwest_LandMonsInfo = {25, gSafariZone_Northwest_LandMons};

const struct WildPokemon gSafariZone_Northwest_WaterMons[] =
{
    {20, 30, SPECIES_SNUBBULL},
    {20, 30, SPECIES_MANKEY},
    {30, 35, SPECIES_TENTACOOL},
    {30, 35, SPECIES_GIRAFARIG},
    {25, 40, SPECIES_GENGAR},
};

const struct WildPokemonInfo gSafariZone_Northwest_WaterMonsInfo = {9, gSafariZone_Northwest_WaterMons};

const struct WildPokemon gSafariZone_Northwest_FishingMons[] =
{
    {5, 10, SPECIES_SPINARAK},
    {5, 10, SPECIES_SHROOMISH},
    {10, 30, SPECIES_METAPOD},
    {10, 25, SPECIES_NIDORINO},
    {10, 30, SPECIES_REMORAID},
    {25, 30, SPECIES_CARVANHA},
    {30, 35, SPECIES_PIDGEOTTO},
    {30, 35, SPECIES_MILTANK},
    {35, 40, SPECIES_SEVIPER},
    {25, 30, SPECIES_ABSOL},
};

const struct WildPokemonInfo gSafariZone_Northwest_FishingMonsInfo = {35, gSafariZone_Northwest_FishingMons};

const struct WildPokemon gVictoryRoad_B1F_LandMons[] =
{
    {40, 40, SPECIES_WARTORTLE},
    {40, 40, SPECIES_PINSIR},
    {40, 40, SPECIES_CROCONAW},
    {40, 40, SPECIES_GLOOM},
    {38, 38, SPECIES_VIGOROTH},
    {38, 38, SPECIES_SKARMORY},
    {42, 42, SPECIES_SEALEO},
    {42, 42, SPECIES_LUNATONE},
    {42, 42, SPECIES_MACHOKE},
    {38, 38, SPECIES_BUTTERFREE},
    {42, 42, SPECIES_WAILMER},
    {38, 38, SPECIES_PLUSLE},
};

const struct WildPokemonInfo gVictoryRoad_B1F_LandMonsInfo = {10, gVictoryRoad_B1F_LandMons};

const struct WildPokemon gVictoryRoad_B1F_RockSmashMons[] =
{
    {30, 40, SPECIES_SEALEO},
    {30, 40, SPECIES_HOPPIP},
    {35, 40, SPECIES_QUILAVA},
    {35, 40, SPECIES_POLIWHIRL},
    {35, 40, SPECIES_VIGOROTH},
};

const struct WildPokemonInfo gVictoryRoad_B1F_RockSmashMonsInfo = {20, gVictoryRoad_B1F_RockSmashMons};

const struct WildPokemon gVictoryRoad_B2F_LandMons[] =
{
    {40, 40, SPECIES_WARTORTLE},
    {40, 40, SPECIES_QUAGSIRE},
    {40, 40, SPECIES_GLOOM},
    {40, 40, SPECIES_GROVYLE},
    {42, 42, SPECIES_CHARMELEON},
    {42, 42, SPECIES_DELIBIRD},
    {44, 44, SPECIES_SEALEO},
    {44, 44, SPECIES_SUNFLORA},
    {42, 42, SPECIES_QUILAVA},
    {42, 42, SPECIES_BUTTERFREE},
    {44, 44, SPECIES_GRAVELER},
    {44, 44, SPECIES_FARFETCHD},
};

const struct WildPokemonInfo gVictoryRoad_B2F_LandMonsInfo = {10, gVictoryRoad_B2F_LandMons};

const struct WildPokemon gVictoryRoad_B2F_WaterMons[] =
{
    {30, 35, SPECIES_HAUNTER},
    {25, 30, SPECIES_CROCONAW},
    {35, 40, SPECIES_SCYTHER},
    {35, 40, SPECIES_SEADRA},
    {35, 40, SPECIES_SEALEO},
};

const struct WildPokemonInfo gVictoryRoad_B2F_WaterMonsInfo = {4, gVictoryRoad_B2F_WaterMons};

const struct WildPokemon gVictoryRoad_B2F_FishingMons[] =
{
    {5, 10, SPECIES_SLUGMA},
    {5, 10, SPECIES_EKANS},
    {10, 30, SPECIES_WOOPER},
    {10, 30, SPECIES_KIRLIA},
    {10, 30, SPECIES_NUMEL},
    {25, 30, SPECIES_CORPHISH},
    {30, 35, SPECIES_JIGGLYPUFF},
    {30, 35, SPECIES_QUAGSIRE},
    {35, 40, SPECIES_ALTARIA},
    {40, 45, SPECIES_URSARING},
};

const struct WildPokemonInfo gVictoryRoad_B2F_FishingMonsInfo = {30, gVictoryRoad_B2F_FishingMons};

const struct WildPokemon gMeteorFalls_1F_1R_LandMons[] =
{
    {16, 16, SPECIES_MAREEP},
    {17, 17, SPECIES_CLEFFA},
    {18, 18, SPECIES_PIDGEY},
    {15, 15, SPECIES_HOPPIP},
    {14, 14, SPECIES_PICHU},
    {16, 16, SPECIES_OCTILLERY},
    {18, 18, SPECIES_GOLEM},
    {14, 14, SPECIES_MAROWAK},
    {19, 19, SPECIES_LOTAD},
    {20, 20, SPECIES_WURMPLE},
    {19, 19, SPECIES_WEEDLE},
    {20, 20, SPECIES_SEEDOT},
};

const struct WildPokemonInfo gMeteorFalls_1F_1R_LandMonsInfo = {10, gMeteorFalls_1F_1R_LandMons};

const struct WildPokemon gMeteorFalls_1F_1R_WaterMons[] =
{
    {5, 35, SPECIES_IGGLYBUFF},
    {30, 35, SPECIES_HORSEA},
    {25, 35, SPECIES_SEVIPER},
    {15, 25, SPECIES_SWALOT},
    {5, 15, SPECIES_RHYDON},
};

const struct WildPokemonInfo gMeteorFalls_1F_1R_WaterMonsInfo = {4, gMeteorFalls_1F_1R_WaterMons};

const struct WildPokemon gMeteorFalls_1F_1R_FishingMons[] =
{
    {5, 10, SPECIES_FEEBAS},
    {5, 10, SPECIES_CARVANHA},
    {10, 30, SPECIES_SILCOON},
    {10, 30, SPECIES_VOLTORB},
    {10, 30, SPECIES_VENONAT},
    {25, 30, SPECIES_BALTOY},
    {30, 35, SPECIES_HOOTHOOT},
    {20, 25, SPECIES_LEDYBA},
    {35, 40, SPECIES_DODUO},
    {40, 45, SPECIES_MEDITITE},
};

const struct WildPokemonInfo gMeteorFalls_1F_1R_FishingMonsInfo = {30, gMeteorFalls_1F_1R_FishingMons};

const struct WildPokemon gMeteorFalls_1F_2R_LandMons[] =
{
    {33, 33, SPECIES_GROVYLE},
    {35, 35, SPECIES_SEADRA},
    {33, 33, SPECIES_COMBUSKEN},
    {35, 35, SPECIES_SUDOWOODO},
    {33, 33, SPECIES_NINJASK},
    {37, 37, SPECIES_TROPIUS},
    {35, 35, SPECIES_LAIRON},
    {39, 39, SPECIES_RELICANTH},
    {38, 38, SPECIES_METANG},
    {40, 40, SPECIES_CHARMELEON},
    {38, 38, SPECIES_IVYSAUR},
    {40, 40, SPECIES_CHANSEY},
};

const struct WildPokemonInfo gMeteorFalls_1F_2R_LandMonsInfo = {10, gMeteorFalls_1F_2R_LandMons};

const struct WildPokemon gMeteorFalls_1F_2R_WaterMons[] =
{
    {30, 35, SPECIES_GROVYLE},
    {30, 35, SPECIES_HAUNTER},
    {25, 35, SPECIES_SLOWKING},
    {15, 25, SPECIES_MAROWAK},
    {5, 15, SPECIES_ELECTABUZZ},
};

const struct WildPokemonInfo gMeteorFalls_1F_2R_WaterMonsInfo = {4, gMeteorFalls_1F_2R_WaterMons};

const struct WildPokemon gMeteorFalls_1F_2R_FishingMons[] =
{
    {5, 10, SPECIES_FEEBAS},
    {5, 10, SPECIES_KOFFING},
    {10, 30, SPECIES_SUNKERN},
    {10, 30, SPECIES_PIDGEOTTO},
    {10, 30, SPECIES_SHELLDER},
    {25, 30, SPECIES_ELECTRIKE},
    {30, 35, SPECIES_KIRLIA},
    {30, 35, SPECIES_MANECTRIC},
    {35, 40, SPECIES_ARMALDO},
    {40, 45, SPECIES_PERSIAN},
};

const struct WildPokemonInfo gMeteorFalls_1F_2R_FishingMonsInfo = {30, gMeteorFalls_1F_2R_FishingMons};

const struct WildPokemon gMeteorFalls_B1F_1R_LandMons[] =
{
    {33, 33, SPECIES_WARTORTLE},
    {35, 35, SPECIES_LAIRON},
    {33, 33, SPECIES_IVYSAUR},
    {35, 35, SPECIES_MASQUERAIN},
    {33, 33, SPECIES_DUNSPARCE},
    {37, 37, SPECIES_MANECTRIC},
    {35, 35, SPECIES_SEALEO},
    {39, 39, SPECIES_MURKROW},
    {38, 38, SPECIES_VIGOROTH},
    {40, 40, SPECIES_CHARMELEON},
    {38, 38, SPECIES_CHANSEY},
    {40, 40, SPECIES_SHELGON},
};

const struct WildPokemonInfo gMeteorFalls_B1F_1R_LandMonsInfo = {10, gMeteorFalls_B1F_1R_LandMons};

const struct WildPokemon gMeteorFalls_B1F_1R_WaterMons[] =
{
    {30, 35, SPECIES_PUPITAR},
    {30, 35, SPECIES_GROVYLE},
    {25, 35, SPECIES_DUSCLOPS},
    {15, 25, SPECIES_XATU},
    {5, 15, SPECIES_WIGGLYTUFF},
};

const struct WildPokemonInfo gMeteorFalls_B1F_1R_WaterMonsInfo = {4, gMeteorFalls_B1F_1R_WaterMons};

const struct WildPokemon gMeteorFalls_B1F_1R_FishingMons[] =
{
    {5, 10, SPECIES_SWINUB},
    {5, 10, SPECIES_PHANPY},
    {10, 30, SPECIES_POOCHYENA},
    {10, 30, SPECIES_KRABBY},
    {10, 30, SPECIES_KIRLIA},
    {25, 30, SPECIES_SNUBBULL},
    {30, 35, SPECIES_VENONAT},
    {30, 35, SPECIES_LANTURN},
    {35, 40, SPECIES_QWILFISH},
    {40, 45, SPECIES_TAUROS},
};

const struct WildPokemonInfo gMeteorFalls_B1F_1R_FishingMonsInfo = {30, gMeteorFalls_B1F_1R_FishingMons};

const struct WildPokemon gShoalCave_LowTideStairsRoom_LandMons[] =
{
    {26, 26, SPECIES_WHISMUR},
    {26, 26, SPECIES_ODDISH},
    {28, 28, SPECIES_SLAKOTH},
    {28, 28, SPECIES_TRAPINCH},
    {30, 30, SPECIES_PIDGEY},
    {30, 30, SPECIES_TOTODILE},
    {32, 32, SPECIES_CLEFFA},
    {32, 32, SPECIES_BELDUM},
    {32, 32, SPECIES_PUPITAR},
    {32, 32, SPECIES_BAGON},
    {32, 32, SPECIES_HAUNTER},
    {32, 32, SPECIES_DRATINI},
};

const struct WildPokemonInfo gShoalCave_LowTideStairsRoom_LandMonsInfo = {10, gShoalCave_LowTideStairsRoom_LandMons};

const struct WildPokemon gShoalCave_LowTideLowerRoom_LandMons[] =
{
    {26, 26, SPECIES_CATERPIE},
    {26, 26, SPECIES_LARVITAR},
    {28, 28, SPECIES_WEEDLE},
    {28, 28, SPECIES_ARON},
    {30, 30, SPECIES_LOTAD},
    {30, 30, SPECIES_DRATINI},
    {32, 32, SPECIES_HORSEA},
    {32, 32, SPECIES_CYNDAQUIL},
    {32, 32, SPECIES_SCYTHER},
    {32, 32, SPECIES_BULBASAUR},
    {32, 32, SPECIES_SEADRA},
    {32, 32, SPECIES_NIDORAN_M},
};

const struct WildPokemonInfo gShoalCave_LowTideLowerRoom_LandMonsInfo = {10, gShoalCave_LowTideLowerRoom_LandMons};

const struct WildPokemon gShoalCave_LowTideInnerRoom_LandMons[] =
{
    {26, 26, SPECIES_SPHEAL},
    {26, 26, SPECIES_NIDORAN_M},
    {28, 28, SPECIES_HOPPIP},
    {28, 28, SPECIES_CYNDAQUIL},
    {30, 30, SPECIES_PIDGEY},
    {30, 30, SPECIES_LARVITAR},
    {32, 32, SPECIES_SLAKOTH},
    {32, 32, SPECIES_ARON},
    {32, 32, SPECIES_IVYSAUR},
    {32, 32, SPECIES_MUDKIP},
    {32, 32, SPECIES_GROVYLE},
    {32, 32, SPECIES_ZUBAT},
};

const struct WildPokemonInfo gShoalCave_LowTideInnerRoom_LandMonsInfo = {10, gShoalCave_LowTideInnerRoom_LandMons};

const struct WildPokemon gShoalCave_LowTideInnerRoom_WaterMons[] =
{
    {5, 35, SPECIES_SKIPLOOM},
    {5, 35, SPECIES_SPHEAL},
    {25, 30, SPECIES_HOPPIP},
    {25, 30, SPECIES_NIDORAN_F},
    {25, 35, SPECIES_GASTLY},
};

const struct WildPokemonInfo gShoalCave_LowTideInnerRoom_WaterMonsInfo = {4, gShoalCave_LowTideInnerRoom_WaterMons};

const struct WildPokemon gShoalCave_LowTideInnerRoom_FishingMons[] =
{
    {5, 10, SPECIES_METAPOD},
    {5, 10, SPECIES_SNUBBULL},
    {10, 30, SPECIES_SWINUB},
    {10, 30, SPECIES_KOFFING},
    {10, 30, SPECIES_GROWLITHE},
    {25, 30, SPECIES_FLAAFFY},
    {30, 35, SPECIES_ELEKID},
    {20, 25, SPECIES_HAUNTER},
    {35, 40, SPECIES_GROVYLE},
    {40, 45, SPECIES_CHANSEY},
};

const struct WildPokemonInfo gShoalCave_LowTideInnerRoom_FishingMonsInfo = {10, gShoalCave_LowTideInnerRoom_FishingMons};

const struct WildPokemon gShoalCave_LowTideEntranceRoom_LandMons[] =
{
    {26, 26, SPECIES_TRAPINCH},
    {26, 26, SPECIES_PIDGEY},
    {28, 28, SPECIES_CLEFFA},
    {28, 28, SPECIES_BAGON},
    {30, 30, SPECIES_HORSEA},
    {30, 30, SPECIES_TOTODILE},
    {32, 32, SPECIES_HOPPIP},
    {32, 32, SPECIES_MACHOP},
    {32, 32, SPECIES_COMBUSKEN},
    {32, 32, SPECIES_GEODUDE},
    {32, 32, SPECIES_SEADRA},
    {32, 32, SPECIES_CHARMANDER},
};

const struct WildPokemonInfo gShoalCave_LowTideEntranceRoom_LandMonsInfo = {10, gShoalCave_LowTideEntranceRoom_LandMons};

const struct WildPokemon gShoalCave_LowTideEntranceRoom_WaterMons[] =
{
    {5, 35, SPECIES_PIDGEOTTO},
    {5, 35, SPECIES_HOPPIP},
    {25, 30, SPECIES_TREECKO},
    {25, 30, SPECIES_GEODUDE},
    {25, 35, SPECIES_PIDGEY},
};

const struct WildPokemonInfo gShoalCave_LowTideEntranceRoom_WaterMonsInfo = {4, gShoalCave_LowTideEntranceRoom_WaterMons};

const struct WildPokemon gShoalCave_LowTideEntranceRoom_FishingMons[] =
{
    {5, 10, SPECIES_SLUGMA},
    {5, 10, SPECIES_PIKACHU},
    {10, 30, SPECIES_FEEBAS},
    {10, 30, SPECIES_EKANS},
    {10, 30, SPECIES_GRAVELER},
    {25, 30, SPECIES_ONIX},
    {30, 35, SPECIES_METANG},
    {20, 25, SPECIES_COMBUSKEN},
    {35, 40, SPECIES_IVYSAUR},
    {40, 45, SPECIES_MAGBY},
};

const struct WildPokemonInfo gShoalCave_LowTideEntranceRoom_FishingMonsInfo = {10, gShoalCave_LowTideEntranceRoom_FishingMons};

const struct WildPokemon gLilycoveCity_WaterMons[] =
{
    {5, 35, SPECIES_LOMBRE},
    {10, 30, SPECIES_REMORAID},
    {15, 25, SPECIES_KIRLIA},
    {25, 30, SPECIES_ELECTRODE},
    {25, 30, SPECIES_LEDIAN},
};

const struct WildPokemonInfo gLilycoveCity_WaterMonsInfo = {4, gLilycoveCity_WaterMons};

const struct WildPokemon gLilycoveCity_FishingMons[] =
{
    {5, 10, SPECIES_CASCOON},
    {5, 10, SPECIES_CORPHISH},
    {10, 30, SPECIES_FEEBAS},
    {10, 30, SPECIES_ONIX},
    {10, 30, SPECIES_GLOOM},
    {25, 30, SPECIES_CHARMELEON},
    {30, 35, SPECIES_SEADRA},
    {25, 30, SPECIES_GRIMER},
    {35, 40, SPECIES_OMANYTE},
    {40, 45, SPECIES_MAGBY},
};

const struct WildPokemonInfo gLilycoveCity_FishingMonsInfo = {10, gLilycoveCity_FishingMons};

const struct WildPokemon gDewfordTown_WaterMons[] =
{
    {5, 35, SPECIES_GULPIN},
    {10, 30, SPECIES_ELECTRIKE},
    {15, 25, SPECIES_SHUPPET},
    {25, 30, SPECIES_NOCTOWL},
    {28, 30, SPECIES_PLUSLE},
};

const struct WildPokemonInfo gDewfordTown_WaterMonsInfo = {4, gDewfordTown_WaterMons};

const struct WildPokemon gDewfordTown_FishingMons[] =
{
    {5, 10, SPECIES_CASCOON},
    {5, 10, SPECIES_VULPIX},
    {10, 30, SPECIES_MAKUHITA},
    {10, 30, SPECIES_PHANPY},
    {10, 30, SPECIES_SHELGON},
    {25, 30, SPECIES_GROWLITHE},
    {30, 35, SPECIES_NIDORINA},
    {20, 25, SPECIES_LOUDRED},
    {35, 40, SPECIES_SEALEO},
    {40, 45, SPECIES_CROCONAW},
};

const struct WildPokemonInfo gDewfordTown_FishingMonsInfo = {10, gDewfordTown_FishingMons};

const struct WildPokemon gSlateportCity_WaterMons[] =
{
    {5, 35, SPECIES_CACNEA},
    {10, 30, SPECIES_SNORUNT},
    {15, 25, SPECIES_DIGLETT},
    {25, 30, SPECIES_CHIMECHO},
    {25, 30, SPECIES_ABSOL},
};

const struct WildPokemonInfo gSlateportCity_WaterMonsInfo = {4, gSlateportCity_WaterMons};

const struct WildPokemon gSlateportCity_FishingMons[] =
{
    {5, 10, SPECIES_TOGEPI},
    {5, 10, SPECIES_PINECO},
    {10, 30, SPECIES_SPINARAK},
    {10, 30, SPECIES_SLOWPOKE},
    {10, 30, SPECIES_MACHOKE},
    {25, 30, SPECIES_NIDORINA},
    {30, 35, SPECIES_KABUTO},
    {20, 25, SPECIES_QUILAVA},
    {35, 40, SPECIES_GROWLITHE},
    {40, 45, SPECIES_GROVYLE},
};

const struct WildPokemonInfo gSlateportCity_FishingMonsInfo = {10, gSlateportCity_FishingMons};

const struct WildPokemon gMossdeepCity_WaterMons[] =
{
    {5, 35, SPECIES_SKIPLOOM},
    {10, 30, SPECIES_HOOTHOOT},
    {15, 25, SPECIES_MAKUHITA},
    {25, 30, SPECIES_GLALIE},
    {25, 30, SPECIES_BEAUTIFLY},
};

const struct WildPokemonInfo gMossdeepCity_WaterMonsInfo = {4, gMossdeepCity_WaterMons};

const struct WildPokemon gMossdeepCity_FishingMons[] =
{
    {5, 10, SPECIES_KAKUNA},
    {5, 10, SPECIES_ONIX},
    {10, 30, SPECIES_TYROGUE},
    {10, 30, SPECIES_NATU},
    {10, 30, SPECIES_PORYGON},
    {30, 35, SPECIES_RAICHU},
    {30, 35, SPECIES_CROCONAW},
    {25, 30, SPECIES_MARSHTOMP},
    {35, 40, SPECIES_PONYTA},
    {40, 45, SPECIES_LAIRON},
};

const struct WildPokemonInfo gMossdeepCity_FishingMonsInfo = {10, gMossdeepCity_FishingMons};

const struct WildPokemon gPacifidlogTown_WaterMons[] =
{
    {5, 35, SPECIES_SKIPLOOM},
    {10, 30, SPECIES_SMOOCHUM},
    {15, 25, SPECIES_SWABLU},
    {25, 30, SPECIES_TANGELA},
    {25, 30, SPECIES_SOLROCK},
};

const struct WildPokemonInfo gPacifidlogTown_WaterMonsInfo = {4, gPacifidlogTown_WaterMons};

const struct WildPokemon gPacifidlogTown_FishingMons[] =
{
    {5, 10, SPECIES_SWINUB},
    {5, 10, SPECIES_REMORAID},
    {10, 30, SPECIES_ZIGZAGOON},
    {10, 30, SPECIES_PIDGEOTTO},
    {10, 30, SPECIES_SEADRA},
    {30, 35, SPECIES_SEVIPER},
    {30, 35, SPECIES_NIDORINO},
    {25, 30, SPECIES_CROCONAW},
    {35, 40, SPECIES_METANG},
    {40, 45, SPECIES_MAGBY},
};

const struct WildPokemonInfo gPacifidlogTown_FishingMonsInfo = {10, gPacifidlogTown_FishingMons};

const struct WildPokemon gEverGrandeCity_WaterMons[] =
{
    {5, 35, SPECIES_CLEFAIRY},
    {10, 30, SPECIES_NATU},
    {15, 25, SPECIES_SANDSHREW},
    {25, 30, SPECIES_PRIMEAPE},
    {25, 30, SPECIES_MURKROW},
};

const struct WildPokemonInfo gEverGrandeCity_WaterMonsInfo = {4, gEverGrandeCity_WaterMons};

const struct WildPokemon gEverGrandeCity_FishingMons[] =
{
    {5, 10, SPECIES_TOGEPI},
    {5, 10, SPECIES_NIDORINA},
    {10, 30, SPECIES_SENTRET},
    {10, 30, SPECIES_UNOWN},
    {10, 30, SPECIES_CROCONAW},
    {30, 35, SPECIES_DELCATTY},
    {30, 35, SPECIES_CHANSEY},
    {30, 35, SPECIES_SNEASEL},
    {35, 40, SPECIES_QUILAVA},
    {40, 45, SPECIES_LILEEP},
};

const struct WildPokemonInfo gEverGrandeCity_FishingMonsInfo = {10, gEverGrandeCity_FishingMons};

const struct WildPokemon gPetalburgCity_WaterMons[] =
{
    {20, 30, SPECIES_REMORAID},
    {10, 20, SPECIES_WINGULL},
    {30, 35, SPECIES_MEOWTH},
    {5, 10, SPECIES_SWINUB},
    {5, 10, SPECIES_VULPIX},
};

const struct WildPokemonInfo gPetalburgCity_WaterMonsInfo = {1, gPetalburgCity_WaterMons};

const struct WildPokemon gPetalburgCity_FishingMons[] =
{
    {5, 10, SPECIES_CASCOON},
    {5, 10, SPECIES_NATU},
    {10, 30, SPECIES_MARILL},
    {10, 30, SPECIES_PSYDUCK},
    {10, 30, SPECIES_CACNEA},
    {25, 30, SPECIES_HOUNDOUR},
    {30, 35, SPECIES_PINECO},
    {20, 25, SPECIES_HOOTHOOT},
    {35, 40, SPECIES_DROWZEE},
    {40, 45, SPECIES_CLEFAIRY},
};

const struct WildPokemonInfo gPetalburgCity_FishingMonsInfo = {10, gPetalburgCity_FishingMons};

const struct WildPokemon gUnderwater1_WaterMons[] =
{
    {20, 30, SPECIES_MAGNEMITE},
    {20, 30, SPECIES_DROWZEE},
    {30, 35, SPECIES_EEVEE},
    {30, 35, SPECIES_FLYGON},
    {30, 35, SPECIES_BELLOSSOM},
};

const struct WildPokemonInfo gUnderwater1_WaterMonsInfo = {4, gUnderwater1_WaterMons};

const struct WildPokemon gShoalCave_LowTideIceRoom_LandMons[] =
{
    {26, 26, SPECIES_CLEFFA},
    {26, 26, SPECIES_BAGON},
    {28, 28, SPECIES_HOPPIP},
    {28, 28, SPECIES_CHARMANDER},
    {30, 30, SPECIES_IGGLYBUFF},
    {30, 30, SPECIES_CHIKORITA},
    {26, 26, SPECIES_HOOTHOOT},
    {32, 32, SPECIES_BULBASAUR},
    {30, 30, SPECIES_SEADRA},
    {28, 28, SPECIES_CARVANHA},
    {32, 32, SPECIES_SEALEO},
    {30, 30, SPECIES_SKIPLOOM},
};

const struct WildPokemonInfo gShoalCave_LowTideIceRoom_LandMonsInfo = {10, gShoalCave_LowTideIceRoom_LandMons};

const struct WildPokemon gSkyPillar_1F_LandMons[] =
{
    {33, 33, SPECIES_SNEASEL},
    {34, 34, SPECIES_CROCONAW},
    {35, 35, SPECIES_IVYSAUR},
    {34, 34, SPECIES_SUDOWOODO},
    {36, 36, SPECIES_TAUROS},
    {37, 37, SPECIES_FURRET},
    {38, 38, SPECIES_NINJASK},
    {36, 36, SPECIES_JOLTEON},
    {37, 37, SPECIES_RAPIDASH},
    {38, 38, SPECIES_VAPOREON},
    {37, 37, SPECIES_JYNX},
    {38, 38, SPECIES_PINSIR},
};

const struct WildPokemonInfo gSkyPillar_1F_LandMonsInfo = {10, gSkyPillar_1F_LandMons};

const struct WildPokemon gSootopolisCity_LandMons[] =
{
    {33, 33, SPECIES_WIGGLYTUFF},
    {34, 34, SPECIES_POLIWHIRL},
    {35, 35, SPECIES_GOLDEEN},
    {34, 34, SPECIES_SEAKING},
    {36, 36, SPECIES_SPINARAK},
    {37, 37, SPECIES_METAPOD},
    {38, 38, SPECIES_SENTRET},
    {36, 36, SPECIES_FEEBAS},
    {37, 37, SPECIES_SLUGMA},
    {38, 38, SPECIES_JIGGLYPUFF},
    {37, 37, SPECIES_SNUBBULL},
    {38, 38, SPECIES_SKITTY},
};

// 180 = 100% encounter rate
const struct WildPokemonInfo gSootopolisCity_LandMonsInfo = {180, gSootopolisCity_LandMons};

const struct WildPokemon gSootopolisCity_WaterMons[] =
{
    {5, 35, SPECIES_ZIGZAGOON},
    {10, 30, SPECIES_METAPOD},
    {15, 25, SPECIES_SILCOON},
    {25, 30, SPECIES_SUNKERN},
    {25, 30, SPECIES_FEEBAS},
};

const struct WildPokemonInfo gSootopolisCity_WaterMonsInfo = {1, gSootopolisCity_WaterMons};

const struct WildPokemon gSootopolisCity_FishingMons[] =
{
    {5, 10, SPECIES_SUNKERN},
    {5, 10, SPECIES_BARBOACH},
    {10, 30, SPECIES_MAKUHITA},
    {10, 30, SPECIES_KAKUNA},
    {10, 30, SPECIES_SLUGMA},
    {30, 35, SPECIES_ZIGZAGOON},
    {30, 35, SPECIES_MARILL},
    {35, 40, SPECIES_CRADILY},
    {35, 45, SPECIES_JOLTEON},
    {5, 45, SPECIES_ESPEON},
};

const struct WildPokemonInfo gSootopolisCity_FishingMonsInfo = {10, gSootopolisCity_FishingMons};

const struct WildPokemon gSkyPillar_3F_LandMons[] =
{
    {33, 33, SPECIES_MIGHTYENA},
    {34, 34, SPECIES_CROCONAW},
    {35, 35, SPECIES_CHANSEY},
    {34, 34, SPECIES_PLUSLE},
    {36, 36, SPECIES_BRELOOM},
    {37, 37, SPECIES_RATICATE},
    {38, 38, SPECIES_MAGNETON},
    {36, 36, SPECIES_BLAZIKEN},
    {37, 37, SPECIES_POLIWRATH},
    {38, 38, SPECIES_NINETALES},
    {37, 37, SPECIES_POLITOED},
    {38, 38, SPECIES_MEGANIUM},
};

const struct WildPokemonInfo gSkyPillar_3F_LandMonsInfo = {10, gSkyPillar_3F_LandMons};

const struct WildPokemon gSkyPillar_5F_LandMons[] =
{
    {33, 33, SPECIES_GLIGAR},
    {34, 34, SPECIES_VIGOROTH},
    {35, 35, SPECIES_LAIRON},
    {34, 34, SPECIES_BEAUTIFLY},
    {36, 36, SPECIES_STARMIE},
    {37, 37, SPECIES_DUSCLOPS},
    {38, 38, SPECIES_LUDICOLO},
    {36, 36, SPECIES_JYNX},
    {37, 37, SPECIES_TAUROS},
    {38, 38, SPECIES_GENGAR},
    {39, 39, SPECIES_BRELOOM},
    {39, 39, SPECIES_BLASTOISE},
};

const struct WildPokemonInfo gSkyPillar_5F_LandMonsInfo = {10, gSkyPillar_5F_LandMons};

const struct WildPokemon gSafariZone_Southeast_LandMons[] =
{
    {33, 33, SPECIES_KAKUNA},
    {34, 34, SPECIES_ARON},
    {35, 35, SPECIES_TYROGUE},
    {36, 36, SPECIES_DRATINI},
    {34, 34, SPECIES_SUDOWOODO},
    {33, 33, SPECIES_POOCHYENA},
    {35, 35, SPECIES_GULPIN},
    {34, 34, SPECIES_VIBRAVA},
    {36, 36, SPECIES_RAICHU},
    {37, 37, SPECIES_DUNSPARCE},
    {39, 39, SPECIES_CRADILY},
    {40, 40, SPECIES_PLUSLE},
};

const struct WildPokemonInfo gSafariZone_Southeast_LandMonsInfo = {25, gSafariZone_Southeast_LandMons};

const struct WildPokemon gSafariZone_Southeast_WaterMons[] =
{
    {25, 30, SPECIES_MAKUHITA},
    {25, 30, SPECIES_EKANS},
    {25, 30, SPECIES_WYNAUT},
    {30, 35, SPECIES_KAKUNA},
    {35, 40, SPECIES_LEDIAN},
};

const struct WildPokemonInfo gSafariZone_Southeast_WaterMonsInfo = {9, gSafariZone_Southeast_WaterMons};

const struct WildPokemon gSafariZone_Southeast_FishingMons[] =
{
    {25, 30, SPECIES_TYROGUE},
    {25, 30, SPECIES_GROWLITHE},
    {25, 30, SPECIES_METAPOD},
    {25, 30, SPECIES_SEEL},
    {30, 35, SPECIES_NUZLEAF},
    {25, 30, SPECIES_FLAAFFY},
    {25, 30, SPECIES_NINCADA},
    {30, 35, SPECIES_RATTATA},
    {30, 35, SPECIES_MEDITITE},
    {35, 40, SPECIES_STARMIE},
};

const struct WildPokemonInfo gSafariZone_Southeast_FishingMonsInfo = {35, gSafariZone_Southeast_FishingMons};

const struct WildPokemon gSafariZone_Northeast_LandMons[] =
{
    {33, 33, SPECIES_BUTTERFREE},
    {34, 34, SPECIES_EKANS},
    {35, 35, SPECIES_MINUN},
    {36, 36, SPECIES_EEVEE},
    {34, 34, SPECIES_MAGIKARP},
    {33, 33, SPECIES_SNUBBULL},
    {35, 35, SPECIES_SHELLDER},
    {34, 34, SPECIES_ZIGZAGOON},
    {36, 36, SPECIES_ELEKID},
    {37, 37, SPECIES_CRAWDAUNT},
    {39, 39, SPECIES_DROWZEE},
    {40, 40, SPECIES_TAUROS},
};

const struct WildPokemonInfo gSafariZone_Northeast_LandMonsInfo = {25, gSafariZone_Northeast_LandMons};

const struct WildPokemon gSafariZone_Northeast_RockSmashMons[] =
{
    {25, 30, SPECIES_LAPRAS},
    {20, 25, SPECIES_SCEPTILE},
    {30, 35, SPECIES_ESPEON},
    {30, 35, SPECIES_URSARING},
    {35, 40, SPECIES_EXEGGUTOR},
};

const struct WildPokemonInfo gSafariZone_Northeast_RockSmashMonsInfo = {25, gSafariZone_Northeast_RockSmashMons};

const struct WildPokemon gMagmaHideout_1F_LandMons[] =
{
    {27, 27, SPECIES_CHARMANDER},
    {28, 28, SPECIES_TANGELA},
    {28, 28, SPECIES_PIDGEY},
    {30, 30, SPECIES_GOLDUCK},
    {29, 29, SPECIES_CHIKORITA},
    {30, 30, SPECIES_NIDORAN_F},
    {30, 30, SPECIES_ODDISH},
    {30, 30, SPECIES_ANORITH},
    {30, 30, SPECIES_FLAAFFY},
    {31, 31, SPECIES_GLOOM},
    {32, 32, SPECIES_DRAGONAIR},
    {33, 33, SPECIES_STARYU},
};

const struct WildPokemonInfo gMagmaHideout_1F_LandMonsInfo = {10, gMagmaHideout_1F_LandMons};

const struct WildPokemon gMagmaHideout_2F_1R_LandMons[] =
{
    {27, 27, SPECIES_CYNDAQUIL},
    {28, 28, SPECIES_BRELOOM},
    {28, 28, SPECIES_TORCHIC},
    {30, 30, SPECIES_GIRAFARIG},
    {29, 29, SPECIES_MAREEP},
    {30, 30, SPECIES_SPHEAL},
    {30, 30, SPECIES_LARVITAR},
    {30, 30, SPECIES_ELEKID},
    {30, 30, SPECIES_DRAGONAIR},
    {31, 31, SPECIES_LOUDRED},
    {32, 32, SPECIES_NIDORINO},
    {33, 33, SPECIES_CHARMELEON},
};

const struct WildPokemonInfo gMagmaHideout_2F_1R_LandMonsInfo = {10, gMagmaHideout_2F_1R_LandMons};

const struct WildPokemon gMagmaHideout_2F_2R_LandMons[] =
{
    {27, 27, SPECIES_MUDKIP},
    {28, 28, SPECIES_CRAWDAUNT},
    {28, 28, SPECIES_HOPPIP},
    {30, 30, SPECIES_STEELIX},
    {29, 29, SPECIES_BELDUM},
    {30, 30, SPECIES_TRAPINCH},
    {30, 30, SPECIES_ARON},
    {30, 30, SPECIES_DRAGONAIR},
    {30, 30, SPECIES_OMANYTE},
    {31, 31, SPECIES_KADABRA},
    {32, 32, SPECIES_WARTORTLE},
    {33, 33, SPECIES_METANG},
};

const struct WildPokemonInfo gMagmaHideout_2F_2R_LandMonsInfo = {10, gMagmaHideout_2F_2R_LandMons};

const struct WildPokemon gMagmaHideout_3F_1R_LandMons[] =
{
    {27, 27, SPECIES_CHIKORITA},
    {28, 28, SPECIES_BELLOSSOM},
    {28, 28, SPECIES_NIDORAN_M},
    {30, 30, SPECIES_KECLEON},
    {29, 29, SPECIES_SQUIRTLE},
    {30, 30, SPECIES_MAREEP},
    {30, 30, SPECIES_CYNDAQUIL},
    {30, 30, SPECIES_PORYGON},
    {30, 30, SPECIES_LOMBRE},
    {31, 31, SPECIES_GROWLITHE},
    {32, 32, SPECIES_CLAMPERL},
    {33, 33, SPECIES_METANG},
};

const struct WildPokemonInfo gMagmaHideout_3F_1R_LandMonsInfo = {10, gMagmaHideout_3F_1R_LandMons};

const struct WildPokemon gMagmaHideout_3F_2R_LandMons[] =
{
    {27, 27, SPECIES_GASTLY},
    {28, 28, SPECIES_WHISCASH},
    {28, 28, SPECIES_BULBASAUR},
    {30, 30, SPECIES_DODRIO},
    {29, 29, SPECIES_POLIWAG},
    {30, 30, SPECIES_CHIKORITA},
    {30, 30, SPECIES_ODDISH},
    {30, 30, SPECIES_WEEPINBELL},
    {30, 30, SPECIES_LAIRON},
    {31, 31, SPECIES_PORYGON},
    {32, 32, SPECIES_NUZLEAF},
    {33, 33, SPECIES_PUPITAR},
};

const struct WildPokemonInfo gMagmaHideout_3F_2R_LandMonsInfo = {10, gMagmaHideout_3F_2R_LandMons};

const struct WildPokemon gMagmaHideout_4F_LandMons[] =
{
    {27, 27, SPECIES_SLAKOTH},
    {28, 28, SPECIES_ELECTABUZZ},
    {28, 28, SPECIES_MAREEP},
    {30, 30, SPECIES_PELIPPER},
    {29, 29, SPECIES_BULBASAUR},
    {30, 30, SPECIES_PIDGEY},
    {30, 30, SPECIES_CHIKORITA},
    {30, 30, SPECIES_POLIWHIRL},
    {30, 30, SPECIES_FLAAFFY},
    {31, 31, SPECIES_WAILMER},
    {32, 32, SPECIES_NIDORINO},
    {33, 33, SPECIES_CLAMPERL},
};

const struct WildPokemonInfo gMagmaHideout_4F_LandMonsInfo = {10, gMagmaHideout_4F_LandMons};

const struct WildPokemon gMagmaHideout_3F_3R_LandMons[] =
{
    {27, 27, SPECIES_TREECKO},
    {28, 28, SPECIES_MR_MIME},
    {28, 28, SPECIES_HOPPIP},
    {30, 30, SPECIES_CHIMECHO},
    {29, 29, SPECIES_POLIWAG},
    {30, 30, SPECIES_CHARMANDER},
    {30, 30, SPECIES_LARVITAR},
    {30, 30, SPECIES_CROCONAW},
    {30, 30, SPECIES_CLAMPERL},
    {31, 31, SPECIES_LOMBRE},
    {32, 32, SPECIES_ANORITH},
    {33, 33, SPECIES_KOFFING},
};

const struct WildPokemonInfo gMagmaHideout_3F_3R_LandMonsInfo = {10, gMagmaHideout_3F_3R_LandMons};

const struct WildPokemon gMagmaHideout_2F_3R_LandMons[] =
{
    {27, 27, SPECIES_CHIKORITA},
    {28, 28, SPECIES_SWELLOW},
    {28, 28, SPECIES_GASTLY},
    {30, 30, SPECIES_HITMONCHAN},
    {29, 29, SPECIES_MACHOP},
    {30, 30, SPECIES_TREECKO},
    {30, 30, SPECIES_MUDKIP},
    {30, 30, SPECIES_WEEPINBELL},
    {30, 30, SPECIES_MAGBY},
    {31, 31, SPECIES_VIGOROTH},
    {32, 32, SPECIES_NIDORINO},
    {33, 33, SPECIES_PUPITAR},
};

const struct WildPokemonInfo gMagmaHideout_2F_3R_LandMonsInfo = {10, gMagmaHideout_2F_3R_LandMons};

const struct WildPokemon gMirageTower_1F_LandMons[] =
{
    {21, 21, SPECIES_PINECO},
    {21, 21, SPECIES_BELLSPROUT},
    {20, 20, SPECIES_TAILLOW},
    {20, 20, SPECIES_MAREEP},
    {20, 20, SPECIES_JIGGLYPUFF},
    {20, 20, SPECIES_BAGON},
    {22, 22, SPECIES_SNORUNT},
    {22, 22, SPECIES_CHARMANDER},
    {23, 23, SPECIES_EKANS},
    {23, 23, SPECIES_ARON},
    {24, 24, SPECIES_LOMBRE},
    {24, 24, SPECIES_MACHOP},
};

const struct WildPokemonInfo gMirageTower_1F_LandMonsInfo = {10, gMirageTower_1F_LandMons};

const struct WildPokemon gMirageTower_2F_LandMons[] =
{
    {21, 21, SPECIES_SLOWPOKE},
    {21, 21, SPECIES_TORCHIC},
    {20, 20, SPECIES_NINCADA},
    {20, 20, SPECIES_MACHOP},
    {20, 20, SPECIES_LOMBRE},
    {20, 20, SPECIES_MAREEP},
    {22, 22, SPECIES_KRABBY},
    {22, 22, SPECIES_NIDORAN_F},
    {23, 23, SPECIES_HOUNDOUR},
    {23, 23, SPECIES_TREECKO},
    {24, 24, SPECIES_SKIPLOOM},
    {24, 24, SPECIES_CHIKORITA},
};

const struct WildPokemonInfo gMirageTower_2F_LandMonsInfo = {10, gMirageTower_2F_LandMons};

const struct WildPokemon gMirageTower_3F_LandMons[] =
{
    {21, 21, SPECIES_GROWLITHE},
    {21, 21, SPECIES_ARON},
    {20, 20, SPECIES_MEOWTH},
    {20, 20, SPECIES_HOPPIP},
    {20, 20, SPECIES_SWABLU},
    {20, 20, SPECIES_SLAKOTH},
    {22, 22, SPECIES_NINCADA},
    {22, 22, SPECIES_CHARMANDER},
    {23, 23, SPECIES_NUMEL},
    {23, 23, SPECIES_MACHOP},
    {24, 24, SPECIES_CARVANHA},
    {24, 24, SPECIES_ODDISH},
};

const struct WildPokemonInfo gMirageTower_3F_LandMonsInfo = {10, gMirageTower_3F_LandMons};

const struct WildPokemon gMirageTower_4F_LandMons[] =
{
    {21, 21, SPECIES_NINCADA},
    {21, 21, SPECIES_ARON},
    {20, 20, SPECIES_MEOWTH},
    {20, 20, SPECIES_GASTLY},
    {20, 20, SPECIES_SHUPPET},
    {20, 20, SPECIES_MAREEP},
    {22, 22, SPECIES_BARBOACH},
    {22, 22, SPECIES_GEODUDE},
    {23, 23, SPECIES_EKANS},
    {23, 23, SPECIES_BAGON},
    {24, 24, SPECIES_GOLDEEN},
    {24, 24, SPECIES_BELLSPROUT},
};

const struct WildPokemonInfo gMirageTower_4F_LandMonsInfo = {10, gMirageTower_4F_LandMons};

const struct WildPokemon gDesertUnderpass_LandMons[] =
{
    {38, 38, SPECIES_UNOWN},
    {35, 35, SPECIES_LOTAD},
    {40, 40, SPECIES_SMEARGLE},
    {40, 40, SPECIES_HAUNTER},
    {41, 41, SPECIES_DELIBIRD},
    {36, 36, SPECIES_SPHEAL},
    {38, 38, SPECIES_DODUO},
    {42, 42, SPECIES_LUVDISC},
    {38, 38, SPECIES_AZURILL},
    {43, 43, SPECIES_SNORUNT},
    {44, 44, SPECIES_CHARMELEON},
    {45, 45, SPECIES_SHELLDER},
};

const struct WildPokemonInfo gDesertUnderpass_LandMonsInfo = {10, gDesertUnderpass_LandMons};

const struct WildPokemon gArtisanCave_B1F_LandMons[] =
{
    {40, 40, SPECIES_DITTO},
    {41, 41, SPECIES_SHEDINJA},
    {42, 42, SPECIES_MAREEP},
    {43, 43, SPECIES_LOTAD},
    {44, 44, SPECIES_REMORAID},
    {45, 45, SPECIES_HOPPIP},
    {46, 46, SPECIES_MAGIKARP},
    {47, 47, SPECIES_NINCADA},
    {48, 48, SPECIES_SWINUB},
    {49, 49, SPECIES_SANDSHREW},
    {50, 50, SPECIES_HORSEA},
    {50, 50, SPECIES_TYROGUE},
};

const struct WildPokemonInfo gArtisanCave_B1F_LandMonsInfo = {10, gArtisanCave_B1F_LandMons};

const struct WildPokemon gArtisanCave_1F_LandMons[] =
{
    {40, 40, SPECIES_SHEDINJA},
    {41, 41, SPECIES_DITTO},
    {42, 42, SPECIES_SPEAROW},
    {43, 43, SPECIES_SKITTY},
    {44, 44, SPECIES_SILCOON},
    {45, 45, SPECIES_SNORUNT},
    {46, 46, SPECIES_WINGULL},
    {47, 47, SPECIES_DIGLETT},
    {48, 48, SPECIES_SURSKIT},
    {49, 49, SPECIES_HORSEA},
    {50, 50, SPECIES_MEDITITE},
    {50, 50, SPECIES_DRATINI},
};

const struct WildPokemonInfo gArtisanCave_1F_LandMonsInfo = {10, gArtisanCave_1F_LandMons};

const struct WildPokemon gAlteringCave1_LandMons[] =
{
    {10, 10, SPECIES_CLEFFA},
    {12, 12, SPECIES_SLAKOTH},
    {8, 8, SPECIES_CATERPIE},
    {14, 14, SPECIES_PICHU},
    {10, 10, SPECIES_WEEDLE},
    {12, 12, SPECIES_MAREEP},
    {16, 16, SPECIES_NIDORAN_F},
    {6, 6, SPECIES_PIDGEY},
    {8, 8, SPECIES_SPHEAL},
    {14, 14, SPECIES_LOTAD},
    {8, 8, SPECIES_IGGLYBUFF},
    {14, 14, SPECIES_HORSEA},
};

const struct WildPokemonInfo gAlteringCave1_LandMonsInfo = {7, gAlteringCave1_LandMons};

const struct WildPokemon gAlteringCave2_LandMons[] =
{
    {7, 7, SPECIES_BELDUM},
    {9, 9, SPECIES_TOTODILE},
    {5, 5, SPECIES_BULBASAUR},
    {11, 11, SPECIES_ABRA},
    {7, 7, SPECIES_NIDORAN_F},
    {9, 9, SPECIES_POLIWAG},
    {13, 13, SPECIES_TRAPINCH},
    {3, 3, SPECIES_SQUIRTLE},
    {5, 5, SPECIES_BAGON},
    {11, 11, SPECIES_SLAKOTH},
    {5, 5, SPECIES_MUDKIP},
    {11, 11, SPECIES_BELLSPROUT},
};

const struct WildPokemonInfo gAlteringCave2_LandMonsInfo = {7, gAlteringCave2_LandMons};

const struct WildPokemon gAlteringCave3_LandMons[] =
{
    {23, 23, SPECIES_SANDSHREW},
    {25, 25, SPECIES_VIBRAVA},
    {22, 22, SPECIES_SNUBBULL},
    {27, 27, SPECIES_NUMEL},
    {23, 23, SPECIES_DROWZEE},
    {25, 25, SPECIES_MEDITITE},
    {29, 29, SPECIES_REMORAID},
    {19, 19, SPECIES_SEEL},
    {21, 21, SPECIES_DIGLETT},
    {27, 27, SPECIES_SWABLU},
    {21, 21, SPECIES_PARAS},
    {27, 27, SPECIES_SPEAROW},
};

const struct WildPokemonInfo gAlteringCave3_LandMonsInfo = {7, gAlteringCave3_LandMons};

const struct WildPokemon gAlteringCave4_LandMons[] =
{
    {16, 16, SPECIES_LOUDRED},
    {18, 18, SPECIES_NATU},
    {14, 14, SPECIES_ELECTRIKE},
    {20, 20, SPECIES_CUBONE},
    {16, 16, SPECIES_EKANS},
    {18, 18, SPECIES_DROWZEE},
    {22, 22, SPECIES_TENTACOOL},
    {12, 12, SPECIES_ANORITH},
    {14, 14, SPECIES_VULPIX},
    {20, 20, SPECIES_VIBRAVA},
    {14, 14, SPECIES_MAGNEMITE},
    {20, 20, SPECIES_DUSKULL},
};

const struct WildPokemonInfo gAlteringCave4_LandMonsInfo = {7, gAlteringCave4_LandMons};

const struct WildPokemon gAlteringCave5_LandMons[] =
{
    {10, 10, SPECIES_LILEEP},
    {12, 12, SPECIES_GOLDEEN},
    {8, 8, SPECIES_RHYHORN},
    {14, 14, SPECIES_SEEL},
    {10, 10, SPECIES_SNUBBULL},
    {12, 12, SPECIES_VIBRAVA},
    {16, 16, SPECIES_PIKACHU},
    {6, 6, SPECIES_PINECO},
    {8, 8, SPECIES_GROWLITHE},
    {14, 14, SPECIES_LOUDRED},
    {8, 8, SPECIES_BALTOY},
    {14, 14, SPECIES_CACNEA},
};

const struct WildPokemonInfo gAlteringCave5_LandMonsInfo = {7, gAlteringCave5_LandMons};

const struct WildPokemon gAlteringCave6_LandMons[] =
{
    {22, 22, SPECIES_BUTTERFREE},
    {24, 24, SPECIES_ROSELIA},
    {20, 20, SPECIES_ARIADOS},
    {26, 26, SPECIES_CORSOLA},
    {22, 22, SPECIES_LUVDISC},
    {24, 24, SPECIES_DELCATTY},
    {28, 28, SPECIES_MAGCARGO},
    {18, 18, SPECIES_DUSTOX},
    {20, 20, SPECIES_LEDIAN},
    {26, 26, SPECIES_MAWILE},
    {20, 20, SPECIES_SPINDA},
    {26, 26, SPECIES_ILLUMISE},
};

const struct WildPokemonInfo gAlteringCave6_LandMonsInfo = {7, gAlteringCave6_LandMons};

const struct WildPokemon gAlteringCave7_LandMons[] =
{
    {22, 22, SPECIES_FORRETRESS},
    {24, 24, SPECIES_TYPHLOSION},
    {20, 20, SPECIES_CLAYDOL},
    {26, 26, SPECIES_GOLDUCK},
    {22, 22, SPECIES_DUSCLOPS},
    {24, 24, SPECIES_GARDEVOIR},
    {28, 28, SPECIES_NIDOKING},
    {18, 18, SPECIES_BELLOSSOM},
    {20, 20, SPECIES_POLIWRATH},
    {26, 26, SPECIES_KABUTOPS},
    {20, 20, SPECIES_TORKOAL},
    {26, 26, SPECIES_HUNTAIL},
};

const struct WildPokemonInfo gAlteringCave7_LandMonsInfo = {7, gAlteringCave7_LandMons};

const struct WildPokemon gAlteringCave8_LandMons[] =
{
    {22, 22, SPECIES_MAGNETON},
    {24, 24, SPECIES_STEELIX},
    {20, 20, SPECIES_CACTURNE},
    {26, 26, SPECIES_KECLEON},
    {22, 22, SPECIES_NINETALES},
    {24, 24, SPECIES_HITMONLEE},
    {28, 28, SPECIES_XATU},
    {18, 18, SPECIES_ALTARIA},
    {20, 20, SPECIES_OCTILLERY},
    {26, 26, SPECIES_CASTFORM},
    {20, 20, SPECIES_POLIWRATH},
    {26, 26, SPECIES_GOREBYSS},
};

const struct WildPokemonInfo gAlteringCave8_LandMonsInfo = {7, gAlteringCave8_LandMons};

const struct WildPokemon gAlteringCave9_LandMons[] =
{
    {22, 22, SPECIES_SHEDINJA},
    {24, 24, SPECIES_DITTO},
    {20, 20, SPECIES_KAKUNA},
    {26, 26, SPECIES_POOCHYENA},
    {22, 22, SPECIES_ZIGZAGOON},
    {24, 24, SPECIES_TOGEPI},
    {28, 28, SPECIES_MAREEP},
    {18, 18, SPECIES_MEOWTH},
    {20, 20, SPECIES_WYNAUT},
    {26, 26, SPECIES_POLIWAG},
    {20, 20, SPECIES_SPINARAK},
    {26, 26, SPECIES_BELLSPROUT},
};

const struct WildPokemonInfo gAlteringCave9_LandMonsInfo = {7, gAlteringCave9_LandMons};

const struct WildPokemon gMeteorFalls_StevensCave_LandMons[] =
{
    {33, 33, SPECIES_SEALEO},
    {35, 35, SPECIES_MARSHTOMP},
    {33, 33, SPECIES_IVYSAUR},
    {35, 35, SPECIES_KINGLER},
    {33, 33, SPECIES_BRELOOM},
    {37, 37, SPECIES_PILOSWINE},
    {35, 35, SPECIES_SHELGON},
    {39, 39, SPECIES_LANTURN},
    {38, 38, SPECIES_CHANSEY},
    {40, 40, SPECIES_CROCONAW},
    {38, 38, SPECIES_SEADRA},
    {40, 40, SPECIES_PONYTA},
};

const struct WildPokemonInfo gMeteorFalls_StevensCave_LandMonsInfo = {10, gMeteorFalls_StevensCave_LandMons};

//The actual headers that link the encounter tables to particular maps start here.

const struct WildPokemonHeader gWildMonHeaders[] =
{
    {
        .mapGroup = MAP_GROUP(ROUTE101),
        .mapNum = MAP_NUM(ROUTE101),
        .landMonsInfo = &gRoute101_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE102),
        .mapNum = MAP_NUM(ROUTE102),
        .landMonsInfo = &gRoute102_LandMonsInfo,
        .waterMonsInfo = &gRoute102_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute102_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE103),
        .mapNum = MAP_NUM(ROUTE103),
        .landMonsInfo = &gRoute103_LandMonsInfo,
        .waterMonsInfo = &gRoute103_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute103_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE104),
        .mapNum = MAP_NUM(ROUTE104),
        .landMonsInfo = &gRoute104_LandMonsInfo,
        .waterMonsInfo = &gRoute104_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute104_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE105),
        .mapNum = MAP_NUM(ROUTE105),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gRoute105_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute105_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE110),
        .mapNum = MAP_NUM(ROUTE110),
        .landMonsInfo = &gRoute110_LandMonsInfo,
        .waterMonsInfo = &gRoute110_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute110_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE111),
        .mapNum = MAP_NUM(ROUTE111),
        .landMonsInfo = &gRoute111_LandMonsInfo,
        .waterMonsInfo = &gRoute111_WaterMonsInfo,
        .rockSmashMonsInfo = &gRoute111_RockSmashMonsInfo,
        .fishingMonsInfo = &gRoute111_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE112),
        .mapNum = MAP_NUM(ROUTE112),
        .landMonsInfo = &gRoute112_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE113),
        .mapNum = MAP_NUM(ROUTE113),
        .landMonsInfo = &gRoute113_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE114),
        .mapNum = MAP_NUM(ROUTE114),
        .landMonsInfo = &gRoute114_LandMonsInfo,
        .waterMonsInfo = &gRoute114_WaterMonsInfo,
        .rockSmashMonsInfo = &gRoute114_RockSmashMonsInfo,
        .fishingMonsInfo = &gRoute114_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE116),
        .mapNum = MAP_NUM(ROUTE116),
        .landMonsInfo = &gRoute116_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE117),
        .mapNum = MAP_NUM(ROUTE117),
        .landMonsInfo = &gRoute117_LandMonsInfo,
        .waterMonsInfo = &gRoute117_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute117_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE118),
        .mapNum = MAP_NUM(ROUTE118),
        .landMonsInfo = &gRoute118_LandMonsInfo,
        .waterMonsInfo = &gRoute118_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute118_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE124),
        .mapNum = MAP_NUM(ROUTE124),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gRoute124_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute124_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(PETALBURG_WOODS),
        .mapNum = MAP_NUM(PETALBURG_WOODS),
        .landMonsInfo = &gPetalburgWoods_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(RUSTURF_TUNNEL),
        .mapNum = MAP_NUM(RUSTURF_TUNNEL),
        .landMonsInfo = &gRusturfTunnel_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(GRANITE_CAVE_1F),
        .mapNum = MAP_NUM(GRANITE_CAVE_1F),
        .landMonsInfo = &gGraniteCave_1F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(GRANITE_CAVE_B1F),
        .mapNum = MAP_NUM(GRANITE_CAVE_B1F),
        .landMonsInfo = &gGraniteCave_B1F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(MT_PYRE_1F),
        .mapNum = MAP_NUM(MT_PYRE_1F),
        .landMonsInfo = &gMtPyre_1F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(VICTORY_ROAD_1F),
        .mapNum = MAP_NUM(VICTORY_ROAD_1F),
        .landMonsInfo = &gVictoryRoad_1F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(SAFARI_ZONE_SOUTH),
        .mapNum = MAP_NUM(SAFARI_ZONE_SOUTH),
        .landMonsInfo = &gSafariZone_South_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(UNDERWATER2),
        .mapNum = MAP_NUM(UNDERWATER2),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gUnderwater2_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(ABANDONED_SHIP_ROOMS_B1F),
        .mapNum = MAP_NUM(ABANDONED_SHIP_ROOMS_B1F),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gAbandonedShip_Rooms_B1F_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gAbandonedShip_Rooms_B1F_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(GRANITE_CAVE_B2F),
        .mapNum = MAP_NUM(GRANITE_CAVE_B2F),
        .landMonsInfo = &gGraniteCave_B2F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = &gGraniteCave_B2F_RockSmashMonsInfo,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(FIERY_PATH),
        .mapNum = MAP_NUM(FIERY_PATH),
        .landMonsInfo = &gFieryPath_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(METEOR_FALLS_B1F_2R),
        .mapNum = MAP_NUM(METEOR_FALLS_B1F_2R),
        .landMonsInfo = &gMeteorFalls_B1F_2R_LandMonsInfo,
        .waterMonsInfo = &gMeteorFalls_B1F_2R_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gMeteorFalls_B1F_2R_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(JAGGED_PASS),
        .mapNum = MAP_NUM(JAGGED_PASS),
        .landMonsInfo = &gJaggedPass_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE106),
        .mapNum = MAP_NUM(ROUTE106),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gRoute106_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute106_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE107),
        .mapNum = MAP_NUM(ROUTE107),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gRoute107_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute107_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE108),
        .mapNum = MAP_NUM(ROUTE108),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gRoute108_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute108_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE109),
        .mapNum = MAP_NUM(ROUTE109),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gRoute109_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute109_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE115),
        .mapNum = MAP_NUM(ROUTE115),
        .landMonsInfo = &gRoute115_LandMonsInfo,
        .waterMonsInfo = &gRoute115_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute115_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(NEW_MAUVILLE_INSIDE),
        .mapNum = MAP_NUM(NEW_MAUVILLE_INSIDE),
        .landMonsInfo = &gNewMauville_Inside_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE119),
        .mapNum = MAP_NUM(ROUTE119),
        .landMonsInfo = &gRoute119_LandMonsInfo,
        .waterMonsInfo = &gRoute119_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute119_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE120),
        .mapNum = MAP_NUM(ROUTE120),
        .landMonsInfo = &gRoute120_LandMonsInfo,
        .waterMonsInfo = &gRoute120_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute120_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE121),
        .mapNum = MAP_NUM(ROUTE121),
        .landMonsInfo = &gRoute121_LandMonsInfo,
        .waterMonsInfo = &gRoute121_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute121_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE122),
        .mapNum = MAP_NUM(ROUTE122),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gRoute122_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute122_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE123),
        .mapNum = MAP_NUM(ROUTE123),
        .landMonsInfo = &gRoute123_LandMonsInfo,
        .waterMonsInfo = &gRoute123_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute123_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(MT_PYRE_2F),
        .mapNum = MAP_NUM(MT_PYRE_2F),
        .landMonsInfo = &gMtPyre_2F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(MT_PYRE_3F),
        .mapNum = MAP_NUM(MT_PYRE_3F),
        .landMonsInfo = &gMtPyre_3F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(MT_PYRE_4F),
        .mapNum = MAP_NUM(MT_PYRE_4F),
        .landMonsInfo = &gMtPyre_4F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(MT_PYRE_5F),
        .mapNum = MAP_NUM(MT_PYRE_5F),
        .landMonsInfo = &gMtPyre_5F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(MT_PYRE_6F),
        .mapNum = MAP_NUM(MT_PYRE_6F),
        .landMonsInfo = &gMtPyre_6F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(MT_PYRE_EXTERIOR),
        .mapNum = MAP_NUM(MT_PYRE_EXTERIOR),
        .landMonsInfo = &gMtPyre_Exterior_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(MT_PYRE_SUMMIT),
        .mapNum = MAP_NUM(MT_PYRE_SUMMIT),
        .landMonsInfo = &gMtPyre_Summit_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(GRANITE_CAVE_STEVENS_ROOM),
        .mapNum = MAP_NUM(GRANITE_CAVE_STEVENS_ROOM),
        .landMonsInfo = &gGraniteCave_StevensRoom_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE125),
        .mapNum = MAP_NUM(ROUTE125),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gRoute125_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute125_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE126),
        .mapNum = MAP_NUM(ROUTE126),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gRoute126_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute126_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE127),
        .mapNum = MAP_NUM(ROUTE127),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gRoute127_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute127_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE128),
        .mapNum = MAP_NUM(ROUTE128),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gRoute128_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute128_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE129),
        .mapNum = MAP_NUM(ROUTE129),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gRoute129_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute129_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE130),
        .mapNum = MAP_NUM(ROUTE130),
        .landMonsInfo = &gRoute130_LandMonsInfo,
        .waterMonsInfo = &gRoute130_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute130_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE131),
        .mapNum = MAP_NUM(ROUTE131),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gRoute131_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute131_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE132),
        .mapNum = MAP_NUM(ROUTE132),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gRoute132_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute132_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE133),
        .mapNum = MAP_NUM(ROUTE133),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gRoute133_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute133_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ROUTE134),
        .mapNum = MAP_NUM(ROUTE134),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gRoute134_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gRoute134_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(ABANDONED_SHIP_HIDDEN_FLOOR_CORRIDORS),
        .mapNum = MAP_NUM(ABANDONED_SHIP_HIDDEN_FLOOR_CORRIDORS),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gAbandonedShip_HiddenFloorCorridors_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gAbandonedShip_HiddenFloorCorridors_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(SEAFLOOR_CAVERN_ROOM1),
        .mapNum = MAP_NUM(SEAFLOOR_CAVERN_ROOM1),
        .landMonsInfo = &gSeafloorCavern_Room1_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(SEAFLOOR_CAVERN_ROOM2),
        .mapNum = MAP_NUM(SEAFLOOR_CAVERN_ROOM2),
        .landMonsInfo = &gSeafloorCavern_Room2_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(SEAFLOOR_CAVERN_ROOM3),
        .mapNum = MAP_NUM(SEAFLOOR_CAVERN_ROOM3),
        .landMonsInfo = &gSeafloorCavern_Room3_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(SEAFLOOR_CAVERN_ROOM4),
        .mapNum = MAP_NUM(SEAFLOOR_CAVERN_ROOM4),
        .landMonsInfo = &gSeafloorCavern_Room4_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(SEAFLOOR_CAVERN_ROOM5),
        .mapNum = MAP_NUM(SEAFLOOR_CAVERN_ROOM5),
        .landMonsInfo = &gSeafloorCavern_Room5_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(SEAFLOOR_CAVERN_ROOM6),
        .mapNum = MAP_NUM(SEAFLOOR_CAVERN_ROOM6),
        .landMonsInfo = &gSeafloorCavern_Room6_LandMonsInfo,
        .waterMonsInfo = &gSeafloorCavern_Room6_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gSeafloorCavern_Room6_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(SEAFLOOR_CAVERN_ROOM7),
        .mapNum = MAP_NUM(SEAFLOOR_CAVERN_ROOM7),
        .landMonsInfo = &gSeafloorCavern_Room7_LandMonsInfo,
        .waterMonsInfo = &gSeafloorCavern_Room7_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gSeafloorCavern_Room7_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(SEAFLOOR_CAVERN_ROOM8),
        .mapNum = MAP_NUM(SEAFLOOR_CAVERN_ROOM8),
        .landMonsInfo = &gSeafloorCavern_Room8_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(SEAFLOOR_CAVERN_ENTRANCE),
        .mapNum = MAP_NUM(SEAFLOOR_CAVERN_ENTRANCE),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gSeafloorCavern_Entrance_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gSeafloorCavern_Entrance_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(CAVE_OF_ORIGIN_ENTRANCE),
        .mapNum = MAP_NUM(CAVE_OF_ORIGIN_ENTRANCE),
        .landMonsInfo = &gCaveOfOrigin_Entrance_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(CAVE_OF_ORIGIN_1F),
        .mapNum = MAP_NUM(CAVE_OF_ORIGIN_1F),
        .landMonsInfo = &gCaveOfOrigin_1F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(CAVE_OF_ORIGIN_UNUSED_RUBY_SAPPHIRE_MAP1),
        .mapNum = MAP_NUM(CAVE_OF_ORIGIN_UNUSED_RUBY_SAPPHIRE_MAP1),
        .landMonsInfo = &gCaveOfOrigin_UnusedRubySapphireMap1_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(CAVE_OF_ORIGIN_UNUSED_RUBY_SAPPHIRE_MAP2),
        .mapNum = MAP_NUM(CAVE_OF_ORIGIN_UNUSED_RUBY_SAPPHIRE_MAP2),
        .landMonsInfo = NULL,//&gCaveOfOrigin_UnusedRubySapphireMap2_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(CAVE_OF_ORIGIN_UNUSED_RUBY_SAPPHIRE_MAP3),
        .mapNum = MAP_NUM(CAVE_OF_ORIGIN_UNUSED_RUBY_SAPPHIRE_MAP3),
        .landMonsInfo = &gCaveOfOrigin_UnusedRubySapphireMap3_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(NEW_MAUVILLE_ENTRANCE),
        .mapNum = MAP_NUM(NEW_MAUVILLE_ENTRANCE),
        .landMonsInfo = &gNewMauville_Entrance_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(SAFARI_ZONE_SOUTHWEST),
        .mapNum = MAP_NUM(SAFARI_ZONE_SOUTHWEST),
        .landMonsInfo = &gSafariZone_Southwest_LandMonsInfo,
        .waterMonsInfo = &gSafariZone_Southwest_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gSafariZone_Southwest_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(SAFARI_ZONE_NORTH),
        .mapNum = MAP_NUM(SAFARI_ZONE_NORTH),
        .landMonsInfo = &gSafariZone_North_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = &gSafariZone_North_RockSmashMonsInfo,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(SAFARI_ZONE_NORTHWEST),
        .mapNum = MAP_NUM(SAFARI_ZONE_NORTHWEST),
        .landMonsInfo = &gSafariZone_Northwest_LandMonsInfo,
        .waterMonsInfo = &gSafariZone_Northwest_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gSafariZone_Northwest_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(VICTORY_ROAD_B1F),
        .mapNum = MAP_NUM(VICTORY_ROAD_B1F),
        .landMonsInfo = &gVictoryRoad_B1F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = &gVictoryRoad_B1F_RockSmashMonsInfo,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(VICTORY_ROAD_B2F),
        .mapNum = MAP_NUM(VICTORY_ROAD_B2F),
        .landMonsInfo = &gVictoryRoad_B2F_LandMonsInfo,
        .waterMonsInfo = &gVictoryRoad_B2F_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gVictoryRoad_B2F_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(METEOR_FALLS_1F_1R),
        .mapNum = MAP_NUM(METEOR_FALLS_1F_1R),
        .landMonsInfo = &gMeteorFalls_1F_1R_LandMonsInfo,
        .waterMonsInfo = &gMeteorFalls_1F_1R_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gMeteorFalls_1F_1R_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(METEOR_FALLS_1F_2R),
        .mapNum = MAP_NUM(METEOR_FALLS_1F_2R),
        .landMonsInfo = &gMeteorFalls_1F_2R_LandMonsInfo,
        .waterMonsInfo = &gMeteorFalls_1F_2R_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gMeteorFalls_1F_2R_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(METEOR_FALLS_B1F_1R),
        .mapNum = MAP_NUM(METEOR_FALLS_B1F_1R),
        .landMonsInfo = &gMeteorFalls_B1F_1R_LandMonsInfo,
        .waterMonsInfo = &gMeteorFalls_B1F_1R_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gMeteorFalls_B1F_1R_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(SHOAL_CAVE_LOW_TIDE_STAIRS_ROOM),
        .mapNum = MAP_NUM(SHOAL_CAVE_LOW_TIDE_STAIRS_ROOM),
        .landMonsInfo = &gShoalCave_LowTideStairsRoom_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(SHOAL_CAVE_LOW_TIDE_LOWER_ROOM),
        .mapNum = MAP_NUM(SHOAL_CAVE_LOW_TIDE_LOWER_ROOM),
        .landMonsInfo = &gShoalCave_LowTideLowerRoom_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(SHOAL_CAVE_LOW_TIDE_INNER_ROOM),
        .mapNum = MAP_NUM(SHOAL_CAVE_LOW_TIDE_INNER_ROOM),
        .landMonsInfo = &gShoalCave_LowTideInnerRoom_LandMonsInfo,
        .waterMonsInfo = &gShoalCave_LowTideInnerRoom_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gShoalCave_LowTideInnerRoom_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(SHOAL_CAVE_LOW_TIDE_ENTRANCE_ROOM),
        .mapNum = MAP_NUM(SHOAL_CAVE_LOW_TIDE_ENTRANCE_ROOM),
        .landMonsInfo = &gShoalCave_LowTideEntranceRoom_LandMonsInfo,
        .waterMonsInfo = &gShoalCave_LowTideEntranceRoom_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gShoalCave_LowTideEntranceRoom_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(LILYCOVE_CITY),
        .mapNum = MAP_NUM(LILYCOVE_CITY),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gLilycoveCity_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gLilycoveCity_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(DEWFORD_TOWN),
        .mapNum = MAP_NUM(DEWFORD_TOWN),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gDewfordTown_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gDewfordTown_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(SLATEPORT_CITY),
        .mapNum = MAP_NUM(SLATEPORT_CITY),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gSlateportCity_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gSlateportCity_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(MOSSDEEP_CITY),
        .mapNum = MAP_NUM(MOSSDEEP_CITY),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gMossdeepCity_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gMossdeepCity_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(PACIFIDLOG_TOWN),
        .mapNum = MAP_NUM(PACIFIDLOG_TOWN),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gPacifidlogTown_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gPacifidlogTown_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(EVER_GRANDE_CITY),
        .mapNum = MAP_NUM(EVER_GRANDE_CITY),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gEverGrandeCity_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gEverGrandeCity_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(PETALBURG_CITY),
        .mapNum = MAP_NUM(PETALBURG_CITY),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gPetalburgCity_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gPetalburgCity_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(UNDERWATER1),
        .mapNum = MAP_NUM(UNDERWATER1),
        .landMonsInfo = NULL,
        .waterMonsInfo = &gUnderwater1_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(SHOAL_CAVE_LOW_TIDE_ICE_ROOM),
        .mapNum = MAP_NUM(SHOAL_CAVE_LOW_TIDE_ICE_ROOM),
        .landMonsInfo = &gShoalCave_LowTideIceRoom_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(SKY_PILLAR_1F),
        .mapNum = MAP_NUM(SKY_PILLAR_1F),
        .landMonsInfo = &gSkyPillar_1F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(SOOTOPOLIS_CITY),
        .mapNum = MAP_NUM(SOOTOPOLIS_CITY),
        .landMonsInfo = &gSootopolisCity_LandMonsInfo,
        .waterMonsInfo = &gSootopolisCity_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gSootopolisCity_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(SKY_PILLAR_3F),
        .mapNum = MAP_NUM(SKY_PILLAR_3F),
        .landMonsInfo = &gSkyPillar_3F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(SKY_PILLAR_5F),
        .mapNum = MAP_NUM(SKY_PILLAR_5F),
        .landMonsInfo = &gSkyPillar_5F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(SAFARI_ZONE_SOUTHEAST),
        .mapNum = MAP_NUM(SAFARI_ZONE_SOUTHEAST),
        .landMonsInfo = &gSafariZone_Southeast_LandMonsInfo,
        .waterMonsInfo = &gSafariZone_Southeast_WaterMonsInfo,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = &gSafariZone_Southeast_FishingMonsInfo,
    },
    {
        .mapGroup = MAP_GROUP(SAFARI_ZONE_NORTHEAST),
        .mapNum = MAP_NUM(SAFARI_ZONE_NORTHEAST),
        .landMonsInfo = &gSafariZone_Northeast_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = &gSafariZone_Northeast_RockSmashMonsInfo,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(MAGMA_HIDEOUT_1F),
        .mapNum = MAP_NUM(MAGMA_HIDEOUT_1F),
        .landMonsInfo = &gMagmaHideout_1F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(MAGMA_HIDEOUT_2F_1R),
        .mapNum = MAP_NUM(MAGMA_HIDEOUT_2F_1R),
        .landMonsInfo = &gMagmaHideout_2F_1R_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(MAGMA_HIDEOUT_2F_2R),
        .mapNum = MAP_NUM(MAGMA_HIDEOUT_2F_2R),
        .landMonsInfo = &gMagmaHideout_2F_2R_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(MAGMA_HIDEOUT_3F_1R),
        .mapNum = MAP_NUM(MAGMA_HIDEOUT_3F_1R),
        .landMonsInfo = &gMagmaHideout_3F_1R_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(MAGMA_HIDEOUT_3F_2R),
        .mapNum = MAP_NUM(MAGMA_HIDEOUT_3F_2R),
        .landMonsInfo = &gMagmaHideout_3F_2R_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(MAGMA_HIDEOUT_4F),
        .mapNum = MAP_NUM(MAGMA_HIDEOUT_4F),
        .landMonsInfo = &gMagmaHideout_4F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(MAGMA_HIDEOUT_3F_3R),
        .mapNum = MAP_NUM(MAGMA_HIDEOUT_3F_3R),
        .landMonsInfo = &gMagmaHideout_3F_3R_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(MAGMA_HIDEOUT_2F_3R),
        .mapNum = MAP_NUM(MAGMA_HIDEOUT_2F_3R),
        .landMonsInfo = &gMagmaHideout_2F_3R_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(MIRAGE_TOWER_1F),
        .mapNum = MAP_NUM(MIRAGE_TOWER_1F),
        .landMonsInfo = &gMirageTower_1F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(MIRAGE_TOWER_2F),
        .mapNum = MAP_NUM(MIRAGE_TOWER_2F),
        .landMonsInfo = &gMirageTower_2F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(MIRAGE_TOWER_3F),
        .mapNum = MAP_NUM(MIRAGE_TOWER_3F),
        .landMonsInfo = &gMirageTower_3F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(MIRAGE_TOWER_4F),
        .mapNum = MAP_NUM(MIRAGE_TOWER_4F),
        .landMonsInfo = &gMirageTower_4F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(DESERT_UNDERPASS),
        .mapNum = MAP_NUM(DESERT_UNDERPASS),
        .landMonsInfo = &gDesertUnderpass_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(ARTISAN_CAVE_B1F),
        .mapNum = MAP_NUM(ARTISAN_CAVE_B1F),
        .landMonsInfo = &gArtisanCave_B1F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(ARTISAN_CAVE_1F),
        .mapNum = MAP_NUM(ARTISAN_CAVE_1F),
        .landMonsInfo = &gArtisanCave_1F_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(ALTERING_CAVE),
        .mapNum = MAP_NUM(ALTERING_CAVE),
        .landMonsInfo = &gAlteringCave1_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(ALTERING_CAVE),
        .mapNum = MAP_NUM(ALTERING_CAVE),
        .landMonsInfo = &gAlteringCave2_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(ALTERING_CAVE),
        .mapNum = MAP_NUM(ALTERING_CAVE),
        .landMonsInfo = &gAlteringCave3_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(ALTERING_CAVE),
        .mapNum = MAP_NUM(ALTERING_CAVE),
        .landMonsInfo = &gAlteringCave4_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(ALTERING_CAVE),
        .mapNum = MAP_NUM(ALTERING_CAVE),
        .landMonsInfo = &gAlteringCave5_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(ALTERING_CAVE),
        .mapNum = MAP_NUM(ALTERING_CAVE),
        .landMonsInfo = &gAlteringCave6_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(ALTERING_CAVE),
        .mapNum = MAP_NUM(ALTERING_CAVE),
        .landMonsInfo = &gAlteringCave7_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(ALTERING_CAVE),
        .mapNum = MAP_NUM(ALTERING_CAVE),
        .landMonsInfo = &gAlteringCave8_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(ALTERING_CAVE),
        .mapNum = MAP_NUM(ALTERING_CAVE),
        .landMonsInfo = &gAlteringCave9_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(METEOR_FALLS_STEVENS_CAVE),
        .mapNum = MAP_NUM(METEOR_FALLS_STEVENS_CAVE),
        .landMonsInfo = &gMeteorFalls_StevensCave_LandMonsInfo,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = MAP_GROUP(UNDEFINED),
        .mapNum = MAP_NUM(UNDEFINED),
        .landMonsInfo = NULL,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
};

//Battle Pyramid-specific tables and headers start here.

const struct WildPokemon gBattlePyramidPlaceholders_1[] =
{
    {5, 5, SPECIES_BULBASAUR},
    {5, 5, SPECIES_BULBASAUR},
    {5, 5, SPECIES_BULBASAUR},
    {5, 5, SPECIES_BULBASAUR},
    {5, 5, SPECIES_IVYSAUR},
    {5, 5, SPECIES_IVYSAUR},
    {5, 5, SPECIES_VENUSAUR},
    {5, 5, SPECIES_VENUSAUR},
    {5, 5, SPECIES_VENUSAUR},
    {5, 5, SPECIES_CHARMANDER},
    {5, 5, SPECIES_VENUSAUR},
    {5, 5, SPECIES_CHARMANDER},
};

const struct WildPokemonInfo gBattlePyramidPlaceholders_1Info = {4, gBattlePyramidPlaceholders_1};

const struct WildPokemon gBattlePyramidPlaceholders_2[] =
{
    {5, 5, SPECIES_IVYSAUR},
    {5, 5, SPECIES_IVYSAUR},
    {5, 5, SPECIES_IVYSAUR},
    {5, 5, SPECIES_IVYSAUR},
    {5, 5, SPECIES_VENUSAUR},
    {5, 5, SPECIES_VENUSAUR},
    {5, 5, SPECIES_CHARMANDER},
    {5, 5, SPECIES_CHARMANDER},
    {5, 5, SPECIES_CHARMANDER},
    {5, 5, SPECIES_CHARMELEON},
    {5, 5, SPECIES_CHARMELEON},
    {5, 5, SPECIES_CHARMANDER},
};

const struct WildPokemonInfo gBattlePyramidPlaceholders_2Info = {4, gBattlePyramidPlaceholders_2};

const struct WildPokemon gBattlePyramidPlaceholders_3[] =
{
    {5, 5, SPECIES_VENUSAUR},
    {5, 5, SPECIES_VENUSAUR},
    {5, 5, SPECIES_VENUSAUR},
    {5, 5, SPECIES_VENUSAUR},
    {5, 5, SPECIES_CHARMANDER},
    {5, 5, SPECIES_CHARMANDER},
    {5, 5, SPECIES_CHARMELEON},
    {5, 5, SPECIES_CHARMELEON},
    {5, 5, SPECIES_CHARMELEON},
    {5, 5, SPECIES_CHARIZARD},
    {5, 5, SPECIES_CHARMELEON},
    {5, 5, SPECIES_CHARIZARD},
};

const struct WildPokemonInfo gBattlePyramidPlaceholders_3Info = {4, gBattlePyramidPlaceholders_3};

const struct WildPokemon gBattlePyramidPlaceholders_4[] =
{
    {5, 5, SPECIES_CHARMANDER},
    {5, 5, SPECIES_CHARMANDER},
    {5, 5, SPECIES_CHARMANDER},
    {5, 5, SPECIES_CHARMANDER},
    {5, 5, SPECIES_CHARMELEON},
    {5, 5, SPECIES_CHARMELEON},
    {5, 5, SPECIES_CHARIZARD},
    {5, 5, SPECIES_CHARIZARD},
    {5, 5, SPECIES_CHARIZARD},
    {5, 5, SPECIES_SQUIRTLE},
    {5, 5, SPECIES_CHARIZARD},
    {5, 5, SPECIES_SQUIRTLE},
};

const struct WildPokemonInfo gBattlePyramidPlaceholders_4Info = {4, gBattlePyramidPlaceholders_4};

const struct WildPokemon gBattlePyramidPlaceholders_5[] =
{
    {5, 5, SPECIES_CHARMELEON},
    {5, 5, SPECIES_CHARMELEON},
    {5, 5, SPECIES_CHARMELEON},
    {5, 5, SPECIES_CHARMELEON},
    {5, 5, SPECIES_CHARIZARD},
    {5, 5, SPECIES_CHARIZARD},
    {5, 5, SPECIES_SQUIRTLE},
    {5, 5, SPECIES_SQUIRTLE},
    {5, 5, SPECIES_SQUIRTLE},
    {5, 5, SPECIES_WARTORTLE},
    {5, 5, SPECIES_SQUIRTLE},
    {5, 5, SPECIES_WARTORTLE},
};

const struct WildPokemonInfo gBattlePyramidPlaceholders_5Info = {4, gBattlePyramidPlaceholders_5};

const struct WildPokemon gBattlePyramidPlaceholders_6[] =
{
    {5, 5, SPECIES_CHARIZARD},
    {5, 5, SPECIES_CHARIZARD},
    {5, 5, SPECIES_CHARIZARD},
    {5, 5, SPECIES_CHARMELEON},
    {5, 5, SPECIES_SQUIRTLE},
    {5, 5, SPECIES_SQUIRTLE},
    {5, 5, SPECIES_WARTORTLE},
    {5, 5, SPECIES_WARTORTLE},
    {5, 5, SPECIES_WARTORTLE},
    {5, 5, SPECIES_WARTORTLE},
    {5, 5, SPECIES_WARTORTLE},
    {5, 5, SPECIES_WARTORTLE},
};

const struct WildPokemonInfo gBattlePyramidPlaceholders_6Info = {4, gBattlePyramidPlaceholders_6};

const struct WildPokemon gBattlePyramidPlaceholders_7[] =
{
    {5, 5, SPECIES_WARTORTLE},
    {5, 5, SPECIES_WARTORTLE},
    {5, 5, SPECIES_SQUIRTLE},
    {5, 5, SPECIES_SQUIRTLE},
    {5, 5, SPECIES_SQUIRTLE},
    {5, 5, SPECIES_CHARIZARD},
    {5, 5, SPECIES_CHARIZARD},
    {5, 5, SPECIES_CHARIZARD},
    {5, 5, SPECIES_CHARMELEON},
    {5, 5, SPECIES_CHARMELEON},
    {5, 5, SPECIES_CHARMELEON},
    {5, 5, SPECIES_CHARMELEON},
};

const struct WildPokemonInfo gBattlePyramidPlaceholders_7Info = {8, gBattlePyramidPlaceholders_7};

const struct WildPokemonHeader gBattlePyramidWildMonHeaders[] =
{
    {
        .mapGroup = 0,
        .mapNum = 1,
        .landMonsInfo = &gBattlePyramidPlaceholders_1Info,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = 0,
        .mapNum = 2,
        .landMonsInfo = &gBattlePyramidPlaceholders_2Info,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = 0,
        .mapNum = 3,
        .landMonsInfo = &gBattlePyramidPlaceholders_3Info,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = 0,
        .mapNum = 4,
        .landMonsInfo = &gBattlePyramidPlaceholders_4Info,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = 0,
        .mapNum = 5,
        .landMonsInfo = &gBattlePyramidPlaceholders_5Info,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = 0,
        .mapNum = 6,
        .landMonsInfo = &gBattlePyramidPlaceholders_6Info,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = 0,
        .mapNum = 7,
        .landMonsInfo = &gBattlePyramidPlaceholders_7Info,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = 255,
        .mapNum = 255,
        .landMonsInfo = NULL,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
};

//Battle Pike-specific tables and headers start here.

const struct WildPokemon gBattlePikeMons_1[] =
{
    {5, 5, SPECIES_SEVIPER},
    {5, 5, SPECIES_MILOTIC},
    {5, 5, SPECIES_DUSCLOPS},
    {5, 5, SPECIES_DUSCLOPS},
    {5, 5, SPECIES_DUSCLOPS},
    {5, 5, SPECIES_DUSCLOPS},
    {5, 5, SPECIES_SEVIPER},
    {5, 5, SPECIES_MILOTIC},
    {5, 5, SPECIES_DUSCLOPS},
    {5, 5, SPECIES_DUSCLOPS},
    {5, 5, SPECIES_SEVIPER},
    {5, 5, SPECIES_MILOTIC},
};

const struct WildPokemonInfo gBattlePikeMonsInfo_1 = {10, gBattlePikeMons_1};

const struct WildPokemon gBattlePikeMons_2[] =
{
    {5, 5, SPECIES_SEVIPER},
    {5, 5, SPECIES_MILOTIC},
    {5, 5, SPECIES_ELECTRODE},
    {5, 5, SPECIES_ELECTRODE},
    {5, 5, SPECIES_ELECTRODE},
    {5, 5, SPECIES_ELECTRODE},
    {5, 5, SPECIES_SEVIPER},
    {5, 5, SPECIES_MILOTIC},
    {5, 5, SPECIES_ELECTRODE},
    {5, 5, SPECIES_ELECTRODE},
    {5, 5, SPECIES_SEVIPER},
    {5, 5, SPECIES_MILOTIC},
};

const struct WildPokemonInfo gBattlePikeMonsInfo_2 = {10, gBattlePikeMons_2};

const struct WildPokemon gBattlePikeMons_3[] =
{
    {5, 5, SPECIES_SEVIPER},
    {5, 5, SPECIES_MILOTIC},
    {5, 5, SPECIES_BRELOOM},
    {5, 5, SPECIES_BRELOOM},
    {5, 5, SPECIES_BRELOOM},
    {5, 5, SPECIES_BRELOOM},
    {5, 5, SPECIES_SEVIPER},
    {5, 5, SPECIES_MILOTIC},
    {5, 5, SPECIES_BRELOOM},
    {5, 5, SPECIES_BRELOOM},
    {5, 5, SPECIES_SEVIPER},
    {5, 5, SPECIES_MILOTIC},
};

const struct WildPokemonInfo gBattlePikeMonsInfo_3 = {10, gBattlePikeMons_3};

const struct WildPokemon gBattlePikeMons_4[] =
{
    {5, 5, SPECIES_SEVIPER},
    {5, 5, SPECIES_MILOTIC},
    {5, 5, SPECIES_WOBBUFFET},
    {5, 5, SPECIES_WOBBUFFET},
    {5, 5, SPECIES_WOBBUFFET},
    {5, 5, SPECIES_WOBBUFFET},
    {5, 5, SPECIES_SEVIPER},
    {5, 5, SPECIES_MILOTIC},
    {5, 5, SPECIES_WOBBUFFET},
    {5, 5, SPECIES_WOBBUFFET},
    {5, 5, SPECIES_SEVIPER},
    {5, 5, SPECIES_MILOTIC},
};

const struct WildPokemonInfo gBattlePikeMonsInfo_4 = {10, gBattlePikeMons_4};

const struct WildPokemonHeader gBattlePikeWildMonHeaders[] =
{
    {
        .mapGroup = 0,
        .mapNum = 1,
        .landMonsInfo = &gBattlePikeMonsInfo_1,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = 0,
        .mapNum = 2,
        .landMonsInfo = &gBattlePikeMonsInfo_2,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = 0,
        .mapNum = 3,
        .landMonsInfo = &gBattlePikeMonsInfo_3,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = 0,
        .mapNum = 4,
        .landMonsInfo = &gBattlePikeMonsInfo_4,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
    {
        .mapGroup = 255,
        .mapNum = 255,
        .landMonsInfo = NULL,
        .waterMonsInfo = NULL,
        .rockSmashMonsInfo = NULL,
        .fishingMonsInfo = NULL,
    },
};

//Special Feebas-related data.

const struct WildPokemon gWildFeebasRoute119Data = {20, 25, SPECIES_FEEBAS};

const u16 gRoute119WaterTileData[] =
{
    0, 0x2D, 0,
    0x2E, 0x5B, 0x83,
    0x5C, 0x8B, 0x12A,
};

