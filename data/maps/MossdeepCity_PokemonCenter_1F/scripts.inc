MossdeepCity_PokemonCenter_1F_MapScripts:: @ 822223F
	map_script MAP_SCRIPT_ON_LOAD, MossdeepCity_PokemonCenter_1F_OnLoad
	map_script MAP_SCRIPT_ON_TRANSITION, MossdeepCity_PokemonCenter_1F_OnTransition
	map_script MAP_SCRIPT_ON_RESUME, MossdeepCity_PokemonCenter_1F_MapScript1_277C30
	.byte 0

MossdeepCity_PokemonCenter_1F_OnLoad:
	@ Set the PC to "On"
	setmetatile 3, 3, 0x5, 1
	return

MossdeepCity_PokemonCenter_1F_OnTransition: @ 822224A
	setrespawn HEAL_LOCATION_MOSSDEEP_CITY
	end

@ -----------------------------------------------------

MossdeepCity_PokemonCenter_1F_NurseScript:: @ 822224E
	setvar VAR_0x800B, 1
	goto PokemonCenter_1F_NurseHealScript
	end


MossdeepCity_Mart_MartScript:: @ 82223C8
	lock
	faceplayer
	markasdialog
	message gText_Mart_Welcome
	waitmessage
	pokemart MossdeepCity_Mart_Pokemart_2223E0
	msgbox gText_Mart_Goodbye, MSGBOX_DIALOG
	release
	end

	.align 2
MossdeepCity_Mart_Pokemart_2223E0: @ 82223E0
	.2byte ITEM_ULTRA_BALL
	.2byte ITEM_NET_BALL
	.2byte ITEM_DIVE_BALL
	.2byte ITEM_HYPER_POTION
	.2byte ITEM_ELIXIR
	.2byte ITEM_MAX_ETHER
	.2byte ITEM_FULL_HEAL
	@ .2byte ITEM_REVIVE
	.2byte ITEM_MAX_REPEL
	.2byte ITEM_X_ATTACK
	.2byte ITEM_X_DEFEND
	.2byte ITEM_NONE
	release
	end

@ -----------------------------------------------------

MossdeepCity_Mart_EventScript_2223F6:: @ 82223F6
	msgbox MossdeepCity_Mart_Text_222411, MSGBOX_NPC
	end
MossdeepCity_Mart_Text_222411: @ 8222411
	@ TODO REMOVE
	.string "Revive is fantastic!\p"
	.string "Give it to a fainted Pokémon,\n"
	.string "and the Pokémon will arise.\p"
	.string "But be careful, Revive doesn't restore\n"
	.string "the used-up PP of moves.$"


MossdeepCity_Mart_EventScript_2223FF:: @ 82223FF
	msgbox MossdeepCity_Mart_Text_2224A0, MSGBOX_NPC
	end
MossdeepCity_Mart_Text_2224A0: @ 82224A0
	.string "Max Repel keeps all weak Pokémon away.\p"
	.string "Out of all the Repel sprays, it lasts\n"
	.string "the longest.$"


MossdeepCity_Mart_EventScript_222408:: @ 8222408
	msgbox MossdeepCity_Mart_Text_2224FA, MSGBOX_NPC
	end
MossdeepCity_Mart_Text_2224FA: @ 82224FA
	.string "The Net and Dive Balls are rare Poké\n"
	.string "Balls that are only made in Mossdeep.\p"
	.string "A Net BALL is effective against\n"
	.string "Bug-type and Water-type Pokémon.\p"
	.string "A Dive Ball works best on Pokémon\n"
	.string "at the bottom of the sea.$"


MossdeepCity_PokemonCenter_1F_EventScript_22225C:: @ 822225C
	msgbox MossdeepCity_PokemonCenter_1F_Text_22226E, MSGBOX_NPC
	end
MossdeepCity_PokemonCenter_1F_Text_22226E: @ 822226E
	.string "The Gym Leaders in this town are\n"
	.string "a formidable duo.\p"
	.string "Their combination attacks are, like,\n"
	.string "excellent and wow!$"


