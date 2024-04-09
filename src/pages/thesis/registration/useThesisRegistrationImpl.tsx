import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  thesisRegistrationFormData,
  thesisRegistrationFormSchema,
} from "./constants";

const useThesisRegistrationImpl = () => {
  const form = useForm<thesisRegistrationFormData>({
    defaultValues: {
      lecturer: "",
      stream: "",
      topic: "",
      topicDescription: "",
    },
    // TODO remove debug logs
    // resolver: zodResolver(thesisRegistrationFormSchema),
    resolver: async (data, context, options) => {
      console.log(
        "validation result",
        await zodResolver(thesisRegistrationFormSchema)(data, context, options),
      );
      return zodResolver(thesisRegistrationFormSchema)(data, context, options);
    },
  });

  const onSubmit = (values: thesisRegistrationFormData) => {
    console.log(values);
  };

  return {
    form,
    onSubmit,
  };
};

export default useThesisRegistrationImpl;
