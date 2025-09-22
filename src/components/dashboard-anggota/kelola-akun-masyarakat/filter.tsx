"use client";
import { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import Link from "next/link";
import { getKecamatan } from "@/services/api/kecamatan";
import { Kecamatan } from "@/types/kecamatan";
import { getMasyarakat } from "@/services/api/masyarakat";

export default function FilterMasyarakatComponent() {
  const [status, setStatus] = useState("");
  const [kecamatan, setKecamatan] = useState<Kecamatan>();

  useEffect(() => {
    fetchListKecamatan();
  }, []);

  const fetchListKecamatan = () => {
    getKecamatan()
      .then((res: any) => {
        setKecamatan(res.data);
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
      <div className="mb-1">
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
            href="/dashboard/kelola-akun-masyarakat/tambah-akun"
            className="!bg-[#2f5673] mt-1 w-max block h-[37px] leading-[37px] px-5 text-sm rounded-3xl text-white"
          >
            Tambah Masyarakat
          </Link>
        </div>
      </div>
    </>
  );
}
