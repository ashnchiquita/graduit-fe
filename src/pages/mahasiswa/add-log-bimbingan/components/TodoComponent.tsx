import { UseFormReturn } from "react-hook-form";
import { AddLogBimbinganFormData } from "../constants";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form/form";
import { Textarea } from "@/components/ui/textarea";
export function TodoComponent({
  form,
}: {
  form: UseFormReturn<AddLogBimbinganFormData>;
}) {
  return (
    <FormField
      control={form.control}
      name="todo"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
