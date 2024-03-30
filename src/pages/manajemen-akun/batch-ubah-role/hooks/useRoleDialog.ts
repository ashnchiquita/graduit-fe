import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RoleDialogHookProps, RoleDialogHookRet } from "../types";
import useSWRMutation from "swr/mutation";
import { patchBatchUpdateRole } from "../../clients";
import { PatchBatchUpdateRole } from "../../types";
import { RoleEnum } from "@/types/session-data";

export default function useRoleDialog({
  table,
  fetchData,
  setDialogOpen,
}: RoleDialogHookProps): RoleDialogHookRet {
  const formSchema = z.object({
    access: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .array(),
  });

  const roleAccess = Object.keys(RoleEnum)
    .filter((v) => isNaN(Number(v)))
    .map((role, idx) => ({
      id: idx,
      name: role,
    }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      access: [],
    },
  });

  const [isSubmitDisabled, setSubmitDisabled] = useState(
    form.getValues().access.length === 0,
  );

  const { trigger, error } = useSWRMutation(
    "/akun/roles-batch",
    async (_, { arg }: { arg: PatchBatchUpdateRole }) => {
      const res = await patchBatchUpdateRole(arg);
      return res.data;
    },
  );

  const handleSubmit = async ({ access }: z.infer<typeof formSchema>) => {
    await trigger({
      ids: table.getSelectedRowModel().rows.map((r) => r.original.id),
      newRoles: access.map((a) => a.name),
    });

    if (error) {
      // TODO: Add toast
      console.error(error);
    } else {
      await fetchData();
      form.reset();
      table.toggleAllRowsSelected(false);
      setDialogOpen(false);
    }
  };

  return {
    form,
    handleSubmit,
    isSubmitDisabled,
    setSubmitDisabled,
    roleAccess,
  };
}
