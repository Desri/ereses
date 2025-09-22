"use client";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { postRegister } from "@/services/api/auth";
import { registerAnggotaSchema } from "@/schema/registerAnggotaSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showSuccessToast } from "@/utils/toast";

type RegisterAnggotaInput = z.infer<typeof registerAnggotaSchema>;

export default function RegisterAnggotaComponent() {
  const router = useRouter();
  const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterAnggotaInput>({
    resolver: zodResolver(registerAnggotaSchema),
  });

  const onSubmit = (data: any) => {
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      roleId: 2,
      isTermsAndConditions: data.terms,
    };
    postRegister({ payload })
      .then((res: any) => {
        if (res.message === "Success") {
          showSuccessToast("Register sukses!");
          setTimeout(() => {
            router.push("/login-anggota");
          }, 3000);
        }
      })
      .catch((err: any) => {
        console.log("Error", err);
      });
  };

  return (
    <div className="sm:grid sm:grid-cols-2 min-h-screen">
      <div>
        <div className="py-6 px-5 sm:px-10">
          <Image
            src="/assets/logo.png"
            className="!relative !w-[85px] !h-[85px] !mx-auto !mb-10"
            fill
            priority
            alt="Logo"
          />
          <h1 className="text-3xl leading-10 font-bold mb-4 text-[#2F5673]">
            <span className="text-[#D39C55]">Dashboard E-RESES</span> Suara
            Masyarakat, <br />
            Tanggung Jawab <span className="text-[#D39C55]">Kita!</span>
          </h1>
          <p className="text-[#473D3D]">
            Register sebagai Anggota untuk memantau, memverifikasi dan
            menanggapi aspirasi masyarakat. Jadilah penghubung suara rakyat
            menuju perubahan yang lebih baik!
          </p>
          <Image
            src="/assets/banner.png"
            className="!relative !w-[75%] !h-[85px]s !mx-auto !mt-8"
            fill
            priority
            alt="Banner"
          />
        </div>
      </div>
      <div>
        <div className="h-full bg-center bg-no-repeat bg-cover bg-[url('/assets/bg-pattern.png')]">
          <div className="pt-11 sm:pt-16 px-5 sm:px-10">
            <h2 className="text-3xl leading-10 mb-5 text-white">
              Selamat Datang di Dashboard Anggota
              <br /> E-RESES DPRD PALI
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="nama" className="text-white text-sm">
                  Nama
                </label>
                <Input
                  type="text"
                  placeholder="Masukkan nama anda"
                  className="bg-white rounded-2xl py-2 mt-1"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="text-white text-sm">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Masukkan email anda"
                  className="bg-white rounded-2xl py-2 mt-1"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="text-white text-sm">
                  Phone
                </label>
                <Input
                  type="text"
                  placeholder="Masukkan no tlp anda"
                  className="bg-white rounded-2xl py-2 mt-1"
                  {...register("phone", { required: "Phone is required" })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="text-white text-sm">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Masukkan password anda"
                  className="bg-white rounded-2xl py-2 mt-1"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Controller
                control={control}
                name="terms"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <>
                    <div className="text-white flex items-start text-sm mt-3.5">
                      <Checkbox
                        checked={value}
                        onCheckedChange={onChange}
                        className="border border-solid border-white mt-1"
                        id="terms"
                      />
                      <Dialog>
                        <div className="text-white flex items-center text-sm">
                          <label htmlFor="terms" className="Label ml-3">
                            Ya, saya telah membaca, memahami, dan menyetujui{" "}
                            <br />{" "}
                            <DialogTrigger asChild>
                              <span className="cursor-pointer underline">
                                Syarat & Ketentuan
                              </span>
                            </DialogTrigger>{" "}
                            dan{" "}
                            <span className="cursor-pointer underline">
                              Kebijakan Privasi
                            </span>
                          </label>
                        </div>
                        <DialogPortal>
                          <DialogContent className="DialogContent max-w-[39rem] dialog-no-close">
                            <DialogTitle className="DialogTitle">
                              <div className="flex items-center gap-x-1.5 border-b border-1 border-[#dddddd] pb-3.5">
                                <div>
                                  <Image
                                    src="/assets/notes.png"
                                    className="!relative !w-[23px] !h-[23px]"
                                    fill
                                    priority
                                    alt="Logo"
                                  />
                                </div>
                                <div>
                                  <span className="text-[#473D3D] text-[17px] font-normal">
                                    Syarat dan Ketentuan
                                  </span>
                                </div>
                              </div>
                            </DialogTitle>
                            <div className="text-[#473D3D]">
                              <ul className="ml-4 list-decimal text-base">
                                <li className="mb-5">
                                  <label
                                    htmlFor="syarat"
                                    className="text-base text-[#473D3D]"
                                  >
                                    Syarat
                                  </label>
                                  <ol className="mt-1.5 list-disc ml-3 text-sm">
                                    <li className="mb-2">{text}</li>
                                    <li className="mb-2">{text}</li>
                                  </ol>
                                </li>
                                <li className="mb-3">
                                  <label
                                    htmlFor="ketentuan"
                                    className="text-base text-[#473D3D]"
                                  >
                                    Ketentuan
                                  </label>
                                  <ol className="mt-1.5 list-disc ml-3 text-sm">
                                    <li className="mb-2">{text}</li>
                                  </ol>
                                </li>
                              </ul>
                            </div>
                            <div className="mt-8 mx-auto">
                              <DialogClose asChild>
                                <button className="!block px-10 py-2 text-sm rounded-3xl w-max mx-auto bg-[#2F5673] text-white">
                                  Saya Setuju
                                </button>
                              </DialogClose>
                            </div>
                          </DialogContent>
                        </DialogPortal>
                      </Dialog>
                    </div>
                    <div>
                      {error && (
                        <p className="text-red-500 text-xs mt-1">
                          {error.message}
                        </p>
                      )}
                    </div>
                  </>
                )}
              />
              <div className="text-center">
                <Button
                  variant="default"
                  type="submit"
                  className="!bg-white w-52 mt-12 rounded-xl text-[#2F5673]"
                >
                  Register
                </Button>
                <div className="my-6 text-center relative">
                  <span className="text-white text-sm px-3 sm:px-5 rounded-full bg-[#012563] relative z-10">
                    Atau login dengan
                  </span>
                  <hr className="bg-white absolute w-full top-3" />
                </div>
                <Button
                  variant="default"
                  type="submit"
                  className="!bg-white w-52 rounded-xl text-[#2F5673]"
                >
                  Masuk dengan Google
                </Button>
              </div>
            </form>
            <p className="text-sm text-center pb-4 text-white mt-16">
              Sudah punya akun?{" "}
              <Link href="/login-anggota" className="font-bold underline">
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
