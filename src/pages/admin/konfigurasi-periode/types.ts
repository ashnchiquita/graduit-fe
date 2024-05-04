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

type FormData = DateFormData;

export type KonfigurasiPeriodeHookReturn = {
  form: UseFormReturn<FormData, any, undefined>;
  handleSubmit: (data: FormData) => void;
};

export type RentangMasaProps = {
  form: UseFormReturn<FormData, any, undefined>;
  label: string;
  startFieldName: keyof DateFormData;
  endFieldName: keyof DateFormData;
  startPlaceholder: string;
  endPlaceholder: string;
};

export type GetKonfigurasiResponse = {
  data: {
    key: string;
    value: string;
  }[];
};

export type PutKonfigurasiRequest = {
  data: {
    key: string;
    value: string;
  }[];
};
