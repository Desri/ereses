"use client";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/store/profileStore";

const BREADCRUMB_MAP: Record<string, { parent: string; child: string }> = {
  fraksi: { parent: "Data Master", child: "Fraksi" },
  dapil: { parent: "Data Master", child: "Dapil" },
  komisi: { parent: "Data Master", child: "Komisi" },
  kecamatan: { parent: "Data Master", child: "Kecamatan" },
  "hero-section": { parent: "Data Master", child: "Hero Section" },
  laporan: { parent: "Laporan", child: "Laporan" },
  diskusi: { parent: "Forum Diskusi", child: "Forum Diskusi" },
  "kelola-akun-masyarakat": {
    parent: "Kelola Akun",
    child: "Kelola Akun Masyarakat",
  },
  "kelola-akun-anggota": {
    parent: "Kelola Akun",
    child: "Kelola Akun Anggota",
  },
  diverifikasi: {
    parent: "Riwayat Pengajuan",
    child: "Pengajuan Diverifikasi",
  },
  ditolak: { parent: "Riwayat Pengajuan", child: "Pengajuan Ditolak" },
  direvisi: { parent: "Riwayat Pengajuan", child: "Pengajuan Direvisi" },
  "pengajuan-aspirasi": {
    parent: "Pengajuan Aspirasi",
    child: "Pengajuan Aspirasi",
  },
  berita: { parent: "Berita", child: "Berita" },
  "log-aktivitas": { parent: "Log Aktivitas", child: "Log Aktivitas" },
  "hero-sections": { parent: "Hero Section", child: "Hero Section" },
  "tambah-akun": { parent: "Kelola Akun", child: "Tambah Akun" },
  "hak-akses": { parent: "Kelola Akun", child: "Hak Akses" },
  "add-fraksi": { parent: "Data Master", child: "Tambah Fraksi" },
};

export default function TopbarComponent() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const lastSegment = pathname.split("/").filter(Boolean).pop() ?? "";
  const breadcrumb = BREADCRUMB_MAP[lastSegment];

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("userId");
    useAuthStore.persist?.clearStorage?.();
    useAuthStore.getState().logout();
    router.push("/");
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 border-b-2 border-solid border-[#ebebeb]">
      <div>
        {breadcrumb ? (
          <>
            <p className="font-bold">{breadcrumb.parent}</p>
            <p className="text-[#d39c55] capitalize">{breadcrumb.child}</p>
          </>
        ) : (
          <p className="text-base font-semibold">Halaman</p>
        )}
      </div>
      <div>
        <div className="flex items-center gap-x-3">
          <div>
            <Image
              src="/assets/notification-bell.png"
              width={25}
              height={25}
              alt="notification"
            />
          </div>
          <div>
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="inline-flex w-full justify-center items-center gap-2 rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700"
              >
                <img
                  src={user?.imageUrl || "https://storage.googleapis.com/a1aa/image/ZC9wKlZFh3t7xTanuPK8KGqomQ-uyfUHynfNuRFPiOI.jpg"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span>{user?.name}</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-2">
                    <a
                      href="/dashboard/profile"
                      className="flex items-center hover:bg-gray-100 px-4 py-2 gap-x-3 text-sm text-gray-700"
                    >
                      <span className="text-gray-500">
                        <Image
                          src="/assets/profile-icon.png"
                          width={28}
                          height={28}
                          alt="profile"
                        />
                      </span>{" "}
                      Profile
                    </a>
                    <a
                      href="/dashboard/notifikasi"
                      className="flex items-center hover:bg-gray-100 px-4 py-2 gap-x-3 text-sm text-gray-700"
                    >
                      <span className="text-gray-500">
                        <Image
                          src="/assets/notification-icon.png"
                          width={28}
                          height={28}
                          alt="profile"
                        />
                      </span>{" "}
                      Notifikasi
                    </a>
                    <a
                      href="/dashboard/log-aktivitas"
                      className="flex items-center hover:bg-gray-100 px-4 py-2 gap-x-3 text-sm text-gray-700"
                    >
                      <span className="text-gray-500">
                        <Image
                          src="/assets/clock-icon.png"
                          width={28}
                          height={28}
                          alt="profile"
                        />
                      </span>{" "}
                      Log Aktivitas
                    </a>
                    <button
                      type="button"
                      className="flex items-center w-full hover:bg-gray-100 px-4 py-2 gap-x-3 text-sm text-[#F04438] font-medium"
                      onClick={onLogout}
                    >
                      <span className="text-gray-500">
                        <Image
                          src="/assets/logout-icon.png"
                          width={28}
                          height={28}
                          alt="profile"
                        />
                      </span>{" "}
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
