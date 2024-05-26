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

import { DosbingModalProps } from "../type";
import { FormField, FormItem, Form } from "@/components/ui/form/form";
import { Badge } from "@/components/ui/badge";
import { VscChromeClose } from "react-icons/vsc";
import useDospengModal from "../hooks/useDospengModal";

export default function DospengModal({
  dosenPenguji,
  modalTrigger,
  listDosenPenguji,
}: DosbingModalProps): JSX.Element {
  const { dialogOpen, setDialogOpen, form } = useDospengModal(dosenPenguji);

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
          <form onSubmit={form.handleSubmit(() => {})}>
            <FormField
              control={form.control}
              name="dosbings"
              render={() => (
                <FormItem>
                  {form.getValues().dosbings.length > 0 ? (
                    <ul className="flex flex-wrap gap-2 ">
                      {form.getValues().dosbings.map((val, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-2 rounded-md py-1 text-xs font-medium text-primary"
                        >
                          {val.nama}
                          <button
                            onClick={() => {
                              form.setValue(
                                "dosbings",
                                form
                                  .getValues()
                                  .dosbings.filter((v) => v.id !== val.id),
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
                          .dosbings.map((v) => v.id.toString())
                          .includes(val)
                      ) {
                        form.setValue("dosbings", [
                          ...form.getValues().dosbings,
                          listDosenPenguji!.find(
                            (v) => v.id.toString() === val,
                          ) as any,
                        ]);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Role" />
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
