"use client";
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from '../../ui/table';
import { Notifikasi } from '@/types/notifikasi';
import { getAllNotifikasi } from '@/services/api/notifikasi';
import { formatDate } from 'date-fns';

export default function SemuaNotifikasiDashboardComponent() {
  const [allNotifikasi, setAllNotifikasi] = useState<Notifikasi>();
    
    useEffect(() => {
      fetchListNotifikasiNotRead();
    }, []);
  
    const fetchListNotifikasiNotRead = () => {
      getAllNotifikasi()
      .then((res: any) => {
        setAllNotifikasi(res.data);
      })
      .catch((err: any) => {
        console.log('Check Error', err)
      });
    };
  return (
    <>
      <p className='font-medium text-right mb-5 text-sm underline text-[#2F5673] cursor-pointer'>
        Tandai Dibaca Semua
      </p>
      <Table>
        <TableBody>
          {allNotifikasi?.items && allNotifikasi.items.length > 0 ? (
            allNotifikasi.items.map((item, idx) => (
              <TableRow key={idx} className='!bg-[#EBE4D6]'>
                <TableCell>
                  {item.title}
                </TableCell>
                <TableCell className='text-right'>
                  {formatDate(item.date ?? '', 'dd MMMM yyyy')}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} className="text-center">
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
