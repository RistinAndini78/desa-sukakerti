"use client";

import { useState } from "react";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/client";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function masuk(event) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      if (!hasSupabaseConfig()) {
        throw new Error("Login admin belum terhubung ke Supabase. Tambahkan NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di Vercel.");
      }
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setStatus({ ok: false, teks: error.message });
        return;
      }
      window.location.assign("/admin");
    } catch (error) {
      setStatus({ ok: false, teks: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="admin-card">
      <span className="pill">Area terbatas</span>
      <h1>Login admin</h1>
      <p className="lead">Kelola informasi Desa Sukakerti melalui dashboard.</p>
      <form className="form" onSubmit={masuk}>
        <label>
          Email admin
          <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
        </label>
        <label>
          Kata sandi
          <input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />
        </label>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Memeriksa..." : "Masuk ke dashboard"}
        </button>
        {status && <p role="alert" className="note err">{status.teks}</p>}
      </form>
    </section>
  );
}
