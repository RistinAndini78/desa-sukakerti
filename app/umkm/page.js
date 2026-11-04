import PageHead from "@/components/PageHead";
import { umkm, waLink } from "@/lib/data";

export const metadata = { title: "UMKM | Desa Sukakerti" };

export default function Umkm() {
  return (
    <>
      <PageHead judul="UMKM desa" deskripsi="Kenali pelaku usaha warga dan hubungi mereka langsung untuk memesan atau bekerja sama." />
      <section className="section">
        <div className="container umkm-grid">
          {umkm.map((u) => (
            <article className="umkm" key={u.nama}>
              <span className="pill" style={{ alignSelf: "flex-start" }}>{u.jenis}</span>
              <h2 style={{ fontSize: "1.5rem" }}>{u.nama}</h2>
              <div className="owner">Pemilik: {u.pemilik}</div>
              <p>{u.deskripsi}</p>
              <dl>
                <dt>Harga</dt><dd>{u.harga}</dd>
                <dt>Alamat</dt><dd>{u.alamat}</dd>
                <dt>Kontak</dt><dd>{u.kontak}</dd>
                {u.extra && (<><dt>Media sosial</dt><dd>{u.extra}</dd></>)}
              </dl>
              <a className="btn dark" href={waLink(u.kontak)} target="_blank" rel="noopener noreferrer">Hubungi via WhatsApp</a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
