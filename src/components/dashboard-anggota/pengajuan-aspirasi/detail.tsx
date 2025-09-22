"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useParams } from "next/navigation";
import "./style.css";
import {
  getDetailAspirasi,
  getDetailDistrict,
  getDetailRegion,
  getDetailVillage,
} from "@/services/api/aspirasi";
import { AspirasiDetail } from "@/types/aspirasi";

export default function DetailPengajuanAspirasiComponent() {
  const params = useParams();
  const [detailAspirasi, setDetailAspirasi] = useState<AspirasiDetail>();
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");

  useEffect(() => {
    fetchDetailAspirasi();
  }, []);

  const fetchDetailAspirasi = () => {
    const slug = params.slug;
    getDetailAspirasi({ slug })
      .then((res: any) => {
        setDetailAspirasi(res.data);
        getDetailRegion({ id: res.data.district })
          .then((response: any) => {
            setRegion(response.data.name);
          })
          .catch((err: any) => {
            console.log("Check Error", err);
          });
        getDetailDistrict({ id: res.data.subDistrict })
          .then((response: any) => {
            setDistrict(response.data.name);
          })
          .catch((err: any) => {
            console.log("Check Error", err);
          });

        getDetailVillage({ id: res.data.village })
          .then((response: any) => {
            setVillage(response.data.name);
          })
          .catch((err: any) => {
            console.log("Check Error", err);
          });
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
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="font-bold mb-3.5">Detail Pengajuan Aspirasi</span>
        </div>
        <div>
          <span className="font-bold">Status: </span>
          <span
            className={`px-3 py-1 rounded-md text-sm ${
              detailAspirasi?.status === "Pending"
                ? "bg-gray-200 text-gray-700 font-medium"
                : "bg-green-100 text-green-700"
            }`}
          >
            {detailAspirasi?.status === "Pending"
              ? "Menunggu Verifikasi"
              : "Terverifikasi"}
          </span>
        </div>
      </div>

      <div className="border-2 border-solid border-[#dddddd] p-5 rounded-xl mb-6">
        <div className="relative">
          <h2 className="bg-white relative z-50 w-max pr-4 font-bold text-lg">
            Informasi Data Pribadi
          </h2>
          <div className="absolute top-[14px] w-full h-[2px] bg-[#b1bfca]"></div>
        </div>
        <div className="grid grid-cols-2 mt-8">
          <div>
            <div className="mb-5">
              <label className="text-[#857878]">Nama Lengkap</label>
              <h3 className="font-bold mt-1 text-[#473D3D]">
                {detailAspirasi?.name}
              </h3>
            </div>
            <div className="mb-5">
              <label className="text-[#857878]">No HP</label>
              <h3 className="font-bold mt-1 text-[#473D3D]">
                {detailAspirasi?.phone}
              </h3>
            </div>

            <div className="mb-5">
              <label className="text-[#857878]">Kecamatan</label>
              <h3 className="font-bold mt-1 text-[#473D3D]">
                {/^\d+$/.test(String(detailAspirasi?.district))
                  ? district
                  : detailAspirasi?.district}
              </h3>
            </div>
            <div className="mb-5">
              <label className="text-[#857878]">Alamat</label>
              <h3 className="font-bold mt-1 text-[#473D3D]">
                {detailAspirasi?.address}
              </h3>
            </div>
          </div>
          <div>
            <div className="mb-5">
              <label className="text-[#857878]">NIK</label>
              <h3 className="font-bold mt-1 text-[#473D3D]">
                {detailAspirasi?.ktp}
              </h3>
            </div>
            <div className="mb-5">
              <label className="text-[#857878]">Kabupaten</label>

              <h3 className="font-bold mt-1 text-[#473D3D]">
                {/^\d+$/.test(String(detailAspirasi?.regency))
                  ? region
                  : detailAspirasi?.regency}
              </h3>
            </div>
            <div className="mb-5">
              <label className="text-[#857878]">Kelurahan</label>
              <h3 className="font-bold mt-1 text-[#473D3D]">{village}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="border-2 border-solid border-[#dddddd] p-5 rounded-xl mb-6">
        <div className="relative">
          <h2 className="bg-white relative z-50 w-max pr-4 font-bold text-lg">
            Anggota Dewan
          </h2>
          <div className="absolute top-[14px] w-full h-[2px] bg-[#b1bfca]"></div>
        </div>
        <div className="grid grid-cols-2 mt-8">
          <div>
            <div className="mb-5">
              <label className="text-[#857878]">Dapil</label>
              <h3 className="font-bold mt-1 text-[#473D3D]">
                Dapil {detailAspirasi?.dapil.name}
              </h3>
            </div>
          </div>
          <div>
            <div className="mb-5">
              <label className="text-[#857878]">Nama Anggota Dewan</label>
              <h3 className="font-bold mt-1 text-[#473D3D]">
                {detailAspirasi?.anggota?.name}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="border-2 border-solid border-[#dddddd] p-5 rounded-xl mb-6">
        <div className="relative">
          <h2 className="bg-white relative z-50 w-max pr-4 font-bold text-lg">
            Informasi Aspirasi
          </h2>
          <div className="absolute top-[14px] w-full h-[2px] bg-[#b1bfca]"></div>
        </div>
        <div className="grid grid-cols-2 mt-8">
          <div>
            <div className="mb-5">
              <label className="text-[#857878]">Kategori Aspirasi</label>
              <h3 className="font-bold mt-1 text-[#473D3D]">
                {detailAspirasi?.categoryAspiration.name}
              </h3>
            </div>
          </div>
          <div>
            <div className="mb-5">
              <label className="text-[#857878]">Usulan</label>
              <h3 className="font-bold mt-1 text-[#473D3D]">
                {detailAspirasi?.proposal}
              </h3>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <label className="text-[#857878]">Uraian Permasalahan</label>
          <h3 className="font-medium mt-1 text-[#473D3D]">
            {detailAspirasi?.description}
          </h3>
        </div>
        {detailAspirasi?.imagesUrl &&
          (Array.isArray(detailAspirasi.imagesUrl)
            ? detailAspirasi.dokumenUrl.length > 0
            : true) && (
            <div className="mb-5">
              <label className="text-[#857878]">Foto Pengaduan</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-1">
                {detailAspirasi?.imagesUrl?.map((item: any, idx: any) => (
                  <div key={idx}>
                    <img
                      src={item}
                      className="!relative !w-full !h-[135px] sm:!h-[230px]"
                      alt="Foto Pengaduan 1"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        {detailAspirasi?.dokumenUrl &&
          (Array.isArray(detailAspirasi.dokumenUrl)
            ? detailAspirasi.dokumenUrl.length > 0
            : true) && (
            <div>
              <label className="text-[#857878]">File</label>
              <div className="border-2 border-solid border-[#dddddd] px-3.5 py-3 rounded-xl">
                <div className="flex items-center justify-between gap-x-2">
                  <div>
                    <div className="flex items-center gap-x-2">
                      <div>
                        <Image
                          src="/assets/folder.png"
                          className="!relative !w-full !h-[25px]"
                          fill
                          priority
                          alt="Foto Pengaduan 1"
                        />
                      </div>
                      <div>
                        <a target="_blank" href={detailAspirasi?.dokumenUrl}>
                          <p className="text-sm">
                            {detailAspirasi?.dokumenUrl
                              ? String(detailAspirasi.dokumenUrl)
                                  .split("/")
                                  .pop()
                              : ""}
                          </p>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="text-primary-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-download"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" x2="12" y1="15" y2="3"></line>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>

      {/* <div className="text-center mt-11">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="default"
              type="submit"
              className="!bg-[#388e3c] w-28 px-2 rounded-2xl text-white"
            >
              Diterima
            </Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogContent className="DialogContent max-w-[39rem] dialog-no-close">
              <DialogTitle className="DialogTitle">
                <div className="pb-4 border-b border-solid border-[#dddddd]">
                  <span className="text-[#473D3D] text-[17px]">
                    Silahkan tentukan{" "}
                    <span className="text-[#D39C55]">Tingkat Urgensi</span> dari
                    aspirasi ini!
                  </span>
                </div>
              </DialogTitle>
              <div className="DialogDescription">
                <form onSubmit={onSubmit}>
                  <label className="text-sm">Silahkan tentukan Urgensi</label>
                  <RadioGroup className="mt-2">
                    <div className="flex gap-x-1.5 items-center">
                      <RadioGroupItem
                        value="prioritas"
                        className="!block"
                      ></RadioGroupItem>
                      <label className="text-[#2f5673]">Prioritas</label>
                    </div>
                    <div className="flex gap-x-1.5 items-center">
                      <RadioGroupItem
                        value="tidak_prioritas"
                        className="!block"
                      ></RadioGroupItem>
                      <label className="text-[#2f5673]">Tidak Prioritas</label>
                    </div>
                  </RadioGroup>
                </form>
              </div>
              <div className="flex mt-3 items-center mx-auto">
                <Button
                  variant="default"
                  className="!block !bg-white w-36 mx-2 px-2 rounded-2xl text-[#2f5673] border border-solid border-[#2f5673]"
                >
                  Batal
                </Button>
                <Button
                  variant="default"
                  type="submit"
                  className="!block !bg-[#2f5673] w-36 mx-2 px-2 rounded-2xl text-white"
                >
                  Simpan
                </Button>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="default"
              type="submit"
              className="!bg-[#d39c55] w-28 mx-2 px-2 rounded-2xl text-white"
            >
              Direvisi
            </Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogContent className="DialogContent max-w-[39rem] dialog-no-close">
              <DialogTitle className="DialogTitle">
                <div className="pb-4 border-b border-solid border-[#dddddd]">
                  <span className="text-[#473D3D] text-[17px]">
                    Anda yakin ingin melakukan{" "}
                    <span className="text-[#D39C55]">Revisi</span>
                  </span>
                </div>
              </DialogTitle>
              <div className="DialogDescription">
                <form onSubmit={onSubmit}>
                  <label className="text-sm">Tambahkan Catatan</label>
                  <Textarea
                    rows={4}
                    placeholder="Berikan tambahan catatan kemasyarakat"
                    className="bg-white rounded-2xl py-2 mt-1 mb-5"
                  />
                </form>
              </div>
              <div className="flex items-center mx-auto">
                <Button
                  variant="default"
                  className="!block !bg-white w-36 mx-2 px-2 rounded-2xl text-[#2f5673] border border-solid border-[#2f5673]"
                >
                  Batal
                </Button>
                <Button
                  variant="default"
                  type="submit"
                  className="!block !bg-[#2f5673] w-36 mx-2 px-2 rounded-2xl text-white"
                >
                  Simpan
                </Button>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
        <Button
          variant="default"
          type="submit"
          className="!bg-[#d32f2f] w-28 px-2 rounded-2xl text-white"
        >
          Ditolak
        </Button>
      </div> */}
    </>
  );
}
