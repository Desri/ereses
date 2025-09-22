import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { getDapilBagan } from "@/services/api/dapil";

// Type definitions
interface Person {
  id: number;
  name: string;
  dateOfBirth?: string;
  gender?: string;
  position?: string;
  akdName?: string;
  posisi?: string;
  imageUrl?: string;
  fraksi?: string;
  fraksiLogo?: string;
  akdId?: number;
}

interface Struktur {
  Ketua: Person[];
  WakilKetua: Person[];
  Sekretaris: Person[];
  Anggota: Person[];
}

interface AkdItem {
  id: number;
  name: string;
  jenis: string;
  struktur: Struktur;
}

interface ApiResponse {
  data: {
    total: number;
    pimpinan: any[];
    akd: AkdItem[];
  };
}

const CardDapilComponent = ({
  id,
  region,
  dapil,
  btnDapil,
  is_background_image,
}: {
  id?: any;
  region?: string;
  dapil?: string;
  btnDapil?: string;
  is_background_image?: boolean;
}) => {
  const [allMembers, setAllMembers] = useState<Person[]>([]);
  const [membersByPosition, setMembersByPosition] = useState({
    Ketua: [] as Person[],
    WakilKetua: [] as Person[],
    Sekretaris: [] as Person[],
    Anggota: [] as Person[],
  });
  const [isLoading, setIsLoading] = useState(false);

  // Function to extract all structure members
  const extractAllStructureMembers = (data: ApiResponse): Person[] => {
    const allMembers: Person[] = [];

    // Loop through each akd item
    data.data.akd.forEach((akdItem) => {
      const { struktur } = akdItem;

      // Extract members from each position
      const positions = [
        "Ketua",
        "WakilKetua",
        "Sekretaris",
        "Anggota",
      ] as const;

      positions.forEach((position) => {
        if (struktur[position] && Array.isArray(struktur[position])) {
          struktur[position].forEach((person) => {
            allMembers.push({
              ...person,
              position: position,
              akdName: akdItem.name,
              akdId: akdItem.id,
            });
          });
        }
      });
    });

    return allMembers;
  };

  // Function to extract by position
  const extractByPosition = (data: ApiResponse) => {
    const result = {
      Ketua: [] as Person[],
      WakilKetua: [] as Person[],
      Sekretaris: [] as Person[],
      Anggota: [] as Person[],
    };

    data.data.akd.forEach((akdItem) => {
      const { struktur } = akdItem;

      // Add members to respective position arrays
      if (struktur.Ketua)
        result.Ketua.push(
          ...struktur.Ketua.map((person) => ({
            ...person,
            akdName: akdItem.name,
            akdId: akdItem.id,
          }))
        );
      if (struktur.WakilKetua)
        result.WakilKetua.push(
          ...struktur.WakilKetua.map((person) => ({
            ...person,
            akdName: akdItem.name,
            akdId: akdItem.id,
          }))
        );
      if (struktur.Sekretaris)
        result.Sekretaris.push(
          ...struktur.Sekretaris.map((person) => ({
            ...person,
            akdName: akdItem.name,
            akdId: akdItem.id,
          }))
        );
      if (struktur.Anggota)
        result.Anggota.push(
          ...struktur.Anggota.map((person) => ({
            ...person,
            akdName: akdItem.name,
            akdId: akdItem.id,
          }))
        );
    });

    return result;
  };

  // Function to calculate age from dateOfBirth
  const calculateAge = (dateOfBirth: string): number => {
    if (!dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Function to format gender
  const formatGender = (gender: string): string => {
    return gender === "Male" ? "Laki-laki" : "Perempuan";
  };

  const handleDialogTriggerClick = () => {
    console.log("Dialog clicked, ID:", id);
    setIsLoading(true);

    getDapilBagan({ id })
      .then((res: ApiResponse) => {
        console.log("Check", res);

        // Extract all members into a single array
        const extractedMembers = extractAllStructureMembers(res);
        setAllMembers(extractedMembers);

        // Extract members grouped by position
        const extractedByPosition = extractByPosition(res);
        setMembersByPosition(extractedByPosition);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="shadow-1 border rounded-md max-w-[25rem] py-5 px-4 w-full relative overflow-hidden group hover:bg-[#2f5673] transition-all duration-400">
      <div className="w-[14.5rem] -z-0 h-56 absolute right-[-15.176px] -top-2 transition-all duration-500 ease-in-out group-hover:w-80 group-hover:h-80 group-hover:right-[-20.863px] group-hover:-top-14 group-hover:rotate-[-15.602deg]">
        <img
          alt="before"
          loading="lazy"
          width="300"
          height="300"
          className="object-contain h-full w-full"
          src="/assets/electoral-bg-before.webp"
        />
      </div>
      <h4 className="uppercase font-semibold text-xl text-[#2f5673] text-center line-clamp-2 group-hover:text-white transition-colors duration-300">
        {dapil}
      </h4>
      <div className="p-4 rounded-full bg-[#2f5673] text-white hover:text-[#2f5673] mx-auto w-fit mt-3 mb-7 group-hover:bg-white group-hover:text-[#2f5673] transition-colors duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-map-pinned"
        >
          <path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"></path>
          <circle cx="12" cy="8" r="2"></circle>
          <path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"></path>
        </svg>
      </div>
      <div className="flex justify-around relative z-10 gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <div
              onClick={handleDialogTriggerClick}
              className={`px-7 py-1.5 font-medium group-hover:bg-white text-white group-hover:text-[#2f5673] rounded-3xl w-max mx-auto cursor-pointer ${is_background_image ? "bg-white" : "bg-[#2F5673]"}`}
            >
              <div className="flex items-center text-sm">
                <span
                  className={`text-sm ${is_background_image ? "text-[#2F5673]" : ""}`}
                >
                  Anggota Dapil
                </span>
              </div>
            </div>
          </DialogTrigger>
          <DialogPortal>
            <DialogContent className="DialogContent max-w-[59rem] dialog-no-close max-h-[80vh] overflow-y-auto">
              <DialogTitle className="DialogTitle">
                <div className="text-center pb-8">
                  <span className="text-[#473D3D] text-xl">
                    Daftar Anggota {dapil}
                  </span>
                </div>
              </DialogTitle>
              <div className="DialogDescription">
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#2f5673]"></div>
                    <p className="mt-2 text-gray-600">Memuat data...</p>
                  </div>
                ) : allMembers.length > 0 ? (
                  <ul className="text-base">
                    {allMembers.map((member, index) => (
                      <li
                        key={`${member.id}-${index}`}
                        className="mb-5 pb-2.5 border-b border-solid border-[#dddddd]"
                      >
                        <div className="flex gap-3 sm:gap-x-4">
                          <div className="flex-shrink-0">
                            <img
                              src={member.imageUrl || "/assets/dpr-no.webp"}
                              className="!relative !h-[180px] sm:!h-[250px] w-[170px] rounded-lg"
                              alt={member.name || "Anggota"}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <div className="flex items-center text-[#473D3D] font-bold mb-6 flex-wrap">
                                  <div>
                                    <span className="text-[21px]">
                                      {member.name}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="w-[7px] h-[7px] bg-[#473D3D] rounded-full mx-2.5"></div>
                                  </div>
                                  <div>
                                    <span className="text-[#D39C55] text-lg">
                                      {member.fraksi}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <img
                                  src={member.fraksiLogo}
                                  className="!relative !h-[850px] sm:!h-[85px] w-[90px] rounded-lg"
                                  alt={member.name || "Anggota"}
                                />
                              </div>
                            </div>
                            <table className="text-[15px]">
                              <tbody>
                                <tr>
                                  <td className="pb-2">
                                    <span>AKD</span>
                                  </td>
                                  <td className="px-1.5 pb-2">:</td>
                                  <td className="pb-2">{member.posisi}</td>
                                </tr>
                                {member.dateOfBirth && (
                                  <tr>
                                    <td className="pb-2">
                                      <span>Usia</span>
                                    </td>
                                    <td className="px-1.5 pb-2">:</td>
                                    <td className="pb-2">
                                      {calculateAge(member.dateOfBirth)} Tahun
                                    </td>
                                  </tr>
                                )}
                                {member.gender && (
                                  <tr>
                                    <td className="pb-2">
                                      <span>Jenis Kelamin</span>
                                    </td>
                                    <td className="px-1.5 pb-2">:</td>
                                    <td className="pb-2">
                                      {formatGender(member.gender)}
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 text-gray-600">
                    <p>Tidak ada data anggota yang tersedia</p>
                  </div>
                )}
              </div>
              <div className="mt-5 mx-auto">
                <Link
                  className="px-10 py-3 text-sm rounded-3xl bg-[#2F5673] text-white hover:bg-[#1e3a4f] transition-colors"
                  href="/member"
                >
                  Lihat Anggota Lainnya
                </Link>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
        <a href="#" className="font-medium">
          <button className="bg-[#2f5673] font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground shadow hover:text-[#2f5673] hover:bg-primary-700/90 h-9 px-4 py-2 rounded-full bg-primary-700 md:px-6 group-hover:bg-white group-hover:text-[#2f5673] transition-colors duration-300 cursor-pointer">
            Usulan Dapil
          </button>
        </a>
      </div>
    </div>
  );
};

export default CardDapilComponent;
