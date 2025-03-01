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
} from "@/components/ui/form/form";
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
  strata?: "S1" | "S2";
};

export default function UpsertDialog({
  row,
  closeDialog,
  updateData,
  strata,
}: DeleteDialogProps) {
  const { form, onSubmit, dosenOptions, isDosenListLoading, showDropdown } =
    useUpsertDialog(closeDialog, updateData, row, strata);

  return (
    <DialogContent className="w-11/12 sm:max-w-md">
      <DialogHeader className="gap-2">
        <DialogTitle>{row ? "Ubah" : "Tambahkan"} topik</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
        >
          {showDropdown && (
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
          )}
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
          <DialogFooter>
            <Button
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
              type="submit"
            >
              {row ? "Ubah" : "Tambahkan"} Topik
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
