<script setup>

const projects = await queryContent("/layouts").find();
const projectsByOrder = projects.sort((a, b) => {
	if (a.order == null) a.order = 100;
	const sorted = a.order > b.order ? 1 : -1
	return sorted
});

const filtered = projectsByOrder.filter(p => !p._file.includes('index.md') && p.online)
const maxWidth = computedMaxWidth("default");

</script>
<template>
	<section class="intro w-full" :class="[maxWidth]">
		<ContentDoc :path="`/layouts/`" v-slot="{ doc }" class="w-full flex flex-col items-center justify-start" />
	</section>
	<section class="content w-full" :class="[maxWidth]">
		<div v-for="(project, index) in filtered">
			<NuxtLink :to="project._path" class="page-link">
				<h2 class="page-link-title">{{ project.title }}</h2>
				<span class="page-link-description">{{ project.description }}</span>
			</NuxtLink>
		</div>
	</section>
</template>