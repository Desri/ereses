"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { getReport } from '@/services/api/report';
import { Report } from '@/types/report';
import StatusLabel from './statusLabel';
import { isValidStatus } from '@/utils/statusHelpers';
import { formatTanggalIndo } from '@/utils/formatDate';

export default function SemuaLaporanComponent() {
  const [report, setReport] = useState<Report>();
  
  useEffect(() => {
    fetchListReport();
  }, []);

  const fetchListReport = () => {
    getReport()
    .then((res: any) => {
      setReport(res.data);
    })
    .catch((err: any) => {
      console.log('Check Error', err)
    });
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <span className='font-medium'>No</span>
            </TableHead>
            <TableHead>
              <span className='font-medium'>Nama Masyarakat</span>
            </TableHead>
            <TableHead>
              <span className='font-medium'>Judul Pengajuan</span>
            </TableHead>
            <TableHead>
              <span className='font-medium'>Tanggal Pengajuan</span>
            </TableHead>
            <TableHead>
              <span className='font-medium'>Kategori Aspirasi</span>
            </TableHead>
            <TableHead>
              <span className='font-medium'>Status</span>
            </TableHead>
            <TableHead>
              <span className='font-medium'>Tingkat Urgensi</span>
            </TableHead>
            <TableHead>
              <span className='font-medium'>Aksi</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {report?.items?.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                {item.name}
              </TableCell>
              <TableCell>{item.proposal}</TableCell>
              <TableCell>{formatTanggalIndo(item.createdAt)}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                {isValidStatus(item.status) ? (
                  <StatusLabel status={item.status} />
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </TableCell>
              <TableCell>
                <span>
                  {item.levelUrgency}
                </span>
              </TableCell>
              <TableCell>
                <Link href="/dashboard/pengajuan-aspirasi/detail">
                  <Image
                    src='/assets/dots.png'
                    className="!relative !mx-auto cursor-pointer !w-[5px] !h-[16px]"
                    fill
                    priority
                    alt='Printer'
                  />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

