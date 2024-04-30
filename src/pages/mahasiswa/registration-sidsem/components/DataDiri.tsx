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
import { Placeholders } from "../types";

export function DataDiriComponent({
  form,
  data,
  strata,
}: {
  form: UseFormReturn<RegistrationSidSemFormData>;
  data: Placeholders;
  strata: string;
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
                <Input placeholder={data.name} {...field} disabled />
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
                <Input placeholder={data.nim} {...field} disabled />
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
                <Input placeholder={data.program_studi} {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {strata === "S2" && (
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
      )}
      <div>
        <CardDescription> Topik </CardDescription>
        <FormField
          control={form.control}
          name="topik"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={data.topik} {...field} disabled />
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
                <Input placeholder={data.dosbing} {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
