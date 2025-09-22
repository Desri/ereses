import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import DashboardProfileInformasiSummaryComponent from "./summaryDataUser";

type Props = {
  user: any;
};

export default function DashboardProfileInformasiPribadiComponent({
  user,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    // const payload = {
    //   address: data.address,
    //   anggota: data.anggota,
    //   categoryAspirationId: data.categoryAspirationId,
    //   dapilId: data.dapilId,
    //   description: data.description,
    //   ktp: data.ktp,
    //   name: data.name,
    //   phone: data.phone,
    //   proposal: data.proposal,
    //   image: imagePreviews,
    //   dokumen: documentFiles
    // }
  };

  setValue("name", user?.name);
  // setValue("nik", user?.nik);

  return (
    <div className="max-w-screen-xl mx-auto mt-8 mb-12 px-4 sm:px-0">
      <div className="flex gap-x-7">
        <div className="w-1/3">
          <DashboardProfileInformasiSummaryComponent user={user} />
        </div>
        <div className="w-2/3">
          <div className="border border-solid border-[#dddddd] rounded-xl p-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="fullname" className="text-sm">
                Nama Lengkap
              </label>
              <Input
                type="text"
                placeholder="Masukkan Nama Lengkap"
                className="bg-white rounded-2xl py-2 mt-1 mb-4"
                {...register("name", { required: "Name is required" })}
                disabled
              />
              <label htmlFor="nip" className="text-sm">
                NIP
              </label>
              <Input
                type="text"
                placeholder="Masukkan NIP"
                className="bg-white rounded-2xl py-2 mt-1 mb-4"
                {...register("nip", { required: "NIP is required" })}
              />
              <label htmlFor="nik" className="text-sm">
                NIK
              </label>
              <Input
                type="text"
                placeholder="Masukkan NIK"
                className="bg-white rounded-2xl py-2 mt-1 mb-4"
                {...register("nik", { required: "NIK is required" })}
              />
              <label htmlFor="umur" className="text-sm">
                Umur
              </label>
              <Input
                type="test"
                placeholder="Masukkan Umur"
                className="bg-white rounded-2xl py-2 mt-1 mb-4"
                {...register("umur", { required: "Umur is required" })}
              />
              <label htmlFor="gender" className="text-sm">
                Jenis Kelamin
              </label>
              <select
                name="gender"
                className="w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 mb-4 px-2"
              >
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
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
