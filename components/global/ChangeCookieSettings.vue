<script setup>
import { useCookieConsent } from '@/composables/useCookieConsent'

const {
  hasAccepted,
  acceptCookies,
  rejectCookies
} = useCookieConsent()

const toggleConsent = () => {
  if (hasAccepted.value) {
    rejectCookies()
  } else {
    acceptCookies()
  }
}
</script>

<template>
  <div class="mt-4">
    <p class="mb-2">
      <template v-if="hasAccepted">
        ✅ You’ve granted consent for analytical cookies.
      </template>
      <template v-else>
        ❌ You’ve declined analytical cookies.
      </template>
    </p>

    <button
      class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition inline-block w-fit"
      @click="toggleConsent"
    >
      <template v-if="hasAccepted">
        Disable Analytics
      </template>
      <template v-else>
        Enable Analytics
      </template>
    </button>
  </div>
</template>
