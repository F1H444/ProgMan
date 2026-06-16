'use server'

import { z } from 'zod'
import { verifyJWT } from '@/lib/auth'
import { cookies } from 'next/headers'

// 1. Skema Validasi Zod
const updateProfileSchema = z.object({
  fullName: z.string().min(3, { message: "Nama minimal 3 karakter" }),
  phone: z.string().min(10, { message: "Nomor telepon tidak valid" }),
})

// 2. Server Action dengan Otorisasi & Zod
export async function updateProfile(formData: FormData) {
  const cookieStore = await cookies()

  // Verifikasi Otorisasi (Memastikan user login)
  const token = cookieStore.get('admin_session')?.value
  if (!token) {
    throw new Error('Unauthorized: Anda harus login untuk melakukan aksi ini.')
  }

  const user = await verifyJWT(token)
  if (!user) {
    throw new Error('Unauthorized: Anda harus login untuk melakukan aksi ini.')
  }

  // Ambil raw payload
  const rawData = {
    fullName: formData.get('fullName'),
    phone: formData.get('phone'),
  }

  // Validasi payload dengan Zod secara aman (safeParse)
  const validated = updateProfileSchema.safeParse(rawData)
  if (!validated.success) {
    return { 
      success: false, 
      error: validated.error.flatten().fieldErrors 
    }
  }

  // Eksekusi jika otorisasi lewat dan data valid
  // const { fullName, phone } = validated.data
  // await supabase.from('profiles').update({ full_name: fullName, phone }).eq('id', user.id)

  return { 
    success: true, 
    message: 'Profil berhasil diperbarui', 
    data: validated.data 
  }
}
