import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const authClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    const {
      data: { user },
      error: authError,
    } = await authClient.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const slug = body.slug;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    const { error: deleteError } = await supabase
      .from("blog_likes")
      .delete()
      .eq("blog_slug", slug)
      .eq("user_id", user.id);

    if (deleteError) {
      console.error("Unlike error:", deleteError);
      return NextResponse.json({ error: "Failed to unlike" }, { status: 500 });
    }

    // Return updated count
    const { count } = await supabase
      .from("blog_likes")
      .select("*", { count: "exact", head: true })
      .eq("blog_slug", slug);

    return NextResponse.json({ liked: false, count: count ?? 0 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
