"use client";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { postLogin } from "@/services/api/auth";
import { loginSchema } from "@/schema/loginSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { useState } from "react";

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginComponent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: any) => {
    setLoading(true);
    const payload = {
      identifier: data.email,
      password: data.password,
    };
    postLogin({ payload })
      .then((res: any) => {
        setLoading(false);
        if (res.message === "Success") {
          showSuccessToast("Login sukses!");
          if (res.data.role === "sekertariat" || res.data.role === "anggota") {
            setTimeout(() => {
              router.push("/dashboard");
            }, 3000);
          } else {
            setTimeout(() => {
              router.push("/");
            }, 3000);
          }
        }
      })
      .catch((err: any) => {
        setLoading(false);
        showErrorToast(err.message);
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
            Website <span className="text-[#D39C55]">E-RESES</span> <br />
            Suara Anda, Perubahan <span className="text-[#D39C55]">Nyata!</span>
          </h1>
          <p className="text-[#473D3D]">
            Platform digital yang memudahkan masyarakat PALI dalam menyampaikan
            aspirasi langsung kepada wakil rakyat. Bersama kami dengan proses
            yang lebih transparan dan efisien.
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
          <div className="pt-11 sm:pt-36 px-5 sm:px-10">
            <h2 className="text-3xl leading-10 mb-5 text-white">
              Selamat Datang di Website
              <br /> E-RESES DPRD PALI
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="email" className="text-white text-sm">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Masukkan email anda"
                  className="bg-white rounded-2xl py-2 mt-1"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.email.message}
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
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="text-right mt-1">
                <Link href="/forgot-password" className="text-white text-sm">
                  Lupa Kata Sandi?
                </Link>
              </div>
              <div className="text-center">
                {/* <Button
                  variant="default"
                  type="submit"
                  className="!bg-white w-52 mt-12 rounded-xl text-[#2F5673]"
                >
                  Masuk
                </Button> */}

                <Button
                  type="submit"
                  variant="default"
                  className={`${
                    loading
                      ? "!bg-gray-300 cursor-not-allowed"
                      : "!bg-[#2a6eb8] cursor-pointer"
                  } !bg-white w-52 mt-12 rounded-xl text-[#2F5673]`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      Loading<span className="dots ml-[-7px]"></span>
                    </>
                  ) : (
                    "Masuk"
                  )}
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
              Belum punya akun?{" "}
              <Link href="/register" className="font-bold underline">
                Buat Akun
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
