// composables/useCookieConsent.ts
import { useCookie } from '#app'
import { useGtag } from '#imports' 

export const useCookieConsent = () => {
  const { initialize: gtagInit } = useGtag()
  const GA_ID = useRuntimeConfig().public.gaId || ''
  const COOKIE_NAME = useRuntimeConfig().public.cookieName || 'analyticsCookie'
  const COOKIE_EXPIRE_DAYS = parseInt(useRuntimeConfig().public.cookieExpireDays || '365', 10)

  const analyticsCookie = useCookie<boolean>(COOKIE_NAME, {
    default: () => undefined,
    maxAge: COOKIE_EXPIRE_DAYS * 86400
  })

  const hasAccepted = computed(() => analyticsCookie.value)


  const updateConsent = (status: 'granted' | 'denied') => {
    if (typeof window.gtag !== 'function') return

    window.gtag('consent', 'update', {
      analytics_storage: status,
      wait_for_update: 500
    })
  }

  const trackPageView = () => {
    if (typeof window.gtag !== 'function') return

    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      debug_mode: process.dev
    })
  }

  const acceptCookies = () => {
    analyticsCookie.value = true
    // isHidden.value = true

    updateConsent('granted')
    gtagInit() 
  }

  const rejectCookies = () => {
    analyticsCookie.value = false
    // isHidden.value = true
    updateConsent('denied')
  }

  const initialize = () => {
    if (analyticsCookie.value) {
      // isHidden.value = true
      updateConsent('granted')
      gtagInit()
    } else {
      // isHidden.value = false
    }
  }

  return {
    hasAccepted,
    analyticsCookie,
    acceptCookies,
    rejectCookies,
    initialize,
    trackPageView
  }
}
