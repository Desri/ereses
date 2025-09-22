import Image from "next/image";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import DashboardInformasiSummaryComponent from "./summaryDataUser";

type Props = {
  user: any;
};

export default function DashboardInformasiPribadiComponent({ user }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = () => {
    console.log("Check");
  };

  setValue("name", user.name);
  setValue("nip", user.nip);
  setValue("nik", user.ktp);
  setValue("placeOfBirth", user.placeOfBirth);
  setValue("address", user.address);

  return (
    <div className="max-w-screen-xl mx-auto mt-8 mb-12 px-4 sm:px-0">
      <div className="flex gap-x-7">
        <div className="w-1/3">
          <DashboardInformasiSummaryComponent user={user} />
        </div>
        <div className="w-2/3">
          <div className="border border-solid border-[#dddddd] rounded-xl p-5">
            <form onSubmit={onSubmit}>
              <label className="text-sm">Nama Lengkap</label>
              <Input
                type="text"
                placeholder="Masukkan Nama Lengkap"
                className="bg-white rounded-2xl py-2 mt-1 mb-4"
                {...register("name", { required: "Name is required" })}
              />
              <label className="text-sm">NIP</label>
              <Input
                type="text"
                placeholder="Masukkan NIP"
                className="bg-white rounded-2xl py-2 mt-1 mb-4"
                {...register("nip", { required: "NIP is required" })}
              />
              <label className="text-sm">NIK</label>
              <Input
                type="text"
                placeholder="Masukkan NIK"
                className="bg-white rounded-2xl py-2 mt-1 mb-4"
                {...register("nik", { required: "NIK is required" })}
              />
              <label className="text-sm">Jenis Kelamin</label>
              <select
                name="gender"
                className="w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 mb-4 px-2"
              >
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
              <label className="text-sm">Tempat Lahir</label>
              <Input
                type="text"
                placeholder="Masukkan NIK"
                className="bg-white rounded-2xl py-2 mt-1 mb-4"
                {...register("placeOfBirth", {
                  required: "Tempat lahir is required",
                })}
              />
              <label className="text-sm">Alamat</label>
              <textarea
                placeholder="Masukkan Alamat"
                rows={3}
                className="bg-white rounded-2xl py-2 mt-1 mb-4 w-full border p-2.5"
                {...register("address", {
                  required: "Alamat is required",
                })}
              />
              <div className="text-center">
                <Button
                  variant="default"
                  type="submit"
                  className="!bg-[#2f5673] w-44 mt-12 rounded-full text-white"
                >
                  Simpan Profile
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
