import PageHead from "@/components/PageHead";
import AspirasiClient from "@/components/AspirasiClient";

export const metadata = { title: "Layanan & Aspirasi | Desa Sukakerti" };

export default function Aspirasi() {
  return (
    <>
      <PageHead judul="Layanan & aspirasi" deskripsi="Pengaduan masyarakat dan layanan administrasi online Desa Sukakerti." />
      <AspirasiClient />
    </>
  );
}
