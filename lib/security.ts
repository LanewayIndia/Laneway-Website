import { headers } from 'next/headers'

const rateMap = new Map<string, {count: number, time: number}>()

export async function getClientIp(): Promise<string> {
    const header = await headers()
    return (
        header.get('x-forwarded-for')?.split(',')[0] ||
        header.get('x-real-ip') || 
        "unknown"
    )
}

// FIX: Rate limit logic was inverted — previously returned false (deny) when under limit and true (allow) when over limit
export function rateLimit(ip: string, limit = 10, windowMs = 60000){
    const now = Date.now()
    const entry = rateMap.get(ip)

    if(!entry || now - entry.time > windowMs){
        rateMap.set(ip,{count: 1, time:now})
        return true // FIX: Allow — first request in window
    }

    entry.count++

    if (entry.count > limit) return false // FIX: Deny — over limit

    return true // FIX: Allow — under limit
}