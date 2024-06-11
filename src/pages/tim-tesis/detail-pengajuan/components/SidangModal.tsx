import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePicker } from "@/components/ui/time-picker/time-picker";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import useSidangModal from "../hooks/useSidangModal";
import { SidangModalProps } from "../type";

export default function SidangModal({
  dateInit,
  onChange,
  modalTrigger,
  setSidangDialogOpen,
  sidangDialogOpen,
}: SidangModalProps): JSX.Element {
  const { handleChange, form, isMobile } = useSidangModal(dateInit, onChange);

  return (
    <Dialog open={sidangDialogOpen} onOpenChange={setSidangDialogOpen}>
      <DialogTrigger asChild>{modalTrigger}</DialogTrigger>

      <DialogContent className="max-w-[330px] rounded-md md:max-w-[425px]">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-left">Sidang</DialogTitle>
          <DialogDescription className="text-left">
            Jadwalkan sidang dengan calon mahasiswa bimbingan. Minimal pilih
            jadwal 1 hari dari hari ini.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleChange)}>
            <FormField
              control={form.control}
              name="jadwalSidang"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full text-left font-normal flex gap-2.5 items-center justify-start",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="size-4 opacity-50" />
                        {field.value ? (
                          dayjs(field.value).format("DD/MM/YYYY HH.mm")
                        ) : (
                          <p>Pilih waktu</p>
                        )}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent
                      sideOffset={isMobile ? -50 : 20}
                      side={isMobile ? "top" : "right"}
                    >
                      <FormControl>
                        <>
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : new Date()
                            }
                            defaultMonth={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                          <div className="border-t border-border p-3">
                            <TimePicker
                              setDate={field.onChange}
                              date={new Date(field.value)}
                            />
                          </div>
                        </>
                      </FormControl>
                    </PopoverContent>
                  </Popover>

                  <div className="flex w-full justify-end gap-2">
                    <Button
                      disabled={
                        !field.value ||
                        field.value.getTime() === dateInit?.getTime()
                      }
                      className="bg-blue-500 px-4 text-gray-100 hover:bg-blue-600"
                      type="submit"
                    >
                      Jadwalkan
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
