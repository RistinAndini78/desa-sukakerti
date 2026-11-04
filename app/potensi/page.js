import Link from "next/link";
import PageHead from "@/components/PageHead";
import { potensi as p } from "@/lib/data";

export const metadata = { title: "Potensi Desa | Desa Sukakerti" };

export default function Potensi() {
  return (
    <>
      <PageHead judul="Potensi desa" deskripsi="Sektor unggulan penggerak ekonomi, sosial, dan kesejahteraan masyarakat Desa Sukakerti." />

      <section className="section">
        <div className="container split">
          <div>
            <h2>Pertanian &amp; perkebunan</h2>
            <p>{p.pertanian.teks}</p>
            <p><b>Komoditas unggulan</b></p>
            <ul className="tags">
              {p.pertanian.komoditas.map((k) => (<li key={k}>{k}</li>))}
            </ul>
            <p><b>Pelaku:</b> {p.pertanian.pelaku}</p>
          </div>
          <div>
            <h2>UMKM</h2>
            <p>Pelaku UMKM merupakan penggerak ekonomi masyarakat Desa Sukakerti. Dari kuliner hingga budidaya, usaha warga menghadirkan produk khas yang layak didukung.</p>
            <Link href="/umkm" className="btn dark">Kenali pelaku UMKM</Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container split">
          <div>
            <h2>Sarana pendidikan</h2>
            {p.pendidikan.map((j) => (
              <div key={j.jenjang}>
                <h3>{j.jenjang}</h3>
                <ul className="bullets">{j.daftar.map((n) => (<li key={n}>{n}</li>))}</ul>
              </div>
            ))}
          </div>
          <div>
            <h2>Fasilitas kesehatan</h2>
            <p>{p.kesehatan.teks}</p>
            <div className="kv">
              {p.kesehatan.angka.map((a) => (
                <div key={a.label} style={{ display: "contents" }}>
                  <div>{a.label}</div><div>{a.nilai}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2>Fasilitas pemerintah desa</h2>
            <ul className="tags">{p.fasilitas.map((f) => (<li key={f}>{f}</li>))}</ul>
          </div>
          <div>
            <h2>Usaha masyarakat</h2>
            <ul className="tags">{p.usahaMasyarakat.map((f) => (<li key={f}>{f}</li>))}</ul>
          </div>
        </div>
      </section>
    </>
  );
}
