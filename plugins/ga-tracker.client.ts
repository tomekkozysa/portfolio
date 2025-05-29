export default defineNuxtPlugin((nuxtApp) => {
    const { hasAccepted, trackPageView } = useCookieConsent()
  
    nuxtApp.hook('page:finish', () => {
      if (hasAccepted.value) {
        trackPageView()
      }
    })
  })
  