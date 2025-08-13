<!-- cookie-bar -->
<!-- where you render the cookie bar -->
<template>
  <div v-show="analyticsCookie === undefined" :class="[isHidden ? 'is_hidden' : '']"
    class="cookie-bar py-4 px-8 flex flex-wrap items-center gap-4 text-sm">
    <!-- ... -->
  </div>
</template>

<script setup lang="ts">
const {
  hasAccepted,
  acceptCookies,
  rejectCookies,
  initialize,
  analyticsCookie
} = useCookieConsent()

// FIX: you had `hasAccepted.va` which breaks
const isHidden = computed(() => hasAccepted.value === true)

onMounted(() => {
  initialize()
  window.addEventListener('show-cookie-banner', () => {
    console.log('show-cookie-banner')
    // show the bar on demand
    // since isHidden is computed, control visibility by clearing the cookie:
    // analyticsCookie.value = undefined
  })
})
</script>

<style>
.cookie-bar {
  position: sticky;
  bottom: 0;
  transition: transform .3s ease-in-out, opacity .1s ease-in .2s;
  border-top: 2px solid black;
  background-color: rgb(250, 250, 249);
  transition-delay: 1s;
  opacity: 1;
}

.cookie-bar.is_hidden {
  transition-delay: .1s;
  transform: translateY(100px);
  opacity: 0;
}

.cookie-bar-action {
  @apply py-3 px-4 bg-gray-800 text-white mx-2 rounded;
  white-space: nowrap;
  cursor: pointer;

}
</style>