import AdminDashboard from "@/components/AdminDashboard";

export const metadata = { title: "Dashboard Admin | Desa Sukakerti" };

export default function AdminPage() {
  return (
    <main className="admin-shell">
      <AdminDashboard />
    </main>
  );
}
