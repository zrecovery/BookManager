<script lang="ts">
	import { Button } from 'fluent-svelte';

	export let limit = 25;
	export let currentPage = 0;

	function nextPage() {
		currentPage += 1;
	}

	function prevPage() {
		currentPage -= 1;
	}

	export let rowNumber: number;

	$: bookTotalPage = Math.ceil(rowNumber / limit);
</script>

<div id="pagination" style="display: grid; align-content: center;justify-content: center;">
	<Button style="grid-column-start: var(--prev-button-column-start);" on:click={prevPage}>上一页</Button>
	<p style="grid-column-start: var(--page-column-start);">{currentPage}/{bookTotalPage}</p>
	<Button style="grid-column-start: var(--next-button-column-start); " on:click={nextPage}>下一页</Button>
</div>

<style>
  
  
	@media (min-width: 1200px) {
		:root {
			--pagination-grid-columns: repeat(12, 1fr);
      --prev-button-column-start: 3;
      --page-column-start: 9;
      --next-button-column-start: 12;
		}
	}

	@media (max-width: 800px) {
		:root {
			--pagination-grid-columns: repeat(9, 1fr);
      --prev-button-column-start: 3;
      --page-column-start: 5;
      --next-button-column-start: 7;

		}
	}

	#pagination {
		display: grid;
		grid-auto-columns: var(--pagination-grid-columns);
	}
</style>
