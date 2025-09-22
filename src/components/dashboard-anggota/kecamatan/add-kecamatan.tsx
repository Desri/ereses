"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./style.css";
import { postKecamatan } from "@/services/api/kecamatan";
import { showErrorToast } from "@/utils/toast";

export default function DashboardAddKecamatanComponent() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const payload = {
      name: data.name,
    };
    postKecamatan({ payload })
      .then((res: any) => {
        if (res.status === 201) {
          router.push("/dashboard/kecamatan");
        }
      })
      .catch((err: any) => {
        showErrorToast(err.message);
      });
  };
  return (
    <>
      <div className="font-bold mb-3.5">Tambah Kecamatan</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="kecamatan" className="text-sm text-sm">
          Kecamatan
        </label>
        <Input
          type="text"
          placeholder="Masukkan Nama Kecamatan"
          className="bg-white rounded-2xl py-2 mt-1 mb-4"
          {...register("name", { required: "Kecamatan is required" })}
        />

        <div className="text-center">
          <Link
            href="/dashboard/dapil"
            className="mx-2 !bg-white px-16 py-2 border-[#2f5673] border text-[#2f5673] mt-12 rounded-full"
          >
            Batal
          </Link>
          <Button
            variant="default"
            type="submit"
            className="mx-2 !bg-[#2f5673] w-44 mt-12 rounded-full text-white"
          >
            Simpan
          </Button>
        </div>
      </form>
    </>
  );
}
