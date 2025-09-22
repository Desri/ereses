"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import BelumDibacaNotifikasiDashboardComponent from "./belumDibaca";
import DibacaNotifikasiDashboardComponent from "./dibaca";
import SemuaNotifikasiDashboardComponent from "./semua";
import "./style.css";

export default function NotifikasiDashboardComponent() {
  return (
    <>
      <div className="font-bold mb-3.5">Notifikasi</div>
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
          <SemuaNotifikasiDashboardComponent />
        </TabsContent>
        <TabsContent className="TabsContent mt-12" value="dibaca">
          <DibacaNotifikasiDashboardComponent />
        </TabsContent>
        <TabsContent className="TabsContent mt-12" value="belum_dibaca">
          <BelumDibacaNotifikasiDashboardComponent />
        </TabsContent>
      </Tabs>
    </>
  );
}
