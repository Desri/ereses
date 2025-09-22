"use client";
import Image from 'next/image';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

export default function FilterPengajuanAspirasiComponent() {
  return (
    <>
      <div className='flex justify-end mb-1'>
        <div>
          <select name="kategori" className='w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 mb-4 px-2'>
            <option value="">DD-MM-YYY - DD-MM-YYY</option>
            <option value="1">Kategori Aspirasi 1</option>
            <option value="2">Kategori Aspirasi 2</option>
          </select>
        </div>
      </div>
    </>
  );
}
