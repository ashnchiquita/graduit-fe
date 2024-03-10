import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { thesisRegistrationFormData } from "../../constants";

export type StreamCardProps = {
  form: UseFormReturn<thesisRegistrationFormData>;
};

export const useStreamCardImpl = () => {
  const [streamSearchValue, setStreamSeachValue] = useState("");

  return {
    streamSearchValue,
    setStreamSeachValue,
  };
};
