"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  statistik as defaultStatistik,
  visi as defaultVisi,
  desa as defaultDesa,
  wilayah,
  perangkat,
  bpd,
  demografi,
  wisata,
} from "@/lib/data";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [content, setContent] = useState({
    site_summary: defaultDesa.ringkasan,
    stats: defaultStatistik,
    vision: defaultVisi,
  });
  const [saveStatus, setSaveStatus] = useState(null);
  const [contentRows, setContentRows] = useState([]);
  const [crudForm, setCrudForm] = useState({ key: "", value: "{}" });
  const [editingKey, setEditingKey] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: "" });

  useEffect(() => {
    let active = true;

    async function loadAdmin() {
      try {
        const supabase = createClient();
        const { data: { session }, error: userError } = await supabase.auth.getSession();
        const currentUser = session?.user;
        if (userError || !currentUser) {
          window.location.assign("/admin/login");
          return;
        }

        const [profileResult, contentResult] = await Promise.all([
          supabase
            .from("profiles")
            .select("full_name, role")
            .eq("id", currentUser.id)
            .single(),
          supabase
            .from("site_content")
            .select("key, value")
            .in("key", ["site_summary", "stats", "vision"]),
        ]);
        const { data: currentProfile, error: profileError } = profileResult;
        const { data: savedContent, error: contentError } = contentResult;

        if (profileError || currentProfile?.role !== "admin") {
          await supabase.auth.signOut();
          if (active) setStatus({ loading: false, error: "Akun ini belum memiliki role admin." });
          return;
        }

        if (active) {
          setUser(currentUser);
          setProfile(currentProfile);
          setStatus({ loading: false, error: "" });
          if (contentError) {
            setSaveStatus({ ok: false, teks: `Konten bawaan digunakan: ${contentError.message}` });
          } else if (savedContent?.length) {
            setContentRows(savedContent);
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
      setContentRows(rows.map(({ key, value }) => ({ key, value })));
      setSaveStatus({ ok: true, teks: "Perubahan berhasil disimpan." });
    } catch (error) {
      setSaveStatus({ ok: false, teks: error.message });
    }

    function mulaiEdit(row) {
      setEditingKey(row.key);
      setCrudForm({ key: row.key, value: JSON.stringify(row.value, null, 2) });
    }

    function batalEdit() {
      setEditingKey(null);
      setCrudForm({ key: "", value: "{}" });
    }

    async function simpanCrud(event) {
      event.preventDefault();
      setSaveStatus(null);
      try {
        const key = crudForm.key.trim();
        if (!key) throw new Error("Key konten wajib diisi.");
        const value = JSON.parse(crudForm.value);
        const supabase = createClient();
        const { data, error } = await supabase
          .from("site_content")
          .upsert({ key, value, updated_by: user.id }, { onConflict: "key" })
          .select("key, value")
          .single();
        if (error) throw error;
        setContentRows((rows) => [
          ...rows.filter((row) => row.key !== key && row.key !== editingKey),
          data,
        ]);
        if (key === "site_summary" || key === "stats" || key === "vision") {
          setContent((current) => ({ ...current, [key]: value }));
        }
        setSaveStatus({ ok: true, teks: "Data konten berhasil disimpan." });
        batalEdit();
      } catch (error) {
        setSaveStatus({ ok: false, teks: `Gagal menyimpan: ${error.message}` });
      }
    }

    async function hapusCrud(key) {
      if (!window.confirm(`Hapus konten "${key}"?`)) return;
      setSaveStatus(null);
      try {
        const { error } = await createClient().from("site_content").delete().eq("key", key);
        if (error) throw error;
        setContentRows((rows) => rows.filter((row) => row.key !== key));
        setSaveStatus({ ok: true, teks: "Data konten berhasil dihapus." });
      } catch (error) {
        setSaveStatus({ ok: false, teks: `Gagal menghapus: ${error.message}` });
      }
    }
  }

  if (status.loading) return null;
  if (status.error) return <section className="admin-card"><p role="alert" className="note err">{status.error}</p></section>;

  return (
    <section className="admin-dashboard">
      <div className="admin-topbar">
        <div>
          <span className="pill">Dashboard admin</span>
          <h1>Selamat datang, {profile.full_name || user.email}</h1>
          <p className="lead">Role aktif: <strong>{profile.role}</strong></p>
        </div>
      </div>
      <div className="admin-grid">
        <article className="admin-panel">
          <span className="service-icon">01</span>
          <h2>Profil wilayah</h2>
          <p>Ketinggian: <strong>{wilayah.ketinggian}</strong></p>
          <p>Luas: <strong>{wilayah.luas}</strong></p>
          <p>Pembagian: <strong>{wilayah.pembagian}</strong></p>
          <p className="admin-muted">Batas utara: {wilayah.batas[0].desa} · Selatan: {wilayah.batas[1].desa}</p>
        </article>
        <article className="admin-panel">
          <span className="service-icon">02</span>
          <h2>Demografi</h2>
          <p>Total penduduk: <strong>{demografi.total.toLocaleString("id-ID")}</strong> jiwa</p>
          <p>Laki-laki: {demografi.laki.toLocaleString("id-ID")} · Perempuan: {demografi.perempuan.toLocaleString("id-ID")}</p>
          <p>KK: <strong>{demografi.kk.toLocaleString("id-ID")}</strong></p>
          <p className="admin-muted">Sanitasi layak: {demografi.sanitasiLayak} KK · Kurang mampu: {demografi.kurangMampu} KK</p>
        </article>
        <article className="admin-panel admin-panel-wide">
          <span className="service-icon">03</span>
          <h2>Perangkat desa</h2>
          <div className="admin-people">
            {perangkat.map((orang) => <span key={orang.jabatan}><strong>{orang.jabatan}</strong>{orang.nama}</span>)}
          </div>
        </article>
        <article className="admin-panel admin-panel-wide">
          <span className="service-icon">04</span>
          <h2>BPD dan wisata</h2>
          <p>{bpd.pengantar}</p>
          <p className="admin-muted">Destinasi terdaftar: {wisata.map((tempat) => tempat.nama).join(", ")}.</p>
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
      <section className="admin-editor admin-crud">
        <div className="admin-editor-heading">
          <div>
            <span className="pill">CRUD konten</span>
            <h2>Kelola data tersimpan</h2>
          </div>
        </div>
        <form className="crud-form" onSubmit={simpanCrud}>
          <label>
            Key konten
            <input
              value={crudForm.key}
              onChange={(event) => setCrudForm({ ...crudForm, key: event.target.value })}
              disabled={Boolean(editingKey)}
              placeholder="contoh: pengumuman"
              required
            />
          </label>
          <label>
            Nilai JSON
            <textarea
              rows={5}
              value={crudForm.value}
              onChange={(event) => setCrudForm({ ...crudForm, value: event.target.value })}
              required
            />
          </label>
          <div className="crud-actions">
            <button className="btn" type="submit">{editingKey ? "Perbarui data" : "Tambah data"}</button>
            {editingKey && <button className="btn ghost" type="button" onClick={batalEdit}>Batal</button>}
          </div>
        </form>
        <div className="crud-list">
          {contentRows.map((row) => (
            <article className="crud-row" key={row.key}>
              <div>
                <strong>{row.key}</strong>
                <pre>{JSON.stringify(row.value, null, 2)}</pre>
              </div>
              <div className="crud-actions">
                <button className="btn ghost" type="button" onClick={() => mulaiEdit(row)}>Edit</button>
                <button className="btn danger" type="button" onClick={() => hapusCrud(row.key)}>Hapus</button>
              </div>
            </article>
          ))}
          {!contentRows.length && <p className="admin-muted">Belum ada data konten tersimpan.</p>}
        </div>
      </section>
    </section>
  );
}