MossdeepCity_PokemonCenter_1F_EventScript_222265:: @ 8222265
	msgbox MossdeepCity_PokemonCenter_1F_Text_2222D9, MSGBOX_NPC
	end
MossdeepCity_PokemonCenter_1F_Text_2222D9: @ 82222D9
	.string "Depending on the special abilities of\n"
	.string "Pokémon, some moves might change\l"
	.string "or not work at all.$"


MossdeepCity_PokemonCenter_1F_PC::
	lockall
	goto_if_unset FLAG_TEMP_4, MossdeepCity_PokemonCenter_1F_PC_Bucket
	msgbox MossdeepCity_PokemonCenter_1F_PC_Text_Bucket_Repeat, MSGBOX_DEFAULT
	releaseall
	end
MossdeepCity_PokemonCenter_1F_PC_Bucket:
	msgbox MossdeepCity_PokemonCenter_1F_PC_Text_Bucket_Part_1, MSGBOX_DEFAULT
	applymovement EVENT_OBJ_ID_PLAYER, MossdeepCity_PokemonCenter_1F_PC_Bucket_Movement_Incredulous
	msgbox MossdeepCity_PokemonCenter_1F_PC_Text_Bucket_Part_2, MSGBOX_DEFAULT
	applymovement EVENT_OBJ_ID_PLAYER, MossdeepCity_PokemonCenter_1F_PC_Bucket_Movement_Curious
	msgbox MossdeepCity_PokemonCenter_1F_PC_Text_Bucket_Part_3, MSGBOX_DEFAULT
	applymovement EVENT_OBJ_ID_PLAYER, MossdeepCity_PokemonCenter_1F_PC_Bucket_Movement_Curious
	msgbox MossdeepCity_PokemonCenter_1F_PC_Text_Bucket_Part_4, MSGBOX_DEFAULT
	applymovement EVENT_OBJ_ID_PLAYER, MossdeepCity_PokemonCenter_1F_PC_Bucket_Movement_Incredulous
	msgbox MossdeepCity_PokemonCenter_1F_PC_Text_Bucket_Part_5, MSGBOX_DEFAULT
	goto_if_unset FLAG_RECEIVED_WAILMER_PAIL, MossdeepCity_PokemonCenter_1F_PC_No_Pail
	msgbox MossdeepCity_PokemonCenter_1F_PC_Text_Bucket_Have_Pail, MSGBOX_DEFAULT
MossdeepCity_PokemonCenter_1F_PC_Ending:
	applymovement EVENT_OBJ_ID_PLAYER, MossdeepCity_PokemonCenter_1F_PC_Bucket_Movement_Curious
	msgbox MossdeepCity_PokemonCenter_1F_PC_Text_Bucket_Part_6, MSGBOX_DEFAULT
	setflag FLAG_TEMP_4
	releaseall
	end
MossdeepCity_PokemonCenter_1F_PC_No_Pail:
	msgbox MossdeepCity_PokemonCenter_1F_PC_Text_Bucket_No_Pail, MSGBOX_DEFAULT
	goto MossdeepCity_PokemonCenter_1F_PC_Ending
MossdeepCity_PokemonCenter_1F_PC_Bucket_Movement_Incredulous:
	face_down
	step_end
MossdeepCity_PokemonCenter_1F_PC_Bucket_Movement_Curious:
	face_up
	step_end
MossdeepCity_PokemonCenter_1F_PC_Text_Bucket_Part_1:
	.string "I don't quite know how to tell you this,\n"
	.string "{PLAYER}, but that PC\l"
	.string "is actually a bucket.$"
