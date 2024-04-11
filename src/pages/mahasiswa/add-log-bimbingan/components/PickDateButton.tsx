import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

export function PickDateButton() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  return (
    <div className="rounded-lg border border-[#EAECF0] bg-white px-4 py-3 mt-4 hover:bg-gray-100">
      <Popover>
        <PopoverTrigger asChild>
          <button className="w-[100%] font-normal flex text-muted-foreground gap-3">
            <CalendarIcon className="size-5 opacity-50" />
            <span className="capitalize text-sm">
              {selectedDate
                ? format(selectedDate, "dd MMMM yyyy")
                : "Pilih Tanggal"}
            </span>
          </button>
        </PopoverTrigger>

        <PopoverContent>
          <Calendar
            mode="single"
            selected={selectedDate ?? undefined}
            onSelect={(date) => setSelectedDate(date)}
            disabled={(date) =>
              date > new Date("2900-01-01") || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
