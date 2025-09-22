"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import FilterDiskusiComponent from './filter';
import Link from 'next/link';
import "./style.css";
import { getDiskusi } from '@/services/api/discussion';

export default function DiskusiDashboardComponent() {
  const [diskusi, setDiskusi] = useState<any[]>([]);
  
  useEffect(() => {
    fetchListDiskusi();
  }, []);

  const fetchListDiskusi = () => {
    getDiskusi()
    .then((res: any) => {
      setDiskusi(res.data);
    })
    .catch((err: any) => {
      console.log('Check Error', err)
    });
  };
  return (
    <>
      <div className='font-bold mb-3.5'>
        Forum Diskusi
      </div>
      <FilterDiskusiComponent />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <span className='font-medium'>No</span>
            </TableHead>
            <TableHead>
              <span className='font-medium'>Judul Diskusi</span>
            </TableHead>
            <TableHead>
              <span className='font-medium'>Tanggal Kirim</span>
            </TableHead>
            <TableHead>
              <span className='font-medium'>Jam</span>
            </TableHead>
            <TableHead>
              <span className='font-medium'>Aksi</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {diskusi.length > 0 ? (
            diskusi.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.judul}</TableCell>
                <TableCell>{item.tanggal}</TableCell>
                <TableCell>{item.waktu}</TableCell>
                <TableCell>
                  <Link href={`/dashboard/pengajuan-aspirasi/detail/${item.id}`}>
                    <Image
                      src="/assets/dots.png"
                      className="!relative !mx-auto cursor-pointer !w-[5px] !h-[16px]"
                      fill
                      priority
                      alt="Options"
                    />
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500 italic pt-4">
                Tidak ada diskusi
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
