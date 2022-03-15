<script lang="ts">
	import { liveQuery } from 'dexie';
	import { articleStore } from '$lib/databases/db';
	import { TextBox, ListItem } from 'fluent-svelte';
	import Pagination from '$lib/Pagination/Pagination.svelte';

	var searchKey = '';
	let limit = 15;
	let currentPage = 0;

	$: offset = currentPage * limit;

	$: bookNumber = liveQuery(async () => {
		return await articleStore.count(searchKey);
	});

	$: articles = liveQuery(async () => {
		return await articleStore.query(searchKey, offset, limit);
	});
</script>

<TextBox
	placeholder="关键词"
	type="text"
	bind:value={searchKey}
	style="-webkit-user-select: text;"
/>

{#if $articles}
	{#each $articles as article}
		<ListItem href="/articles/{article.id}">
			{article.title}
		</ListItem>
	{/each}
{/if}
<Pagination {limit} rowNumber={$bookNumber} bind:currentPage />
