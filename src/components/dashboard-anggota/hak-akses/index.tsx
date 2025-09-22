import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Dapil } from '@/types/dapil';
import { useForm } from 'react-hook-form';
import FilterHakAksesComponent from './filter';
import { Input } from '@/components/ui/input';
import { Akses } from '@/types/akses';
import { Button } from "@/components/ui/button";
import { getAkses } from '@/services/api/akses';
import { deleteDapil, getDapil } from '@/services/api/dapil';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Dialog, DialogContent, DialogPortal, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import "./style.css";

export default function DashboardHakAksesComponent() {
  const [dapil, setDapil] = useState<Dapil>();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectDapil, setSelectDapil] = useState<{ name: string; id: number } | undefined>(undefined);

  const [akses, setAkses] = useState<Akses>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    fetchListDapil();
    fetchListAkses();
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

  const fetchListAkses = () => {
    getAkses()
    .then((res: any) => {
      setAkses(res.data);
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
          Hak Akses
        </div>
        <FilterHakAksesComponent />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <span className='font-medium'>No</span>
              </TableHead>
              <TableHead>
                <span className='font-medium'>Nama</span>
              </TableHead>
              <TableHead>
                <span className='font-medium'>Role</span>
              </TableHead>
              <TableHead>
                <span className='font-medium'>Hak Akses</span>
              </TableHead>
              <TableHead className='text-right'>
                <span className='font-medium mr-1.5'>Aksi</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            {akses?.items && akses.items.length > 0 ? (
              akses?.items?.map((item, idx) => (
                <TableRow key={idx} className='!bg-[#EBE4D6]'>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    {item.name}
                  </TableCell>
                  <TableCell>
                    Admin Instansi
                  </TableCell>
                  <TableCell>
                    Hak Akses
                  </TableCell>
                  <TableCell>
                    <div className="dropdown float-right mr-1 cursor-pointer">
                      <Image
                        src='/assets/dots.png'
                        className="!relative !w-[5px] !h-[16px] float-right mr-4"
                        fill
                        priority
                        alt='Printer'
                      />
                      <div className="dropdown-content right-0 absolute bg-transparent hidden">
                        <div className='box-shadows bg-white mt-[21px]'>
                          <a href="#" onClick={() => showPopupEdit(item)}>Edit</a>
                          <Link href="/dashboard/pengajuan-aspirasi/detail">
                            Detail
                          </Link>
                          <a href="#" onClick={() => handleClick(item)}>Delete</a>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center pt-5">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* <Dialog open={isOpenEdit} onOpenChange={setIsOpenEdit}>
          <DialogPortal>
            <DialogContent className="DialogContent max-w-[39rem] dialog-no-close">
              <DialogTitle className="DialogTitle">
                <h2 className='text-lg'>
                  Edit Dapil  
                </h2>
              </DialogTitle>
              <div className="DialogDescription">
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

                  <div className='mx-auto flex'>
                    <div className='mt-5 text-center flex items-center gap-x-3 mx-auto'>
                      <div className='cursor-pointer w-[150px] text-center py-2 text-sm rounded-3xl bg-white border border-[#2F5673] text-[#2F5673]' onClick={() => closeDialogEdit()}>
                        Batal
                      </div>
                      <Button variant="default" type="submit" className='!block cursor-pointer w-[150px] text-center py-2 text-sm rounded-3xl bg-[#2F5673] text-white'>
                        Submit
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog> */}

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogPortal>
            <DialogContent className="DialogContent max-w-[39rem] dialog-no-close">
              <DialogTitle className="DialogTitle">
                <Image
                  src='/assets/x.png'
                  className="!relative !w-[90px] mx-auto"
                  fill
                  priority
                  alt='Printer'
                />
              </DialogTitle>
              <div className="DialogDescription text-center">
                <h3 className='text-lg'>
                  Anda yakin ingin Menghapus <br /> &quot;<span className='text-[#D39C55]'>{selectDapil?.name}</span>&quot;
                </h3>
              </div>
              <div className='mt-5 flex items-center gap-x-3 mx-auto'>
                <div className='cursor-pointer w-[150px] text-center py-2 text-sm rounded-3xl bg-white border border-[#2F5673] text-[#2F5673]' onClick={() => closeDialog()}>
                  Batal
                </div>
                <div className='cursor-pointer w-[150px] text-center py-2 text-sm rounded-3xl bg-[#2F5673] text-white' onClick={() => selectDapil?.id !== undefined && handleDelete(selectDapil.id)}>
                  Ya
                </div>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </>
  );
}
