import { UseFormReturn } from "react-hook-form";

type DateFormData = {
  awalPendaftaran?: Date | undefined;
  akhirPendaftaran?: Date | undefined;
  awalSempro?: Date | undefined;
  akhirSempro?: Date | undefined;
  awalSemTesis?: Date | undefined;
  akhirSemTesis?: Date | undefined;
  awalSidang?: Date | undefined;
  akhirSidang?: Date | undefined;
};

type FormData = {
  semester: "GANJIL" | "GENAP";
  tahun: string;
  minimalBimbingan: number;
} & DateFormData;

export type KonfigurasiPeriodeHookReturn = {
  form: UseFormReturn<FormData, any, undefined>;
  handleSubmit: (data: FormData) => void;
  years: string[];
};

export type RentangMasaProps = {
  form: UseFormReturn<FormData, any, undefined>;
  label: string;
  startFieldName: keyof DateFormData;
  endFieldName: keyof DateFormData;
  startPlaceholder: string;
  endPlaceholder: string;
};
