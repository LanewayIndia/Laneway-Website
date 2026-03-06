import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    // Get total count
    const { count } = await supabase
      .from("blog_likes")
      .select("*", { count: "exact", head: true })
      .eq("blog_slug", slug);

    // Check if current user has liked (optional — only if auth header present)
    let userLiked = false;
    const authHeader = req.headers.get("authorization");

    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const authClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
      const {
        data: { user },
      } = await authClient.auth.getUser(token);

      if (user) {
        const { data: existing } = await supabase
          .from("blog_likes")
          .select("id")
          .eq("blog_slug", slug)
          .eq("user_id", user.id)
          .maybeSingle();

        userLiked = !!existing;
      }
    }

    return NextResponse.json({
      count: count ?? 0,
      userLiked,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
