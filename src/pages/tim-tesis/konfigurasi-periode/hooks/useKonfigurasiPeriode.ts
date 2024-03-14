import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { KonfigurasiPeriodeHookReturn } from "../types";
import { Semester } from "../constants";

export default function useKonfigurasiPeriode(): KonfigurasiPeriodeHookReturn {
  const formSchema = z
    .object({
      semester: z.enum(Semester),
      tahun: z.string().min(1),
      minimalBimbingan: z.coerce.number().min(1),
      awalPendaftaran: z.date().optional(),
      akhirPendaftaran: z.date().optional(),
      awalSempro: z.date().optional(),
      akhirSempro: z.date().optional(),
      awalSemTesis: z.date().optional(),
      akhirSemTesis: z.date().optional(),
      awalSidang: z.date().optional(),
      akhirSidang: z.date().optional(),
    })
    .refine((obj) => {
      let check = true;

      if (obj.akhirPendaftaran && obj.awalPendaftaran) {
        check = obj.akhirPendaftaran > obj.awalPendaftaran;
      }
      if (obj.akhirSempro && obj.awalSempro) {
        check = obj.akhirSempro > obj.awalSempro;
      }
      if (obj.akhirSemTesis && obj.awalSemTesis) {
        check = obj.akhirSemTesis > obj.awalSemTesis;
      }
      if (obj.akhirSidang && obj.awalSidang) {
        check = obj.akhirSidang > obj.awalSidang;
      }

      return check;
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      semester: "GANJIL",
      tahun: "",
      minimalBimbingan: 0,
      awalPendaftaran: undefined,
      akhirPendaftaran: undefined,
      awalSempro: undefined,
      akhirSempro: undefined,
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  const currYear = new Date().getFullYear();
  const years = Array.from(
    { length: 6 },
    (_, i) => `${currYear - 5 + i}/${currYear - 4 + i}`,
  );

  return { form, handleSubmit, years };
}
