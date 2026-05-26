import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "NOT_SET";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "EXISTS (Starts with " + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 10) + "...)" : "NOT_SET";
  
  let fetchResult = "Not attempted";
  let fetchError = null;

  if (supabaseUrl !== "NOT_SET") {
    try {
      // Test basic connection to Supabase Auth endpoint
      const res = await fetch(`${supabaseUrl}/auth/v1/health`, {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
        }
      });
      fetchResult = `Status: ${res.status} ${res.statusText}`;
    } catch (err: any) {
      fetchResult = "Failed to connect";
      fetchError = err.message || err;
    }
  }

  return NextResponse.json({
    diagnostics: {
      supabaseUrl,
      supabaseAnonKey,
      fetchResult,
      fetchError,
      serverTime: new Date().toISOString(),
    }
  });
}
