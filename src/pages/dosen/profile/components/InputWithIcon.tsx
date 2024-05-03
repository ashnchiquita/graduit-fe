import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { SimpanKontakFormData } from "../constants";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export default function InputWithIcon({
  form,
  src,
  title,
  readOnly,
  value,
  name,
  isForm,
}: {
  form: UseFormReturn<SimpanKontakFormData>;
  src: string;
  title: string;
  readOnly: boolean;
  value?: string | undefined;
  name?: "whatsapp" | "msteams" | "email" | "telp";
  isForm: boolean;
}) {
  const formName =
    name === "whatsapp"
      ? "whatsapp"
      : name === "msteams"
        ? "msteams"
        : name === "email"
          ? "email"
          : "telp";

  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <div className="flex gap-7 mt-2 w-[15%]">
        <img src={src} alt="" className="w-7 h-7" />
        <span className="text-slate-500 font-medium">{title}</span>
      </div>
      {isForm ? (
        <FormField
          control={form.control}
          name={formName}
          render={({ field }) => (
            <FormItem className="ml-auto w-[100%] md:w-[85%]">
              <FormControl>
                <Input {...field} disabled={readOnly} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : (
        <Input
          placeholder={value || ""}
          disabled={readOnly}
          className="ml-auto w-[100%] md:w-[85%]"
        />
      )}
    </div>
  );
}
