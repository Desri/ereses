"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import "./style.css";
import { postKategoriAspirasi } from "@/services/api/aspirasi";
import { showErrorToast } from "@/utils/toast";

export default function DashboardAddAspirasiComponent() {
  const router = useRouter();
  const [kategori, setKategori] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleInputChange = (e: any) => {
    setKategori(e.target.value);
  };

  const onSubmit = () => {
    setLoading(true);
    const payload = {
      name: kategori,
    };
    postKategoriAspirasi({ payload })
      .then((res: any) => {
        setLoading(false);
        if (res.status === 201) {
          router.push("/dashboard/aspirasi");
        }
      })
      .catch((err: any) => {
        setLoading(false);
        showErrorToast(err.message);
      });
  };
  return (
    <>
      <div className="font-bold mb-3.5">Tambah Kategori Aspirasi</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="text-sm text-sm">Kategori</label>
        <Input
          type="text"
          placeholder="Masukkan Kategori Aspirasi"
          className="bg-white rounded-2xl py-2 mt-1 mb-4"
          value={kategori}
          onChange={handleInputChange}
        />

        <div className="text-center">
          <Link
            href="/dashboard/aspirasi"
            className="mx-2 !bg-white px-16 py-2 border-[#2f5673] border text-[#2f5673] mt-12 rounded-full"
          >
            Batal
          </Link>
          <Button
            type="submit"
            variant="default"
            className={`${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#2a6eb8] cursor-pointer"
            } mx-2 !bg-[#2f5673] w-44 mt-12 rounded-full text-white`}
            disabled={loading}
          >
            {loading ? (
              <>
                Loading<span className="dots ml-[-7px]"></span>
              </>
            ) : (
              "Simpan"
            )}
          </Button>
        </div>
      </form>
    </>
  );
}
