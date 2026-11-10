import PageHead from "@/components/PageHead";
import { tokoKedai, waLink } from "@/lib/data";

export const metadata = { title: "Toko/Kedai | Desa Sukakerti" };

export default function TokoKedai() {
  return (
    <>
      <PageHead judul="Toko/Kedai" deskripsi="Temukan toko dan kedai milik warga Desa Sukakerti." />
      <section className="section">
        <div className="container umkm-grid">
          {tokoKedai.map((toko) => (
            <article className="umkm" key={toko.nama}>
              <span className="pill" style={{ alignSelf: "flex-start" }}>Toko/Kedai</span>
              <h2 style={{ fontSize: "1.5rem" }}>{toko.nama}</h2>
              <div className="owner">Pemilik: {toko.pemilik || "Belum dicantumkan"}</div>
              <dl>
                <dt>Alamat</dt><dd>{toko.alamat}</dd>
                {toko.kontak && <><dt>No. HP</dt><dd>{toko.kontak}</dd></>}
              </dl>
              {toko.kontak && toko.kontak.length > 5 && (
                <a className="btn dark" href={waLink(toko.kontak)} target="_blank" rel="noopener noreferrer">
                  Hubungi via WhatsApp
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
