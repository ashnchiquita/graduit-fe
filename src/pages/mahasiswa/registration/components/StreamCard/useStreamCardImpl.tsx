import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { RegistrationFormData } from "../../constants";

export type StreamCardProps = {
  form: UseFormReturn<RegistrationFormData>;
};

export const useStreamCardImpl = () => {
  const [streamSearchValue, setStreamSeachValue] = useState("");

  return {
    streamSearchValue,
    setStreamSeachValue,
  };
};
