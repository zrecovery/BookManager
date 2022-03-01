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

<div
	style="display: grid; grid-template-columns: repeat(12,1fr);align-content: center;justify-content: center;"
>
	<Button style="grid-column-start: 9;" on:click={prevPage}>上一页</Button>
	<p style="grid-column-start: 10;">{currentPage}/{bookTotalPage}</p>
	<Button style="grid-column-start: 12; " on:click={nextPage}>下一页</Button>
</div>
