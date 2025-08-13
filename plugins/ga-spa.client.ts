// plugins/ga-spa.client.ts
export default defineNuxtPlugin((nuxtApp) => {
    const { trackPageView, hasAccepted } = useCookieConsent()
  
    nuxtApp.hook('page:finish', () => {
      if (hasAccepted.value) {
        trackPageView()
      }
    })
  })
  