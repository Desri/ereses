"use client";
import { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import Link from "next/link";
import { getMasyarakat } from "@/services/api/masyarakat";
import { getDapil } from "@/services/api/dapil";
import { Dapil } from "@/types/dapil";

export default function FilterAnggotaComponent() {
  const [status, setStatus] = useState("");
  const [dapil, setDapil] = useState<Dapil>();

  useEffect(() => {
    fetchListKecamatan();
  }, []);

  const fetchListKecamatan = () => {
    getDapil()
      .then((res: any) => {
        setDapil(res.data);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };

  const handleChange = (e: any) => {
    setStatus(e.target.value);
    getMasyarakat({ isActive: e.target.value });
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-x-6 mb-1">
        <div>
          <label className="text-sm">Dapil</label>
          <select
            name="dapil"
            className="w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 mb-4 px-2"
          >
            <option value="">Pilih Dapil</option>
            {dapil?.items?.map((item, idx) => (
              <option key={idx} value={item.id} className="capitalize">
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm">Status</label>
          <select
            name="status"
            className="w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 mb-4 px-2"
            value={status}
            onChange={handleChange}
          >
            <option value="">Semua Status</option>
            <option value="true">Aktif</option>
            <option value="false">Tidak Aktif</option>
          </select>
        </div>
      </div>
      <div className="flex gap-x-3 mb-8">
        <div className="w-11/12">
          <Input
            type="text"
            placeholder="Cari..."
            className="bg-white rounded-2xl py-2 mt-1"
          />
        </div>
        <div>
          <Link
            href="/dashboard/kelola-akun-anggota/tambah-akun"
            className="!bg-[#2f5673] mt-1 w-max block h-[37px] leading-[37px] px-5 text-sm rounded-3xl text-white"
          >
            Tambah Anggota
          </Link>
        </div>
      </div>
    </>
  );
}
