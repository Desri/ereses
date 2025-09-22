"use client";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/profileStore";

export default function NavigationBar() {
  const router = useRouter();
  const isLogin = useAuthStore((state) => state.isLogin);
  const user = useAuthStore((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("userId");
    useAuthStore.persist?.clearStorage?.();
    useAuthStore.getState().logout();
    router.push("/");
  };

  return (
    <header className="border-b-2 border-solid border-[#E8EFF6] py-3">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div>
          <Image src="/assets/logo.png" width={60} height={40} alt="Logo" />
        </div>
        <div>
          <div className="flex items-center gap-x-8">
            <nav className="space-x-8">
              <Link href="/" className="hover:text-gray-400">
                Beranda
              </Link>
              <Link
                href={isLogin ? "/aspirasi" : "/login"}
                className="hover:text-gray-400"
              >
                Aspirasi
              </Link>
              <Link href="/member" className="hover:text-gray-400">
                Anggota DPRD
              </Link>
              <Link href="/informasi" className="hover:text-gray-400">
                Informasi
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              {isLogin ? (
                <div>
                  <div
                    className="relative inline-block text-left"
                    ref={dropdownRef}
                  >
                    <button
                      onClick={toggleDropdown}
                      className="inline-flex w-full justify-center items-center gap-2 rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700"
                    >
                      <img
                        src="https://storage.googleapis.com/a1aa/image/ZC9wKlZFh3t7xTanuPK8KGqomQ-uyfUHynfNuRFPiOI.jpg"
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{user?.name}</span>
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-2">
                          <Link
                            href="/profile"
                            className="flex items-center hover:bg-gray-100 px-4 py-2 gap-x-3 text-sm text-gray-700"
                          >
                            <span className="text-gray-500">
                              <Image
                                src="/assets/profile-icon.png"
                                width={28}
                                height={28}
                                alt="profile"
                              />
                            </span>{" "}
                            Profile
                          </Link>
                          <Link
                            href="/notifikasi"
                            className="flex items-center hover:bg-gray-100 px-4 py-2 gap-x-3 text-sm text-gray-700"
                          >
                            <span className="text-gray-500">
                              <Image
                                src="/assets/notification-icon.png"
                                width={28}
                                height={28}
                                alt="profile"
                              />
                            </span>{" "}
                            Notifikasi
                          </Link>
                          <Link
                            href="/aktivitas"
                            className="flex items-center hover:bg-gray-100 px-4 py-2 gap-x-3 text-sm text-gray-700"
                          >
                            <span className="text-gray-500">
                              <Image
                                src="/assets/clock-icon.png"
                                width={28}
                                height={28}
                                alt="profile"
                              />
                            </span>{" "}
                            Log Aktivitas
                          </Link>
                          <button
                            type="button"
                            className="flex items-center w-full hover:bg-gray-100 px-4 py-2 gap-x-3 text-sm text-[#F04438] font-medium"
                            onClick={onLogout}
                          >
                            <span className="text-gray-500">
                              <Image
                                src="/assets/logout-icon.png"
                                width={28}
                                height={28}
                                alt="profile"
                              />
                            </span>{" "}
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-7 py-1.5 rounded-3xl w-max mx-auto cursor-pointer bg-[#2F5673]"
                >
                  <div className="text-white flex items-center text-sm">
                    <span className="text-sm text-white">Login</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
