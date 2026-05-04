import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

export async function GET() {
  return NextResponse.json({
    supabaseUrl: env.public.supabaseUrl,
    supabaseAnonKey: env.public.supabaseAnonKey,
    siteUrl: env.public.siteUrl,
    apiUrl: env.public.apiUrl
  });
}

