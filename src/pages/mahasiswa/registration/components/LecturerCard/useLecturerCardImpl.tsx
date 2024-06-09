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

      const options: SelectData[] = res.data
        .filter(({ nama, email }) => {
          if (nama !== null) return true;
          if (email === null) return false;
          const emailPrefix = email.split("@")[0];
          return emailPrefix !== "";
        })
        .map(({ id, nama, email }) => {
          const label = nama !== null ? nama : email.split("@")[0];
          return {
            label,
            value: id,
          };
        });

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
