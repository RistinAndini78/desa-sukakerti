import PageHead from "@/components/PageHead";
import { demografi as d } from "@/lib/data";

export const metadata = { title: "Data Penduduk | Desa Sukakerti" };

const fmt = (n) => n.toLocaleString("id-ID");
const pct = (a, b) => Math.round((a / b) * 100);

export default function Penduduk() {
  const pl = pct(d.laki, d.total);
  return (
    <>
      <PageHead judul="Data penduduk" deskripsi="Sebaran demografi Desa Sukakerti." />
      <section className="section">
        <div className="container split">
          <div>
            <div className="bigstat">{fmt(d.total)}</div>
            <p className="lead">jiwa penduduk dalam {fmt(d.kk)} kepala keluarga</p>
            <div className="bar" role="img" aria-label={`Laki-laki ${d.laki}, perempuan ${d.perempuan}`}>
              <div className="l" style={{ width: pl + "%" }}>{fmt(d.laki)}</div>
              <div className="p" style={{ width: 100 - pl + "%" }}>{fmt(d.perempuan)}</div>
            </div>
            <div className="legend"><span>Laki-laki</span><span>Perempuan</span></div>
          </div>
          <div>
            <div className="meter">
              <div className="meter-top"><span>Sanitasi layak</span><span>{fmt(d.sanitasiLayak)} KK</span></div>
              <div className="meter-track"><div className="meter-fill" style={{ width: pct(d.sanitasiLayak, d.kk) + "%" }} /></div>
              <small>{pct(d.sanitasiLayak, d.kk)}% dari seluruh kepala keluarga</small>
            </div>
            <div className="meter">
              <div className="meter-top"><span>Keluarga kurang mampu</span><span>{fmt(d.kurangMampu)} KK</span></div>
              <div className="meter-track"><div className="meter-fill warm" style={{ width: pct(d.kurangMampu, d.kk) + "%" }} /></div>
              <small>{pct(d.kurangMampu, d.kk)}% dari seluruh kepala keluarga</small>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
