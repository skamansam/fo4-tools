import { writable } from 'svelte/store';

export interface PerkRank {
	perkId: string;
	currentRank: number; // 0 = not selected, 1-5 = rank level
}

export interface PerkStore {
	perks: Map<string, number>;
}

function createPerkStore() {
	const { subscribe, set, update } = writable<Map<string, number>>(new Map());

	return {
		subscribe,
		setPerkRank: (perkId: string, rank: number) =>
			update((perks) => {
				const newPerks = new Map(perks);
				if (rank === 0) {
					newPerks.delete(perkId);
				} else {
					newPerks.set(perkId, Math.max(0, Math.min(5, rank)));
				}
				return newPerks;
			}),
		getPerkRank: (perkId: string) => {
			let rank = 0;
			subscribe((perks) => {
				rank = perks.get(perkId) || 0;
			})();
			return rank;
		},
		reset: () => set(new Map())
	};
}

export const perkStore = createPerkStore();
