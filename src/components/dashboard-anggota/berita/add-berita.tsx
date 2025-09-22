"use client";
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { postFraksi } from '@/services/api/fraksi';
import "./style.css";

export default function DashboardAddBeritaComponent() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    const payload = {
      name: data.name
    };
    postFraksi({ payload })
    .then((res: any) => {
      if(res.message === 'Success') {
        router.push('/dashboard/fraksi');
      }
    })
    .catch((err: any) => {
      console.log('Error', err)
    })
  };
  return (
    <>
      <div className='font-bold mb-3.5'>
        Tambah Fraksi
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className='text-sm text-sm'>
          Fraksi
        </label>
        <Input
          type="text"
          placeholder="Masukkan Nama Fraksi"
          className='bg-white rounded-2xl py-2 mt-1 mb-4'
          {...register("name", { required: "Fraksi is required" })}
        />
        
        <div className='text-center'>
          <Link href="/dashboard/fraksi" className='mx-2 !bg-white px-16 py-2 border-[#2f5673] border text-[#2f5673] mt-12 rounded-full'>
            Batal
          </Link>
          <Button variant="default" type="submit" className='mx-2 !bg-[#2f5673] w-44 mt-12 rounded-full text-white'>
            Tambah Fraksi
          </Button>
        </div>
      </form>
    </>
  );
}
