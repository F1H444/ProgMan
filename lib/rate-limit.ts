// In-memory rate limiter untuk perlindungan DDoS ringan & Brute Force
// Catatan: Jika Anda deploy di Vercel/Serverless, in-memory ini hanya bekerja per-instance/lambda.
// Untuk skala besar, disarankan mengganti ini dengan @upstash/ratelimit & Redis.

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

interface RateLimitConfig {
  limit: number;
  windowMs: number; // Jendela waktu dalam milidetik
}

export function rateLimit(ip: string, config: RateLimitConfig = { limit: 20, windowMs: 10 * 1000 }) {
  const now = Date.now();
  let ipData = rateLimitMap.get(ip);

  // Jika belum ada data untuk IP ini atau jendela waktunya sudah lewat, reset
  if (!ipData || now - ipData.lastReset > config.windowMs) {
    ipData = { count: 1, lastReset: now };
    rateLimitMap.set(ip, ipData);
    return { success: true };
  }

  // Jika sudah melewati batas dalam jendela waktu
  if (ipData.count >= config.limit) {
    return { success: false };
  }

  // Tambah hitungan jika masih dalam batas
  ipData.count += 1;
  rateLimitMap.set(ip, ipData);
  return { success: true };
}

// Bersihkan memory dari IP yang sudah expired (bisa dijalankan via cron atau saat tidak sibuk)
export function cleanUpRateLimiter(windowMs: number) {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now - data.lastReset > windowMs) {
      rateLimitMap.delete(ip);
    }
  }
}
