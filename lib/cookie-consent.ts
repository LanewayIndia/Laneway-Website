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
    if (!stored) return null
    try {
        const parsed = JSON.parse(stored)
        return isValidPrefs(parsed) ? parsed : null
    } catch {
        return null
    }
}

// kept for backward compatibility
export const getStoredConsent = getCookiePreferences

export function isValidPrefs(obj: any): obj is CookiePreferences {
    return (
        obj && typeof obj === "object" &&
        typeof obj.essential === "boolean" &&
        typeof obj.analytics === "boolean" &&
        typeof obj.marketing === "boolean"
    )
}

export function encodePrefs(prefs: CookiePreferences) {
    return Buffer.from(JSON.stringify(prefs)).toString("base64")
}

export function parseConsentCookie(value: string | undefined | null): CookiePreferences | null {
    if (!value) return null
    try {
        const decoded = Buffer.from(value, "base64").toString("utf-8")
        const parsed = JSON.parse(decoded)
        return isValidPrefs(parsed) ? parsed : null
    } catch {
        return null
    }
}

export async function setCookiePreferences(prefs: CookiePreferences) {
    // store locally for client-side checks
    try {
        localStorage.setItem(
            CONSENT_KEY,
            JSON.stringify({ ...prefs, timestamp: Date.now() })
        )
    } catch {}

    // call server endpoint to set HttpOnly cookie
    try {
        await fetch("/api/consent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(prefs),
        })
    } catch (e) {
        // fallback: if server call fails, keep the client-only cookie (not HttpOnly)
        try {
            document.cookie = `laneway_consent=${btoa(
                JSON.stringify(prefs)
            )}; path=/; max-age=31536000; SameSite=Lax`
        } catch {}
    }
}

export function clearCookiePreferences() {
    localStorage.removeItem(CONSENT_KEY)
}