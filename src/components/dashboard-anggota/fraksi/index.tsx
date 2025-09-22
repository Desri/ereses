import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Fraksi } from '@/types/fraksi';
import { useForm } from 'react-hook-form';
import FilterFraksiComponent from "./filter";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { deleteFraksi, getFraksi, putFraksi } from '@/services/api/fraksi';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Dialog, DialogContent, DialogPortal, DialogTitle } from '@/components/ui/dialog';
import "./style.css";

export default function DashboardFraksiComponent() {
  const [fraksi, setFraksi] = useState<Fraksi>();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectFraksi, setSelectFraksi] = useState<{ name: string; id: number } | undefined>(undefined);

  useEffect(() => {
    fetchListFraksi();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  
  const fetchListFraksi = () => {
    getFraksi()
    .then((res: any) => {
      setFraksi(res.data);
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
    setSelectFraksi(item)
  };

  const showPopupEdit = (item: any) => {
    setIsOpenEdit(true)
    setSelectFraksi(item)
    setValue('name', item.name)
  };

  const handleDelete = (id: number) => {
    deleteFraksi({id})
    .then((res: any) => {
      fetchListFraksi()
      setIsOpen(false)
    })
    .catch((err: any) => {
      console.log('Check Error', err)
    });
  };

  const onSubmit = (data: any) => {
    const payload = {
      name: data.name,
      id: selectFraksi?.id
    };
    putFraksi({ payload })
    .then((res: any) => {
      if(res.message === 'Success') {
        fetchListFraksi()
        setIsOpenEdit(false)
      }
    })
    .catch((err: any) => {
      console.log('Error', err)
    })
  };
  return (
    <>
      <div className='bg-white'>
        <div className='font-bold mb-3.5'>
          Fraksi
        </div>
        <FilterFraksiComponent />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <span className='font-medium'>No</span>
              </TableHead>
              <TableHead>
                <span className='font-medium'>Fraksi</span>
              </TableHead>
              <TableHead className='text-right'>
                <span className='font-medium mr-1.5'>Aksi</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fraksi?.items?.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  {item.name}
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
            ))}
          </TableBody>
        </Table>

        <Dialog open={isOpenEdit} onOpenChange={setIsOpenEdit}>
          <DialogPortal>
            <DialogContent className="DialogContent max-w-[39rem] dialog-no-close">
              <DialogTitle className="DialogTitle">
                <h2 className='text-lg'>
                  Edit Fraksi  
                </h2>
              </DialogTitle>
              <div className="DialogDescription">
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
        </Dialog>

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
                  Anda yakin ingin Menghapus <br /> &quot;<span className='text-[#D39C55]'>{selectFraksi?.name}</span>&quot;
                </h3>
              </div>
              <div className='mt-5 flex items-center gap-x-3 mx-auto'>
                <div className='cursor-pointer w-[150px] text-center py-2 text-sm rounded-3xl bg-white border border-[#2F5673] text-[#2F5673]' onClick={() => closeDialog()}>
                  Batal
                </div>
                <div className='cursor-pointer w-[150px] text-center py-2 text-sm rounded-3xl bg-[#2F5673] text-white' onClick={() => selectFraksi?.id !== undefined && handleDelete(selectFraksi.id)}>
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
