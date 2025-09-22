"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import FilterPengajuanAspirasiComponent from "./filter";
import "./style.css";
import Link from "next/link";
import { getAspirasi } from "@/services/api/aspirasi";
import { Aspirasi } from "@/types/aspirasi";
import { formatTanggalIndo } from "@/utils/formatDate";

export default function PengajuanAspirasiComponent() {
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
    })
      .then((res: any) => {
        setAspirasi(res.data);
        setFilters(finalFilters);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };

  // ✅ selalu kirim object
  const handleFilterCategory = (categoryId: string) => {
    fetchListAspirasi({ categoryId });
  };

  const handleFilterDapil = (dapilId: string) => {
    fetchListAspirasi({ dapilId });
  };

  const handleFilterDateRange = useCallback(
    (startDate: string, endDate: string) => {
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
    },
    [filters]
  );

  return (
    <>
      <div className="font-bold mb-3.5">Daftar Pengajuan Aspirasi</div>
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
    </>
  );
}
