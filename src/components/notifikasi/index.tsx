"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SemuaNotifikasiComponent from "./semua";
import DibacaNotifikasiComponent from "./dibaca";
import BelumDibacaNotifikasiComponent from "./belumDibaca";
import "./style.css";

export default function NotifikasiComponent() {
  return (
    <>
      <div className="h-[250px] bg-center bg-no-repeat bg-cover bg-[url('/assets/bg-banner.png')]">
        <div className="text-center text-white pt-24 uppercase">
          <h2 className="text-2xl">Notifikasi</h2>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto mt-16 mb-12 px-4 sm:px-0">
        <Tabs className="TabsRoot mt-10" defaultValue="semua">
          <TabsList className="TabsList" aria-label="Manage your account">
            <TabsTrigger className="TabsTrigger" value="semua">
              Semua
            </TabsTrigger>
            <TabsTrigger className="TabsTrigger" value="dibaca">
              Dibaca
            </TabsTrigger>
            <TabsTrigger className="TabsTrigger" value="belum_dibaca">
              Belum Dibaca
            </TabsTrigger>
          </TabsList>
          <TabsContent className="TabsContent mt-12" value="semua">
            <SemuaNotifikasiComponent />
          </TabsContent>
          <TabsContent className="TabsContent mt-12" value="dibaca">
            <DibacaNotifikasiComponent />
          </TabsContent>
          <TabsContent className="TabsContent mt-12" value="belum_dibaca">
            <BelumDibacaNotifikasiComponent />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
