<script lang="ts">
	import { page } from '$app/stores';
	import { liveQuery } from 'dexie';
	import { articleStore } from '$lib/databases/db';

	const ID = Number($page.params.id);

	let article = liveQuery(async () => {
		return articleStore.get(ID);
	});
</script>

{#if $article}
	<article style="white-space: pre-line;">
		<h1 style="text-align: center;">{$article.title}</h1>
		<h2 style="text-align: center;">{$article.author}</h2>
		<h2 style="text-align: center;">{$article.book}</h2>
		{$article.content}
	</article>
{/if}
