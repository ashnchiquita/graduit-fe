import { UseFormReturn } from "react-hook-form";
import { RegistrationSidSemFormData } from "../constants";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form/form";
import { CardTitle, CardDescription } from "@/components/Card";
// import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export function DataDiriComponent({
  form,
}: {
  form: UseFormReturn<RegistrationSidSemFormData>;
}) {
  return (
    <div className="rounded-lg bg-white px-4 py-3 flex flex-col gap-2">
      <CardTitle> Data Diri </CardTitle>
      <CardDescription> Silahkan cek kembali data diri anda! </CardDescription>
      <div>
        <CardDescription> Nama </CardDescription>
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Nama anda" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <CardDescription> NIM </CardDescription>
        <FormField
          control={form.control}
          name="nim"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="NIM anda" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <CardDescription> Program Studi </CardDescription>
        <FormField
          control={form.control}
          name="program_studi"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Program studi anda" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <CardDescription> Jalur Pilihan </CardDescription>
        <FormField
          control={form.control}
          name="jalur_pilihan"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Jalur pilihan anda (jika mahasiswa S1 isi dengan program studi)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <CardDescription> Topik </CardDescription>
        <FormField
          control={form.control}
          name="topik"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Topik anda" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <CardDescription> Dosen Pembimbing </CardDescription>
        <FormField
          control={form.control}
          name="dosen_pembimbing"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Dosen pembimbing anda" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
