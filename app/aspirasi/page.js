import PageHead from "@/components/PageHead";
import AspirasiClient from "@/components/AspirasiClient";

export const metadata = { title: "Layanan & Aspirasi | Desa Sukakerti" };

export default function Aspirasi() {
  return (
    <>
      <PageHead judul="Layanan & aspirasi" deskripsi="Ajukan layanan administrasi dan sampaikan aspirasi kepada Pemerintah Desa Sukakerti melalui WhatsApp." />
      <AspirasiClient />
    </>
  );
}
