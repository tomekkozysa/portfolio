<template>
	<div class="home-hero md:flex flex-row-reverse justify-center">
		<div class="animation-wrapper flex items-center">
			<HomeAnimation class="mx-auto" />
		</div>
		<div class="hero-text flex mt-12 md:mt-0 md:pr-4 flex-col self-center justify-start">
			<h1>Designing and building thoughtful interfaces for the web.</h1>
			<p class="max-w-ch mt-8">
				UI design, front-end development, and interactive work for web applications and editorial platforms.
			</p>
		</div>
	</div>
</template>

<style>
.home-hero {
	min-height: 80vh;
	max-width: 80%;

	gap: 4rem;
}

.hero-text {
	max-width: 70ch;
}
</style>
<script setup>
const maxWidth = computedMaxWidth("wide");
useHead({
	titleTemplate: "Tomasz Kozysa | Freelance Web Design & Development | London"
})
</script>