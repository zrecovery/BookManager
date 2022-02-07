<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<Header />

<main class="main">
	<slot />
</main>

<footer class="footer">
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>

<style>
	.footer {
		align-self: center;
		justify-self: center;
	}
</style>
