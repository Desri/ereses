"use client";
import Image from 'next/image';
import "./style.css";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

export default function AspirasiVerifikasiComponent() {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <span className='font-medium'>No</span>
            </TableHead>
            <TableHead>
              <span className='font-medium'>Judul Pengajuan</span>
            </TableHead>
            <TableHead>
              <span className='font-medium'>Tanggal Pengajuan</span>
            </TableHead>
            <TableHead>
              <span className='font-medium'>Kategori</span>
            </TableHead>
            <TableHead>
              <span className='font-medium'>Dapil</span>
            </TableHead>
            <TableHead>
              <span className='font-medium'>Status</span>
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
              Jalan Rusak di Desa Sukadana Ham Bandar Lampung
            </TableCell>
            <TableCell>12 Februari 2025</TableCell>
            <TableCell>Infrastruktur</TableCell>
            <TableCell>Dapil 1</TableCell>
            <TableCell>
              <span className='text-[#858590]'>
                Sedang Diprosess
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
            <TableCell>2</TableCell>
            <TableCell>
              Sekolah SMP PGRI 1 Bandar Lampung Kurang Fasilitas Komputer
            </TableCell>
            <TableCell>15 Februari 2025</TableCell>
            <TableCell>Pendidikan</TableCell>
            <TableCell>Dapil 2</TableCell>
            <TableCell>
              <span className='text-[#858590]'>
                Sedang Diprosess
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
              Fasilitas di beberapa Sekolah Kecamatan Bandar Lampung Kurang Layak
            </TableCell>
            <TableCell>20 Februari 2025</TableCell>
            <TableCell>Pendidikan</TableCell>
            <TableCell>Dapil 3</TableCell>
            <TableCell>
              <span className='text-[#858590]'>
                Sedang Diprosess
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
              Jalan Rusak di Desa Sukadana Ham Bandar Lampung
            </TableCell>
            <TableCell>23 Februari 2025</TableCell>
            <TableCell>Infrastruktur</TableCell>
            <TableCell>Dapil 2</TableCell>
            <TableCell>
              <span className='text-[#858590]'>
                Sedang Diprosess
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
            <TableCell>5</TableCell>
            <TableCell>
              Jalan Rusak di Desa Ratulangi
            </TableCell>
            <TableCell>26 Februari 2025</TableCell>
            <TableCell>Infrastruktur</TableCell>
            <TableCell>Dapil 3</TableCell>
            <TableCell>
              <span className='text-[#858590]'>
                Sedang Diprosess
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
            <TableCell>6</TableCell>
            <TableCell>
              Jalan Rusak di Desa Sukadana Ham
            </TableCell>
            <TableCell>12 Februari 2025</TableCell>
            <TableCell>Infrastruktur</TableCell>
            <TableCell>Dapil 1</TableCell>
            <TableCell>
              <span className='text-[#858590]'>
                Sedang Diprosess
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
            <TableCell>7</TableCell>
            <TableCell>
              Sekolah SMP PGRI 1 Bandar Lampung Kurang Fasilitas Komputer
            </TableCell>
            <TableCell>15 Februari 2025</TableCell>
            <TableCell>Pendidikan</TableCell>
            <TableCell>Dapil 2</TableCell>
            <TableCell>
              <span className='text-[#858590]'>
                Sedang Diprosess
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
            <TableCell>8</TableCell>
            <TableCell>
              Fasilitas di beberapa Sekolah Kecamatan Bandar Lampung
            </TableCell>
            <TableCell>20 Februari 2025</TableCell>
            <TableCell>Pendidikan</TableCell>
            <TableCell>Dapil 2</TableCell>
            <TableCell>
              <span className='text-[#858590]'>
                Sedang Diprosess
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
            <TableCell>9</TableCell>
            <TableCell>
              Jalan Rusak di Desa Sukadana Ham Bandar Lampung
            </TableCell>
            <TableCell>23 Februari 2025</TableCell>
            <TableCell>Infrastruktur</TableCell>
            <TableCell>Dapil 2</TableCell>
            <TableCell>
              <span className='text-[#858590]'>
                Sedang Diprosess
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
            <TableCell>9</TableCell>
            <TableCell>
              Jalan Rusak di Desa Ratulangi
            </TableCell>
            <TableCell>26 Februari 2025</TableCell>
            <TableCell>Infrastruktur</TableCell>
            <TableCell>Dapil 3</TableCell>
            <TableCell>
              <span className='text-[#858590]'>
                Sedang Diprosess
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
