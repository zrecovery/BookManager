<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import { ListItem } from 'fluent-svelte';
</script>

<Header />

<main id="main">
	<slot />
</main>
<aside id="aside">
	<nav>
		<fluent-divider></fluent-divider>
		<ListItem href="/articles">文章列表</ListItem>
		<ListItem href="/articles/manage">文章管理</ListItem>
		<ListItem href="/articles/add">添加</ListItem>
		<fluent-divider></fluent-divider>
	</nav>
</aside>


<style>
	@import "../app.css";
</style>
