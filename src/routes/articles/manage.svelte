<script lang="ts">
	import { liveQuery } from 'dexie';
	import type Article from '$lib/databases/article';
	import { articleStore } from '$lib/databases/db';
	import { TextBox, Button } from 'fluent-svelte';
	import Pagination from '$lib/Pagination/Pagination.svelte';
	$: indeterminate = selectedArticles.length > 0 && selectedArticles.length !== limit;
	$: groupChecked = selectedArticles.length === limit;

	let searchKey = '';
	let limit = 15;
	let currentPage = 0;

	let selectedArticles: Article[] = [];
	$: offset = currentPage * limit;

	$: bookNumber = liveQuery(async () => {
		return await articleStore.count(searchKey);
	});

	$: articles = liveQuery(async () => {
		return await articleStore.query(searchKey, offset, limit);
	});

	async function articlesDelete() {
		Promise.all(
			selectedArticles.map(async (article: Article) => {
				console.log(article);
				return await articleStore.remove(article.id);
			})
		);
		selectedArticles = [];
	}

	function download(filename: string, text:string) {
		var element = document.createElement('a');
		var blob = new Blob([text], { type: 'text/plain' });
		var url = window.URL.createObjectURL(blob);
		element.setAttribute('href', url);
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

	async function exportArticles() {
		let allArticles = await articleStore.query('', 0, $bookNumber);
		let articlesJSON = JSON.stringify(allArticles);
		download('indexeddb.json', articlesJSON);
	}

	function selectedAll() {
		if (selectedArticles.length !== limit) {
			selectedArticles = $articles;
		} else {
			selectedArticles = [];
		}
	}
</script>

<TextBox
	placeholder="关键词"
	searchButton={true}
	bind:value={searchKey}
	style="-webkit-user-select: text;"
/>
{#if $articles}
	<fluent-data-grid generate-header="none" style="overflow-y: auto; ">
		<fluent-data-grid-row
			row-type="header"
			id="defaultHeader"
			grid-template-columns="repeat(5,1fr)"
		>
			<fluent-data-grid-cell cell-type="columnheader" grid-column="1">
				<input
					type="checkbox"
					checked={groupChecked}
					{indeterminate}
					on:click={selectedAll}
				/></fluent-data-grid-cell
			>
			<fluent-data-grid-cell cell-type="columnheader" grid-column="2">标题</fluent-data-grid-cell>
			<fluent-data-grid-cell cell-type="columnheader" grid-column="3">系列</fluent-data-grid-cell>
			<fluent-data-grid-cell cell-type="columnheader" grid-column="4">作者</fluent-data-grid-cell>
			<fluent-data-grid-cell cell-type="columnheader" grid-column="5">顺序</fluent-data-grid-cell>
		</fluent-data-grid-row>

		{#each $articles as article}
			<fluent-data-grid-row grid-template-columns="repeat(5,1fr)">
				<fluent-data-grid-cell grid-column="1">
					<input
						type="checkbox"
						bind:group={selectedArticles}
						value={article}
					/></fluent-data-grid-cell
				>
				<fluent-data-grid-cell grid-column="2">
					<fluent-anchor href="/articles/{article.id}">{article.title}</fluent-anchor>
				</fluent-data-grid-cell>
				<fluent-data-grid-cell grid-column="3">{article.book}</fluent-data-grid-cell>
				<fluent-data-grid-cell grid-column="4">{article.author}</fluent-data-grid-cell>
				<fluent-data-grid-cell grid-column="5">{article.serial}</fluent-data-grid-cell>
			</fluent-data-grid-row>
		{/each}
	</fluent-data-grid>

	<Button on:click={articlesDelete}>批量删除</Button>
	<Pagination {limit} rowNumber={$bookNumber} bind:currentPage />
	<Button on:click={exportArticles}>导出</Button>
{/if}

<style>
	@import url('https://unpkg.com/fluent-svelte/theme.css');

	fluent-data-grid-row {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
	}

	fluent-data-grid-cell {
		color: var(--fds-text-primary);
	}
</style>
