import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RoleDialogHookProps, RoleDialogHookRet } from "../types";

export default function useRoleDialog({
  table,
}: RoleDialogHookProps): RoleDialogHookRet {
  const formSchema = z.object({
    access: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .array(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      access: [],
    },
  });

  const [isSubmitDisabled, setSubmitDisabled] = useState(
    form.getValues().access.length === 0,
  );

  const handleSubmit = async ({ access }: z.infer<typeof formSchema>) => {
    console.log(
      "val",
      access.map((a) => a.name),
    );
    console.log(
      "id",
      table.getSelectedRowModel().rows.map((r) => r.original.id),
    );
  };

  return {
    form,
    handleSubmit,
    isSubmitDisabled,
    setSubmitDisabled,
  };
}
