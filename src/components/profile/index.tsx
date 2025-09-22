import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Profile } from "@/types/profile";
import { getProfile, putProfile } from "@/services/api/profile";
import { useRouter } from "next/navigation";

export default function ProfileComponent() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [profile, setProfile] = useState<Profile>();
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    getProfile()
      .then((res: any) => {
        setProfile(res.data);
        setValue("name", res.data.name);
        setValue("ktp", res.data.ktp);
        setValue("phone", res.data.phone);
        setValue("email", res.data.email);
        setValue("gender", res.data.gender);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await putProfile({ data });
      console.log("Profile updated successfully", response);

      // Update local profile state with new data
      setProfile(prev => ({ ...prev, ...data }));

      // Show success message (you can replace with toast notification)
      alert("Profile berhasil diperbarui!");

    } catch (error: any) {
      console.error("Error updating profile:", error);

      // Show error message (you can replace with toast notification)
      const errorMessage = error.response?.data?.message || "Gagal memperbarui profile";
      alert(errorMessage);

    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = () => {
    router.push('/profile/change-password');
  };
  return (
    <>
      <div className="h-[250px] bg-center bg-no-repeat bg-cover bg-[url('/assets/bg-banner.png')]">
        <div className="text-center text-white pt-24 uppercase">
          <h2 className="text-2xl uppercase">Profile</h2>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto mt-16 mb-12 px-4 sm:px-0">
        <div className="flex gap-x-7">
          <div className="w-1/3">
            <div className="border border-solid border-[#dddddd] rounded-xl p-5">
              <div className="text-center">
                <Image
                  src="/assets/avatar.png"
                  className="!relative !w-[90px] !h-[90px] !mx-auto !mb-4"
                  fill
                  priority
                  alt="Avatar"
                />
                <Button
                  variant="default"
                  type="submit"
                  className="!bg-[#2f5673] w-40 mb-2 rounded-full text-white"
                >
                  Upload foto baru
                </Button>
                <p className="text-xs text-[#2f5673]">JPG or PNG</p>
                <p className="text-xs text-[#2f5673]">(Max 450 x 450 px)</p>
              </div>
              <hr className="my-6" />
              <table>
                <tbody>
                  <tr>
                    <td className="pb-2.5">
                      <span className="font-bold">Nama Lengkap</span>
                    </td>
                    <td className="px-1.5 pb-2.5">:</td>
                    <td className="pb-2.5">{profile?.name}</td>
                  </tr>
                  <tr>
                    <td className="pb-2.5">
                      <span className="font-bold">NIK</span>
                    </td>
                    <td className="px-1.5 pb-2.5">:</td>
                    <td className="pb-2.5">
                      {profile?.ktp ? profile.ktp : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-2.5">
                      <span className="font-bold">Email</span>
                    </td>
                    <td className="px-1.5 pb-2.5">:</td>
                    <td className="pb-2.5">{profile?.email}</td>
                  </tr>
                  <tr>
                    <td className="pb-2.5">
                      <span className="font-bold">Nomor HP</span>
                    </td>
                    <td className="px-1.5 pb-2.5">:</td>
                    <td className="pb-2.5">
                      {profile?.phone ? profile.phone : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="font-bold">Jenis Kelamin</span>
                    </td>
                    <td className="px-1.5">:</td>
                    <td>{profile?.gender ? profile.gender : "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-2/3">
            <div className="border border-solid border-[#dddddd] rounded-xl p-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <label className="text-sm">Nama Lengkap</label>
                <Input
                  type="text"
                  placeholder="Masukkan Nama Lengkap"
                  className="bg-white rounded-2xl py-2 mt-1 mb-4"
                  {...register("name")}
                />
                <label className="text-sm">No KTP</label>
                <Input
                  type="text"
                  placeholder="Masukkan No KTP"
                  {...register("ktp")}
                />
                <label className="text-sm">Email</label>
                <Input
                  type="email"
                  placeholder="Masukkan Email"
                  className="bg-white rounded-2xl py-2 mt-1 mb-4"
                  {...register("email", {
                    required: "Email wajib diisi",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Format email tidak valid",
                    },
                  })}
                />
                <label className="text-sm">Nomor HP</label>
                <Input
                  type="text"
                  placeholder="Masukkan No HP"
                  className="bg-white rounded-2xl py-2 mt-1 mb-4"
                  {...register("phone")}
                />
                <label className="text-sm">Jenis Kelamin</label>

                <select
                  {...register("gender")}
                  className="w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 mb-4 px-2"
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="Male">Laki-laki</option>
                  <option value="Female">Perempuan</option>
                </select>
                <label className="text-sm">Password</label>
                <Input
                  type="password"
                  placeholder="Masukkan Password"
                  className="bg-white rounded-2xl py-2 mt-1 mb-4"
                />
                <div className="text-center flex gap-4 justify-center">
                  <Button
                    variant="default"
                    type="submit"
                    disabled={isLoading}
                    className="!bg-[#2f5673] w-44 mt-12 rounded-full text-white disabled:opacity-50"
                  >
                    {isLoading ? "Menyimpan..." : "Simpan Profile"}
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleChangePassword}
                    className="border-[#2f5673] text-[#2f5673] w-44 mt-12 rounded-full hover:bg-[#2f5673] hover:text-white"
                  >
                    Ubah Kata Sandi
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
