import Link from "next/link";
import Image from "next/image";
import { menu } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container foot-grid">
        <div>
          <div className="brand brand-foot">
            <span className="mono" aria-hidden="true">SK</span>
            <span className="brand-text">Desa Sukakerti</span>
          </div>
          <div className="footer-logos" aria-label="Logo pendukung">
            <Image src="/logo-subang.png" alt="Logo Kabupaten Subang" width={58} height={70} />
            <Image src="/logo-kelompok.png" alt="Logo kelompok" width={70} height={70} />
          </div>
          <p>Sistem Informasi Pemerintahan &amp; Pelayanan Desa. Kecamatan Cisalak, Kabupaten Subang, Jawa Barat.</p>
        </div>
        <div>
          <h3>Navigasi</h3>
          <ul>
            {menu.map((m) => (
              <li key={m.href}><Link href={m.href}>{m.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Lokasi</h3>
          <p>Kec. Cisalak, Kab. Subang<br />Provinsi Jawa Barat</p>
        </div>
      </div>
      <div className="container foot-bottom">© 2026 Pemerintah Desa Sukakerti. Hak cipta dilindungi.</div>
    </footer>
  );
}
