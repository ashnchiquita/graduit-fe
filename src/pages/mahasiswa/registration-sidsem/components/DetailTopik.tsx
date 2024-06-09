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
import { Textarea } from "@/components/ui/textarea";

export function DetailTopikComponent({
  form,
}: {
  form: UseFormReturn<RegistrationSidSemFormData>;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-white p-4">
      <CardTitle className="text-lg"> Detail Proposal </CardTitle>
      <CardDescription className="mb-4">
        {" "}
        Silahkan isi terkait detail proposal Anda.{" "}
      </CardDescription>
      <div>
        <CardDescription className="mb-2"> Judul Proposal </CardDescription>
        <FormField
          control={form.control}
          name="judul_proposal"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Isi judul proposal disini..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <CardDescription className="my-2"> Deskripsi </CardDescription>
        <FormField
          control={form.control}
          name="deskripsi"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Silahkan isi deksripsi proposal Anda disini..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
