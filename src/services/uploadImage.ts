import { supabase, isSupabaseConfigured } from "../lib/supabase";

export async function uploadImage(siteId: string, file: File): Promise<string> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured - check your .env file");
  }

  const path = `${siteId}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

  const { error } = await supabase.storage
    .from("sites")
    .upload(path, file);

  if (error) {
    throw error;
  }

  const { data: publicData } = supabase.storage
    .from("sites")
    .getPublicUrl(path);

  return publicData.publicUrl;
}
