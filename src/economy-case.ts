/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {
    CS_Economy,
    CS_Item,
    CS_MAX_SEED,
    CS_MAX_WEAR,
    CS_MIN_SEED,
    CS_MIN_WEAR,
    CS_WEAR_FACTOR,
    CS_hasSeed,
    CS_hasStatTrak,
    CS_hasWear,
    CS_validateSeed,
    CS_validateStatTrak,
    CS_validateWear
} from "./economy.js";

export const CS_RARITY_COLORS: Record<string, string> = {
    "#b0c3d9": "common",
    "#5e98d9": "uncommon",
    "#4b69ff": "rare",
    "#8847ff": "mythical",
    "#d32ce6": "legendary",
    "#eb4b4b": "ancient",
    "#e4ae39": "immortal"
};

export const CS_RARITY_FOR_SOUNDS: Record<string, string> = {
    "#b0c3d9": "common",
    "#5e98d9": "uncommon",
    "#4b69ff": "rare",
    "#8847ff": "mythical",
    "#d32ce6": "legendary",
    "#eb4b4b": "ancient",
    "#e4ae39": "ancient" // immortal
};

export const CS_RARITY_COLOR_DEFAULT = 0;

export const CS_RARITY_COLOR_ORDER: Record<string, number | undefined> = {
    "#b0c3d9": 1,
    "#5e98d9": 2,
    "#4b69ff": 3,
    "#8847ff": 4,
    "#d32ce6": 5,
    "#eb4b4b": 6,
    "#e4ae39": 7
};

export const CS_RARITY_ORDER = [
    "common",
    "uncommon",
    "rare",
    "mythical",
    "legendary",
    "ancient",
    "immortal",
    "special"
];

export const CS_BASE_ODD = 0.8;
export const CS_STATTRAK_ODD = 1 / 10;

export function CS_randomFloat(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function CS_randomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function CS_getCaseContents(caseItem: CS_Item | number) {
    const { type, contents, specials } = typeof caseItem === "number" ? CS_Economy.getById(caseItem) : caseItem;
    if (type !== "case" || contents === undefined) {
        throw new Error("item is not a case");
    }
    const items: Record<string, CS_Item[]> = {};
    for (const id of contents) {
        const item = CS_Economy.getById(id);
        const rarity = CS_RARITY_COLORS[item.rarity];
        if (!items[rarity]) {
            items[rarity] = [];
        }
        items[rarity].push(item);
    }
    if (specials) {
        for (const id of specials) {
            const item = CS_Economy.getById(id);
            const rarity = "special";
            if (!items[rarity]) {
                items[rarity] = [];
            }
            items[rarity].push(item);
        }
    }
    return items;
}

export function CS_listCaseContents(caseItem: CS_Item | number, hideSpecialContents = false) {
    const { type, contents, specials } = typeof caseItem === "number" ? CS_Economy.getById(caseItem) : caseItem;
    if (type !== "case" || contents === undefined) {
        throw new Error("item is not a case");
    }
    const items = [...contents, ...(!hideSpecialContents && specials !== undefined ? specials : [])];
    return items
        .map((id) => CS_Economy.getById(id))
        .sort((a, b) => {
            return (
                (CS_RARITY_COLOR_ORDER[a.rarity] ?? CS_RARITY_COLOR_DEFAULT) -
                (CS_RARITY_COLOR_ORDER[b.rarity] ?? CS_RARITY_COLOR_DEFAULT)
            );
        });
}

/**
 * @see https://www.csgo.com.cn/news/gamebroad/20170911/206155.shtml
 */
export function CS_unlockCase(caseItem: CS_Item | number) {
    const items = CS_getCaseContents(caseItem);
    const keys = Object.keys(items);
    const rarities = CS_RARITY_ORDER.filter((rarity) => keys.includes(rarity));
    const odds = rarities.map((_, index) => CS_BASE_ODD / Math.pow(5, index));
    const total = odds.reduce((acc, cur) => acc + cur, 0);
    const entries = rarities.map((rarity, index) => [rarity, odds[index] / total] as const);
    const roll = Math.random();
    let [rollRarity] = entries[0];
    let acc = 0;
    for (const [rarity, odd] of entries) {
        acc += odd;
        if (roll <= acc) {
            rollRarity = rarity;
            break;
        }
    }
    const item = items[rollRarity][Math.floor(Math.random() * items[rollRarity].length)];
    return {
        attributes: {
            seed: CS_hasSeed(item) ? CS_randomInt(CS_MIN_SEED, CS_MAX_SEED) : undefined,
            stattrak: CS_hasStatTrak(item) ? (Math.random() <= CS_STATTRAK_ODD ? 0 : undefined) : undefined,
            wear: CS_hasWear(item)
                ? Number(
                      CS_randomFloat(item.wearmin ?? CS_MIN_WEAR, item.wearmax ?? CS_MAX_WEAR)
                          .toString()
                          .substring(0, CS_WEAR_FACTOR.toString().length)
                  )
                : undefined
        },
        id: item.id,
        rarity: CS_RARITY_FOR_SOUNDS[item.rarity],
        special: rollRarity === "special"
    };
}

export function CS_validateUnlockedItem(
    caseItem: number | CS_Item,
    { id, attributes: { seed, stattrak, wear } }: ReturnType<typeof CS_unlockCase>
) {
    caseItem = typeof caseItem === "number" ? CS_Economy.getById(caseItem) : caseItem;
    if (caseItem.type !== "case") {
        throw new Error("item is not a case.");
    }
    if (!caseItem.contents?.includes(id) && !caseItem.specials?.includes(id)) {
        throw new Error("unlocked item is not from this case.");
    }
    const item = CS_Economy.getById(id);
    if (seed !== undefined) {
        CS_validateSeed(seed, item);
    }
    if (stattrak !== undefined) {
        CS_validateStatTrak(stattrak, item);
    }
    if (wear !== undefined) {
        CS_validateWear(wear, item);
    }
}
