<template>
	<div class="home-hero md:flex flex-row-reverse">
		<div class="animation-wrapper flex items-center">
			<HomeAnimation class="mx-auto" />
		</div>
		<div class="hero-text max-w-ch flex items-center mt-12 md:mt-0 md:pr-4">
			<h2>I design, prototype and build user interfaces for desktop & mobile web applications and responsive
				websites.</h2>
		</div>
	</div>
</template>

<style>
.home-hero {
	min-height: 80vh;
}
</style>
<script setup>
const maxWidth = computedMaxWidth("wide");
useHead({
	titleTemplate: "Tomasz Kozysa | UX & UI | Responsive Web Design | Design & Development",
});
</script>