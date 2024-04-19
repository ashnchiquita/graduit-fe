import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { VscChromeClose } from "react-icons/vsc";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Row, Table } from "@tanstack/react-table";
import { KelasPengguna } from "../types";
import useUbahKelasDialog from "../hooks/useUbahKelasDialog";

type ComponentProps = {
  dialogTrigger: JSX.Element;
  title: string;
  penggunaId: string;
  type: "DOSEN" | "MAHASISWA";
  searchValue: string;
  table: Table<KelasPengguna>;
  initKelas: {
    nama: string;
    id: string;
  }[];
  disabled: boolean;
};

export default function UbahKelasDialog({
  dialogTrigger,
  title,
  penggunaId,
  type,
  searchValue,
  table,
  initKelas,
  disabled,
}: ComponentProps): JSX.Element {
  const { dialogOpen, setDialogOpen, form, handleSubmit, daftarKelas } =
    useUbahKelasDialog(penggunaId, type, searchValue, table, initKelas);

  return (
    <Dialog
      open={dialogOpen && !disabled}
      onOpenChange={(open: boolean) => {
        setDialogOpen(open);
        if (!open) {
          form.setValue("kelas", initKelas);
        }
      }}
    >
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent className="max-w-[330px] rounded-md md:max-w-[425px]">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-left capitalize">{title}</DialogTitle>
        </DialogHeader>

        <h2 className="mt-4 text-sm font-medium">Mata Kuliah dan Kelas</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="kelas"
              render={() => (
                <FormItem className="flex flex-col gap-1">
                  {form.getValues().kelas.length > 0 ? (
                    <ul className="flex flex-wrap gap-2 ">
                      {form.getValues().kelas.map((k, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-2 rounded-md py-1 text-xs font-medium text-primary"
                        >
                          {k.nama}
                          <button
                            type="button"
                            onClick={() => {
                              form.setValue(
                                "kelas",
                                form
                                  .getValues()
                                  .kelas.filter((v) => v.id !== k.id),
                              );
                            }}
                          >
                            <VscChromeClose />
                          </button>
                        </Badge>
                      ))}
                    </ul>
                  ) : null}

                  <Select
                    onValueChange={(val) => {
                      if (
                        !form
                          .getValues()
                          .kelas.map((v) => v.id)
                          .includes(val)
                      ) {
                        form.setValue("kelas", [
                          ...form.getValues().kelas,
                          daftarKelas.find((v) => v.id === val) as any,
                        ]);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih mata kuliah dan kelas disini" />
                    </SelectTrigger>
                    <SelectContent>
                      {daftarKelas.map((d, index) => (
                        <SelectItem value={d.id} key={index}>
                          {d.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <p className="mt-4 text-sm text-muted-foreground">
              Mengubah kelas untuk 1 {type.toLowerCase()}
            </p>

            <div className="mt-8 flex w-full justify-end gap-2">
              <Button
                className="text-slate-600 disabled:border-none"
                variant="outline"
                onClick={() => form.setValue("kelas", initKelas)}
                type="button"
              >
                Reset
              </Button>
              <Button
                className="bg-blue-500 text-gray-100 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-muted-foreground"
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
