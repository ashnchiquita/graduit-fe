import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RentangMasaProps } from "../types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { VscTrash } from "react-icons/vsc";

export default function RentangMasa({
  form,
  label,
  startFieldName,
  endFieldName,
  startPlaceholder,
  endPlaceholder,
}: RentangMasaProps): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-medium text-slate-500">{label}</h2>

      <div className="flex w-full flex-col gap-2 lg:flex-row lg:gap-4">
        <FormField
          control={form.control}
          name={startFieldName}
          render={({ field }) => (
            <FormItem className="flex w-full items-center justify-between gap-4 lg:justify-start">
              <FormLabel
                className="text-sm font-medium text-slate-900"
                htmlFor={startFieldName}
              >
                Tanggal
              </FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id={startFieldName}
                    style={{ marginTop: 0 }}
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span className="capitalize">{startPlaceholder}</span>
                    )}
                    <CalendarIcon className="ml-auto size-4 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date >
                        (form.getValues()[endFieldName] ??
                          new Date("2900-01-01")) ||
                      date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={endFieldName}
          render={({ field }) => (
            <FormItem className="flex w-full items-center justify-between gap-4 lg:justify-start">
              <FormLabel
                className="text-sm font-medium text-slate-900"
                htmlFor={endFieldName}
              >
                s.d.
              </FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id={endFieldName}
                    style={{ marginTop: 0 }}
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span className="capitalize">{endPlaceholder}</span>
                    )}
                    <CalendarIcon className="ml-auto size-4 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date <
                      (form.getValues()[startFieldName] ??
                        new Date("1900-01-01"))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        {/* Only show when any of the dates are inputted */}
        {(form.getValues()[startFieldName] ||
          form.getValues()[endFieldName]) && (
          <TooltipProvider>
            <Tooltip delayDuration={10}>
              <TooltipTrigger>
                <Button
                  type="button"
                  onClick={() => {
                    form.setValue(startFieldName, undefined);
                    form.setValue(endFieldName, undefined);
                  }}
                  className="aspect-square w-full rounded border border-red-500 bg-transparent p-2 hover:bg-red-500/10"
                >
                  <VscTrash size={20} className="text-red-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Hapus Rentang Masa</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}
