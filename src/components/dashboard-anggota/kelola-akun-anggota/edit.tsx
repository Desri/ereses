"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./style.css";
import DashboardInformasiPribadiComponent from "./informasiPribadi";
import DashboardAnggotaPendidikanComponent from "./pendidikan";
import DashboardAnggotaJabatanComponent from "./jabatan";
import DashboardAnggotaAkunComponent from "./akun";
import { useEffect, useState } from "react";
import { detailUser } from "@/services/api/masyarakat";
import { usePathname } from "next/navigation";

export default function DashboardEditAkunAnggotaComponent() {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").filter(Boolean).pop() ?? "";
  const [user, setUser] = useState("");
  const [idUser, setIdUser] = useState<any>(lastSegment);

  useEffect(() => {
    fetchDetailUser();
  }, []);

  const fetchDetailUser = () => {
    detailUser({ id: idUser })
      .then((res: any) => {
        setUser(res.data);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };

  return (
    <div className="bg-white">
      <Tabs className="TabsRoot mt-4" defaultValue="informasi">
        <TabsList className="TabsList" aria-label="Manage your account">
          <TabsTrigger className="TabsTrigger" value="informasi">
            Informasi Pribadi
          </TabsTrigger>
          <TabsTrigger className="TabsTrigger" value="pendidikan">
            Pendidikan
          </TabsTrigger>
          <TabsTrigger className="TabsTrigger" value="jabatan">
            Jabatan
          </TabsTrigger>
          <TabsTrigger className="TabsTrigger" value="akun">
            Informasi Akun
          </TabsTrigger>
        </TabsList>
        <TabsContent className="TabsContent" value="informasi">
          <DashboardInformasiPribadiComponent user={user} />
        </TabsContent>
        <TabsContent className="TabsContent" value="pendidikan">
          <DashboardAnggotaPendidikanComponent user={user} />
        </TabsContent>
        <TabsContent className="TabsContent" value="jabatan">
          <DashboardAnggotaJabatanComponent user={user} />
        </TabsContent>
        <TabsContent className="TabsContent" value="akun">
          <DashboardAnggotaAkunComponent user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
