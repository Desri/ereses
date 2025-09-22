"use client";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale/id";
import { Button } from "../ui/button";

export default function FilterActivitasComponent() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  useEffect(() => {
    if (date?.from && date?.to) {
      const from = format(date.from, "yyyy-MM-dd");
      const to = format(date.to, "yyyy-MM-dd");
      fetchData(from, to);
    }
  }, [date]);

  const fetchData = async (fromDate: string, toDate: string) => {
    try {
      const params = {
        from: fromDate,
        to: toDate,
      };
      console.log("Check", params);
    } catch (error) {
      console.error("Gagal fetch data:", error);
    }
  };

  const formatRange = () => {
    if (!date?.from && !date?.to) return "DD-MM-YYYY - DD-MM-YYYY";
    const from = date?.from
      ? format(date.from, "dd-MM-yyyy", { locale: id })
      : "";
    const to = date?.to ? format(date.to, "dd-MM-yyyy", { locale: id }) : "";
    return `${from} - ${to}`;
  };
  return (
    <>
      <div className="flex justify-end mb-4">
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className="w-[260px] justify-between text-muted-foreground"
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
                onSelect={setDate}
                numberOfMonths={1}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
}
