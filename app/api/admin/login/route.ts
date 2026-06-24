import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { comparePassword, signJWT } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    const db = supabaseAdmin || supabase;
    
    const { data, error } = await db
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'User not found', details: error?.message }, { status: 401 });
    }

    const isPasswordValid = await comparePassword(password, data.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const sessionToken = await signJWT({ email: data.email, userId: data.id });

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/'
    });

    return response;
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}