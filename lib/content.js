import { createClient } from "@/lib/supabase/server";
import { desa, statistik, visi } from "@/lib/data";

const fallbackContent = {
  site_summary: desa.ringkasan,
  stats: statistik,
  vision: visi,
};

export async function getSiteContent() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return fallbackContent;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("key, value")
      .in("key", Object.keys(fallbackContent));

    if (error) {
      console.error("Gagal memuat konten Supabase:", error.message);
      return fallbackContent;
    }

    return data.reduce((content, item) => {
      content[item.key] = item.value;
      return content;
    }, { ...fallbackContent });
  } catch (error) {
    console.error("Konfigurasi Supabase tidak dapat digunakan:", error.message);
    return fallbackContent;
  }
}
