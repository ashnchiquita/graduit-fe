import { UseFormReturn } from "react-hook-form";
import { AddLogBimbinganFormData } from "../constants";
import { FormField, FormItem, FormControl } from "@/components/ui/form/form";
import { Textarea } from "@/components/ui/textarea";

export function LaporanKemajuanComponent({
  form,
}: {
  form: UseFormReturn<AddLogBimbinganFormData>;
}) {
  return (
    <FormField
      control={form.control}
      name="laporan_kemajuan"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
