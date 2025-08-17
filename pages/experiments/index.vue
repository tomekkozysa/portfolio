<script setup>

useHead({
	titleTemplate: `Web experiments | Tomasz Kozysa | Freelance Web Design & Development | London `,
})
const projects = await queryContent("/experiments").find();
const projectsByOrder = projects.sort((a, b) => {
	if (a.order == null) a.order = 100;
	const sorted = a.order > b.order ? 1 : -1
	return sorted
});

const filtered = projectsByOrder.filter(p => !p._file.includes('index.md') && p.online)
const maxWidth = computedMaxWidth("default");

</script>
<template>
	<div class="content w-full" :class="[maxWidth]">
		<div class="intro w-full" :class="[maxWidth]">
			<ContentDoc :path="`/experiments/`" v-slot="{ doc }" class="w-full"/>
		</div>
		<ul class="projects-list-nav">
			<li v-for="(project, index) in filtered" class="projects-list-nav-item">
				<NuxtLink :to="project._path" class="page-link">
					<h3 class="page-link-title">{{ project.title }}</h3>
					<span class="page-link-description">{{ project.description }}</span>
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>

