<script setup>

useHead({
	titleTemplate: `Selected Projects | Tomasz Kozysa | Freelance Web Design & Development | London `,
})


const projects = await queryContent("/work").find();
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
			<ContentDoc :path="`/work/`" v-slot="{ doc }" class="w-full" />
		</div>
		<ul class="projects-list-nav">
			<li v-for="(project, index) in filtered" class="projects-list-nav-item">
				<NuxtLink :to="project._path" class="page-link">
					<h2 class="page-link-title">{{ project.title }}</h2>
					<span class="page-link-description">{{ project.description }}</span>
				</NuxtLink>
			</li>
		</ul>
		<div class="mt-12">
			<strong>I'm currently available for freelance front-end / Vue / UI engineering work.</strong>
		</div>
		<div class="mt-4">
			<a href="mailto:hello@kozysa.me">Get in touch</a>
		</div>
	</div>
</template>
