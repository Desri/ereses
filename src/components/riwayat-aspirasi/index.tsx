"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { getAspirasiHistory } from "@/services/api/aspirasi";
import "./style.css";
import FilterActivitasComponent from "./filter";
import { formatDateID, formatTanggalIndo } from "@/utils/formatDate";

interface AktivitasItem {
  date: string;
  time: string;
  description: string;
  user: any;
  proposal: string;
  status: string;
  createdAt: any;
  categoryAspiration: any;
  dapil: any;
}

interface AktivitasData {
  items: AktivitasItem[];
}

export default function RiwayatAspirasiComponent() {
  const [aspirasiHistory, setAspirasiHistory] = useState<AktivitasData | null>(
    null
  );

  useEffect(() => {
    fetchListHistoryAspirasi();
  }, []);

  const fetchListHistoryAspirasi = () => {
    getAspirasiHistory()
      .then((res: any) => {
        setAspirasiHistory(res.data);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };
  return (
    <>
      <div className="h-[250px] bg-center bg-no-repeat bg-cover bg-[url('/assets/bg-banner.png')]">
        <div className="text-center text-white pt-24 uppercase">
          <h2 className="text-2xl">Log Aktivitas</h2>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto mt-16 mb-12 px-4 sm:px-0">
        <FilterActivitasComponent />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <span className="font-medium">No</span>
              </TableHead>
              <TableHead className="w-[20%]">
                <span className="font-medium">Nama Masyarakat</span>
              </TableHead>
              <TableHead className="w-[20%]">
                <span className="font-medium">Judul Pengajuan</span>
              </TableHead>
              <TableHead className="w-[20%]">
                <span className="font-medium">Tanggal Pengajuan</span>
              </TableHead>
              <TableHead className="w-[20%]">
                <span className="font-medium">Kategori Usulan</span>
              </TableHead>
              <TableHead className="w-[20%]">
                <span className="font-medium">Dapil</span>
              </TableHead>
              <TableHead className="w-[30%]">
                <span className="font-medium">Partai</span>
              </TableHead>
              <TableHead className="w-[30%]">
                <span className="font-medium">Logo Fraksi</span>
              </TableHead>
              <TableHead className="w-[30%]">
                <span className="font-medium">Wakil Rakyat</span>
              </TableHead>
              <TableHead className="w-[30%]">
                <span className="font-medium">Status</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {aspirasiHistory?.items?.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="py-3.5">{idx + 1}</TableCell>
                <TableCell className="py-3.5">{item.user.name}</TableCell>
                <TableCell className="py-3.5">{item.proposal}</TableCell>
                <TableCell className="py-3.5">
                  {formatTanggalIndo(item.createdAt)}
                </TableCell>
                <TableCell className="py-3.5">
                  {item.categoryAspiration.name}
                </TableCell>
                <TableCell className="py-3.5">{item.dapil.name}</TableCell>
                <TableCell className="py-3.5">-</TableCell>
                <TableCell className="py-3.5">-</TableCell>
                <TableCell className="py-3.5">-</TableCell>
                <TableCell className="py-3.5">
                  {item.status === "Pending"
                    ? "Menunggu Verifikasi"
                    : "Verifikasi"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
