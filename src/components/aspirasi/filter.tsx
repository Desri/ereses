"use client";
import Image from 'next/image';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { getDapil } from '@/services/api/dapil';
import { useEffect, useState } from 'react';
import { Dapil } from '@/types/dapil';

export default function FilterRiwayatAspirasiComponent() {
  const [listDapil, setListDapil] = useState<Dapil>();

  useEffect(() => {
    fetchListDapil();
  }, []);

  const fetchListDapil = () => {
    getDapil()
    .then((res: any) => {
      setListDapil(res.data);
    })
    .catch((err: any) => {
      console.log('Check Error', err)
    });
  };

  return (
    <>
      <div className='grid grid-cols-3 gap-x-6 mb-1'>
        <div>
          <label className='text-sm'>
            Kategori
          </label>
          <select name="kategori" className='w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 mb-4 px-2'>
            <option value="1">Kategori Aspirasi 1</option>
            <option value="2">Kategori Aspirasi 2</option>
          </select>
        </div>
        <div>
          <label className='text-sm'>
            Kategori
          </label>
          <select name="kategori" className='w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 mb-4 px-2'>
            <option value="1">Kategori Aspirasi 1</option>
            <option value="2">Kategori Aspirasi 2</option>
          </select>
        </div>
        <div>
          <label className='text-sm'>
            Dapil
          </label>
          <select name="dapil" className='w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 mb-4 px-2'>
            <option value="">Pilih Dapil</option>
            {listDapil?.items?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
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
