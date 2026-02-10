import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { question } = await req.json();
  console.log("Unknown chatbot question:", question);
  return NextResponse.json({ success: true });
}
