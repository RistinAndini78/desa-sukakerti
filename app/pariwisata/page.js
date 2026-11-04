import PageHead from "@/components/PageHead";
import { wisata } from "@/lib/data";

export const metadata = { title: "Wisata & Religi | Desa Sukakerti" };

export default function Pariwisata() {
  return (
    <>
      <PageHead judul="Wisata & religi" deskripsi="Jelajahi keasrian budaya, situs leluhur, dan alam Desa Sukakerti." />
      <section className="section">
        <div className="container">
          {wisata.map((w, index) => (
            <article className="spot" key={w.slug} id={w.slug}>
              <div className="spot-head">
                <span className="pill">{w.kategori}</span>
                <h2><span className="spot-number">{String(index + 1).padStart(2, "0")}</span> {w.nama}</h2>
              </div>
              <div className="spot-image-wrap">
                <img className="spot-image" src={w.image} alt={`Foto ${w.nama}`} />
              </div>
              <div className="spot-detail">
                <p className="spot-copy">{w.teks}</p>
                <p className="spot-address"><strong>Alamat:</strong> {w.alamat}</p>
                <p className="spot-coordinate"><strong>Titik koordinat:</strong> {w.koordinat}</p>
                <a
                  className="spot-map"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(w.koordinat)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Buka lokasi di Google Maps
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
