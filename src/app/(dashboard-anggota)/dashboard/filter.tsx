"use client";
import Image from "next/image";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { id } from "date-fns/locale/id";
import { getDapil } from "@/services/api/dapil";
import { Dapil } from "@/types/dapil";
import { getKategoriAspirasi } from "@/services/api/aspirasi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FilterPengajuanAspirasiComponent({
  onSelectCategory,
  onSelectDapil,
  onSelectDateRange,
}: {
  onSelectCategory: (id: string) => void;
  onSelectDapil: (id: string) => void;
  onSelectDateRange?: (startDate: string, endDate: string) => void;
}) {
  const [listDapil, setListDapil] = useState<Dapil>();
  const [categoryAspirasi, setCategoryAspirasi] = useState<Dapil>();
  const [date, setDate] = useState<DateRange | undefined>();

  useEffect(() => {
    fetchListDapil();
    fetchListCategoryAspiration();
  }, []);

  useEffect(() => {
    console.log("Date changed:", date);
    if (date?.from && date?.to && onSelectDateRange) {
      const startDate = format(date.from, "yyyy-MM-dd");
      const endDate = format(date.to, "yyyy-MM-dd");
      console.log("Calling onSelectDateRange with:", { startDate, endDate });
      onSelectDateRange(startDate, endDate);
    } else {
      console.log("Date range not complete or onSelectDateRange not provided");
    }
  }, [date]); // Removed onSelectDateRange from dependency

  const fetchData = async (fromDate: string, toDate: string) => {
    try {
      const params = {
        from: fromDate,
        to: toDate,
      };
    } catch (error) {
      console.error("Gagal fetch data:", error);
    }
  };

  const fetchListDapil = () => {
    getDapil()
      .then((res: any) => {
        setListDapil(res.data);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };

  const fetchListCategoryAspiration = () => {
    getKategoriAspirasi()
      .then((res: any) => {
        setCategoryAspirasi(res.data);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
      });
  };

  const formatRange = () => {
    if (!date?.from && !date?.to) return "Pilih Tanggal";
    const from = date?.from
      ? format(date.from, "dd-MM-yyyy", { locale: id })
      : "";
    const to = date?.to ? format(date.to, "dd-MM-yyyy", { locale: id }) : "";
    return `${from} - ${to}`;
  };

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    onSelectCategory(selectedId);
  };

  const handleSelectDapil = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    onSelectDapil(selectedId);
  };

  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    console.log("Date selected:", selectedDate);
    setDate(selectedDate);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-x-6 mb-1">
        <div>
          <p className="text-sm mb-1.5">Tanggal</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className="w-full justify-between text-muted-foreground rounded-full"
              >
                <span>{formatRange()}</span>
                <CalendarIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={handleDateSelect}
                numberOfMonths={1}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <label htmlFor="dapil" className="text-sm">
            Dapil
          </label>
          <select
            name="dapil"
            className="w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 mb-4 px-2"
            onChange={handleSelectDapil}
          >
            <option value="">Semua</option>
            {listDapil?.items?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="kategory-aspirasi" className="text-sm">
            Kategori Aspirasi
          </label>
          <select
            name="kategori"
            className="w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 mb-4 px-2"
            onChange={handleSelectCategory}
          >
            <option value="">Semua Kategori</option>
            {categoryAspirasi?.items?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-x-3 mb-8">
        <div className="w-11/12">
          <Input
            type="text"
            placeholder="Cari..."
            className="bg-white rounded-2xl py-2 mt-1"
          />
        </div>
        <div>
          <Button
            variant="default"
            type="submit"
            className="!bg-[#d39c55] mt-1 w-max px-5 text-sm rounded-3xl text-white"
          >
            <Image
              src="/assets/printer.png"
              className="!relative !w-full !h-[18px]"
              fill
              priority
              alt="Printer"
            />
            Print
          </Button>
        </div>
      </div>
    </>
  );
}
