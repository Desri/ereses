import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import DashboardInformasiSummaryComponent from "./summaryDataUser";

type Props = {
  user: any;
};

export default function DashboardProfileAnggotaPendidikanComponent({
  user,
}: Props) {
  const onSubmit = () => {
    console.log("Check");
  };
  return (
    <div className="max-w-screen-xl mx-auto mt-8 mb-12 px-4 sm:px-0">
      <div className="flex gap-x-7">
        <div className="w-1/3">
          <DashboardInformasiSummaryComponent user={user} />
        </div>
        <div className="w-2/3">
          <div className="border border-solid border-[#dddddd] rounded-xl p-5">
            <form onSubmit={onSubmit}>
              <div className="font-bold">Pendidikan SD</div>
              <label htmlFor="sd" className="text-sm text-sm">
                SD
              </label>
              <Input
                type="text"
                placeholder="Masukkan Nama SD"
                className="bg-white rounded-2xl py-2 mt-1 mb-4"
              />
              <div className="font-bold">Pendidikan SMP</div>
              <label htmlFor="smp" className="text-sm text-sm">
                SMP
              </label>
              <Input
                type="text"
                placeholder="Masukkan Nama SMP"
                className="bg-white rounded-2xl py-2 mt-1 mb-4"
              />
              <div className="font-bold text-sm">Pendidikan SMA/SMK</div>
              <label htmlFor="sma" className="text-sm text-sm">
                SMA/SMK
              </label>
              <Input
                type="text"
                placeholder="Masukkan Nama SMA/SMK"
                className="bg-white rounded-2xl py-2 mt-1 mb-4"
              />
              <div className="font-bold text-sm">Pendidikan Sarjana</div>
              <label htmlFor="s1" className="text-sm">
                S1
              </label>
              <Input
                type="email"
                placeholder="Masukkan Nama Universitas"
                className="bg-white rounded-2xl py-2 mt-1 mb-4"
              />
              <label htmlFor="s2" className="text-sm">
                S2
              </label>
              <Input
                type="email"
                placeholder="Masukkan Nama Universitas"
                className="bg-white rounded-2xl py-2 mt-1 mb-4"
              />
              <div className="text-center">
                <Button
                  variant="default"
                  type="submit"
                  className="!bg-[#2f5673] w-44 mt-12 rounded-full text-white"
                >
                  Simpan
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
