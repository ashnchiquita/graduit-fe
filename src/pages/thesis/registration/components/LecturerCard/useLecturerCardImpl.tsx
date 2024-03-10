import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { thesisRegistrationFormData } from "../../constants";

export type LecturerCardProps = {
  form: UseFormReturn<thesisRegistrationFormData>;
};

export const useLecturerCardImpl = () => {
  const [lecturerSearchValue, setLecturerSeachValue] = useState("");

  return {
    lecturerSearchValue,
    setLecturerSeachValue,
  };
};
