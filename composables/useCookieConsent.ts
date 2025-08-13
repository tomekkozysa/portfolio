// composables/useCookieConsent.ts
import { useCookie } from '#app'
import { useGtag } from '#imports'

export const useCookieConsent = () => {
  const { initialize: gtagInit } = useGtag()
  const GA_ID = useRuntimeConfig().public.gaId || ''
  const COOKIE_NAME = useRuntimeConfig().public.cookieName || 'analyticsCookie'
  const COOKIE_EXPIRE_DAYS = parseInt(useRuntimeConfig().public.cookieExpireDays || '365', 10)

  const analyticsCookie = useCookie<boolean | undefined>(COOKIE_NAME, {
    default: () => undefined,
    maxAge: COOKIE_EXPIRE_DAYS * 86400
  })

  const hasAccepted = computed(() => analyticsCookie.value === true)

  // --- helpers ---
  const ensureGtagShim = () => {
    if (typeof window === 'undefined') return
    // @ts-ignore
    window.dataLayer = window.dataLayer || []
    // @ts-ignore
    window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments as any) }
  }

  const consentDefaultDenied = () => {
    // Safe to call before real gtag loads thanks to the shim
    // @ts-ignore
    window.gtag('consent', 'default', {
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      ad_storage: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500
    })
  }

  const updateConsent = (status: 'granted' | 'denied') => {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
    window.gtag('consent', 'update', {
      analytics_storage: status,
      wait_for_update: 500
    })
  }

  const trackPageView = () => {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      debug_mode: process.dev
    })
  }

  const acceptCookies = () => {
    analyticsCookie.value = true
    updateConsent('granted')
    trackPageView() // immediate first hit
  }

  const rejectCookies = () => {
    analyticsCookie.value = false
    updateConsent('denied')
  }

  const initialize = () => {
    // 1) Create shim + set default denied BEFORE loading tag
    ensureGtagShim()
    consentDefaultDenied()

    // 2) Always load the tag (do not gate behind consent)
    gtagInit?.()

    // 3) If already accepted earlier, upgrade to granted + send first page_view
    if (analyticsCookie.value === true) {
      updateConsent('granted')
      trackPageView()
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
