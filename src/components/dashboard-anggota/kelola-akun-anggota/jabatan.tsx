import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import DashboardInformasiSummaryComponent from "./summaryDataUser";
import { useForm } from "react-hook-form";

type Props = {
  user: any;
};

export default function DashboardAnggotaJabatanComponent({ user }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    console.log("Check");
  };

  setValue("dapil", user.dapil.name);
  setValue("fraksi", user.fraksi.name);
  setValue("userDPRDHistory", user.userDPRDHistory[0].description);

  return (
    <div className="max-w-screen-xl mx-auto mt-8 mb-12 px-4 sm:px-0">
      <div className="flex gap-x-7">
        <div className="w-1/3">
          <DashboardInformasiSummaryComponent user={user} />
        </div>
        <div className="w-2/3">
          <div className="border border-solid border-[#dddddd] rounded-xl p-5">
            <form onSubmit={onSubmit}>
              <label className="text-sm text-sm">Jabatan</label>
              <Input
                type="text"
                placeholder="Masukkan Jabatan"
                className="bg-white rounded-2xl py-2 mt-1 mb-4"
                {...register("userDPRDHistory", {
                  required: "Jabatan is required",
                })}
              />
              <label className="text-sm text-sm">Dapil</label>
              <Input
                type="text"
                placeholder="Masukkan Nama Dapil"
                className="bg-white rounded-2xl py-2 mt-1 mb-4"
                {...register("fraksi", { required: "Fraksi is required" })}
              />
              <label className="text-sm text-sm">Fraksi</label>
              <Input
                type="text"
                placeholder="Masukkan Nama Fraksi"
                className="bg-white rounded-2xl py-2 mt-1 mb-4"
                {...register("dapil", { required: "Dapil is required" })}
              />
              <label className="text-sm">Komisi</label>
              <Input
                type="email"
                placeholder="Masukkan Nama Komisi"
                className="bg-white rounded-2xl py-2 mt-1 mb-4"
              />
              <label className="text-sm">Masa Jabatan</label>
              <Input
                type="email"
                placeholder="Masukkan Masa Jabatan"
                className="bg-white rounded-2xl py-2 mt-1 mb-4"
              />
              <label className="text-sm">Golongan</label>
              <Input
                type="email"
                placeholder="Masukkan Golongan"
                className="bg-white rounded-2xl py-2 mt-1 mb-4"
              />
              <label className="text-sm">Unit Kerja/ODP</label>
              <Input
                type="email"
                placeholder="Masukkan Unit Kerja/ODP"
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
