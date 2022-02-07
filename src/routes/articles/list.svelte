<script lang="ts">
	import { db } from '$lib/databases/db';
	import { liveQuery } from 'dexie';
	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import Select, { Option } from '@smui/select';
	import IconButton from '@smui/icon-button';
	import { Label } from '@smui/common';
	import Checkbox from '@smui/checkbox';
	import Button from '@smui/button';

	var searchKey = '';
	let limit = 25;
	let currentPage = 0;

	let selected = [];
	$: offset = currentPage * limit;

	// 判断一个布尔数组是否全为true
	function isAllTrue(arr: boolean[]): boolean {
		return arr.filter((a) => !a).length === 0;
	}

	// 判断字符串内是否包含全部关键词
	function stringIncludeAllKeywords(keys: string[], arr: string): boolean {
		return isAllTrue(keys.map((key) => new RegExp(key).test(arr)));
	}

	async function articleDelete(id: number) {
		return await db.articles.delete(id);
	}

	async function articlesDelete() {
		Promise.all(selected.map(articleDelete));
		selected = [];
	}

	$: articles = liveQuery(async () => {
		return await db.articles
			.filter((article) => stringIncludeAllKeywords(searchKey.split(' '), article.content))
			.offset(offset)
			.limit(limit)
			.toArray();
	});
</script>

<label>
	关键词：
	<input type="text" bind:value={searchKey} />
</label>

{#if $articles}
	<DataTable stickyHeader table$aria-label="Article list" style="width: 100%;">
		<Head>
			<Row>
				<Cell checkbox>
					<Checkbox />
				</Cell>
				<Cell style="width: 100%;">Title</Cell>
				<Cell>Books</Cell>
				<Cell>Author</Cell>
			</Row>
		</Head>
		<Body>
			{#each $articles as article (article.id)}
				<Row>
					<Cell checkbox>
						<Checkbox bind:group={selected} value={article.id} valueKey={article.id} />
					</Cell>
					<Cell>
						<a href="/articles/{article.id}">{article.title}</a>
					</Cell>
					<Cell>{article.book}</Cell>
					<Cell>{article.author}</Cell>
				</Row>
			{/each}
		</Body>
		<Pagination slot="paginate">
			<svelte:fragment slot="rowsPerPage">
				<Label>每页条目</Label>
				<Select variant="outlined" bind:value={limit} noLabel>
					<Option value={10}>10</Option>
					<Option value={25}>25</Option>
					<Option value={100}>100</Option>
				</Select>
			</svelte:fragment>

			<IconButton
				class="material-icons"
				action="first-page"
				title="First page"
				on:click={() => (currentPage = 0)}
				disabled={currentPage === 0}>first_page</IconButton
			>
			<IconButton
				class="material-icons"
				action="prev-page"
				title="Prev page"
				on:click={() => currentPage--}>chevron_left</IconButton
			>
			<IconButton
				class="material-icons"
				action="next-page"
				title="Next page"
				on:click={() => currentPage++}>chevron_right</IconButton
			>
		</Pagination>
	</DataTable>
	<Button on:click={articlesDelete}>批量删除</Button>
{/if}
