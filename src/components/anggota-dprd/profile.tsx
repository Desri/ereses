import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import "./style.css";
import { useAuthStore } from "@/store/profileStore";
import { useEffect, useState } from "react";
import { getDetailAnggota } from "@/services/api/anggota";
import { AnggotaDetail } from "@/types/anggota";
import { formatDateID } from "@/utils/formatDate";

interface ProfileProps {
  slug1: string;
  slug2: string;
}
export default function ProfileAnggotaDprdComponent({
  slug1,
  slug2,
}: ProfileProps) {
  const isLogin = useAuthStore((state) => state.isLogin);
  const [detailAnggota, setDetailAnggota] = useState<AnggotaDetail>();
  useEffect(() => {
    fetchDetailAnggota();
  }, [slug1, slug2]);

  const fetchDetailAnggota = () => {
    if (!slug1 || !slug2) return;
    getDetailAnggota(slug1, slug2)
      .then((res: any) => {
        console.log("Check", res);
        setDetailAnggota(res.data);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };

  return (
    <>
      <div className="h-[250px] bg-center bg-no-repeat bg-cover bg-[url('/assets/bg-banner.png')]">
        <div className="text-center text-white pt-24 uppercase">
          <h2 className="text-2xl">Detail Profile Anggota</h2>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto mt-12 mb-12 px-4 sm:px-0">
        <div className="flex gap-3 sm:gap-7">
          <div>
            <img
              src={detailAnggota?.imageUrl}
              className="!relative !w-full !h-[250px] sm:!h-[340px]"
              alt={detailAnggota?.name}
            />
          </div>
          <div>
            <div className="flex items-center text-2xl text-[#473D3D] font-bold mb-8">
              <div>
                <span>{detailAnggota?.name}</span>
              </div>
              <div>
                <div className="w-[8px] h-[8px] bg-[#473D3D] rounded-full mx-2.5"></div>
              </div>
              <div>
                <span className="text-[#D39C55]">
                  {detailAnggota?.fraksi.name}
                </span>
              </div>
            </div>
            <table>
              <tbody>
                <tr>
                  <td className="pb-3">
                    <span className="font-bold">NIP</span>
                  </td>
                  <td className="px-1.5 pb-3">:</td>
                  <td className="pb-3">{detailAnggota?.nip}</td>
                </tr>
                <tr>
                  <td className="pb-3">
                    <span className="font-bold">Komisi</span>
                  </td>
                  <td className="px-1.5 pb-3">:</td>
                  <td className="pb-3">{detailAnggota?.komisi || "-"}</td>
                </tr>
                <tr>
                  <td className="pb-3">
                    <span className="font-bold">Umur</span>
                  </td>
                  <td className="px-1.5 pb-3">:</td>
                  <td className="pb-3">{detailAnggota?.age} Tahun</td>
                </tr>
                <tr>
                  <td className="pb-3">
                    <span className="font-bold">Jenis Kelamin</span>
                  </td>
                  <td className="px-1.5 pb-3">:</td>
                  <td className="pb-3">
                    {detailAnggota?.gender === "Male"
                      ? "Laki-laki"
                      : detailAnggota?.gender === "Female"
                        ? "Perempuan"
                        : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="pb-3">
                    <span className="font-bold">Nomor HP</span>
                  </td>
                  <td className="px-1.5 pb-3">:</td>
                  <td className="pb-3">{detailAnggota?.phone}</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4 flex items-center justify-start gap-x-5">
              <div className="rounded-lg w-2/5 text-center bg-white">
                <Link href={isLogin ? "/aspirasi" : "/login"} className="block">
                  <div className="flex items-center justify-center gap-x-2 border border-solid border-[#dddddd] text-[#2F5673] rounded-lg mx-auto text-center py-2.5">
                    <div>
                      <Image
                        src="/assets/notepad.png"
                        className="!relative !w-[25px]"
                        fill
                        priority
                        alt="icon notepad"
                      />
                    </div>
                    <div>Aspirasi</div>
                  </div>
                </Link>
              </div>

              <div className="rounded-lg w-2/5 text-center bg-white">
                <Link href={`/forum-diskusi/${slug2}`} className="block">
                  <div className="flex items-center justify-center gap-x-2 border border-solid border-[#dddddd] text-[#2F5673] rounded-lg mx-auto text-center py-2.5">
                    <div>
                      <Image
                        src="/assets/phone-chat.png"
                        className="!relative !w-[25px]"
                        fill
                        priority
                        alt="icon notepad"
                      />
                    </div>
                    <div>Form Diskusi</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Tabs className="TabsRoot mt-10" defaultValue="informasi">
          <TabsList className="TabsList" aria-label="Manage your account">
            <TabsTrigger className="TabsTrigger" value="informasi">
              Informasi Pribadi
            </TabsTrigger>
            <TabsTrigger className="TabsTrigger" value="pendidikan">
              Pendidikan
            </TabsTrigger>
            <TabsTrigger className="TabsTrigger" value="jabatan">
              Jabatan
            </TabsTrigger>
          </TabsList>
          <TabsContent className="TabsContent" value="informasi">
            <div className="grid grid-cols-2 mt-8">
              <div>
                <div className="mb-5">
                  <label className="text-[#857878]">Nama Lengkap</label>
                  <h3 className="font-bold mt-1 text-[#473D3D]">
                    {detailAnggota?.name}
                  </h3>
                </div>
                <div className="mb-5">
                  <label className="text-[#857878]">NIK</label>
                  <h3 className="font-bold mt-1 text-[#473D3D]">
                    {detailAnggota?.ktp || "-"}
                  </h3>
                </div>
                <div className="mb-5">
                  <label className="text-[#857878]">Jenis Kelamin</label>
                  <h3 className="font-bold mt-1 text-[#473D3D]">
                    {detailAnggota?.gender === "Male"
                      ? "Laki-laki"
                      : detailAnggota?.gender === "Female"
                        ? "Perempuan"
                        : "-"}
                  </h3>
                </div>
              </div>
              <div>
                <div className="mb-5">
                  <label className="text-[#857878]">NIP</label>
                  <h3 className="font-bold mt-1 text-[#473D3D]">
                    {detailAnggota?.nip}
                  </h3>
                </div>
                <div className="mb-5">
                  <label className="text-[#857878]">Tempat Tanggal Lahir</label>
                  <h3 className="font-bold mt-1 text-[#473D3D]">
                    {detailAnggota?.placeOfBirth},{" "}
                    {formatDateID(detailAnggota?.dateOfBirth)}
                  </h3>
                </div>
                <div className="mb-5">
                  <label className="text-[#857878]">Alamat</label>
                  <h3 className="font-bold mt-1 text-[#473D3D]">
                    {detailAnggota?.address}
                  </h3>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent className="TabsContent" value="pendidikan">
            <ul className="sessions mt-[2rem] relative rounded-xl">
              {detailAnggota?.educations?.map(
                (
                  item: {
                    name: string;
                    yearStarted?: number;
                    yearGraduated?: number;
                  },
                  idx: number
                ) => (
                  <li key={idx} className="pb-16 relative ml-[10px] pl-[20px]">
                    <div className="time text-base text-[#857878]">
                      {item.yearStarted} - {item.yearGraduated}
                    </div>
                    <p className="text-[#473D3D] font-medium">{item.name}</p>
                  </li>
                )
              )}
            </ul>
          </TabsContent>
          <TabsContent className="TabsContent" value="jabatan">
            <div className="grid grid-cols-2 mt-8">
              <div>
                <div className="mb-5">
                  <label className="text-[#857878]">Fraksi</label>
                  <h3 className="font-bold mt-1 text-[#473D3D]">
                    {detailAnggota?.fraksi.name}
                  </h3>
                </div>
                <div className="mb-5">
                  <label className="text-[#857878]">Komisi</label>
                  <h3 className="font-bold mt-1 text-[#473D3D]">
                    {detailAnggota?.komisi || "-"}
                  </h3>
                </div>
                <div className="mb-5">
                  <label className="text-[#857878]">Masa Jabatan</label>
                  <h3 className="font-bold mt-1 text-[#473D3D]">
                    {detailAnggota?.userCurentAkd[0].period.startYear} -{" "}
                    {detailAnggota?.userCurentAkd[0].period.endYear ??
                      "Sekarang"}
                  </h3>
                </div>
              </div>
              <div>
                <div className="mb-5">
                  <label className="text-[#857878]">Dapil</label>
                  <h3 className="font-bold mt-1 text-[#473D3D]">
                    {detailAnggota?.dapil.name}
                  </h3>
                </div>
                <div className="mb-5">
                  <label className="text-[#857878]">Unit Kerja/ODP</label>
                  <h3 className="font-bold mt-1 text-[#473D3D]">-</h3>
                </div>
                <div className="mb-5">
                  <label className="text-[#857878]">Golongan/Pangkat</label>
                  <h3 className="font-bold mt-1 text-[#473D3D]">
                    {detailAnggota?.position.name}
                  </h3>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
