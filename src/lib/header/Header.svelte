<script lang="ts">
	import { IconButton, Button, TextBox } from 'fluent-svelte';

	function toggle() {
		let side = document.getElementById('aside');
		if (side.style.gridColumnEnd === '1') {
			side.style.gridColumnEnd = '4';
			side.style.width = '100%';
			side.style.marginLeft = '0%';
		} else {
			side.style.gridColumnEnd = '1';
			side.style.width = '0';
			side.style.marginLeft = '-200%';
		}
	}
  let searchKey = '';
  
	function textSearch() {
		let res = globalThis.find(searchKey, false, false, true, false, true, true);
 	}
</script>

<header id="header">
	<IconButton id="toggle" variant="standard" on:click={toggle} style="grid-column-end: 2;">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="12"
			height="12"
			viewBox="0 0 12 12"
			class="svelte-i0q990"
			><path
				fill="currentColor"
				d="M2.14645 4.64645C2.34171 4.45118 2.65829 4.45118 2.85355 4.64645L6 7.79289L9.14645 4.64645C9.34171 4.45118 9.65829 4.45118 9.85355 4.64645C10.0488 4.84171 10.0488 5.15829 9.85355 5.35355L6.35355 8.85355C6.15829 9.04882 5.84171 9.04882 5.64645 8.85355L2.14645 5.35355C1.95118 5.15829 1.95118 4.84171 2.14645 4.64645Z"
			/></svg
		>
	</IconButton>
	<h3
		style="color: var(--fds-text-secondary);grid-column-start: var(--header-title-start);grid-column-end: var(--header-title-end);"
	>
		Book Manager
	</h3>
  <div style="justify-content:center; align-self: center; grid-column-start: var(--search-text-start); grid-column-end: var(--search-text-end);">
    <TextBox bind:value={searchKey} style="-webkit-user-select: text;" />
  </div>
  <div style="justify-content:center; align-self: center;grid-column-start:var(--search-button-start)">
    <Button on:click={textSearch} >搜索</Button>
  </div>
</header>

<style>
	@media (min-width: 1200px) {
		:root {
			--header-column: repeat(12, 1fr);
			--header-title-start: 2;
      --header-gap: 2rem;
			--header-title-end: 4;
			--search-text-start: 10;
			--search-text-end: 12;
      --search-button-start:12;
		}
	}

	@media (max-width: 800px) {
		:root {
			--header-column: repeat(4, 1fr);
			--header-title-start: 2;
      --header-gap: 1rem;
			--header-title-end: 3;
			--search-text-start: 3;
			--search-text-end: 4;
      --search-button-start:4;
		}
	}
	#header {
		-webkit-backdrop-filter: blur(60px);
		backdrop-filter: blur(60px);
		background-clip: padding-box;
		background-color: var(--fds-layer-background-default);
		border-bottom: 1px solid var(--fds-surface-stroke-flyout);
		box-sizing: border-box;
		inset-block-start: 0;
		inset-inline-start: 0;
		justify-content: center;
		min-block-size: 56px;
		position: fixed;
		transform: translateY(0.001px);
		display: grid;
    gap: var(--header-gap);
		grid-template-columns: var(--header-column);
		z-index: 2;
	}
</style>
