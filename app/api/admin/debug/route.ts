import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Test Supabase connection
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const hasAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
    const hasJwtSecret = !!process.env.JWT_SECRET;
    
    // Test query
    const { data, error } = await supabase
      .from('admin_users')
      .select('count')
      .limit(1);

    return NextResponse.json({
      status: 'ok',
      env: {
        hasSupabaseUrl: !!supabaseUrl,
        hasAnonKey,
        hasServiceKey,
        hasJwtSecret,
      },
      query: error ? { error: error.message } : { data: 'success' },
    });
  } catch (e: any) {
    return NextResponse.json({
      status: 'error',
      message: e?.message || 'Unknown error',
    }, { status: 500 });
  }
}