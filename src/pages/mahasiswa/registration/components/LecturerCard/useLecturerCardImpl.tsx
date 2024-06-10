import SelectData from "@/types/select-data";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import useSWR from "swr";
import { getAllDosenPembimbing, getAllDosenPembimbingS1 } from "../../clients";
import { RegistrationFormData } from "../../constants";

export type LecturerCardProps = {
  form: UseFormReturn<RegistrationFormData>;
};

export const useLecturerCardImpl = (strata: "S1" | "S2") => {
  const [lecturerSearchValue, setLecturerSeachValue] = useState("");

  const { data: lecturerOptions = [], isLoading } = useSWR(
    "/registrasi-tesis",
    async () => {
      if (strata === "S1") {
        const res = await getAllDosenPembimbingS1();

        const options: SelectData[] = res.data.data
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
      } else if (strata === "S2") {
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
      } else {
        return [];
      }
    },
  );

  return {
    lecturerOptions,
    isLoading,
    lecturerSearchValue,
    setLecturerSeachValue,
  };
};
