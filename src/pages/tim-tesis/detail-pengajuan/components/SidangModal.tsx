import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import { Calendar } from "@/components/ui/calendar";
  import { TimePicker } from "@/components/ui/time-picker/time-picker";
  import { Button } from "@/components/ui/button";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { CalendarIcon } from "lucide-react";
  import { cn } from "@/lib/utils";
    import useSidangModal from "../hooks/useSidangModal";
  import { SidangModalProps } from "../type";
  import {
    FormControl,
    FormField,
    FormItem,
    Form,
  } from "@/components/ui/form/form";
  import dayjs from "dayjs";
  
  export default function SidangModal({
    dateInit,
    onChange,
    modalTrigger,
  }: SidangModalProps): JSX.Element {
    const { dialogOpen, setDialogOpen, handleChange, form, isMobile } =
    useSidangModal(dateInit, onChange);
  
    return (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>{modalTrigger}</DialogTrigger>
  
        <DialogContent className="max-w-[330px] rounded-md md:max-w-[425px]">
          <DialogHeader className="gap-2">
            <DialogTitle className="text-left">Wawancara</DialogTitle>
            <DialogDescription className="text-left">
              Jadwalkan wawancara dengan calon mahasiswa bimbingan.
            </DialogDescription>
          </DialogHeader>
  
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleChange)}>
              <FormField
                control={form.control}
                name="jadwalWawan"
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
                            // format(field.value, "PPP")
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
                              selected={field.value}
                              defaultMonth={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                            <div className="border-t border-border p-3">
                              <TimePicker
                                setDate={field.onChange}
                                date={field.value}
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
  