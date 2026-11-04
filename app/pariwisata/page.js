import PageHead from "@/components/PageHead";
import { wisata } from "@/lib/data";

export const metadata = { title: "Wisata & Religi | Desa Sukakerti" };

export default function Pariwisata() {
  return (
    <>
      <PageHead judul="Wisata & religi" deskripsi="Jelajahi keasrian budaya, situs leluhur, dan alam Desa Sukakerti." />
      <section className="section">
        <div className="container">
          {wisata.map((w) => (
            <article className="spot" key={w.slug} id={w.slug}>
              <div>
                <span className="pill">{w.kategori}</span>
                <h2>{w.nama}</h2>
              </div>
              <p>{w.teks}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
