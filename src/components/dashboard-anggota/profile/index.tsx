import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardProfileInformasiPribadiComponent from "./informasiPribadi";
import { useAuthStore } from "@/store/profileStore";
import DashboardProfileAnggotaPendidikanComponent from "./pendidikan";
import DashboardProfileAnggotaJabatanComponent from "./jabatan";
import DashboardProfileAnggotaAkunComponent from "./akun";
import "./style.css";

export default function DashboardProfileComponent() {
  const user = useAuthStore((state) => state.user);
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
          <DashboardProfileInformasiPribadiComponent user={user} />
        </TabsContent>
        <TabsContent className="TabsContent" value="pendidikan">
          <DashboardProfileAnggotaPendidikanComponent user={user} />
        </TabsContent>
        <TabsContent className="TabsContent" value="jabatan">
          <DashboardProfileAnggotaJabatanComponent user={user} />
        </TabsContent>
        <TabsContent className="TabsContent" value="akun">
          <DashboardProfileAnggotaAkunComponent user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
