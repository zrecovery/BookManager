<script lang="ts">
	import { page } from '$app/stores';
	import { db } from '$lib/databases/db';
	import { liveQuery } from 'dexie';
	import Paper, { Title, Subtitle, Content } from '@smui/paper';

	const ID = Number($page.params.id);
	let article = liveQuery(async () => {
		try {
			return db.articles.get({ id: ID });
		} catch (error) {
			console.error(error);
		}
	});
</script>

{#if $article}
	<article style="white-space: pre-line;">
		<Paper variant="outlined">
			<Title style="text-align: center;">{$article.title}</Title>
			<Subtitle style="text-align: center;">{$article.author}</Subtitle>
			<Subtitle style="text-align: center;">{$article.book}</Subtitle>
			<Content>{$article.content}</Content>
		</Paper>
	</article>
{/if}
