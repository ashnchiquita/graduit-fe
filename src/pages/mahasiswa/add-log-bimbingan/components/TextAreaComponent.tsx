import { UseFormReturn } from "react-hook-form";
import { AddLogBimbinganFormData } from "../constants";
import { FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
export function TextAreaComponent({
  form,
}: {
  form: UseFormReturn<AddLogBimbinganFormData>;
}) {
  return (
    <FormField
      control={form.control}
      name="laporan_kemajuan"
      render={() => (
        <FormItem>
          <Textarea />
        </FormItem>
      )}
    />
  );
}
