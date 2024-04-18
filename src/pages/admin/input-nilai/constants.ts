import { z } from "zod";

export const UbahNilaiFormSchema = z.object({
  nilai: z
    .string({ required_error: "Nilai harus diisi" })
    .transform((nilai) => parseInt(nilai))
    .pipe(
      z
        .number({ invalid_type_error: "Nilai harus diisi angka" })
        .min(0, "Nilai harus diantara 0 dan 100")
        .max(100, "Nilai harus diantara 0 dan 100"),
    )
    .transform((nilai) => nilai.toString()),
});

export type UbahNilaiFormData = z.infer<typeof UbahNilaiFormSchema>;
