<script lang="ts">
	import Article from '$lib/databases/article';
	import { db } from '$lib/databases/db';
	import Button from '@smui/button/src/Button.svelte';
	import Textfield from '@smui/textfield';

	var article = new Article('', '', '', '', 1.0);
	let files: FileList;
	var bookTextList: string[] = [];

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
		try {
			const id = await db.articles.add({
				title: article.title,
				book: article.book,
				author: article.author,
				content: article.content,
				serial: article.serial
			});
		} catch (error) {
			console.error(error);
		}
	}
	async function add() {
		await save((article = article));
	}
</script>

<form style="display: grid;grid-template-rows:auto;">
	<legend>添加文字</legend>
	<Textfield bind:value={article.title} label="标题" />
	<Textfield bind:value={article.book} label="系列" />
	<Textfield bind:value={article.author} label="作者" />
	<Textfield bind:value={article.serial} type="number" label="顺序" />
	<Textfield
		style="width: 100%;min-height: 30em;margin-top:1em;"
		bind:value={article.content}
		textarea
		label="内容"
	/>
	<Button on:click={add}>添加文章</Button>
</form>

{#each bookTextList as bookText}
	<article>
		<p>{bookText}</p>
	</article>
{/each}

<input accept="application/json" type="file" bind:files id="files" />
