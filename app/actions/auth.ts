'use server';

import { supabase } from '@/lib/supabase';
import { comparePassword, signJWT, verifyJWT } from '@/lib/auth';
import { cookies } from 'next/headers';


export async function loginAdmin(email: string, password: string) {
  try {
    let user = null;
    let tableExists = true;

    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .limit(1)
        .single();

      if (error) {
        // PGRST116 = no rows found, which is not a table-missing error
        if (error.code !== 'PGRST116') {
          throw error;
        }
      } else {
        user = data;
      }
    } catch (e: any) {
      console.warn("Table admin_users may not exist yet or connection issue. Using env fallback.", e.message);
      tableExists = false;
    }

    // Fallback: Jika tabel belum ada atau user tidak ditemukan di DB,
    // cek menggunakan environment variables (atau default admin@progman.id / admin123)
    if (!tableExists || !user) {
      const defaultEmail = process.env.ADMIN_EMAIL || 'admin@progman.id';
      const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';

      if (email === defaultEmail && password === defaultPassword) {
        const sessionToken = await signJWT({ email: defaultEmail, userId: 'env-admin' });
        const cookieStore = await cookies();
        cookieStore.set('admin_session', sessionToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24, // 1 hari
          path: '/'
        });
        return { success: true };
      }
      return { error: 'Email atau password salah.' };
    }

    // Jika user ada di database, bandingkan password hash-nya
    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      return { error: 'Email atau password salah.' };
    }

    // Buat JWT Token
    const sessionToken = await signJWT({ email: user.email, userId: user.id });

    // Set Secure HttpOnly Cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 hari
      path: '/'
    });

    return { success: true };
  } catch (error: any) {
    console.error('Login error:', error);
    return { error: 'Terjadi kesalahan internal pada sistem.' };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return { success: true };
}

export async function getAdminSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    if (!token) return null;
    const payload = await verifyJWT(token);
    return payload;
  } catch (error) {
    console.error('getAdminSession error:', error);
    return null;
  }
}
