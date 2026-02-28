/**
 * Perk Calculator - Computes weapon and armor stat modifications based on active perks
 */

export interface PerkEffect {
	rank: number;
	damageBonus?: number;
	resistanceBonus?: number;
	energyResistanceBonus?: number;
	fireRateBonus?: number;
	accuracyBonus?: number;
	carryWeightBonus?: number;
	specialDescription?: string;
}

export interface WeaponPerkModifier {
	perkId: string;
	weaponTypes: string[];
	effects: PerkEffect[];
}

export interface ArmorPerkModifier {
	perkId: string;
	armorTypes: string[];
	effects: PerkEffect[];
}

/**
 * Calculate total damage bonus from active perks for a weapon
 */
export function calculateWeaponDamageBonus(
	weaponType: string,
	activePerkRanks: Map<string, number>,
	weaponPerkModifiers: WeaponPerkModifier[]
): number {
	let totalBonus = 1; // 1 = 0% bonus, 1.5 = 50% bonus

	for (const modifier of weaponPerkModifiers) {
		const perkRank = activePerkRanks.get(modifier.perkId) || 0;
		if (perkRank > 0 && modifier.weaponTypes.includes(weaponType)) {
			const effect = modifier.effects.find((e) => e.rank === perkRank);
			if (effect?.damageBonus) {
				totalBonus *= 1 + effect.damageBonus;
			}
		}
	}

	return totalBonus;
}

/**
 * Calculate total armor resistance bonus from active perks
 */
export function calculateArmorResistanceBonus(
	armorType: string,
	activePerkRanks: Map<string, number>,
	armorPerkModifiers: ArmorPerkModifier[]
): { resistance: number; energyResistance: number } {
	let resistanceBonus = 0;
	let energyResistanceBonus = 0;

	for (const modifier of armorPerkModifiers) {
		const perkRank = activePerkRanks.get(modifier.perkId) || 0;
		if (perkRank > 0 && modifier.armorTypes.includes(armorType)) {
			const effect = modifier.effects.find((e) => e.rank === perkRank);
			if (effect?.resistanceBonus) {
				resistanceBonus += effect.resistanceBonus;
			}
			if (effect?.energyResistanceBonus) {
				energyResistanceBonus += effect.energyResistanceBonus;
			}
		}
	}

	return { resistance: resistanceBonus, energyResistance: energyResistanceBonus };
}

/**
 * Calculate final weapon stats with perk bonuses
 */
export function calculateFinalWeaponStats(
	baseDamage: number,
	weaponType: string,
	activePerkRanks: Map<string, number>,
	weaponPerkModifiers: WeaponPerkModifier[]
): number {
	const damageMultiplier = calculateWeaponDamageBonus(weaponType, activePerkRanks, weaponPerkModifiers);
	return Math.round(baseDamage * damageMultiplier);
}

/**
 * Calculate final armor stats with perk bonuses
 */
export function calculateFinalArmorStats(
	baseResistance: number,
	baseEnergyResistance: number,
	armorType: string,
	activePerkRanks: Map<string, number>,
	armorPerkModifiers: ArmorPerkModifier[]
): { resistance: number; energyResistance: number } {
	const bonuses = calculateArmorResistanceBonus(armorType, activePerkRanks, armorPerkModifiers);
	return {
		resistance: baseResistance + bonuses.resistance,
		energyResistance: baseEnergyResistance + bonuses.energyResistance
	};
}
