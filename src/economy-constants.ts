/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { CS2ItemType, CS2ItemTypeValues } from "./economy-types.js";
import { CS2Team } from "./teams.js";

export const CS2_MIN_STATTRAK = 0;
export const CS2_MAX_STATTRAK = 999999;

export const CS2_MIN_WEAR = 0;
export const CS2_MAX_WEAR = 1;
export const CS2_DEFAULT_MIN_WEAR = 0.06;
export const CS2_DEFAULT_MAX_WEAR = 0.8;
export const CS2_MIN_FACTORY_NEW_WEAR = CS2_MIN_WEAR;
export const CS2_MAX_FACTORY_NEW_WEAR = 0.07;
export const CS2_MIN_MINIMAL_WEAR_WEAR = 0.070001;
export const CS2_MAX_MINIMAL_WEAR_WEAR = 0.15;
export const CS2_MIN_FIELD_TESTED_WEAR = 0.150001;
export const CS2_MAX_FIELD_TESTED_WEAR = 0.37;
export const CS2_MIN_WELL_WORN_WEAR = 0.370001;
export const CS2_MAX_WELL_WORN_WEAR = 0.44;
export const CS2_MIN_BATTLE_SCARRED_WEAR = 0.440001;
export const CS2_MAX_BATTLE_SCARRED_WEAR = CS2_MAX_WEAR;
export const CS2_MIN_SEED = 1;
export const CS2_MAX_SEED = 1000;
export const CS2_MIN_STICKER_WEAR = 0;
export const CS2_MAX_STICKER_WEAR = 0.9;
export const CS2_MAX_STICKERS = 5;

export const CS2_NONE = 0;
export const CS2_STICKER_WEAR_FACTOR = 0.1;
export const CS2_WEAR_FACTOR = 0.000001;

export const CS2_NAMETAG_RE = /^[A-Za-z0-9`!@#$%^&*-+=(){}\[\]\/\|\\,.?:;'_\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\s]{0,20}$/u;

export const CS2_NAMETAG_TOOL_DEF = 1200;
export const CS2_STATTRAK_SWAP_TOOL_DEF = 1324;
export const CS2_STORAGE_UNIT_TOOL_DEF = 1201;

export const CS2_NAMETAGGABLE_ITEMS: CS2ItemTypeValues[] = [CS2ItemType.Melee, CS2ItemType.Weapon];
export const CS2_SEEDABLE_ITEMS: CS2ItemTypeValues[] = [CS2ItemType.Weapon, CS2ItemType.Melee, CS2ItemType.Gloves];
export const CS2_STATTRAKABLE_ITEMS: CS2ItemTypeValues[] = [CS2ItemType.Melee, CS2ItemType.Weapon, CS2ItemType.MusicKit];
export const CS2_STICKERABLE_ITEMS: CS2ItemTypeValues[] = [CS2ItemType.Weapon];
export const CS2_WEARABLE_ITEMS: CS2ItemTypeValues[] = [CS2ItemType.Gloves, CS2ItemType.Melee, CS2ItemType.Weapon];

export const CS2_CONTAINER_OR_TOOL_ITEM: CS2ItemTypeValues[] = [CS2ItemType.Container, CS2ItemType.Tool];

export const CS2_TEAMS_BOTH = [CS2Team.T, CS2Team.CT];
export const CS2_TEAMS_CT = [CS2Team.CT];
export const CS2_TEAMS_T = [CS2Team.T];