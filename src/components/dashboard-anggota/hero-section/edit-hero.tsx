"use client";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./style.css";
import { putSection } from "@/services/api/section";
import { useState } from "react";
import QuillEditor from "@/components/ui/quill-editor";
import { showErrorToast } from "@/utils/toast";

export default function DashboardEditHeroComponent() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const onSubmit = (data: any) => {
    const payload = {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      imageUrl: previewUrl,
    };
    putSection({ payload })
      .then((res: any) => {
        if (res.status === 201) {
          router.push("/dashboard/hero-sections");
        }
      })
      .catch((err: any) => {
        showErrorToast("Uppsss something went wrong!");
        console.log("Error", err);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="judul" className="text-sm text-sm">
        Judul
      </label>
      <Input
        type="text"
        placeholder="Masukkan Judul"
        className="bg-white rounded-2xl py-2 mt-1 mb-4"
        {...register("title", { required: "Judul wajib diisi" })}
      />
      <label htmlFor="subjudul" className="text-sm text-sm">
        Sub Judul
      </label>

      <Input
        type="text"
        placeholder="Masukkan Sub Judul"
        className="bg-white rounded-2xl py-2 mt-1 mb-4"
        {...register("subtitle", { required: "Sub judul wajib diisi" })}
      />

      <label htmlFor="deskripsi" className="text-sm text-sm">
        Deskripsi
      </label>
      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <QuillEditor
            value={field.value}
            onChange={field.onChange}
            placeholder="Masukkan Deskripsi"
            className="mt-1 mb-5"
          />
        )}
      />

      <div className="grid grid-cols-2 gap-x-3 sm:gap-x-6">
        <div>
          <label htmlFor="addfoto" className="text-sm">
            Tambah Foto
          </label>

          <div className="text-center mt-0.5 relative">
            <div className="border-2 border-dotted border-[#dddddd] text-[#8d8d8d] px-4 py-1.5 text-xs w-full rounded-[6px] h-[170px] bg-[#f7f7f7] pt-[67px]">
              <p>JPG or PNG</p>
              <span className="text-xs">(Max 30 Mb)</span>
            </div>
            <Input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full absolute mx-auto left-0 top-0 opacity-0 h-full"
            />
          </div>

          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-4 w-40 h-auto rounded-md"
            />
          )}
        </div>
      </div>

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
  );
}
