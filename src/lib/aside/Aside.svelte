<script lang="ts">
	import { ListItem } from 'fluent-svelte';
</script>

<aside id="aside">
	<nav style="grid-row-start: 2;">
		<fluent-tree-view>
			<ListItem href="/articles">文章列表</ListItem>
			<ListItem href="/articles/manage">文章管理</ListItem>
			<ListItem href="/articles/add">添加</ListItem>
		</fluent-tree-view>
	</nav>
</aside>

<style>
	aside {
		display: grid;
		grid-template-rows: 4em 1fr;
	}
</style>
