import { checkRateLimit } from "@/lib/rateLimit"

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "anon"

  const allowed = await checkRateLimit(ip)

  if (!allowed) {
    return new Response("Too many requests", { status: 429 })
  }

  return new Response("OK")
}
