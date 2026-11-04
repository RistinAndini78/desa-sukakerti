import PageHead from "@/components/PageHead";
import { desa, wilayah, bencana, perangkat, bpd, visi, misi } from "@/lib/data";

export const metadata = { title: "Profil | Desa Sukakerti" };

export default function Profil() {
  const [kades, ...lainnya] = perangkat;
  return (
    <>
      <PageHead judul="Profil desa" deskripsi="Wilayah, pemerintahan, dan arah pembangunan Desa Sukakerti." />

      <section className="section">
        <div className="container">
          <p>{desa.ringkasan}</p>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <h2>Ruang lingkup wilayah</h2>
          <div className="split">
            <div>
              <div className="kv">
                <div>Ketinggian</div><div>{wilayah.ketinggian}</div>
                <div>Luas wilayah</div><div>{wilayah.luas}</div>
                <div>Pembagian wilayah</div><div>{wilayah.pembagian}</div>
              </div>
              <h3 style={{ marginTop: "1.6rem" }}>Batas wilayah</h3>
              <div className="kv">
                {wilayah.batas.map((b) => (
                  <Fragment2 key={b.arah} a={b.arah} b={b.desa} />
                ))}
              </div>
            </div>
            <div>
              <h3>Aksesibilitas &amp; jarak tempuh</h3>
              <div className="kv">
                {wilayah.jarak.map((j) => (
                  <Fragment2 key={j.tujuan} a={j.tujuan} b={j.jarak} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Lingkungan &amp; kesiapsiagaan bencana</h2>
          <p>{bencana.isi}</p>
          <p className="source"><b>Sumber:</b> {bencana.sumber}</p>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <h2>Struktur organisasi pemerintah</h2>
          <h3>Perangkat desa</h3>
          <div className="people">
            <div className="person lead-p"><small>{kades.jabatan}</small><b>{kades.nama}</b></div>
            {lainnya.map((p) => (
              <div className="person" key={p.jabatan}><small>{p.jabatan}</small><b>{p.nama}</b></div>
            ))}
          </div>
          <h3 style={{ marginTop: "2rem" }}>Badan Permusyawaratan Desa (BPD)</h3>
          <p>{bpd.pengantar}</p>
          <p><b>Fungsi utama BPD:</b></p>
          <ul className="bullets">
            {bpd.fungsi.map((f) => (<li key={f}>{f}</li>))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="visi-box">
            <h2>Visi {visi.periode}</h2>
            <p className="big">{visi.kutipan}</p>
            <p>{visi.arti}</p>
          </div>
          <div>
            <h2>Misi</h2>
            <ol className="misi">
              {misi.map((m) => (<li key={m.slice(0, 24)}>{m}</li>))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}

function Fragment2({ a, b }) {
  return (
    <>
      <div>{a}</div>
      <div>{b}</div>
    </>
  );
}
