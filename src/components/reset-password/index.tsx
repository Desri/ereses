"use client";
import Image from 'next/image';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { postResetPassword } from '@/services/api/auth';

export default function ResetPasswordComponent() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (payload: any) => {
    postResetPassword({ payload })
    .then((res: any) => {
      console.log('Check', res)
      if(res.status === 200) {
        router.push('/login');
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
              Atur ulang password
            </h1>
            <p>
              Masukkan kata sandi baru Anda untuk melanjutkan proses dan pastikan kata sandi tersebut aman serta mudah diingat.
            </p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className='text-sm'>
              Password Baru
            </label>
            <Input
              type="password"
              placeholder="Masukkan Password"
              className='bg-white rounded-2xl py-2 mt-1 mb-4'
              {...register('password', { 
                required: 'Password wajib diisi', 
              })}
            />
            <label className='text-sm'>
              Konfirmasi Password
            </label>
            <Input
              type="password"
              placeholder="Masukkan Password"
              className='bg-white rounded-2xl py-2 mt-1 mb-4'
              {...register('confirmPassword', { 
                required: 'Confirm Password wajib diisi', 
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
