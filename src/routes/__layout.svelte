<script lang="ts">
	import Aside from '$lib/aside/Aside.svelte';
	import Header from '$lib/header/Header.svelte';
</script>

<Header />

<main id="main">
	<slot />
</main>

<Aside />

<style>
	@import '../app.css';
</style>
