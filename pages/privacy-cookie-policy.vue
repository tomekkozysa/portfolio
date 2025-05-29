<template>
	<ContentQuery :path="$route.path" find="one" v-slot="{ data }">
		<section class="w-full" :class="maxWidth">
			<ContentRenderer :value="data" class="content pcp w-full flex flex-col justify-start" />	
		</section>
	</ContentQuery>
</template>
<script setup>
const maxWidth = computedMaxWidth('default');
useHead({
	titleTemplate: "Privacy & Cookie Policy | Tomasz Kozysa",
});
</script>
<style>
.content.pcp * + h3 {
	margin-top:4rem;
}

.content.pcp * + h4,
.content.pcp * + ul {
	margin-top:2rem;
}
.content.pcp ul{
	list-style: disc;
}
</style>

