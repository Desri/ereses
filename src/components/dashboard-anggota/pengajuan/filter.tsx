"use client";
import Image from "next/image";
import { format } from "date-fns";
import { Input } from "../../ui/input";
import { id } from "date-fns/locale/id";
import { Button } from "../../ui/button";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { getKategoriAspirasi } from "@/services/api/aspirasi";
import { useEffect, useState } from "react";
import { Dapil } from "@/types/dapil";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function FilterPengajuanComponent() {
  const [categoryAspirasi, setCategoryAspirasi] = useState<Dapil>();
  const [date, setDate] = useState<DateRange | undefined>();

  useEffect(() => {
    fetchListCategoryAspiration();
  }, []);

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    console.log("Check", selectedId);
  };

  const formatRange = () => {
    if (!date?.from && !date?.to) return "Pilih Tanggal";
    const from = date?.from
      ? format(date.from, "dd-MM-yyyy", { locale: id })
      : "";
    const to = date?.to ? format(date.to, "dd-MM-yyyy", { locale: id }) : "";
    return `${from} - ${to}`;
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
          <label htmlFor="kategory_aspirasi" className="text-sm">
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
        <div>
          <label htmlFor="tingkat_urgensi" className="text-sm">
            Tingkat Urgensi
          </label>
          <select
            name="kategori"
            className="w-full border border-solid border-[#dddddd] rounded-2xl py-2 text-sm mt-1 mb-4 px-2"
          >
            <option value="">Semua Urgensi</option>
            <option value="1">Kategori Aspirasi 1</option>
            <option value="2">Kategori Aspirasi 2</option>
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
