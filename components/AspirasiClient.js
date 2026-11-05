"use client";
import { useState } from "react";
import { layananSurat } from "@/lib/data";

const WA = process.env.NEXT_PUBLIC_WA_NUMBER || "";

const jenisList = ["Aspirasi / pengaduan", ...layananSurat.map((s) => s.nama)];

export default function AspirasiClient() {
  const [jenis, setJenis] = useState(jenisList[0]);
  const [nama, setNama] = useState("");
  const [kontak, setKontak] = useState("");
  const [pesan, setPesan] = useState("");
  const [status, setStatus] = useState(null);

  function pilihSurat(nama) {
    setJenis(nama);
    setStatus(null);
    document.getElementById("form-layanan")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function kirim(e) {
    e.preventDefault();
    const teks =
      `Halo Pemerintah Desa Sukakerti,\n\nJenis: ${jenis}\nNama: ${nama}\nKontak: ${kontak || "-"}\n\n${pesan}`;
    if (!WA) {
      setStatus({
        ok: false,
        teks: "Nomor WhatsApp admin belum diatur. Isi NEXT_PUBLIC_WA_NUMBER di file .env.local, lalu jalankan ulang.",
      });
      return;
    }
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(teks)}`, "_blank", "noopener");
    setStatus({ ok: true, teks: "WhatsApp terbuka dengan pesan yang sudah terisi. Tekan kirim di sana untuk menyelesaikan." });
  }

  return (
    <>
      <section className="section">
        <div className="container">
          <h2>Layanan surat online</h2>
          <p className="lead">Pilih jenis surat, lalu isi data pada formulir. Pengajuan akan diteruskan ke WhatsApp admin desa untuk diperiksa dan diproses secara manual.</p>
          <div className="grid3">
            {layananSurat.map((s) => (
              <button key={s.kode} className="surat" onClick={() => pilihSurat(s.nama)}>
                <strong>{s.nama}</strong>
                <span>Ajukan permohonan</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="form-layanan">
        <div className="container narrow">
          <h2>Sampaikan pesan Anda</h2>
          <p className="service-note"><strong>Layanan gratis.</strong> Setelah formulir dikirim, WhatsApp akan terbuka dengan pesan yang sudah disiapkan. Tekan tombol kirim di WhatsApp agar pengajuan diterima admin.</p>
          <form onSubmit={kirim} className="form">
            <label>
              Jenis layanan
              <select value={jenis} onChange={(e) => setJenis(e.target.value)}>
                {jenisList.map((j) => (<option key={j}>{j}</option>))}
              </select>
            </label>
            <label>
              Nama lengkap
              <input required value={nama} onChange={(e) => setNama(e.target.value)} autoComplete="name" />
            </label>
            <label>
              Nomor HP (opsional)
              <input value={kontak} onChange={(e) => setKontak(e.target.value)} inputMode="tel" autoComplete="tel" />
            </label>
            <label>
              {jenis === jenisList[0] ? "Isi aspirasi" : "Keperluan dan data pendukung"}
              <textarea required rows={5} value={pesan} onChange={(e) => setPesan(e.target.value)} />
            </label>
            <button type="submit" className="btn">Lanjutkan ke WhatsApp</button>
            {status && (
              <p role="status" className={status.ok ? "note ok" : "note err"}>{status.teks}</p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
