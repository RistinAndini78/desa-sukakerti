import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Desa Sukakerti | Cisalak, Subang",
  description:
    "Website resmi Desa Sukakerti, Kecamatan Cisalak, Kabupaten Subang. Profil desa, data penduduk, potensi, wisata, UMKM, dan layanan masyarakat.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
