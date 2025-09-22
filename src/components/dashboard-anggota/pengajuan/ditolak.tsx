"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import FilterPengajuanComponent from './filter';
import "./style.css";

export default function PengajuanDitolakComponent() {
  return (
    <>
      <div className='font-bold mb-3.5'>
        Pengajuan Ditolak
      </div>
      <FilterPengajuanComponent />
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
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>
              Aldi Nugraha
            </TableCell>
            <TableCell>Jalan Rusak di Desa Sukadana Ham</TableCell>
            <TableCell>12 Februari 2025</TableCell>
            <TableCell>Infrastruktur</TableCell>
            <TableCell>
              <span className='text-[#d43535]'>
                Ditolak
              </span>
            </TableCell>
            <TableCell>
              <span>
                Prioritas
              </span>
            </TableCell>
            <TableCell>
              <Link href="/dashboard/pengajuan/detail">
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
          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>
              Hamdan Habibi
            </TableCell>
            <TableCell>Sekolah Kurang Fasilitas</TableCell>
            <TableCell>15 Februari 2025</TableCell>
            <TableCell>Pendidikan</TableCell>
            <TableCell>
              <span className='text-[#d43535]'>
                Ditolak
              </span>
            </TableCell>
            <TableCell>
              <span>
                Prioritas
              </span>
            </TableCell>
            <TableCell>
              <Image
                src='/assets/dots.png'
                className="!relative !mx-auto cursor-pointer !w-[5px] !h-[16px]"
                fill
                priority
                alt='Printer'
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>3</TableCell>
            <TableCell>
              Dila
            </TableCell>
            <TableCell>Fasilitas di beberapa Sekolah Kurang Layak</TableCell>
            <TableCell>20 Februari 2025</TableCell>
            <TableCell>Pendidikan</TableCell>
            <TableCell>
              <span className='text-[#d43535]'>
                Ditolak
              </span>
            </TableCell>
            <TableCell>
              <span>
                Prioritas
              </span>
            </TableCell>
            <TableCell>
              <Image
                src='/assets/dots.png'
                className="!relative !mx-auto cursor-pointer !w-[5px] !h-[16px]"
                fill
                priority
                alt='Printer'
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>4</TableCell>
            <TableCell>
              Lulu
            </TableCell>
            <TableCell>Jalan Rusak di Desa Sukadana Ham Bandar Lampung</TableCell>
            <TableCell>23 Februari 2025</TableCell>
            <TableCell>Infrastruktur</TableCell>
            <TableCell>
              <span className='text-[#d43535]'>
                Ditolak
              </span>
            </TableCell>
            <TableCell>
              <span>
                Tidak Prioritas
              </span>
            </TableCell>
            <TableCell>
              <Image
                src='/assets/dots.png'
                className="!relative !mx-auto cursor-pointer !w-[5px] !h-[16px]"
                fill
                priority
                alt='Printer'
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
