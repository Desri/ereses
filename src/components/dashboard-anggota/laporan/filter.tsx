"use client";
import Image from 'next/image';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

export default function FilterLaporanComponent() {
  return (
    <>
      <div className='grid grid-cols-3 gap-x-6 mb-1'>
        <div>
          <label className='text-sm'>
            Tanggal
          </label>
          <select name="kategori" className='w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 mb-4 px-2'>
            <option value="">DD-MM-YYY - DD-MM-YYY</option>
            <option value="1">Kategori Aspirasi 1</option>
            <option value="2">Kategori Aspirasi 2</option>
          </select>
        </div>
        <div>
          <label className='text-sm'>
            Kategori Aspirasi
          </label>
          <select name="kategori" className='w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 mb-4 px-2'>
            <option value="">Semua Kategori</option>
            <option value="1">Kategori Aspirasi 1</option>
            <option value="2">Kategori Aspirasi 2</option>
          </select>
        </div>
        <div>
          <label className='text-sm'>
            Tingkat Urgensi
          </label>
          <select name="kategori" className='w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 mb-4 px-2'>
            <option value="">Semua Urgensi</option>
            <option value="1">Kategori Aspirasi 1</option>
            <option value="2">Kategori Aspirasi 2</option>
          </select>
        </div>
      </div>
      <div className='flex gap-x-3 mb-8'>
        <div className='w-11/12'>
          <Input type="text" placeholder="Cari..." className='bg-white rounded-2xl py-2 mt-1' />
        </div>
        <div>
          <Button variant="default" type="submit" className='!bg-[#d39c55] mt-1 w-max px-5 text-sm rounded-3xl text-white'>
            <Image
              src='/assets/printer.png'
              className="!relative !w-full !h-[18px]"
              fill
              priority
              alt='Printer'
            />
            Print
          </Button>
        </div>
      </div>
    </>
  );
}
