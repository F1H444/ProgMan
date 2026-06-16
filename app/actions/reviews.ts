"use server";

import { supabase } from "@/lib/supabase";

const badWords = [
  "anjing",
  "babi",
  "monyet",
  "bangsat",
  "kontol",
  "memek",
  "jembut",
  "ngentot",
  "tolol",
  "goblok",
  "bodoh",
  "idiot",
  "biadab",
  "setan",
  "iblis",
  "kampret",
  "brengsek",
  "taik",
  "tai",
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "bastard",
  "damn",
  "cunt",
  "dick",
  "pussy",
];

function containsBadWords(text: string): boolean {
  const lowerText = text.toLowerCase();
  return badWords.some((word) => lowerText.includes(word));
}

export async function submitReview(formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const text = formData.get("text") as string;

  if (!name || !role || !text) {
    return { error: "Semua field harus diisi" };
  }

  // 1. Analyze for bad words
  if (
    containsBadWords(text) ||
    containsBadWords(name) ||
    containsBadWords(role)
  ) {
    return {
      error: "Ulasan mengandung kata-kata yang tidak sopan dan ditolak sistem.",
    };
  }

  // 2. Insert into Supabase Database
  try {
    const { error } = await supabase
      .from('reviews')
      .insert({ name, role, text });

    if (error) throw error;
  } catch (error) {
    console.error("Database error:", error);
    return { error: "Gagal menyimpan ulasan" };
  }

  return { success: true };
}

export async function getReviewsAction() {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data };
  } catch (error) {
    console.error("Database error:", error);
    return { error: "Gagal mengambil ulasan" };
  }
}

export async function deleteReviewAction(id: number) {
  try {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Database error:", error);
    return { error: "Gagal menghapus ulasan" };
  }
}