MossdeepCity_PokemonCenter_1F_PC_Text_Bucket_Part_2:
	.string "Oh, don't give me that look.\n"
	.string "I have no explanation for you.\l"
	.string "I've no idea how a PC can be a bucket.\p"
	.string "Look, all it says right here is:\n"
	.string "“There's a PC in the corner, but\l"
	.string "it's actually a bucket.”\l"
	.string "End of quote. It's all I have.\p"
	.string "It doesn't say {REF}why{END} it's a bucket.\n"
	.string "It doesn't say {ACTOR}how{END} it could be\l"
	.string "a bucket. It just says that it {GYM}is{END}.$"
MossdeepCity_PokemonCenter_1F_PC_Text_Bucket_Part_3:
	.string "I'm sorry, {PLAYER}. I really am.\n"
	.string "I know you've been looking all over\l"
	.string "for a usable PC for this entire game.\p"
	.string "And here we are, finally a PC with no\n"
	.string "excuse, and it turns out to be a bucket.\p"
	.string "It's a very convincing PC, what with the\n"
	.string "glowing screen and whirring noises,\l"
	.string "but it unfortunately is just a bucket.\p"
	.string "It could carry your {POKEMON} for you,\n"
	.string "but only insomuch as you can fit them\l"
	.string "inside the physical confines of the\l"
	.string "machine. It cannot access the {POKEMON}\l"
	.string "Storage System for you.\p"
	.string "Frankly, there is no such thing.\n"
	.string "It's been deleted.\l"
	.string "Released, as you might say.\l"
	.string "Sorry to rub it in like that.\p"
	.string "I hoped that the man in {PLACE}Petalburg{END}\n"
	.string "would have convinced you, but there is\l"
	.string "absolutely no way to get your {POKEMON}\l"
	.string "back. That's how it is. That's life.$"
MossdeepCity_PokemonCenter_1F_PC_Text_Bucket_Part_4:
	.string "Besides, this PC isn't even a very\n"
	.string "good bucket to begin with.\p"
	.string "If you filled it with water, it'd leak\n"
	.string "out all the vent holes! Not to mention\l"
	.string "the electrocution risk. An absolute\l"
	.string "travesty of a bucket this thing is.$"
MossdeepCity_PokemonCenter_1F_PC_Text_Bucket_Part_5:
	.string "Take it with- {BOLD}Take it with you!?{END}\p"
	.string "No of course you can't take it with you.\n"
	.string "It's bolted to the wall. Besides,\l"
	.string "I doubt the {ACTOR}Nurse{END} would let you walk off\l"
	.string "with her PC. Sure, you and I know it's\l"
	.string "a bucket, but how would you convince\l"
	.string "anyone else? No no, it'd never work.$"
MossdeepCity_PokemonCenter_1F_PC_Text_Bucket_Have_Pail:
	.string "Besides, what use have you for a leaky\n"
	.string "bucket? You already have a perfectly\l"
	.string "good {ITEM}Wailmer Pail{END}.$"
MossdeepCity_PokemonCenter_1F_PC_Text_Bucket_No_Pail:
	.string "Listen, if you really want a bucket,\n"
	.string "just head back to {PLACE}Route 104{END} and\l"
	.string "visit the {PLACE}Pretty Petal Flower Shop{END}.\l"
	.string "You can get the {ITEM}Wailmer Pail{END} there.\l"
	.string "It's a much better bucket than this one.$"
MossdeepCity_PokemonCenter_1F_PC_Text_Bucket_Part_6:
	.string "Let's leave the bucket alone,\n"
	.string "{PLAYER}. After all,\l"
	.string "you've got a game to get back to.\p"
	.string "I'll be pulling for you every\n"
	.string "step of the way.\p"
	.string "Hurry along now! Good luck!$"

MossdeepCity_PokemonCenter_1F_PC_Text_Bucket_Repeat:
	.string "Yes, somehow it's still a bucket.$"

MossdeepCity_PokemonCenter_1F_PC_Text_Rick_Astley:
	.string "There's a music video playing on loop.\p"
	.string "A man is dancing and singing about how\n"
	.string "he intends to never give up someone,\l"
	.string "nor let them down,\l"
	.string "nor run them around,\l"
	.string "and desert them.$"
