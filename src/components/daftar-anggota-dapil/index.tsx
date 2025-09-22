import CardAnggotaComponent from '../card/cardAnggota';

export default function DaftarAnggotaDapilComponent() {
  return (
    <>
      <div className="h-[250px] bg-center bg-no-repeat bg-cover bg-[url('/assets/bg-banner.png')]">
        <div className='text-center text-white pt-24 uppercase'>
          <h2 className='text-2xl'>
            Daftar Anggota Dapil 2
          </h2>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto mt-16 mb-12 px-4 sm:px-0">
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-7'>
          <CardAnggotaComponent
            name='Fauzan Hamid'
            fraksi='Fraksi Demokrat'
            slug='fauzan-hamid'
            img_url='/assets/anggota1.png'
          />
          <CardAnggotaComponent
            name='Fauzan Hamid'
            fraksi='Fraksi Golkar'
            slug='fauzan-hamid'
            img_url='/assets/anggota2.png'
          />
          <CardAnggotaComponent
            name='Fauzan Hamid'
            fraksi='Fraksi PDIP'
            slug='fauzan-hamid'
            img_url='/assets/anggota3.png'
          />
          <CardAnggotaComponent
            name='Fauzan Hamid'
            fraksi='Fraksi Demokrat'
            slug='fauzan-hamid'
            img_url='/assets/anggota4.png'
          />
          <CardAnggotaComponent
            name='Fauzan Hamid'
            fraksi='Fraksi Golkar'
            slug='fauzan-hamid'
            img_url='/assets/anggota1.png'
          />
          <CardAnggotaComponent
            name='Fauzan Hamid'
            fraksi='Fraksi Gerindra'
            slug='fauzan-hamid'
            img_url='/assets/anggota2.png'
          />
          <CardAnggotaComponent
            name='Fauzan Hamid'
            fraksi='Fraksi PDIP'
            slug='fauzan-hamid'
            img_url='/assets/anggota3.png'
          />
          <CardAnggotaComponent
            name='Fauzan Hamid'
            fraksi='Fraksi Gerindra'
            slug='fauzan-hamid'
            img_url='/assets/anggota4.png'
          />
          <CardAnggotaComponent
            name='Fauzan Hamid'
            fraksi='Fraksi Demokrat'
            slug='fauzan-hamid'
            img_url='/assets/anggota1.png'
          />
          <CardAnggotaComponent
            name='Fauzan Hamid'
            fraksi='Fraksi Demokrat'
            slug='fauzan-hamid'
            img_url='/assets/anggota2.png'
          />
          <CardAnggotaComponent
            name='Fauzan Hamid'
            fraksi='Fraksi PDIP'
            slug='fauzan-hamid'
            img_url='/assets/anggota3.png'
          />
          <CardAnggotaComponent
            name='Fauzan Hamid'
            fraksi='Fraksi Nasdem'
            slug='fauzan-hamid'
            img_url='/assets/anggota4.png'
          />
          <CardAnggotaComponent
            name='Fauzan Hamid'
            fraksi='Fraksi Gerindra'
            slug='fauzan-hamid'
            img_url='/assets/anggota1.png'
          />
          <CardAnggotaComponent
            name='Fauzan Hamid'
            fraksi='Fraksi Nasdem'
            slug='fauzan-hamid'
            img_url='/assets/anggota2.png'
          />
          <CardAnggotaComponent
            name='Fauzan Hamid'
            fraksi='Fraksi PDIP'
            slug='fauzan-hamid'
            img_url='/assets/anggota3.png'
          />
          <CardAnggotaComponent
            name='Fauzan Hamid'
            fraksi='Fraksi Demokrat'
            slug='fauzan-hamid'
            img_url='/assets/anggota4.png'
          />
        </div>
      </div>
    </>
  );
}
