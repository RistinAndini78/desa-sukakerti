"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { menu } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const isAdminArea = pathname.startsWith("/admin");
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const primaryMenu = menu.filter((item) => ["/", "/profil", "/potensi"].includes(item.href));
  const secondaryMenu = menu.filter((item) => !primaryMenu.some((primary) => primary.href === item.href));
  return (
    <header className="nav">
      <div className="container nav-in">
        <div className="institution-logos" aria-label="Logo pendukung">
          <Image src="/logo-subang.png" alt="Logo Kabupaten Subang" width={52} height={64} />
          <Image src="/logo-kelompok.png" alt="Logo kelompok" width={64} height={64} />
        </div>
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-text">
            Desa Sukakerti
            <small>Cisalak, Subang</small>
          </span>
        </Link>
        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="menu-utama"
          onClick={() => setOpen(!open)}
        >
          {open ? "Tutup" : "Menu"}
        </button>
        <nav id="menu-utama" className={"menu" + (open ? " open" : "")} aria-label={isAdminArea ? "Menu admin" : "Menu utama"}>
          {isAdminArea ? (
            <>
              <span className="admin-nav-label">Area Pengelola</span>
              {pathname !== "/admin" && (
                <Link href="/admin" onClick={() => setOpen(false)}>Dashboard</Link>
              )}
              <Link href="/" className="admin-nav-public" onClick={() => setOpen(false)}>Lihat situs</Link>
            </>
          ) : (
            <>
          {primaryMenu.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={pathname === m.href ? "active" : ""}
              aria-current={pathname === m.href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {m.label}
            </Link>
          ))}
          <div className={"menu-more" + (moreOpen ? " open" : "")}>
            <button
              type="button"
              className="menu-more-toggle"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen(!moreOpen)}
            >
              Jelajah <span className="menu-chevron" aria-hidden="true" />
            </button>
            <div className="menu-more-list">
              {secondaryMenu.map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  className={pathname === m.href ? "active" : ""}
                  aria-current={pathname === m.href ? "page" : undefined}
                  onClick={() => { setOpen(false); setMoreOpen(false); }}
                >
                  {m.label}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/admin/login" className="admin-link" onClick={() => setOpen(false)}>
            Admin
          </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
