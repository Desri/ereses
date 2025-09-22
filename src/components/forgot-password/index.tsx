"use client";
import Image from 'next/image';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { postPassword } from '@/services/api/auth';

export default function ForgotPasswordComponent() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (payload: any) => {
    postPassword({ payload })
    .then((res: any) => {
      if(res.message === 'Success') {
        router.push('/reset-password');
      }
    })
    .catch((err: any) => {
      console.log('Error', err)
    })
  };
  return (
    <>
      <div className="min-h-screen content-center bg-center bg-no-repeat bg-cover bg-[url('/assets/bg-pattern.png')]">
        <div className='bg-white p-8 sm:w-[650px] mx-auto rounded-xl'>
          <div className='flex items-center justify-center gap-x-3 mb-8'>
            <div>
              <Image
                src="/assets/logo.png"
                className="!relative !w-[55px] !h-[55px]"
                fill
                priority
                alt="Logo"
              />
            </div>
            <div>
              <span className='font-bold text-xl text-[#2f5673]'>
                E-RESES DPRD
              </span>
            </div>
          </div>
          <div className='text-center mb-4'>
            <h1 className='font-bold mb-1'>
              Lupa Kata Sandi?
            </h1>
            <p>
              Masukkan email Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi.
            </p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className='text-sm'>
              Email
            </label>
            <Input
              type="email"
              placeholder="Masukkan email"
              className='bg-white rounded-2xl py-2 mt-1 mb-4'
              {...register('email', { 
                required: 'Email wajib diisi', 
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Format email tidak valid'
                }
              })}
            />
            <div className='text-center'>
              <Button variant="default" type="submit" className='!bg-[#2f5673] text-white w-44 mt-5 rounded-full'>Kirim</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
