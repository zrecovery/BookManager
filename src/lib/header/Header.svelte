<script lang="ts">
	import { IconButton, TextBox } from 'fluent-svelte';
  import { page } from '$app/stores';

	function toggle() {
		let side = document.getElementById('aside');
		if (side.style.gridColumnEnd === '1') {
			side.style.gridColumnEnd = '3';
			side.style.width = '100%';
			side.style.marginLeft = '0%';
		} else {
			side.style.gridColumnEnd = '1';
			side.style.width = '0';
			side.style.marginLeft = '-200%';
		}
	}
  let searchKey = "";

  function textSearch(){
    let res = globalThis.find(searchKey, false, false, true, false, true, true);
  }

  $:searchMode = /\/articles\/(\d+)/.test($page.url.pathname)

  
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
	<h3 style="color: var(--fds-text-secondary);grid-column-start: var(--header-title-start);grid-column-end: var(--header-title-end);">
		Book Manager
	</h3>
  {#if searchMode}
  <div style="grid-column-start: var(--header-search-bar-start);grid-column-end:var(--header-search-bar-end);align-self: center;justify-self: center;">
    <TextBox type="search" searchButton={true} bind:value={searchKey} on:search={textSearch} style="-webkit-user-select: text;"></TextBox>
  </div>
  {/if}
</header>

<style>
  @media (min-width:1200px){
    :root {
      --header-column: repeat(12,1fr);
      --header-title-start:2;
      --header-title-end:4;
      --header-search-bar-start:10;
      --header-search-bar-end:13;    
      }
  }

  @media (max-width: 800px){
    :root {
      --header-column: repeat(4,1fr);
      --header-title-start:2;
      --header-title-end:3;
      --header-search-bar-start:3;
      --header-search-bar-end:5;
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
		grid-template-columns: var(--header-column);
		z-index: 2;
	}
</style>
