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
import { getAktifitas } from "@/services/api/aktifitas";
import "./style.css";
import FilterActivitasComponent from "./filter";
import { formatDateID } from "@/utils/formatDate";

interface AktivitasItem {
  date: string;
  time: string;
  description: string;
}

interface AktivitasData {
  items: AktivitasItem[];
}

export default function AktivitasComponent() {
  const [aktifitas, setAktifitas] = useState<AktivitasData | null>(null);

  useEffect(() => {
    fetchListNews();
  }, []);

  const fetchListNews = () => {
    getAktifitas()
      .then((res: any) => {
        setAktifitas(res.data);
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
              <TableHead className="w-[30%]">
                <span className="font-medium">Tanggal Aktivitas</span>
              </TableHead>
              <TableHead className="w-[30%]">
                <span className="font-medium">Jam</span>
              </TableHead>
              <TableHead className="w-[30%]">
                <span className="font-medium">Aktivitas</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {aktifitas?.items?.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="py-3.5">{idx + 1}</TableCell>
                <TableCell className="py-3.5">
                  {formatDateID(item?.date)}
                </TableCell>
                <TableCell className="py-3.5">{item.time} WIB</TableCell>
                <TableCell className="py-3.5">{item.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
