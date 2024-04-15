import SelectData from "@/types/select-data";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import useSWR from "swr";
import { getAllDosenPembimbing } from "../../clients";
import { RegistrationFormData } from "../../constants";

export type LecturerCardProps = {
  form: UseFormReturn<RegistrationFormData>;
};

export const useLecturerCardImpl = () => {
  const [lecturerSearchValue, setLecturerSeachValue] = useState("");

  const { data: lecturerOptions = [], isLoading } = useSWR(
    "/registrasi-tesis",
    async () => {
      const res = await getAllDosenPembimbing();

      const options: SelectData[] = res.data.map(({ id, nama }) => ({
        label: nama,
        value: id,
      }));

      return options;
    },
  );

  return {
    lecturerOptions,
    isLoading,
    lecturerSearchValue,
    setLecturerSeachValue,
  };
};
