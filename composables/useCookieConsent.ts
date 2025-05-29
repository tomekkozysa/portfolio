// composables/useCookieConsent.ts

import { useCookie } from '#app'

export const useCookieConsent = () => {
  const GA_ID = useRuntimeConfig().public.gaId || ''
  const GA_SRC = useRuntimeConfig().public.gaScriptUrl || `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  const COOKIE_NAME = useRuntimeConfig().public.cookieName || 'analyticsCookie';
  const COOKIE_EXPIRE_DAYS = parseInt(useRuntimeConfig().public.cookieExpireDays || '365', 10)

  const analyticsCookie = useCookie<boolean>(COOKIE_NAME, {
    default: () => false,
    maxAge: COOKIE_EXPIRE_DAYS * 86400 // seconds
  })

  const hasAccepted = computed(() => analyticsCookie.value)
  const isHidden = ref(false)

  const updateConsent = (status: 'granted' | 'denied') => {
    window.gtag?.('consent', 'update', {
      analytics_storage: status,
      wait_for_update: 500
    })
  }

  const injectGAScript = () => {
    if (!GA_ID || window.gtag) return

    const script = document.createElement('script')
    script.async = true
    script.src = GA_SRC
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    window.gtag = gtag

    gtag('js', new Date())
    gtag('config', GA_ID, {
      anonymize_ip: true
    })
  }

  const acceptCookies = () => {
    analyticsCookie.value = true
    isHidden.value = true
    updateConsent('granted')
    injectGAScript()
  }

  const rejectCookies = () => {
    analyticsCookie.value = false
    isHidden.value = true
    updateConsent('denied')
  }

  const initialize = () => {
    if (analyticsCookie.value) {
      isHidden.value = true
      updateConsent('granted')
      injectGAScript()
    } else {
      isHidden.value = false
    }
  }

  return {
    hasAccepted,
    isHidden,
    acceptCookies,
    rejectCookies,
    initialize
  }
}
