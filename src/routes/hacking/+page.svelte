<script lang="ts">
	interface WordEntry {
		word: string;
		likeness: number;
	}

	let words: WordEntry[] = $state([]);
	let newWord = $state('');
	let newLikeness = $state(0);
	let solution: string | null = $state(null);

	function addWord() {
		if (newWord.trim()) {
			words.push({ word: newWord.toUpperCase(), likeness: newLikeness });
			words = words;
			newWord = '';
			newLikeness = 0;
		}
	}

	function removeWord(index: number) {
		words.splice(index, 1);
		words = words;
	}

	function solve() {
		if (words.length === 0) {
			solution = 'No words entered';
			return;
		}
		// Placeholder for solver logic
		solution = 'Solver logic to be implemented';
	}

	function reset() {
		words = [];
		solution = null;
		newWord = '';
		newLikeness = 0;
	}
</script>

<div class="max-w-4xl mx-auto">
	<div class="border-2 border-fo4-green p-6 bg-fo4-black mb-6">
		<h2 class="text-2xl font-bold text-fo4-green-light mb-2">HACKING TERMINAL</h2>
		<p class="text-sm opacity-75">Enter candidate words and their likeness values to solve the puzzle.</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Input Panel -->
		<div class="lg:col-span-2 border-2 border-fo4-green p-6 bg-fo4-black">
			<h3 class="text-lg font-bold text-fo4-green-light mb-4">WORD INPUT</h3>

			<div class="space-y-4 mb-6">
				<div>
					<label for="word-input" class="block text-sm mb-2">Word:</label>
					<input
						id="word-input"
						type="text"
						bind:value={newWord}
						placeholder="Enter word"
						class="w-full bg-fo4-dark border-2 border-fo4-green text-fo4-green p-2 placeholder-fo4-green placeholder-opacity-50"
					/>
				</div>

				<div>
					<label for="likeness-input" class="block text-sm mb-2">Likeness:</label>
					<input
						id="likeness-input"
						type="number"
						bind:value={newLikeness}
						min="0"
						placeholder="0"
						class="w-full bg-fo4-dark border-2 border-fo4-green text-fo4-green p-2"
					/>
				</div>

				<button
					onclick={addWord}
					class="w-full bg-fo4-dark border-2 border-fo4-green text-fo4-green p-2 hover:bg-fo4-green hover:text-fo4-black transition font-bold"
				>
					ADD WORD
				</button>
			</div>

			<!-- Word List -->
			<h3 class="text-lg font-bold text-fo4-green-light mb-4">CANDIDATE WORDS</h3>
			<div class="space-y-2 mb-6 max-h-64 overflow-y-auto">
				{#each words as word, index}
					<div class="flex justify-between items-center bg-fo4-dark border-2 border-fo4-green p-3">
						<span>{word.word} (Likeness: {word.likeness})</span>
						<button
							onclick={() => removeWord(index)}
							class="bg-fo4-green text-fo4-black px-3 py-1 hover:opacity-75 transition font-bold"
						>
							DEL
						</button>
					</div>
				{/each}
				{#if words.length === 0}
					<p class="text-sm opacity-50">No words added yet</p>
				{/if}
			</div>

			<div class="flex gap-2">
				<button
					onclick={solve}
					class="flex-1 bg-fo4-dark border-2 border-fo4-green text-fo4-green p-3 hover:bg-fo4-green hover:text-fo4-black transition font-bold"
				>
					SOLVE
				</button>
				<button
					onclick={reset}
					class="flex-1 bg-fo4-dark border-2 border-fo4-green text-fo4-green p-3 hover:bg-fo4-green hover:text-fo4-black transition font-bold"
				>
					RESET
				</button>
			</div>
		</div>

		<!-- Solution Panel -->
		<div class="border-2 border-fo4-green p-6 bg-fo4-black">
			<h3 class="text-lg font-bold text-fo4-green-light mb-4">SOLUTION</h3>
			{#if solution}
				<div class="bg-fo4-dark border-2 border-fo4-green p-4 text-center">
					<p class="text-sm opacity-75 mb-2">PASSWORD:</p>
					<p class="text-2xl font-bold text-fo4-green-light">{solution}</p>
				</div>
			{:else}
				<p class="text-sm opacity-50">Enter words and click SOLVE to find the password.</p>
			{/if}
		</div>
	</div>
</div>
