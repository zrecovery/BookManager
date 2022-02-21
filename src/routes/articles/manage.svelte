<script lang="ts">
	import { liveQuery } from 'dexie';
	import type Article from '$lib/databases/article';
	import { articleStore } from '$lib/databases/db';
	import { TextBox, Button } from 'fluent-svelte';
	$: indeterminate = selectedArticles.length > 0;
	$: groupChecked = selectedArticles.length === 25;

	var searchKey = '';
	let limit = 25;
	let currentPage = 0;

	let selectedArticles: Article[] = [];
	$: offset = currentPage * limit;

	$: articles = liveQuery(async () => {
		return await articleStore.query(searchKey, offset, limit);
	});

	async function articlesDelete() {
		console.log(selectedArticles);
		Promise.all(
			selectedArticles.map(async (article: Article) => {
				console.log(article);
				return await articleStore.remove(article.id);
			})
		);
		selectedArticles = [];
	}
</script>

<TextBox placeholder="关键词" type="text" bind:value={searchKey} />

{#if $articles}
	<fluent-data-grid generate-header="none" style="overflow-y: auto;">
		<fluent-data-grid-row
			row-type="header"
			id="defaultHeader"
			grid-template-columns="repeat(5,1fr)"
		>
			<fluent-data-grid-cell cell-type="columnheader" grid-column="1"
				><input type="checkbox" checked={groupChecked} {indeterminate} /></fluent-data-grid-cell
			>
			<fluent-data-grid-cell cell-type="columnheader" grid-column="2">标题</fluent-data-grid-cell>
			<fluent-data-grid-cell cell-type="columnheader" grid-column="3">系列</fluent-data-grid-cell>
			<fluent-data-grid-cell cell-type="columnheader" grid-column="4">作者</fluent-data-grid-cell>
			<fluent-data-grid-cell cell-type="columnheader" grid-column="5">顺序</fluent-data-grid-cell>
		</fluent-data-grid-row>

		{#each $articles as article}
			<fluent-data-grid-row grid-template-columns="repeat(5,1fr)">
				<fluent-data-grid-cell grid-column="1"
					><input
						type="checkbox"
						bind:group={selectedArticles}
						value={article}
					/></fluent-data-grid-cell
				>
				<fluent-data-grid-cell grid-column="2"
					><a href="/articles/{article.id}">{article.title}</a></fluent-data-grid-cell
				>
				<fluent-data-grid-cell grid-column="3">{article.book}</fluent-data-grid-cell>
				<fluent-data-grid-cell grid-column="4">{article.author}</fluent-data-grid-cell>
				<fluent-data-grid-cell grid-column="5">{article.serial}</fluent-data-grid-cell>
			</fluent-data-grid-row>
		{/each}
	</fluent-data-grid>

	<Button on:click={articlesDelete}>批量删除</Button>
{/if}

<style>
	@import url('https://unpkg.com/fluent-svelte/theme.css');

	fluent-data-grid-row {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
	}
</style>
