import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAssignKelasDialog from "../hooks/useAssignKelasDialog";
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
import { Table } from "@tanstack/react-table";
import { KelasPengguna } from "../types";

type ComponentProps = {
  dialogTrigger: JSX.Element;
  title: string;
  penggunaIds: string[];
  type: "DOSEN" | "MAHASISWA";
  searchValue: string;
  table: Table<KelasPengguna>;
};

export default function AssignKelasDialog({
  dialogTrigger,
  title,
  penggunaIds,
  type,
  searchValue,
  table,
}: ComponentProps): JSX.Element {
  const {
    dialogOpen,
    setDialogOpen,
    form,
    handleSubmit,
    setSubmitDisabled,
    daftarKelas,
    isSubmitDisabled,
  } = useAssignKelasDialog(penggunaIds, type, searchValue, table);

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open: boolean) => {
        setDialogOpen(open);
        if (!open) {
          form.reset();
          setSubmitDisabled(true);
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
                            onClick={() => {
                              form.setValue(
                                "kelas",
                                form
                                  .getValues()
                                  .kelas.filter((v) => v.id !== k.id),
                              );
                              setSubmitDisabled(
                                form.getValues().kelas.length === 0,
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
                        setSubmitDisabled(form.getValues().kelas.length === 0);
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
              Mengassign kelas untuk {penggunaIds.length} {type.toLowerCase()}
            </p>

            <div className="mt-8 flex w-full justify-end gap-2">
              <Button
                className="text-slate-600 disabled:border-none"
                disabled={isSubmitDisabled}
                variant="outline"
                onClick={() => {
                  form.reset();
                  setSubmitDisabled(true);
                }}
              >
                Clear
              </Button>
              <Button
                disabled={isSubmitDisabled}
                className="bg-blue-500 text-gray-100 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-muted-foreground"
                type="submit"
              >
                Masukkan
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
