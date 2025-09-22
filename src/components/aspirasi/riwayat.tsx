"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import FilterRiwayatAspirasiComponent from "./filter";
import AspirasiProccessComponent from "./proccess";
import AspirasiVerifikasiComponent from "./verifikasi";
import AspirasiRevisiComponent from "./revisi";
import AspirasiRejectComponent from "./revisi copy";
import "./style.css";

export default function RiwayatAspirasiComponent() {
  return (
    <>
      <div className="h-[250px] bg-center bg-no-repeat bg-cover bg-[url('/assets/bg-banner.png')]">
        <div className="text-center text-white pt-24 uppercase">
          <h2 className="text-2xl">Riwayat Aspirasi</h2>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto mt-16 mb-12 px-4 sm:px-0">
        <div className="border-2 border-solid border-[#dddddd] p-5 rounded-xl mb-6">
          <Tabs className="TabsRoot mt-10" defaultValue="proccess">
            <TabsList className="TabsList" aria-label="Manage your account">
              <TabsTrigger className="TabsTrigger" value="proccess">
                Aspirasi Sedang Diproses
              </TabsTrigger>
              <TabsTrigger className="TabsTrigger" value="verifikasi">
                Aspirasi Diverifikasi
              </TabsTrigger>
              <TabsTrigger className="TabsTrigger" value="revisi">
                Aspirasi Direvisi
              </TabsTrigger>
              <TabsTrigger className="TabsTrigger" value="reject">
                Aspirasi Ditolak
              </TabsTrigger>
            </TabsList>
            <TabsContent className="TabsContent mt-12" value="proccess">
              <FilterRiwayatAspirasiComponent />
              <AspirasiProccessComponent />
            </TabsContent>
            <TabsContent className="TabsContent mt-12" value="verifikasi">
              <FilterRiwayatAspirasiComponent />
              <AspirasiVerifikasiComponent />
            </TabsContent>
            <TabsContent className="TabsContent mt-12" value="revisi">
              <FilterRiwayatAspirasiComponent />
              <AspirasiRevisiComponent />
            </TabsContent>
            <TabsContent className="TabsContent mt-12" value="reject">
              <FilterRiwayatAspirasiComponent />
              <AspirasiRejectComponent />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
