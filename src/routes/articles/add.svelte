<script lang="ts">
	import Article from '$lib/databases/article';
	import { articleStore } from '$lib/databases/db';
	import { TextBox, Button } from 'fluent-svelte';

	var article = new Article('', '', '', '', 1.0);
	let files: FileList;

	async function saveArticleFromJSON(jsonFILE: File) {
		let articles: Article[];
		try {
			articles = JSON.parse(await jsonFILE.text());
		} catch (error) {
			console.error(error);
		} finally {
			Promise.all(articles.map(save));
		}
	}

	$: if (files) {
		let fileList = Array.from(files);
		Promise.all(fileList.map(saveArticleFromJSON));
	}

	async function save(article: Article) {
		await articleStore.save(article);
	}

	async function add() {
		await save(article);
	}
</script>

<form style="display: grid;grid-template-rows:auto;gap:1em;">
	<legend>添加文字</legend>
	<TextBox bind:value={article.title} label="标题" />
	<TextBox bind:value={article.book} label="系列" />
	<TextBox bind:value={article.author} label="作者" />
	<TextBox bind:value={article.serial} type="number" label="顺序" />
	<TextBox
		style="width: 100%;min-height: 30em;margin-top:1em;"
		bind:value={article.content}
		textarea
		label="内容"
	/>
	<Button on:click={add}>添加文章</Button>
	<input accept="application/json" type="file" bind:files id="files" />
</form>

<style>
</style>
