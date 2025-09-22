import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SemuaLaporanComponent from './semua';
import FilterLaporanComponent from './filter';
import RevisiLaporanComponent from './revisi';
import VerifikasiLaporanComponent from './verifikasi';
import TolakLaporanComponent from './tolak';

export default function DashboardLaporanComponent() {
  return (
    <>
      <div className='bg-white'>
        <div className='font-bold mb-3.5'>
          Semua Pengajuan
        </div>
        <FilterLaporanComponent />
        <Tabs className="TabsRoot mt-4" defaultValue="tab1">
          <TabsList className="TabsList" aria-label="Manage your account">
            <TabsTrigger className="TabsTrigger" value="semua">
              Semua
            </TabsTrigger>
            <TabsTrigger className="TabsTrigger" value="verifikasi">
              Diverifikasi
            </TabsTrigger>
            <TabsTrigger className="TabsTrigger" value="revisi">
              Direvisi
            </TabsTrigger>
            <TabsTrigger className="TabsTrigger" value="tolak">
              Ditolak
            </TabsTrigger>
          </TabsList>
          <TabsContent className="TabsContent" value="semua">
            <SemuaLaporanComponent />
          </TabsContent>
          <TabsContent className="TabsContent" value="verifikasi">
            <VerifikasiLaporanComponent />
          </TabsContent>
          <TabsContent className="TabsContent" value="revisi">
            <RevisiLaporanComponent />
          </TabsContent>
          <TabsContent className="TabsContent" value="tolak">
            <TolakLaporanComponent />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
