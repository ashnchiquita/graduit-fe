import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import useUbahNilaiDialog from "../hooks/useUbahNilaiDialog";
import { MahasiswaKelas } from "../types";

type UbahNilaiDialogProps = {
  isOpen: boolean;
  closeDialog: () => void;
  updateData: () => Promise<any>;
  data: MahasiswaKelas[];
};

export default function UbahNilaiDialog({
  isOpen,
  closeDialog,
  updateData,
  data,
}: UbahNilaiDialogProps) {
  const { form, onSubmit } = useUbahNilaiDialog(
    isOpen,
    closeDialog,
    updateData,
    data,
  );

  return (
    <DialogContent className="w-11/12 sm:max-w-md">
      <DialogHeader className="gap-2">
        <DialogTitle>Ubah Nilai</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="nilai"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nilai</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nilai disini..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-1 text-sm text-foreground">
            <div>Kelas:</div>
            <div>
              {[...new Set(data.map(({ mataKuliah }) => mataKuliah))].join(
                ", ",
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1 text-sm text-foreground">
            {[...new Set(data.map(({ mataKuliah }) => mataKuliah))].map(
              (mk) => (
                <div key={mk} className="text-muted-foreground">
                  Mengubah nilai{" "}
                  {
                    data.filter(({ mataKuliah }) => {
                      return mataKuliah === mk;
                    }).length
                  }{" "}
                  mahasiswa pada mata kuliah {mk}
                </div>
              ),
            )}
          </div>

          <DialogFooter>
            <Button
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
              type="submit"
            >
              Ubah
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
