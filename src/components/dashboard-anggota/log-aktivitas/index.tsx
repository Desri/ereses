"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import FilterPengajuanAspirasiComponent from "./filter";
import { Aktivitas } from "@/types/aktivitas";
import { formatDate } from "date-fns";
import { getAktifitas } from "@/services/api/aktifitas";
import "./style.css";

export default function LogAktivitasComponent() {
  const [aktivitas, setAktivitas] = useState<Aktivitas>();

  useEffect(() => {
    fetchListNotifikasiNotRead();
  }, []);

  const fetchListNotifikasiNotRead = () => {
    getAktifitas()
      .then((res: any) => {
        setAktivitas(res.data);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };
  return (
    <>
      <div className="font-bold mb-3.5">Log Aktivitas</div>
      <FilterPengajuanAspirasiComponent />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <span className="font-medium">No</span>
            </TableHead>
            <TableHead>
              <span className="font-medium">Tanggal Aktivitas</span>
            </TableHead>
            <TableHead>
              <span className="font-medium">Jam</span>
            </TableHead>
            <TableHead>
              <span className="font-medium">Aktivitas</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {aktivitas?.items && aktivitas.items.length > 0 ? (
            aktivitas.items.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="py-3">{idx + 1}</TableCell>
                <TableCell className="text-left py-3">
                  {formatDate(item.date ?? "", "dd MMMM yyyy")}
                </TableCell>
                <TableCell className="text-left py-3">{item.time}</TableCell>
                <TableCell className="py-3">{item.description}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center pt-5">
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
