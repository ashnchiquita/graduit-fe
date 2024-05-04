import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { getKonfigurasi, putKonfigurasi } from "../clients";
import { KonfigurasiPeriodeHookReturn, PutKonfigurasiRequest } from "../types";

export default function useKonfigurasiPeriode(): KonfigurasiPeriodeHookReturn {
  const { data } = useSWR("/konfigurasi", async () => {
    const res = await getKonfigurasi();
    return new Map(res.data.data.map((d) => [d.key, d.value]));
  });

  const formSchema = z
    .object({
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

  return { form, handleSubmit };
}
