"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { postRegisterMasyarakat } from "@/services/api/auth";
import "./style.css";

export default function DashboardTambahAkunMasyarakatComponent() {
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleDelete = () => {
    setFile(null);
    setPreview(null);
    resetField('file');
  };

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("roleId", data.roleId);
    formData.append("password", data.password);
    formData.append("file", data.file[0]);
    postRegisterMasyarakat({ formData })
    .then((res: any) => {
      if(res.message === 'Success') {
        const toast = document.getElementById('toast');
        resetField('file');
        if (toast) {
          toast.classList.add('show');
        
          setTimeout(() => {
            toast.classList.remove('show');
          }, 3000);
        }
        router.push("/dashboard/kelola-akun-masyarakat");
        reset();
      }
    })
    .catch((err: any) => {
      console.log('Error', err)
    })
  };
  return (
    <>
      <div id="toast" className="toast text-sm fixed bg-[#4ade80] text-white top-[20px] right-[20px] hidden">
        Berhasil menambahkan akun
      </div>
      <div className='font-bold mb-3.5'>
        Tambah Akun Masyarakat
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className='text-sm text-sm'>
          Nama Lengkap
        </label>
        <Input
          type="text"
          placeholder="Masukkan Nama Lengkap"
          className='bg-white rounded-2xl py-2 mt-1 mb-4'
          {...register("name", { required: "Name is required" })}
        />
        <label className='text-sm text-sm'>
          Email
        </label>
        <Input
          type="email"
          placeholder="Masukkan Email"
          className='bg-white rounded-2xl py-2 mt-1 mb-4'
          {...register("email", { required: "Email is required" })}
        />
        <label className='text-sm text-sm'>
          Nomor Telepon
        </label>
        <Input
          type="text"
          placeholder="Masukkan Nomor Telepon"
          className='bg-white rounded-2xl py-2 mt-1 mb-4'
          {...register("phone", { required: "Phone is required" })}
        />
        <label className='text-sm'>
          Jenis Kelamin
        </label>
        <select
          className="w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 mb-4 px-2"
          {...register('gender')}
        >
          <option value="">Pilih Jenis Kelamin</option>
          <option value="Male">Laki-laki</option>
          <option value="Female">Perempuan</option>
        </select>
        <label className='text-sm'>
          Role
        </label>
        <select
          className="w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 mb-4 px-2"
          {...register('roleId')}
        >
          <option value="">Pilih Role</option>
          <option value="1">Masyarakat</option>
          <option value="2">Anggota</option>
          <option value="3">Sekretariat</option>
        </select>
        <label className='text-sm text-sm'>
          Password
        </label>
        <Input
          type="password"
          placeholder="Masukkan Password"
          className='bg-white rounded-2xl py-2 mt-1 mb-4'
          {...register("password", { required: "Password is required" })}
        />
        <div className="w-1/4">
          <label className='text-sm'>
            Foto
          </label>

          <div className="text-center mt-0.5 relative">
            {!preview && (
              <>
                <div className="border-2 border-dotted border-[#dddddd] text-[#8d8d8d] px-4 py-1.5 text-xs w-full rounded-[6px] h-[170px] bg-[#f7f7f7] pt-[67px]">
                  <p>JPG or PNG</p>
                  <span className='text-xs'>(Max 30 Mb)</span>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="w-full absolute mx-auto left-0 top-0 opacity-0 h-full"
                  {...register("file", {
                    required: "Photo is required",
                    onChange: (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                      }
                    }
                  })}
                />
              </>
            )}
            {preview && (
              <div className="relative w-40 h-40">
                <img
                  src={preview}
                  alt="Preview"
                  className="object-cover w-full h-full rounded"
                />
                <button
                  type="button"
                  onClick={handleDelete}
                  className="absolute -top-2 -right-2 text-[10px] w-[19px] leading-[11px] h-[19px] bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='text-center'>
          <Link
            href="/dashboard/kelola-akun-masyarakat"
            className='mx-2 !bg-white border-[#2f5673] border text-[#2f5673] w-44 mt-12 rounded-full px-[60px] pt-[7px] pb-[8px]'
          >
            Batal
          </Link>
          <Button variant="default" type="submit" className='mx-2 !bg-[#2f5673] w-44 mt-12 rounded-full text-white'>
            Tambah Masyarakat
          </Button>
        </div>
      </form>
    </>
  );
}
