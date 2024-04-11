import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Row } from "@tanstack/react-table";
import { useUpsertDialog } from "../hooks/useUpsertDialog";
import { DaftarTopikData } from "../types";

type DeleteDialogProps = {
  row?: Row<DaftarTopikData>;
  updateData: () => Promise<any>;
  closeDialog: () => void;
};

export default function UpsertDialog({
  row,
  closeDialog,
  updateData,
}: DeleteDialogProps) {
  const { form, onSubmit, dosenOptions, isDosenListLoading } = useUpsertDialog(
    closeDialog,
    updateData,
    row,
  );

  return (
    <DialogContent>
      <DialogHeader className="gap-2">
        <DialogTitle>{row ? "Ubah" : "Tambahkan"} topik</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="idPengaju"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dosen Pengaju Topik</FormLabel>
                <FormControl>
                  <Select
                    disabled={isDosenListLoading}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih dosen pengaju topik" />
                    </SelectTrigger>
                    <SelectContent>
                      {dosenOptions.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="judul"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Judul Topik</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan judul topik disini..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deskripsi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi Topik</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Masukkan deskripsi disini..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
        <DialogFooter></DialogFooter>
      </Form>
      <DialogFooter>
        <Button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700">
          {row ? "Ubah" : "Tambahkan"} Topik
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
