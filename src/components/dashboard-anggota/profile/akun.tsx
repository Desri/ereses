import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import DashboardProfileInformasiSummaryComponent from "./summaryDataUser";

type Props = {
  user: any;
};

export default function DashboardProfileAnggotaAkunComponent({ user }: Props) {
  const onSubmit = () => {
    console.log("Check");
  };
  return (
    <div className="max-w-screen-xl mx-auto mt-8 mb-12 px-4 sm:px-0">
      <div className="flex gap-x-7">
        <div className="w-1/3">
          <DashboardProfileInformasiSummaryComponent user={user} />
        </div>
        <div className="w-2/3">
          <div className="border border-solid border-[#dddddd] rounded-xl p-5">
            <form onSubmit={onSubmit}>
              <label className="text-sm text-sm">Email</label>
              <Input
                type="email"
                placeholder="Masukkan Email"
                className="bg-white rounded-2xl py-2 mt-1 mb-4"
              />
              <label className="text-sm text-sm">Password</label>
              <Input
                type="password"
                placeholder="Masukkan Password"
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
