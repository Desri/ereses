"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogPortal, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import "./style.css";

export default function DetailPengajuanAspirasiComponent() {
  const onSubmit = () => {
    console.log('Check')
  };
  return (
    <>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <span className='font-bold mb-3.5'>Detail Pengajuan Aspirasi</span>
        </div>
        <div>
          <span className='font-bold'>Status:</span> Sedang Diproses
        </div>
      </div>

      <div className='border-2 border-solid border-[#dddddd] p-5 rounded-xl mb-6'>
        <div className='relative'>
          <h2 className='bg-white relative z-50 w-max pr-4 font-bold text-lg'>
            Informasi Data Pribadi
          </h2>
          <div className='absolute top-[14px] w-full h-[2px] bg-[#b1bfca]'></div>
        </div>
        <div className='grid grid-cols-2 mt-8'>
          <div>
            <div className='mb-5'>
              <label className='text-[#857878]'>
                Nama Lengkap
              </label>
              <h3 className='font-bold mt-1 text-[#473D3D]'>
                Robi Hardinata
              </h3>
            </div>
            <div className='mb-5'>
              <label className='text-[#857878]'>
                No HP
              </label>
              <h3 className='font-bold mt-1 text-[#473D3D]'>
                08956640417123
              </h3>
            </div>
            <div className='mb-5'>
              <label className='text-[#857878]'>
                NIK
              </label>
              <h3 className='font-bold mt-1 text-[#473D3D]'>
                187710331314298742
              </h3>
            </div>
            <div className='mb-5'>
              <label className='text-[#857878]'>
                Kecamatan
              </label>
              <h3 className='font-bold mt-1 text-[#473D3D]'>
                Talang Ubi
              </h3>
            </div>
            <div className='mb-5'>
              <label className='text-[#857878]'>
                Desa
              </label>
              <h3 className='font-bold mt-1 text-[#473D3D]'>
                Kaliawi
              </h3>
            </div>
          </div>
          <div>
            <div className='mb-5'>
              <label className='text-[#857878]'>
                No KTP
              </label>
              <h3 className='font-bold mt-1 text-[#473D3D]'>
                196305151990011001
              </h3>
            </div>
            <div className='mb-5'>
              <label className='text-[#857878]'>
                Kabupaten
              </label>
              <h3 className='font-bold mt-1 text-[#473D3D]'>
                Pali
              </h3>
            </div>
            <div className='mb-5'>
              <label className='text-[#857878]'>
                Kabupaten
              </label>
              <h3 className='font-bold mt-1 text-[#473D3D]'>
                Pali
              </h3>
            </div>
            <div className='mb-5'>
              <label className='text-[#857878]'>
                Kelurahan
              </label>
              <h3 className='font-bold mt-1 text-[#473D3D]'>
                Sukadana Ham
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className='border-2 border-solid border-[#dddddd] p-5 rounded-xl mb-6'>
        <div className='relative'>
          <h2 className='bg-white relative z-50 w-max pr-4 font-bold text-lg'>
            Anggota Dewan
          </h2>
          <div className='absolute top-[14px] w-full h-[2px] bg-[#b1bfca]'></div>
        </div>
        <div className='grid grid-cols-2 mt-8'>
          <div>
            <div className='mb-5'>
              <label className='text-[#857878]'>
                Dapil
              </label>
              <h3 className='font-bold mt-1 text-[#473D3D]'>
                Dapil 1
              </h3>
            </div>
          </div>
          <div>
            <div className='mb-5'>
              <label className='text-[#857878]'>
                Nama Anggota Dewan
              </label>
              <h3 className='font-bold mt-1 text-[#473D3D]'>
                Robi Hardinata
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className='border-2 border-solid border-[#dddddd] p-5 rounded-xl mb-6'>
        <div className='relative'>
          <h2 className='bg-white relative z-50 w-max pr-4 font-bold text-lg'>
            Informasi Aspirasi
          </h2>
          <div className='absolute top-[14px] w-full h-[2px] bg-[#b1bfca]'></div>
        </div>
        <div className='grid grid-cols-2 mt-8'>
          <div>
            <div className='mb-5'>
              <label className='text-[#857878]'>
                Kategori Aspirasi
              </label>
              <h3 className='font-bold mt-1 text-[#473D3D]'>
                Pendidikan
              </h3>
            </div>
          </div>
          <div>
            <div className='mb-5'>
              <label className='text-[#857878]'>
                Usulan
              </label>
              <h3 className='font-bold mt-1 text-[#473D3D]'>
                Pembangunan jalan baru di kawasan Cidadap Tengah
              </h3>
            </div>
          </div>
        </div>
        <div className='mb-5'>
          <label className='text-[#857878]'>
            Uraian Permasalahan
          </label>
          <h3 className='font-medium mt-1 text-[#473D3D]'>
            Jalan utama di Cidadap Tengah rusak parah dan sulit dilalui, terutama saat musim hujan Jalan utama di Cidadap Tengah rusak parah dan sulit dilalui, terutama saat musim hujanJalan utama di Cidadap Tengah rusak parah dan sulit dilalui, terutama saat musim hujan Jalan utama di Cidadap Tengah rusak parah dan sulit dilalui, terutama saat musim hujan
          </h3>
        </div>
        <div className='mb-5'>
          <label className='text-[#857878]'>
            Foto Pengaduan
          </label>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 mt-1'>
            <div>
              <Image
                src='/assets/pengaduan1.png'
                className="!relative !w-full !h-[135px] sm:!h-[230px]"
                fill
                priority
                alt='Foto Pengaduan 1'
              />
            </div>
            <div>
              <Image
                src='/assets/pengaduan2.png'
                className="!relative !w-full !h-[135px] sm:!h-[230px]"
                fill
                priority
                alt='Foto Pengaduan 2'
              />
            </div>
            <div>
              <Image
                src='/assets/pengaduan3.png'
                className="!relative !w-full !h-[135px] sm:!h-[230px]"
                fill
                priority
                alt='Foto Pengaduan 3'
              />
            </div>
            <div>
              <Image
                src='/assets/pengaduan4.png'
                className="!relative !w-full !h-[135px] sm:!h-[230px]"
                fill
                priority
                alt='Foto Pengaduan 4'
              />
            </div>
          </div>
        </div>
        <div>
          <label className='text-[#857878]'>
            File
          </label>
          <div className='border-2 border-solid border-[#dddddd] px-3.5 py-3 rounded-xl'>
            <div className='flex items-center gap-x-2'>
              <div>
                <Image
                  src='/assets/folder.png'
                  className="!relative !w-full !h-[25px]"
                  fill
                  priority
                  alt='Foto Pengaduan 1'
                />
              </div>
              <div>
                <p className='text-sm'>
                  Nama File
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='text-center mt-11'>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" type="submit" className='!bg-[#388e3c] w-28 px-2 rounded-2xl text-white'>
              Diterima
            </Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogContent className="DialogContent max-w-[39rem] dialog-no-close">
              <DialogTitle className="DialogTitle">
                <div className='pb-4 border-b border-solid border-[#dddddd]'>
                  <span className='text-[#473D3D] text-[17px]'>Silahkan tentukan <span className='text-[#D39C55]'>Tingkat Urgensi</span> dari aspirasi ini!</span>
                </div>
              </DialogTitle>
              <div className="DialogDescription">
                <form onSubmit={onSubmit}>
                  <label className='text-sm'>
                    Silahkan tentukan Urgensi
                  </label>
                  <RadioGroup className='mt-2'>
                    <div className='flex gap-x-1.5 items-center'>
                      <RadioGroupItem value="prioritas" className='!block'></RadioGroupItem>
                      <label className='text-[#2f5673]'>Prioritas</label>
                    </div>
                    <div className='flex gap-x-1.5 items-center'>
                      <RadioGroupItem value="tidak_prioritas" className='!block'></RadioGroupItem>
                      <label className='text-[#2f5673]'>Tidak Prioritas</label>
                    </div>
                  </RadioGroup>
                </form>
              </div>
              <div className='flex mt-3 items-center mx-auto'>
                <Button variant="default" className='!block !bg-white w-36 mx-2 px-2 rounded-2xl text-[#2f5673] border border-solid border-[#2f5673]'>
                  Batal
                </Button>
                <Button variant="default" type="submit" className='!block !bg-[#2f5673] w-36 mx-2 px-2 rounded-2xl text-white'>
                  Simpan
                </Button>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" type="submit" className='!bg-[#d39c55] w-28 mx-2 px-2 rounded-2xl text-white'>
              Direvisi
            </Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogContent className="DialogContent max-w-[39rem] dialog-no-close">
              <DialogTitle className="DialogTitle">
                <div className='pb-4 border-b border-solid border-[#dddddd]'>
                  <span className='text-[#473D3D] text-[17px]'>Anda yakin ingin melakukan <span className='text-[#D39C55]'>Revisi</span></span>
                </div>
              </DialogTitle>
              <div className="DialogDescription">
                <form onSubmit={onSubmit}>
                  <label className='text-sm'>
                    Tambahkan Catatan
                  </label>
                  <Textarea rows={4} placeholder="Berikan tambahan catatan kemasyarakat" className='bg-white rounded-2xl py-2 mt-1 mb-5' />
                </form>
              </div>
              <div className='flex items-center mx-auto'>
                <Button variant="default" className='!block !bg-white w-36 mx-2 px-2 rounded-2xl text-[#2f5673] border border-solid border-[#2f5673]'>
                  Batal
                </Button>
                <Button variant="default" type="submit" className='!block !bg-[#2f5673] w-36 mx-2 px-2 rounded-2xl text-white'>
                  Simpan
                </Button>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
        <Button variant="default" type="submit" className='!bg-[#d32f2f] w-28 px-2 rounded-2xl text-white'>
          Ditolak
        </Button>
      </div>
    </>
  );
}
