import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { SubmitTugasFormData } from "../types";

export type JawabanCardProps = {
  form: UseFormReturn<SubmitTugasFormData>;
};

export const JawabanCard = ({ form }: JawabanCardProps) => {
  return (
    <Card
      HeaderElement={
        <CardHeader>
          <CardTitle>
            Jawaban <span className="text-destructive">*</span>
          </CardTitle>
          <CardDescription>Silakan unggah jawaban Anda.</CardDescription>
        </CardHeader>
      }
      ContentElement={
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="jawaban"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Tuliskan jawaban Anda di sini..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      }
    />
  );
};
