"use client";

import Image from "next/image";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Profile } from "@/types/profile";
import { getProfile, changePassword } from "@/services/api/profile";
import { useRouter } from "next/navigation";

export default function ChangePasswordComponent() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [profile, setProfile] = useState<Profile>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const watchNewPassword = watch("newPassword");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    getProfile()
      .then((res: any) => {
        setProfile(res.data);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const payload = {
        oldPassword: data.oldPassword,
        password: data.newPassword,
        confirmPassword: data.confirmPassword
      };

      const response = await changePassword(payload);
      console.log("Password changed successfully:", response);

      alert("Password berhasil diubah!");
      router.push("/profile");

    } catch (error: any) {
      console.error("Error changing password:", error);
      const errorMessage = error.message || "Gagal mengubah password";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToProfile = () => {
    router.push('/profile');
  };

  return (
    <>
      <div className="h-[250px] bg-center bg-no-repeat bg-cover bg-[url('/assets/bg-banner.png')]">
        <div className="text-center text-white pt-24 uppercase">
          <h2 className="text-2xl uppercase">Ubah Kata Sandi</h2>
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
                  type="button"
                  onClick={handleBackToProfile}
                  className="!bg-[#2f5673] w-40 mb-2 rounded-full text-white"
                >
                  Kembali ke Profile
                </Button>
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
                <label className="text-sm">Password Lama</label>
                <Input
                  type="password"
                  placeholder="Masukkan Password Lama"
                  className="bg-white rounded-2xl py-2 mt-1 mb-4"
                  {...register("oldPassword", {
                    required: "Password lama wajib diisi"
                  })}
                />
                {errors.oldPassword && (
                  <p className="text-red-500 text-xs mb-2">{errors.oldPassword.message?.toString()}</p>
                )}

                <label className="text-sm">Password Baru</label>
                <Input
                  type="password"
                  placeholder="Masukkan Password Baru"
                  className="bg-white rounded-2xl py-2 mt-1 mb-4"
                  {...register("newPassword", {
                    required: "Password baru wajib diisi",
                    minLength: {
                      value: 8,
                      message: "Password minimal 8 karakter"
                    }
                  })}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-xs mb-2">{errors.newPassword.message?.toString()}</p>
                )}

                <label className="text-sm">Konfirmasi Password Baru</label>
                <Input
                  type="password"
                  placeholder="Konfirmasi Password Baru"
                  className="bg-white rounded-2xl py-2 mt-1 mb-4"
                  {...register("confirmPassword", {
                    required: "Konfirmasi password wajib diisi",
                    validate: (value) =>
                      value === watchNewPassword || "Password tidak sama"
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mb-2">{errors.confirmPassword.message?.toString()}</p>
                )}

                <div className="text-center flex gap-4 justify-center">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleBackToProfile}
                    className="border-[#2f5673] text-[#2f5673] w-44 mt-12 rounded-full hover:bg-[#2f5673] hover:text-white"
                  >
                    Batal
                  </Button>
                  <Button
                    variant="default"
                    type="submit"
                    disabled={isLoading}
                    className="!bg-[#2f5673] w-44 mt-12 rounded-full text-white disabled:opacity-50"
                  >
                    {isLoading ? "Mengubah..." : "Ubah Password"}
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