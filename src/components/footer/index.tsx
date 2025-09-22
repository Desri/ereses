"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store/profileStore";

export default function FooterComponent() {
  const isLogin = useAuthStore((state) => state.isLogin);
  return (
    <footer className="border-b-2 border-solid border-[#E8EFF6] py-8 bg-[#2F5673]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-0 sm:flex gap-x-4 items-center border-b border-solid border-white pb-5 mb-8">
        <div className="mb-3 sm:mb-0">
          <Image src="/assets/logo.png" width={60} height={40} alt="Logo" />
        </div>
        <div>
          <p className="text-white">
            E-Reses DPRD PALI adalah platform digital untuk masyarakat
            mengajukan aspirasi secara langsung kepada DPRD Kabupaten PALI. Mari
            bersama wujudkan pembangunan yang lebih baik!
          </p>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div>
          <p className="text-white">Copyright © E-RESES 2025</p>
        </div>
        <div>
          <div className="flex items-center gap-x-8">
            <nav className="space-x-8 uppercase text-white">
              <Link href="/">Beranda</Link>
              <Link href={isLogin ? "/aspirasi" : "/login"}>Aspirasi</Link>
              <Link href="/member">Anggota DPRD</Link>
              <Link href="/informasi">Berita</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
