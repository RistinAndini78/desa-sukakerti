"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { menu } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const primaryMenu = menu.filter((item) => ["/", "/profil", "/potensi"].includes(item.href));
  return (
    <header className="nav">
      <div className="container nav-in">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="mono" aria-hidden="true">SK</span>
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
        <nav id="menu-utama" className={"menu" + (open ? " open" : "")} aria-label="Menu utama">
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
          <Link href="/admin/login" className="admin-link" onClick={() => setOpen(false)}>
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
