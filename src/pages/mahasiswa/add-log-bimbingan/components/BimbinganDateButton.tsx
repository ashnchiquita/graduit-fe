import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { UseFormReturn } from "react-hook-form";
import { AddLogBimbinganFormData } from "../constants";
import { FormField, FormItem } from "@/components/ui/form";
export function BimbinganDateButton({
  form,
}: {
  form: UseFormReturn<AddLogBimbinganFormData>;
}) {
  return (
    <div className="rounded-lg border border-[#EAECF0] bg-white px-4 py-3 mt-4 hover:bg-gray-100">
      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem>
            <Popover>
              <PopoverTrigger asChild>
                <button className="w-[100%] font-normal flex text-muted-foreground gap-3">
                  <CalendarIcon className="size-5 opacity-50" />
                  <span className="capitalize text-sm">
                    {field.value ? format(field.value, "PPP") : "Pilih Tanggal"}
                  </span>
                </button>
              </PopoverTrigger>

              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={new Date(field.value)}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date("2900-01-01") ||
                    date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
    </div>
  );
}
