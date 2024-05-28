/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { CS2RarityColorValues } from "./economy-container.js";
import { EnumValues } from "./utils.js";

export const CS2ItemTeam = {
    T: 0,
    CT: 1,
    Both: 2
} as const;

export type CS2ItemTeamValues = EnumValues<typeof CS2ItemTeam>;

export const CS2ItemType = {
    Agent: "agent",
    Collectible: "collectible",
    Container: "container",
    ContainerKey: "containerkey",
    Gloves: "gloves",
    Graffiti: "graffiti",
    Melee: "melee",
    MusicKit: "musickit",
    Patch: "patch",
    Sticker: "sticker",
    Stub: "stub",
    Tool: "tool",
    Weapon: "weapon"
} as const;

export type CS2ItemTypeValues = EnumValues<typeof CS2ItemType>;

export const CS2ItemWear = {
    FactoryNew: 0,
    MinimalWear: 1,
    FieldTested: 2,
    WellWorn: 3,
    BattleScarred: 4
} as const;

export type CS2ItemWearValues = EnumValues<typeof CS2ItemWear>;

export const CS2ContainerType = {
    WeaponCase: 0,
    StickerCapsule: 1,
    GraffitiBox: 2,
    SouvenirCase: 3
} as const;

export type CS2ContainerTypeValues = EnumValues<typeof CS2ContainerType>;

export interface CS2Item {
    altName?: string | undefined;
    base?: boolean | undefined;
    baseId?: number | undefined;
    category?: string | undefined;
    collection?: string | undefined;
    containerType?: CS2ContainerTypeValues | undefined;
    contents?: number[] | undefined;
    def?: number | undefined;
    free?: boolean | undefined;
    id: number;
    image?: string | undefined;
    index?: number | undefined;
    keys?: number[] | undefined;
    legacy?: boolean | undefined;
    model?: string | undefined;
    rarity?: CS2RarityColorValues | undefined;
    specials?: number[] | undefined;
    specialsImage?: boolean | undefined;
    statTrakless?: boolean | undefined;
    statTrakOnly?: boolean | undefined;
    teams?: CS2ItemTeamValues | undefined;
    tint?: number | undefined;
    type: CS2ItemTypeValues;
    voFallback?: boolean | undefined;
    voFemale?: boolean | undefined;
    voPrefix?: string | undefined;
    wearMax?: number | undefined;
    wearMin?: number | undefined;
}

export interface CS2ItemLocalization {
    category?: string | undefined;
    collectionDesc?: string | undefined;
    collectionName?: string | undefined;
    desc?: string | undefined;
    name: string;
    tournamentDesc?: string | undefined;
}

export type CS2ItemLocalizationMap = Record<number, CS2ItemLocalization | undefined>;
export type CS2ItemLocalizationByLanguage = Record<string, CS2ItemLocalizationMap>;
