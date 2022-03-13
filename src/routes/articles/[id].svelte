<script lang="ts">
	import { page } from '$app/stores';
	import { liveQuery } from 'dexie';
	import { articleStore } from '$lib/databases/db';
  import { Button, TextBox } from 'fluent-svelte';
  
	const ID = Number($page.params.id);

	let article = liveQuery(async () => {
		return articleStore.get(ID);
	});
  
  let searchKey = "";

  function textSearch() {
    let res = globalThis.find(searchKey, false, false, true, false, true, true);
  }
</script>
<TextBox type="search" searchButton={true} style="-webkit-user-select: text;"></TextBox>
{#if $article}
	<article style="white-space: pre-line;">
		<h1 style="text-align: center;">{$article.title}</h1>
		<h2 style="text-align: center;">{$article.author}</h2>
		<h2 style="text-align: center;">{$article.book}</h2>
		{$article.content}
	</article>
{/if}
<footer>
  <TextBox  bind:value={searchKey} style="-webkit-user-select: text;"></TextBox>
  <Button on:click={textSearch}>搜索</Button>
</footer>
