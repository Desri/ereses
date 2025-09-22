"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState, useCallback } from "react";
import { getAspirasi } from "@/services/api/aspirasi";
import { Aspirasi } from "@/types/aspirasi";
import { formatTanggalIndo } from "@/utils/formatDate";
import FilterPengajuanAspirasiComponent from "./filter";
import "./style.css";

export default function DashboardAnggota() {
  const [aspirasi, setAspirasi] = useState<Aspirasi>();
  const [filters, setFilters] = useState({
    categoryId: "",
    dapilId: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchListAspirasi();
  }, []);

  const fetchListAspirasi = (extraFilters = {}) => {
    const finalFilters = { ...filters, ...extraFilters };

    getAspirasi({
      category: finalFilters.categoryId,
      dapilId: finalFilters.dapilId,
      startDate: finalFilters.startDate,
      endDate: finalFilters.endDate,
    })
      .then((res: any) => {
        setAspirasi(res.data);
        setFilters(finalFilters);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };

  const handleFilterCategory = (categoryId: string) => {
    fetchListAspirasi({ categoryId });
  };

  const handleFilterDapil = (dapilId: string) => {
    fetchListAspirasi({ dapilId });
  };

  const handleFilterDateRange = useCallback((startDate: string, endDate: string) => {
    console.log("CHECK DATE", startDate);
    console.log("CHECK DATE", endDate);

    // Update filters state first
    const newFilters = { ...filters, startDate, endDate };

    getAspirasi({
      category: newFilters.categoryId,
      dapilId: newFilters.dapilId,
      startDate: newFilters.startDate,
      endDate: newFilters.endDate,
    })
      .then((res: any) => {
        setAspirasi(res.data);
        setFilters(newFilters);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  }, [filters]);

  return (
    <div className="bg-white">
      <h1 className="mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="relative overflow-hidden text-white flex flex-col justify-around w-full rounded-xl p-4 h-[140px] bg-[#d39c55]">
          <div>Total Usulan Belum Diverifikasi</div>
          <div className="text-3xl font-semibold">2</div>
          <div className="absolute right-0 bottom-0">
            <svg
              width="255"
              height="143"
              viewBox="0 0 255 143"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M436.605 -39.4395C413.109 -16.4334 389.744 9.61753 360.171 21.5069C346.834 26.8228 333.583 28.2334 323.67 23.2521C314.45 18.6799 309.035 9.96426 303.669 1.61099C298.002 -7.34655 292.334 -16.7478 282.439 -21.559C271.688 -26.774 257.459 -27.3443 242.939 -22.9332C214.536 -14.2345 187.076 13.3529 179.17 41.503C174.905 56.7206 176.009 72.0201 166.514 87.5037C159.413 99.1528 148.516 108.756 136.851 115.506C105.537 133.723 76.724 129.715 47.9153 131.032C34.8616 131.64 17.9082 132.731 4.94836 144.496C3.40649 145.856 2.06804 147.38 0.74735 149.074L398.352 135.764L466.627 -65.0989C455.958 -57.5969 446.026 -48.6405 436.605 -39.4395Z"
                fill="#EBE4D6"
                fillOpacity="0.3"
              ></path>
            </svg>
          </div>
        </div>
        <div className="relative overflow-hidden text-white flex flex-col justify-around w-full rounded-xl p-4 h-[140px] bg-[#d39c55]">
          <div>Total Usulan Diverifikasi</div>
          <div className="text-3xl font-semibold">76</div>
          <div className="absolute right-0 bottom-0">
            <svg
              width="255"
              height="143"
              viewBox="0 0 255 143"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M436.605 -39.4395C413.109 -16.4334 389.744 9.61753 360.171 21.5069C346.834 26.8228 333.583 28.2334 323.67 23.2521C314.45 18.6799 309.035 9.96426 303.669 1.61099C298.002 -7.34655 292.334 -16.7478 282.439 -21.559C271.688 -26.774 257.459 -27.3443 242.939 -22.9332C214.536 -14.2345 187.076 13.3529 179.17 41.503C174.905 56.7206 176.009 72.0201 166.514 87.5037C159.413 99.1528 148.516 108.756 136.851 115.506C105.537 133.723 76.724 129.715 47.9153 131.032C34.8616 131.64 17.9082 132.731 4.94836 144.496C3.40649 145.856 2.06804 147.38 0.74735 149.074L398.352 135.764L466.627 -65.0989C455.958 -57.5969 446.026 -48.6405 436.605 -39.4395Z"
                fill="#EBE4D6"
                fillOpacity="0.3"
              ></path>
            </svg>
          </div>
        </div>
        <div className="relative overflow-hidden text-white flex flex-col justify-around w-full rounded-xl p-4 h-[140px] bg-[#d39c55]">
          <div>Total Usulan Ditolak</div>
          <div className="text-3xl font-semibold">0</div>
          <div className="absolute right-0 bottom-0">
            <svg
              width="255"
              height="143"
              viewBox="0 0 255 143"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M436.605 -39.4395C413.109 -16.4334 389.744 9.61753 360.171 21.5069C346.834 26.8228 333.583 28.2334 323.67 23.2521C314.45 18.6799 309.035 9.96426 303.669 1.61099C298.002 -7.34655 292.334 -16.7478 282.439 -21.559C271.688 -26.774 257.459 -27.3443 242.939 -22.9332C214.536 -14.2345 187.076 13.3529 179.17 41.503C174.905 56.7206 176.009 72.0201 166.514 87.5037C159.413 99.1528 148.516 108.756 136.851 115.506C105.537 133.723 76.724 129.715 47.9153 131.032C34.8616 131.64 17.9082 132.731 4.94836 144.496C3.40649 145.856 2.06804 147.38 0.74735 149.074L398.352 135.764L466.627 -65.0989C455.958 -57.5969 446.026 -48.6405 436.605 -39.4395Z"
                fill="#EBE4D6"
                fillOpacity="0.3"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="mb-4 shadow-md p-3 border border-[#EFF0F6] rounded-xl">
        <FilterPengajuanAspirasiComponent
          onSelectCategory={handleFilterCategory}
          onSelectDapil={handleFilterDapil}
          onSelectDateRange={handleFilterDateRange}
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <span className="font-medium">No</span>
              </TableHead>
              <TableHead>
                <span className="font-medium">Nama Masyarakat</span>
              </TableHead>
              <TableHead>
                <span className="font-medium">Judul Pengajuan</span>
              </TableHead>
              <TableHead>
                <span className="font-medium">Dapil</span>
              </TableHead>
              <TableHead>
                <span className="font-medium">Tanggal Pengajuan</span>
              </TableHead>
              <TableHead>
                <span className="font-medium">Kategori Aspirasi</span>
              </TableHead>
              <TableHead>
                <span className="font-medium">Status</span>
              </TableHead>
              <TableHead>
                <span className="font-medium">Aksi</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {aspirasi?.items?.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.proposal}</TableCell>
                <TableCell>{item.dapil.name}</TableCell>
                <TableCell>{formatTanggalIndo(item.createdAt)}</TableCell>
                <TableCell>{item.categoryAspiration?.name}</TableCell>
                <TableCell>
                  {item.status === "Pending"
                    ? "Menunggu Verifikasi"
                    : "Terverifikasi"}
                </TableCell>
                <TableCell>
                  <div className="dropdown float-right mr-1 cursor-pointer">
                    <Image
                      src="/assets/dots.png"
                      className="!relative !w-[5px] !h-[16px] float-right mr-4"
                      fill
                      priority
                      alt="Printer"
                    />
                    <div className="dropdown-content right-0 absolute bg-transparent hidden">
                      <div className="box-shadows bg-white mt-[21px]">
                        <Link
                          href={`/dashboard/pengajuan-aspirasi/detail/${item.id}`}
                        >
                          Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
