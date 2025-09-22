"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import FilterPengajuanComponent from "./filter";
import { getVerifiedAspirasi } from "@/services/api/aspirasi";
import { Aspirasi, AspirasiDetail } from "@/types/aspirasi";
import { formatDateID } from "@/utils/formatDate";
import "./style.css";

export default function PengajuanDiverifikasiComponent() {
  const [aspirasi, setAspirasi] = useState<Aspirasi | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVerifiedAspirasi();
  }, []);

  const fetchVerifiedAspirasi = async () => {
    try {
      setLoading(true);
      const response = await getVerifiedAspirasi();
      setAspirasi(response?.data);
    } catch (error) {
      console.error("Error fetching verified aspirasi:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="font-bold mb-3.5">Pengajuan Diverifikasi</div>
      <FilterPengajuanComponent />
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
              <span className="font-medium">Tanggal Pengajuan</span>
            </TableHead>
            <TableHead>
              <span className="font-medium">Kategori Aspirasi</span>
            </TableHead>
            <TableHead>
              <span className="font-medium">Status</span>
            </TableHead>
            <TableHead>
              <span className="font-medium">Tingkat Urgensi</span>
            </TableHead>
            <TableHead>
              <span className="font-medium">Aksi</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : aspirasi?.items?.length ? (
            aspirasi.items.map((item: AspirasiDetail, index: number) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.proposal}</TableCell>
                <TableCell>{formatDateID(item.createdAt)}</TableCell>
                <TableCell>
                  {item.categoryAspiration?.name || item.category}
                </TableCell>
                <TableCell>
                  <span className="text-[#6aaa6d]">Diverifikasi</span>
                </TableCell>
                <TableCell>
                  <span>{item.levelUrgency}</span>
                </TableCell>
                <TableCell>
                  <Link href={`/dashboard/pengajuan/detail/${item.id}`}>
                    <Image
                      src="/assets/dots.png"
                      className="!relative !mx-auto cursor-pointer !w-[5px] !h-[16px]"
                      fill
                      priority
                      alt="Actions"
                    />
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
