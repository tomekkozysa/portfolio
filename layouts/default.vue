<template>
	<header ref="header" class="header flex w-full relative flex-col md:flex-row md:items-center md:justify-between">

		<div class="relative z-20 shrink-0 header-title">
			<NuxtLink to="/">Tomasz Kozysa</NuxtLink>
		</div>
		<NavigationToggle @mousedown="toggleNav" :expanded="isNavOpen"
			class="block md:hidden absolute toggle top-[1.25rem] right-4 md:right-8" />

		<NavigationPanel class="flex md:hidden" :is_open="isNavOpen" @toggle="toggleNav" @selected="isNavOpen = false" />

		<Navigation class="hidden md:block" />
	</header>
	<main class="page mx-auto min-h-90vh flex flex-col items-center" :class="$route.name">
		<NuxtPage />
	</main>

	<FooterStrip />
</template>
<script setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const mobile_value = breakpoints.smallerOrEqual('md').value
const is_mobile = ref(mobile_value)
const isNavOpen = ref(false)

const toggleNav = () => {
	isNavOpen.value = !isNavOpen.value
};

onMounted(() => {
	is_mobile.value = breakpoints.smallerOrEqual('md').value
	window.addEventListener(
		'resize',
		() => {
			is_mobile.value = breakpoints.smallerOrEqual('md').value
		},
		false
	)
})
</script>
<style>
.show {
	display: block;
}

.hide {
	display: none;
}
</style>
