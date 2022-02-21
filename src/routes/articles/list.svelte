<script lang="ts">
	import { liveQuery } from 'dexie';
	import { articleStore } from '$lib/databases/db';
	import { TextBox, ListItem, Button } from 'fluent-svelte';

	var searchKey = '';
	let limit = 25;
	let currentPage = 0;

	$: offset = currentPage * limit;

	function nextPage() {
		currentPage += 1;
	}

	function prevPage(){
		currentPage -= 1;
	}

	$: articles = liveQuery(async () => {
		return await articleStore.query(searchKey, offset, limit);
	});

</script>

<TextBox placeholder="关键词" type="text" bind:value={searchKey} />

{#if $articles}
    {#each $articles as article}
        <ListItem href="/articles/{article.id}">
            {article.title}
        </ListItem>
    {/each}
{/if}
<div style="display: grid; grid-template-columns: repeat(12,1fr);">
	<Button style="grid-column-start: 10" on:click={prevPage}>Prev</Button>
	<Button style="grid-column-start: 12" on:click={nextPage}>Next</Button>
</div>

<style>
	@import url('https://unpkg.com/fluent-svelte/theme.css');
</style>
