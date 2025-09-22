"use client";
import Image from 'next/image';

export default function DetailAspirasiComponent() {
  return (
    <>
      <div className="h-[250px] bg-center bg-no-repeat bg-cover bg-[url('/assets/bg-banner.png')]">
        <div className='text-center text-white pt-24 uppercase'>
          <h2 className='text-2xl'>
            Detail Aspirasi
          </h2>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto mt-16 mb-12 px-4 sm:px-0">
        <div className='border-2 border-solid border-[#dddddd] p-5 rounded-xl mb-6'>
          <div>
            Status Aspirasi : <span className='text-[#ffa000]'>Direvisi</span>
          </div>
          <div>
            Catatan : Kurang Bukti Pendukung
          </div>
          <p className='mt-2'>
            Untuk pengajuan pembangunan jalan, harap lampirkan dokumen atau gambar yang lebih mendetail mengenai kerusakan jalan. Foto kondisi jalan yang rusak dan dokumen tambahan seperti peta lokasi akan sangat membantu.
          </p>
          <div className='bg-[#ffa000] text-center w-max text-white px-8 rounded-2xl py-1 text-sm mt-4'>
            Revisi
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
      </div>
    </>
  );
}
