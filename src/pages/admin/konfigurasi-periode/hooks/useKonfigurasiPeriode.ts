import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { KonfigurasiPeriodeHookReturn, PutKonfigurasiRequest } from "../types";
import { Semester } from "../constants";
import useSWR from "swr";
import { getKonfigurasi, putKonfigurasi } from "../clients";
import { useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";

export default function useKonfigurasiPeriode(): KonfigurasiPeriodeHookReturn {
  const { data } = useSWR("/konfigurasi", async () => {
    const res = await getKonfigurasi();
    return new Map(res.data.data.map((d) => [d.key, d.value]));
  });

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
      awalSemTesis: undefined,
      akhirSemTesis: undefined,
      awalSidang: undefined,
      akhirSidang: undefined,
    },
  });

  useEffect(() => {
    form.setValue("semester", data?.get("PERIODE")?.split("-")[0] as any);
    form.setValue("tahun", data?.get("PERIODE")?.split("-")[1] as any);
    form.setValue("minimalBimbingan", +(data?.get("MINIMAL_BIMBINGAN") || 0));
    form.setValue(
      "awalPendaftaran",
      data?.get("AWAL_PENDAFTARAN")
        ? new Date(data?.get("AWAL_PENDAFTARAN") as string)
        : undefined,
    );
    form.setValue(
      "akhirPendaftaran",
      data?.get("AKHIR_PENDAFTARAN")
        ? new Date(data?.get("AKHIR_PENDAFTARAN") as string)
        : undefined,
    );
    form.setValue(
      "awalSempro",
      data?.get("AWAL_SEMPRO")
        ? new Date(data?.get("AWAL_SEMPRO") as string)
        : undefined,
    );
    form.setValue(
      "akhirSempro",
      data?.get("AKHIR_SEMPRO")
        ? new Date(data?.get("AKHIR_SEMPRO") as string)
        : undefined,
    );
    form.setValue(
      "awalSemTesis",
      data?.get("AWAL_SEM_TESIS")
        ? new Date(data?.get("AWAL_SEM_TESIS") as string)
        : undefined,
    );
    form.setValue(
      "akhirSemTesis",
      data?.get("AKHIR_SEM_TESIS")
        ? new Date(data?.get("AKHIR_SEM_TESIS") as string)
        : undefined,
    );
    form.setValue(
      "awalSidang",
      data?.get("AWAL_SIDANG")
        ? new Date(data?.get("AWAL_SIDANG") as string)
        : undefined,
    );
    form.setValue(
      "akhirSidang",
      data?.get("AKHIR_SIDANG")
        ? new Date(data?.get("AKHIR_SIDANG") as string)
        : undefined,
    );
  }, [data, form]);

  const { trigger, error } = useSWRMutation(
    "/konfigurasi",
    async (_, { arg }: { arg: PutKonfigurasiRequest }) => {
      const res = await putKonfigurasi(arg);
      return res.data;
    },
  );

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const payload: PutKonfigurasiRequest = {
      data: [
        {
          key: "PERIODE",
          value: `${data.semester}-${data.tahun}`,
        },
        {
          key: "MINIMAL_BIMBINGAN",
          value: data.minimalBimbingan.toString(),
        },
        {
          key: "AWAL_PENDAFTARAN",
          value: data.awalPendaftaran?.toISOString() || "",
        },
        {
          key: "AKHIR_PENDAFTARAN",
          value: data.akhirPendaftaran?.toISOString() || "",
        },
        {
          key: "AWAL_SEMPRO",
          value: data.awalSempro?.toISOString() || "",
        },
        {
          key: "AKHIR_SEMPRO",
          value: data.akhirSempro?.toISOString() || "",
        },
        {
          key: "AWAL_SEM_TESIS",
          value: data.awalSemTesis?.toISOString() || "",
        },
        {
          key: "AKHIR_SEM_TESIS",
          value: data.akhirSemTesis?.toISOString() || "",
        },
        {
          key: "AWAL_SIDANG",
          value: data.awalSidang?.toISOString() || "",
        },
        {
          key: "AKHIR_SIDANG",
          value: data.akhirSidang?.toISOString() || "",
        },
      ],
    };

    await trigger(payload);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Konfigurasi periode berhasil disimpan");
    }
  };

  const currYear = new Date().getFullYear();
  const years = Array.from(
    { length: 6 },
    (_, i) => `${currYear - 5 + i}/${currYear - 4 + i}`,
  );

  return { form, handleSubmit, years };
}
