<script setup>
const route = useRoute();
const data = await queryContent("/experiments", route.params.slug).findOne()

useHead({
	titleTemplate: "%s | Web experiments | Tomasz Kozysa",
});

const maxWidth = computedMaxWidth("default");

</script>
<template>
	<section class="intro flex flex-col items-center w-full">
		<div class="w-full" :class="maxWidth">
			<h1 class="title" :key="route.params.slug">{{ data.title }}</h1>
			<p class="description" :key="route.params.slug">{{ data.description }}</p>
		</div>
	</section>
	<section class="w-full">
		<ContentDoc :document="data" class="content flex flex-col items-center justify-start" />
	</section>
</template>