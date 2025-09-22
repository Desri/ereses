"use client";
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { getKecamatan } from '@/services/api/kecamatan';
import { Kecamatan } from '@/types/kecamatan';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import "./style.css";
import { postDapil } from '@/services/api/dapil';

export default function DashboardAddDapilComponent() {
  const router = useRouter();
  const [kecamatan, setKecamatan] = useState<Kecamatan>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchListKecamatan();
  }, []);

  const fetchListKecamatan = () => {
    getKecamatan()
    .then((res: any) => {
      setKecamatan(res.data);
    })
    .catch((err: any) => {
      console.log('Check Error', err)
    });
  };
  
  const handleSelect = (value: string) => {
    setSelectedItems((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const onSubmit = (data: any) => {
    const payload = {
      name: data.name,
      kecamatan: selectedItems
    };
    postDapil({ payload })
    .then((res: any) => {
      if(res.status === 201) {
        router.push('/dashboard/dapil');
      }
    })
    .catch((err: any) => {
      console.log('Error', err)
    })
  };
  return (
    <>
      <div className='font-bold mb-3.5'>
        Tambah Dapil
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className='text-sm text-sm'>
          Dapil
        </label>
        <Input
          type="text"
          placeholder="Masukkan Nama Dapil"
          className='bg-white rounded-2xl py-2 mt-1 mb-4'
          {...register("name", { required: "Dapil is required" })}
        />
        <label className='text-sm text-sm'>
          Kecamatan
        </label>
        {/* <select
          className='w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 mb-4 px-2'
          {...register('dapilId')}
        >
          <option value="">Pilih Kecamatan</option>
          {kecamatan?.items?.map((item, idx) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select> */}
        <Select>
          <SelectTrigger className='rounded-2xl mb-4 mt-0.5'>
            {selectedItems.length > 0 ? selectedItems.join(", ") : <p className='!text-[#535353]'>Masukkan Nama Kecamatan</p>}
          </SelectTrigger>
          <SelectContent>
            {kecamatan?.items?.map((item, idx) => (
              <SelectItem
                key={idx}
                value={item.id}
                onPointerDown={(e) => {
                  e.preventDefault();
                  handleSelect(item.name);
                }}
              >
                {selectedItems.includes(item.name) && "✅ "} {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* <label className='text-sm text-sm'>
          Latitude
        </label>
        <Input
          type="text"
          placeholder="Masukkan Nama Latitude"
          className='bg-white rounded-2xl py-2 mt-1 mb-4'
        />
        <label className='text-sm text-sm'>
          Longitude
        </label>
        <Input type="text" placeholder="Masukkan Nama Longitude" className='bg-white rounded-2xl py-2 mt-1 mb-4' /> */}
        
        <div className='text-center'>
          <Link href="/dashboard/dapil" className='mx-2 !bg-white px-16 py-2 border-[#2f5673] border text-[#2f5673] mt-12 rounded-full'>
            Batal
          </Link>
          <Button variant="default" type="submit" className='mx-2 !bg-[#2f5673] w-44 mt-12 rounded-full text-white'>
            Simpan
          </Button>
        </div>
      </form>
    </>
  );
}
