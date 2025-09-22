"use client";
import { Input } from '../../ui/input';
import Link from 'next/link';

export default function FilterHakAksesComponent() {
  return (
    <>
      <div className='flex gap-x-3 mb-8'>
        <div className='w-11/12'>
          <Input type="text" placeholder="Cari..." className='bg-white rounded-2xl py-2 mt-1' />
        </div>
        <div>
          <Link href="/dashboard/dapil/add-dapil" className='!bg-[#2f5673] mt-1 w-max block h-[37px] leading-[37px] px-5 text-sm rounded-3xl text-white'>
            Tambah Role
          </Link>
        </div>
      </div>
    </>
  );
}
