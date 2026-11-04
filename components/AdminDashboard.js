"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { statistik as defaultStatistik, visi as defaultVisi, desa as defaultDesa } from "@/lib/data";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [content, setContent] = useState({
    site_summary: defaultDesa.ringkasan,
    stats: defaultStatistik,
    vision: defaultVisi,
  });
  const [saveStatus, setSaveStatus] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: "" });

  useEffect(() => {
    let active = true;

    async function loadAdmin() {
      try {
        const supabase = createClient();
        const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
        if (userError || !currentUser) {
          window.location.assign("/admin/login");
          return;
        }

        const { data: currentProfile, error: profileError } = await supabase
          .from("profiles")
          .select("full_name, role")
          .eq("id", currentUser.id)
          .single();

        if (profileError || currentProfile?.role !== "admin") {
          await supabase.auth.signOut();
          if (active) setStatus({ loading: false, error: "Akun ini belum memiliki role admin." });
          return;
        }

        if (active) {
          setUser(currentUser);
          setProfile(currentProfile);
          setStatus({ loading: false, error: "" });
          const { data: savedContent, error: contentError } = await supabase
            .from("site_content")
            .select("key, value")
            .in("key", ["site_summary", "stats", "vision"]);

          if (contentError) {
            setSaveStatus({ ok: false, teks: `Konten bawaan digunakan: ${contentError.message}` });
          } else if (savedContent?.length) {
            setContent((currentContent) => savedContent.reduce((next, item) => ({
              ...next,
              [item.key]: item.value,
            }), currentContent));
          }
        }
      } catch (error) {
        if (active) setStatus({ loading: false, error: error.message });
      }
    }

    loadAdmin();
    return () => { active = false; };
  }, []);

  async function keluar() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      setStatus({ loading: false, error: error.message });
      return;
    }

    function ubahStat(index, field, value) {
      setContent((current) => ({
        ...current,
        stats: current.stats.map((stat, statIndex) => (
          statIndex === index ? { ...stat, [field]: value } : stat
        )),
      }));
    }

    async function simpan(event) {
      event.preventDefault();
      setSaveStatus(null);
      try {
        const supabase = createClient();
        const rows = Object.entries(content).map(([key, value]) => ({
          key,
          value,
          updated_by: user.id,
        }));
        const { error } = await supabase.from("site_content").upsert(rows);
        if (error) throw error;
        setSaveStatus({ ok: true, teks: "Perubahan berhasil disimpan." });
      } catch (error) {
        setSaveStatus({ ok: false, teks: error.message });
      }
    }
    window.location.assign("/admin/login");
  }

  if (status.loading) return <section className="admin-card"><p>Memuat dashboard...</p></section>;
  if (status.error) return <section className="admin-card"><p role="alert" className="note err">{status.error}</p></section>;

  return (
    <section className="admin-dashboard">
      <div className="admin-topbar">
        <div>
          <span className="pill">Dashboard admin</span>
          <h1>Selamat datang, {profile.full_name || user.email}</h1>
          <p className="lead">Role aktif: <strong>{profile.role}</strong></p>
        </div>
        <button className="btn ghost dark-ghost" onClick={keluar}>Keluar</button>
      </div>
      <div className="admin-grid">
        <article className="admin-panel">
          <span className="service-icon">01</span>
          <h2>Konten website</h2>
          <p>Kelola statistik, profil, potensi, wisata, dan informasi publik Desa Sukakerti.</p>
          <p className="admin-muted">Struktur tabel konten siap digunakan di Supabase.</p>
        </article>
        <article className="admin-panel">
          <span className="service-icon">02</span>
          <h2>Data layanan</h2>
          <p>Kelola permohonan surat dan aspirasi warga setelah tabel layanan diaktifkan.</p>
          <p className="admin-muted">Akses hanya tersedia untuk akun dengan role admin.</p>
        </article>
      </div>
      <form className="admin-editor" onSubmit={simpan}>
        <div className="admin-editor-heading">
          <div>
            <span className="pill">Editor konten</span>
            <h2>Informasi beranda</h2>
          </div>
          <button className="btn" type="submit">Simpan perubahan</button>
        </div>
        <label>
          Ringkasan desa
          <textarea rows={5} value={content.site_summary} onChange={(event) => setContent({ ...content, site_summary: event.target.value })} required />
        </label>
        <div className="admin-stats-editor">
          {content.stats.map((stat, index) => (
            <div className="admin-stat-row" key={`stat-${index}`}>
              <label>
                Label statistik
                <input value={stat.label} onChange={(event) => ubahStat(index, "label", event.target.value)} required />
              </label>
              <label>
                Nilai
                <input value={stat.nilai} onChange={(event) => ubahStat(index, "nilai", event.target.value)} required />
              </label>
            </div>
          ))}
        </div>
        <div className="admin-vision-editor">
          <label>
            Kutipan visi
            <input value={content.vision.kutipan} onChange={(event) => setContent({ ...content, vision: { ...content.vision, kutipan: event.target.value } })} required />
          </label>
          <label>
            Penjelasan visi
            <textarea rows={4} value={content.vision.arti} onChange={(event) => setContent({ ...content, vision: { ...content.vision, arti: event.target.value } })} required />
          </label>
        </div>
        {saveStatus && <p role="status" className={saveStatus.ok ? "note ok" : "note err"}>{saveStatus.teks}</p>}
      </form>
    </section>
  );
}
