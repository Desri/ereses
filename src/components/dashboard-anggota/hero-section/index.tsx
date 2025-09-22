import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Dapil } from '@/types/dapil';
import { useForm } from 'react-hook-form';
import { Kecamatan } from '@/types/kecamatan';
import FilterHeroSectionComponent from './filter';
import { deleteDapil, getDapil } from '@/services/api/dapil';
import { getKecamatan } from '@/services/api/kecamatan';
import "./style.css";

export default function DashboardHeroSectionComponent() {
  const [dapil, setDapil] = useState<Dapil>();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectDapil, setSelectDapil] = useState<{ name: string; id: number } | undefined>(undefined);

  const [kecamatan, setKecamatan] = useState<Kecamatan>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    fetchListDapil();
    fetchListKecamatan();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const fetchListDapil = () => {
    getDapil()
    .then((res: any) => {
      setDapil(res.data);
    })
    .catch((err: any) => {
      console.log('Check Error', err)
    });
  };

  const fetchListKecamatan = () => {
    getKecamatan()
    .then((res: any) => {
      setKecamatan(res.data);
    })
    .catch((err: any) => {
      console.log('Check Error', err)
    });
  };

  const closeDialog = () => {
    setIsOpen(false)
  };

  const closeDialogEdit = () => {
    setIsOpenEdit(false)
  };

  const handleClick = (item: any) => {
    setIsOpen(true)
    setSelectDapil(item)
  };

  const handleSelect = (value: string) => {
    setSelectedItems((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const showPopupEdit = (item: any) => {
    setIsOpenEdit(true)
    setSelectDapil(item)
    setValue('name', item.name)
  };

  const handleDelete = (id: number) => {
    deleteDapil({id})
    .then((res: any) => {
      fetchListDapil()
      setIsOpen(false)
    })
    .catch((err: any) => {
      console.log('Check Error', err)
    });
  }

  const onSubmit = (data: any) => {
    // const payload = {
    //   name: data.name,
    //   kecamatan: selectedItems
    // };
    // postDapil({ payload })
    // .then((res: any) => {
    //   if(res.status === 201) {
    //     router.push('/dashboard/dapil');
    //   }
    // })
    // .catch((err: any) => {
    //   console.log('Error', err)
    // })
  };
  return (
    <>
      <div className='bg-white'>
        <div className='font-bold mb-3.5'>
          Hero Section
        </div>
        <FilterHeroSectionComponent />
        <div className='border border-solid border-[#dddddd] rounded-xl p-6'>
          <div className='mb-6'>
            <span className='text-[#857878]'>
              Judul
            </span>
            <h2 className='uppercase text-[#473D3D] mt-1'>
              Selamat datang di website resmi E-Reses DPRD Pali
            </h2>
          </div>
          <div className='mb-6'>
            <span className='text-[#857878]'>
              Sub Judul
            </span>
            <h2 className='text-[#473D3D] mt-1'>
              Sampaikan aspirasi Anda dengan Mudah dan Cepat!
            </h2>
          </div>
          <div className='mb-6'>
            <span className='text-[#857878]'>
              Deskripsi
            </span>
            <h2 className='text-[#473D3D] mt-1'>
              E-Reses DPRD Pali adalah platform digital untuk masyarakat mengajukan aspirasi secara langsung kepada DPRD Kebupaten Pali. Mari bersama wujudkan pembangunan yang lebih baik!
            </h2>
          </div>
          <div>
            <span className='text-[#857878]'>
              Foto
            </span>
            <Image
              src="/assets/banner.png"
              width={470}
              height={100}
              className='mt-5'
              alt="Banner"
            />
          </div>
        </div>
      </div>
    </>
  );
}
