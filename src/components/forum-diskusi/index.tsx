"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { getDetailAnggotaDiscuss } from "@/services/api/anggota";
import { AnggotaDetail } from "@/types/anggota";

export default function ForumDiskusiComponent({ slug }: { slug?: string }) {
  const [detailAnggota, setDetailAnggota] = useState<AnggotaDetail>();

  useEffect(() => {
    if (slug) {
      fetchDetailAnggota();
    }
  }, [slug]);

  const fetchDetailAnggota = () => {
    if (!slug) return;
    getDetailAnggotaDiscuss(slug)
      .then((res: any) => {
        console.log("Check", res);
        setDetailAnggota(res.data);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };
  const onSubmit = () => {
    console.log("Check");
  };
  return (
    <>
      <div className="h-[250px] bg-center bg-no-repeat bg-cover bg-[url('/assets/bg-banner.png')]">
        <div className="text-center text-white pt-24 uppercase">
          <h2 className="text-2xl">Forum Diskusi</h2>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto mt-16 mb-12 px-4 sm:px-0">
        <div className="sm:flex gap-3 sm:gap-7">
          <div>
            <img
              src={detailAnggota?.imageUrl}
              className="!relative !w-full !h-[340px] sm:!h-[320px] rounded-lg"
              alt="Fauzan Hamid"
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
                    <span className="font-bold">Dapil</span>
                  </td>
                  <td className="px-1.5 pb-3">:</td>
                  <td className="pb-3">{detailAnggota?.dapil.name}</td>
                </tr>
                <tr>
                  <td className="pb-3">
                    <span className="font-bold">AKD</span>
                  </td>
                  <td className="px-1.5 pb-3">:</td>
                  <td className="pb-3">{detailAnggota?.position.name}</td>
                </tr>
                <tr>
                  <td className="pb-3">
                    <span className="font-bold">Periode</span>
                  </td>
                  <td className="px-1.5 pb-3">:</td>
                  <td className="pb-3">
                    {detailAnggota?.userCurentAkd[0].termStart} -{" "}
                    {detailAnggota?.userCurentAkd[0].termEnd === null
                      ? "Sekarang"
                      : detailAnggota?.userCurentAkd[0].termEnd}
                  </td>
                </tr>
                <tr>
                  <td className="pb-3">
                    <span className="font-bold">Usia</span>
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
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12">
          <div className="relative mb-12">
            <h2 className="font-bold text-center text-[#473D3D] text-2xl w-max px-6 mx-auto bg-white relative z-10">
              Forum Diskusi
            </h2>
            <div className="h-[2px] w-full bg-[#DEDEE1] absolute top-[14px]"></div>
          </div>

          <div className="mb-5">
            <label className="text-[#857878]">Judul Diskusi</label>
            <div className="border border-solid border-[#dddddd] rounded-xl py-2.5 px-3 mt-0.5">
              <input
                type="text"
                placeholder="Masukkan judul diskusi"
                className="w-full"
              ></input>
            </div>
          </div>

          <div className="mb-5">
            <label className="text-[#857878]">Deskripsi Diskusi</label>
            <div className="border border-solid border-[#dddddd] rounded-xl py-2.5 px-3 mt-0.5">
              <textarea
                rows={4}
                placeholder="Masukkan deskripsi diskusi"
                className="w-full"
              ></textarea>
            </div>
          </div>

          <div className="text-center">
            <Button
              variant="default"
              type="submit"
              className="!bg-[#2F5673] w-36 mt-4 mb-12 px-2 rounded-2xl text-white"
            >
              Kirim Diskusi
            </Button>
          </div>
        </div>

        {/* <div className="mt-5 border border-solid border-[#dddddd] rounded-xl py-6 px-12 bg-[#E8EFF6]">
          <h2 className="font-bold">
            Judul Diskusi : Peningkatan Layanan Kesehatan di Puskesmas Desa
            Harapan
          </h2>
          <ul className="sessions mt-5 relative rounded-xl">
            <li className="pb-14 relative">
              <div className="flex gap-1">
                <div className="w-[4%]">
                  <div className="avatar">
                    <Image
                      src="/assets/avatar.png"
                      className="!relative !w-[40px] !h-[40px] sm:!h-[40px]"
                      fill
                      priority
                      alt="Fauzan Hamid"
                    />
                  </div>
                </div>
                <div className="w-5/6">
                  <div className="time text-base mb-1 font-medium">
                    Robi Hardinata
                    <span className="pl-1 text-[#2F5673]">
                      5 Februari 2025 - 08.01 WIB
                    </span>
                  </div>
                  <p className="text-[#473D3D] text-sm font-medium">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s, when an unknown
                    printer took.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-5 border border-solid border-[#dddddd] rounded-xl py-6 px-12">
          <h2 className="font-bold">
            Judul Diskusi : Peningkatan Infrastruktur Jalan di Kecamatan Tolong
            Ubi
          </h2>
          <ul className="sessions mt-5 relative rounded-xl">
            <li className="pb-14 relative ml-[27px]">
              <div className="flex gap-1 relative left-[-20px]">
                <div className="w-[4%]">
                  <div className="avatar">
                    <Image
                      src="/assets/avatar.png"
                      className="!relative !w-[40px] !h-[40px] sm:!h-[40px]"
                      fill
                      priority
                      alt="Fauzan Hamid"
                    />
                  </div>
                </div>
                <div className="w-5/6">
                  <div className="time text-base mb-1 font-medium">
                    Robi Hardinata
                    <span className="pl-1 text-[#2F5673]">
                      5 Februari 2025 - 08.01 WIB
                    </span>
                  </div>
                  <p className="text-[#473D3D] text-sm font-medium">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries
                  </p>
                </div>
              </div>
            </li>
            <li className="pb-14 relative ml-[27px]">
              <div className="flex gap-1 relative left-[-20px]">
                <div className="w-[4%]">
                  <div className="avatar">
                    <Image
                      src="/assets/avatar.png"
                      className="!relative !w-[40px] !h-[40px] sm:!h-[40px]"
                      fill
                      priority
                      alt="Fauzan Hamid"
                    />
                  </div>
                </div>
                <div className="w-5/6">
                  <div className="time text-base mb-1 font-medium">
                    Fauzan Kamid
                    <span className="pl-1 text-[#2F5673]">
                      5 Februari 2025 - 08.01 WIB
                    </span>
                  </div>
                  <p className="text-[#473D3D] text-sm font-medium">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
            </li>
            <li className="relative ml-[27px]">
              <div className="flex gap-1 relative left-[-20px]">
                <div className="w-[4%]">
                  <div className="avatar">
                    <Image
                      src="/assets/avatar.png"
                      className="!relative !w-[40px] !h-[40px] sm:!h-[40px]"
                      fill
                      priority
                      alt="Fauzan Hamid"
                    />
                  </div>
                </div>
                <div className="w-5/6">
                  <div className="time text-base mb-1 font-medium">
                    Fauzan Kamid
                    <span className="pl-1 text-[#2F5673]">
                      5 Februari 2025 - 08.01 WIB
                    </span>
                  </div>
                  <p className="text-[#473D3D] text-sm font-medium">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-5 border border-solid border-[#dddddd] rounded-xl py-6 px-12">
          <h2 className="font-bold">
            Judul Diskusi : Permintaan Fasilitas Pendidikan di Desa Suka Maju
          </h2>
          <ul className="sessions mt-5 relative rounded-xl">
            <li className="pb-14 relative ml-[27px]">
              <div className="flex gap-1 relative left-[-20px]">
                <div className="w-[4%]">
                  <div className="avatar">
                    <Image
                      src="/assets/avatar.png"
                      className="!relative !w-[40px] !h-[40px] sm:!h-[40px]"
                      fill
                      priority
                      alt="Fauzan Hamid"
                    />
                  </div>
                </div>
                <div className="w-5/6">
                  <div className="time text-base mb-1 font-medium">
                    Robi Hardinata
                    <span className="pl-1 text-[#2F5673]">
                      5 Februari 2025 - 08.01 WIB
                    </span>
                  </div>
                  <p className="text-[#473D3D] text-sm font-medium">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries
                  </p>
                </div>
              </div>
            </li>
            <li className="pb-14 relative ml-[27px]">
              <div className="flex gap-1 relative left-[-20px]">
                <div className="w-[4%]">
                  <div className="avatar">
                    <Image
                      src="/assets/avatar.png"
                      className="!relative !w-[40px] !h-[40px] sm:!h-[40px]"
                      fill
                      priority
                      alt="Fauzan Hamid"
                    />
                  </div>
                </div>
                <div className="w-5/6">
                  <div className="time text-base mb-1 font-medium">
                    Fauzan Kamid
                    <span className="pl-1 text-[#2F5673]">
                      5 Februari 2025 - 08.01 WIB
                    </span>
                  </div>
                  <p className="text-[#473D3D] text-sm font-medium">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
            </li>
            <li className="relative ml-[27px]">
              <div className="flex gap-1 relative left-[-20px]">
                <div className="w-[4%]">
                  <div className="avatar">
                    <Image
                      src="/assets/avatar.png"
                      className="!relative !w-[40px] !h-[40px] sm:!h-[40px]"
                      fill
                      priority
                      alt="Fauzan Hamid"
                    />
                  </div>
                </div>
                <div className="w-5/6">
                  <div className="time text-base mb-1 font-medium">
                    Fauzan Kamid
                    <span className="pl-1 text-[#2F5673]">
                      5 Februari 2025 - 08.01 WIB
                    </span>
                  </div>
                  <p className="text-[#473D3D] text-sm font-medium">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div> */}
      </div>
    </>
  );
}
