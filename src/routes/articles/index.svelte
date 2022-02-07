<script lang="ts">
	import Add from './add.svelte';
	import List from './list.svelte';
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';

	let active = 'List';
</script>

<TabBar tabs={['List', 'Add']} let:tab bind:active>
	<Tab {tab}>
		<Label>{tab}</Label>
	</Tab>
</TabBar>
<div class="status">
	{#if active === 'List'}
		<List />
	{:else}
		<Add />
	{/if}
</div>
