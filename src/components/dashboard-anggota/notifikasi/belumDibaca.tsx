"use client";
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from '../../ui/table';
import { Notifikasi } from '@/types/notifikasi';
import { getNotifikasiNotRead } from '@/services/api/notifikasi';
import { formatDate } from 'date-fns';

export default function BelumDibacaNotifikasiDashboardComponent() {
  const [notifikasiNotRead, setNotifikasiNotRead] = useState<Notifikasi>();
  
  useEffect(() => {
    fetchListNotifikasiNotRead();
  }, []);

  const fetchListNotifikasiNotRead = () => {
    getNotifikasiNotRead('unread')
    .then((res: any) => {
      setNotifikasiNotRead(res.data);
    })
    .catch((err: any) => {
      console.log('Check Error', err)
    });
  };
  return (
    <>
      <Table>
        <TableBody>
          {notifikasiNotRead?.items && notifikasiNotRead.items.length > 0 ? (
            notifikasiNotRead.items.map((item, idx) => (
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
