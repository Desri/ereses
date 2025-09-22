"use client";
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from '../../ui/table';
import { Notifikasi } from '@/types/notifikasi';
import { getNotifikasi } from '@/services/api/notifikasi';
import { formatDate } from 'date-fns';

export default function DibacaNotifikasiDashboardComponent() {

  const [notifikasiRead, setNotifikasiRead] = useState<Notifikasi>();

  useEffect(() => {
    fetchListNotifikasiRead();
  }, []);

  const fetchListNotifikasiRead = () => {
    getNotifikasi('read')
    .then((res: any) => {
      setNotifikasiRead(res.data);
    })
    .catch((err: any) => {
      console.log('Check Error', err)
    });
  };

  return (
    <>
      <Table>
        <TableBody>
          {notifikasiRead?.items && notifikasiRead.items.length > 0 ? (
            notifikasiRead.items.map((item, idx) => (
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
