import Link from "next/link";
import HeroArt from "@/components/HeroArt";
import { desa, ikonDesa, misi } from "@/lib/data";
import { getSiteContent } from "@/lib/content";

export default async function Beranda() {
  const content = await getSiteContent();
  const statistik = content.stats;
  const visi = content.vision;
  const ringkasan = content.site_summary;

  return (
    <>
      <section className="hero">
        <div className="container hero-in">
          <div className="hero-text">
            <p className="kicker">Sistem Informasi Pemerintahan &amp; Pelayanan Desa</p>
            <h1>{desa.nama}</h1>
            <p>{ringkasan}</p>
            <div className="actions">
              <Link href="/profil" className="btn">Jelajahi desa</Link>
              <Link href="/aspirasi" className="btn ghost">Layanan publik</Link>
            </div>
          </div>
          <HeroArt />
        </div>
      </section>

      <section className="stats" aria-label="Statistik desa">
        <div className="container stats-in">
          {statistik.map((s) => (
            <div className="stat" key={s.label}>
              <span className="stat-icon" aria-hidden="true">✦</span>
              <b>{s.nilai}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container ikon-in">
          <div className="ikon-visual" aria-hidden="true">
            <HeroArt image="/Kampung Palasari.jpeg" alt="Kampung Palasari" />
            <span className="visual-label">Ikon Desa Sukakerti</span>
          </div>
          <div className="ikon">
            <span className="pill">Ikon desa</span>
            <h2>{ikonDesa.judul}</h2>
            {ikonDesa.paragraf.map((p) => (<p key={p.slice(0, 20)}>{p}</p>))}
            <Link href="/pariwisata" className="btn dark">Lihat wisata &amp; religi <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-heading">
            <span className="pill">Arah pembangunan</span>
            <h2>Visi &amp; misi desa</h2>
            <p>Landasan bersama untuk membangun Desa Sukakerti yang maju, berdaya, dan tetap berakar pada budaya.</p>
          </div>
          <div className="split">
          <div className="visi-box">
            <h2>Visi {visi.periode}</h2>
            <p className="big">{visi.kutipan}</p>
            <p><b>“{visi.singkatan}”</b></p>
            <p>{visi.arti}</p>
          </div>
          <div>
            <h2>Misi</h2>
            <ol className="misi">
              {misi.map((m) => (<li key={m.slice(0, 24)}>{m}</li>))}
            </ol>
          </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Layanan &amp; informasi cepat</h2>
          <div className="grid3">
            <Link href="/penduduk" className="layanan">
              <span className="service-icon" aria-hidden="true">01</span>
              <h3>Data penduduk</h3>
              <p>Lihat sebaran penduduk, kepala keluarga, sanitasi, dan keluarga kurang mampu.</p>
            </Link>
            <Link href="/pariwisata" className="layanan">
              <span className="service-icon" aria-hidden="true">02</span>
              <h3>Wisata &amp; religi</h3>
              <p>Kampung Palasari, makam leluhur, Curug Cipanolih, dan destinasi lainnya.</p>
            </Link>
            <Link href="/umkm" className="layanan">
              <span className="service-icon" aria-hidden="true">03</span>
              <h3>UMKM desa</h3>
              <p>Kenali pelaku usaha warga dan hubungi mereka langsung untuk memesan.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
