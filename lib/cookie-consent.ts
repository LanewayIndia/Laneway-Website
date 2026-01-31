export type CookiePreferences = {
    essential: boolean
    analytics: boolean
    marketing: boolean
    timestamp?: number
}

export const CONSENT_KEY = "laneway_cookie_preferences"

export function getCookiePreferences(): CookiePreferences | null {
    if (typeof window === "undefined") return null
    const stored = localStorage.getItem(CONSENT_KEY)
    return stored ? JSON.parse(stored) : null
}

// kept for backward compatibility
export const getStoredConsent = getCookiePreferences

export function setCookiePreferences(prefs: CookiePreferences) {
    localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ ...prefs, timestamp: Date.now() })
    )

    // server-readable cookie
    document.cookie = `laneway_consent=${btoa(
        JSON.stringify(prefs)
    )}; path=/; max-age=31536000; SameSite=Lax`
}

export function clearCookiePreferences() {
    localStorage.removeItem(CONSENT_KEY)
}