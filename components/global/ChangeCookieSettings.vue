<script setup>
const cookieName = useRuntimeConfig().public.cookieName || 'analyticsCookie'

// Remove the cookie and reload the page or show the banner again
function handleReset() {
  const cookie = useCookie(cookieName)
  cookie.value = null

  // Option A: Reload the page to re-trigger the banner
  // location.reload()

  // Option B: Dispatch a global event your banner listens to
  window.dispatchEvent(new Event('show-cookie-banner'))
}
</script>

<template>
  <button
    class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition inline-block w-fit mt-4"
    @click="handleReset"
  >
    Change Cookie Settings
  </button>
</template>
