"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuthStore } from "@/store/profileStore";

export default function NavbarDashboardComponent() {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <div className="flex items-center gap-x-2.5 bg-[#d39c55] text-white font-bold text-sm p-4">
        <div>
          <Image src="/assets/logo.png" width={55} height={35} alt="Logo" />
        </div>
        <div>
          <div>DEWAN PERWAKILAN</div>
          <div>RAKYAT DAERAH PALI</div>
        </div>
      </div>
      <ul className="p-4">
        <li className="px-2.5 py-3">
          <Link
            href="/dashboard"
            className="hover:text-gray-400 block flex items-center gap-x-1"
          >
            <Image
              src="/assets/dashboard-icon.png"
              width={20}
              height={25}
              alt="Dashboard"
            />{" "}
            Dashboard
          </Link>
        </li>
        <li className="px-2.5 py-3">
          <Link
            href="/dashboard/pengajuan-aspirasi"
            className="hover:text-gray-400 block flex items-center gap-x-1"
          >
            <Image
              src="/assets/note-icon.png"
              width={18}
              height={25}
              alt="Dashboard"
            />{" "}
            Pengajuan Aspirasi
          </Link>
        </li>
        {/* <li className='px-2.5 py-3'>
          <Link href="/dashboard/riwayat" className="hover:text-gray-400 block flex items-center gap-x-1">
            <Image
              src="/assets/riwayat-icon.png"
              width={19}
              height={25}
              alt="Dashboard"
            /> Riwayat Pengajuan
          </Link>
        </li> */}

        <li className="px-2.5 py-3">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="hover:no-underline py-0">
                <div className="no-hover text-[#000000] text-base hover:text-gray-400 font-normal">
                  <Image
                    src="/assets/riwayat-icon.png"
                    width={19}
                    height={25}
                    alt="Dashboard"
                    className="float-left mr-1"
                  />{" "}
                  Riwayat Pengajuan
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <ul>
                  <li className="pl-6 py-4">
                    <Link
                      href="/dashboard/pengajuan/diverifikasi"
                      className="text-base hover:text-gray-400 block flex items-center gap-x-1"
                    >
                      Pengajuan Diverifikasi
                    </Link>
                  </li>
                  <li className="pl-6 pb-4">
                    <Link
                      href="/dashboard/pengajuan/ditolak"
                      className="text-base hover:text-gray-400 block flex items-center gap-x-1"
                    >
                      Pengajuan Ditolak
                    </Link>
                  </li>
                  <li className="pl-6">
                    <Link
                      href="/dashboard/pengajuan/direvisi"
                      className="text-base hover:text-gray-400 block flex items-center gap-x-1"
                    >
                      Pengajuan Direvisi
                    </Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </li>

        {user?.roleId === 3 && (
          <li className="px-2.5 py-3">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="border-0">
                <AccordionTrigger className="hover:no-underline py-0">
                  <div className="no-hover text-[#000000] text-base hover:text-gray-400 font-normal">
                    <Image
                      src="/assets/data-master.png"
                      width={19}
                      height={25}
                      alt="Dashboard"
                      className="float-left mr-1"
                    />{" "}
                    Data Master
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <ul>
                    <li className="pl-6 py-4">
                      <Link
                        href="/dashboard/hero-sections"
                        className="text-base hover:text-gray-400 block flex items-center gap-x-1"
                      >
                        Hero Section
                      </Link>
                    </li>
                    <li className="pl-6 pb-4">
                      <Link
                        href="/#"
                        className="text-base hover:text-gray-400 block flex items-center gap-x-1"
                      >
                        Syarat & Ketentuan
                      </Link>
                    </li>
                    <li className="pl-6 pb-4">
                      <Link
                        href="/dashboard/dapil"
                        className="text-base hover:text-gray-400 block flex items-center gap-x-1"
                      >
                        Dapil
                      </Link>
                    </li>
                    <li className="pl-6 pb-4">
                      <Link
                        href="/dashboard/fraksi"
                        className="text-base hover:text-gray-400 block flex items-center gap-x-1"
                      >
                        Fraksi
                      </Link>
                    </li>
                    <li className="pl-6 pb-4">
                      <Link
                        href="/dashboard/komisi"
                        className="text-base hover:text-gray-400 block flex items-center gap-x-1"
                      >
                        Komisi
                      </Link>
                    </li>
                    <li className="pl-6 pb-4">
                      <Link
                        href="/dashboard/kecamatan"
                        className="text-base hover:text-gray-400 block flex items-center gap-x-1"
                      >
                        Kecamatan
                      </Link>
                    </li>
                    <li className="pl-6">
                      <Link
                        href="/dashboard/aspirasi"
                        className="text-base hover:text-gray-400 block flex items-center gap-x-1"
                      >
                        Aspirasi
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
        )}

        {user?.roleId === 3 && (
          <li className="px-2.5 py-3">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="border-0">
                <AccordionTrigger className="hover:no-underline py-0">
                  <div className="no-hover text-[#000000] text-base hover:text-gray-400 font-normal">
                    <Image
                      src="/assets/kelola-akun.png"
                      width={19}
                      height={25}
                      alt="Dashboard"
                      className="float-left mr-1"
                    />{" "}
                    Kelola Akun
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <ul>
                    <li className="pl-6 py-4">
                      <Link
                        href="/dashboard/kelola-akun-anggota"
                        className="text-base hover:text-gray-400 block flex items-center gap-x-1"
                      >
                        Anggota
                      </Link>
                    </li>
                    <li className="pl-6 pb-4">
                      <Link
                        href="/dashboard/kelola-akun-masyarakat"
                        className="text-base hover:text-gray-400 block flex items-center gap-x-1"
                      >
                        Masyarakat
                      </Link>
                    </li>
                    <li className="pl-6">
                      <Link
                        href="/dashboard/hak-akses"
                        className="text-base hover:text-gray-400 block flex items-center gap-x-1"
                      >
                        Hak Akses
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
        )}

        {user?.roleId === 3 && (
          <li className="px-2.5 py-3">
            <Link
              href="/dashboard/berita"
              className="hover:text-gray-400 block flex items-center gap-x-1"
            >
              <Image
                src="/assets/book-icon.png"
                width={19}
                height={25}
                alt="Berita"
              />{" "}
              Berita
            </Link>
          </li>
        )}

        <li className="px-2.5 py-3">
          <Link
            href="/dashboard/diskusi"
            className="hover:text-gray-400 block flex items-center gap-x-1"
          >
            <Image
              src="/assets/envelope-icon.png"
              width={19}
              height={25}
              alt="Dashboard"
            />{" "}
            Forum Diskusi
          </Link>
        </li>

        <li className="px-2.5 py-3">
          <Link
            href="/dashboard/laporan"
            className="hover:text-gray-400 block flex items-center gap-x-1"
          >
            <Image
              src="/assets/book-icon.png"
              width={19}
              height={25}
              alt="Dashboard"
            />{" "}
            Laporan
          </Link>
        </li>
      </ul>
    </>
  );
}
