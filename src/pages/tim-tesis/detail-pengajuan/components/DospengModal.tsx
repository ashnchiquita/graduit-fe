import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { Form, FormField, FormItem } from "@/components/ui/form/form";
import { VscChromeClose } from "react-icons/vsc";
import useDospengModal from "../hooks/useDospengModal";
import { Dospeng, DospengModalProps } from "../type";

export default function DospengModal({
  dosenPenguji,
  modalTrigger,
  listDosenPenguji,
  onChange,
}: DospengModalProps): JSX.Element {
  dosenPenguji = dosenPenguji ?? [];
  const { dialogOpen, setDialogOpen, form, handleChange } = useDospengModal(
    dosenPenguji,
    onChange,
  );
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{modalTrigger}</DialogTrigger>

      <DialogContent className="max-w-[330px] rounded-md md:max-w-[425px]">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-left">
            Tambah/Ubah Dosen Penguji
          </DialogTitle>
          <DialogDescription className="text-left">
            Anda akan mengubah dosen penguji pada pengajuan ini.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleChange)}>
            <FormField
              control={form.control}
              name="dospeng"
              render={() => (
                <FormItem>
                  {form.getValues().dospeng.length > 0 ? (
                    <ul className="flex flex-wrap gap-2 ">
                      {form.getValues().dospeng.map((val, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-2 rounded-md py-1 text-xs font-medium text-primary"
                        >
                          {val.nama}
                          <button
                            type="button"
                            onClick={() => {
                              form.setValue(
                                "dospeng",
                                form
                                  .getValues()
                                  .dospeng.filter((v) => v.id !== val.id),
                              );
                            }}
                          >
                            <VscChromeClose />
                          </button>
                        </Badge>
                      ))}
                    </ul>
                  ) : (
                    ""
                  )}

                  <Select
                    onValueChange={(val) => {
                      if (
                        !form
                          .getValues()
                          .dospeng.map((v) => v.id)
                          .includes(val)
                      ) {
                        listDosenPenguji
                          ? form.setValue("dospeng", [
                              ...form.getValues().dospeng,
                              listDosenPenguji.find(
                                (v) => v.id === val,
                              ) as Dospeng,
                            ])
                          : form.setValue("dospeng", [
                              ...form.getValues().dospeng,
                            ]);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Dosen" />
                    </SelectTrigger>
                    <SelectContent>
                      {listDosenPenguji!.map((val, index) => (
                        <SelectItem value={val.id.toString()} key={index}>
                          {val.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <div className="mt-8 flex w-full justify-end gap-2">
              <Button
                className="bg-blue-500 text-gray-100 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-primary-foreground"
                type="submit"
              >
                Ubah
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
