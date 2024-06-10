import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HapusRoleDialogHookProps, HapusRoleDialogHookRet } from "../types";
import useSWRMutation from "swr/mutation";
import { removeBatchUpdateRole } from "../../clients";
import { RemoveBatchUpdateRole } from "../../types";
import useCustomToast, { ToastParams } from "@/hooks/useCustomToast";

export default function useHapusRoleDialog({
  table,
  fetchData,
  setHapusRoleDialogOpen,
}: HapusRoleDialogHookProps): HapusRoleDialogHookRet {
  const formSchema = z.object({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { trigger } = useSWRMutation(
    "/akun/roles/batch-remove",
    async (_, { arg }: { arg: RemoveBatchUpdateRole }) => {
      const res = await removeBatchUpdateRole(arg);
      return res.data;
    },
  );

  const { makeToast } = useCustomToast();

  const handleSubmit = async () => {
    const toastParams: ToastParams = {
      loadingText: "Mengubah role...",
      successText: "Berhasil mengubah role",
      errorText: "Gagal mengubah role",
      action: () =>
        trigger({
          ids: table.getSelectedRowModel().rows.map((r) => r.original.id),
        }),
      beforeError: (err) => {
        console.error(err);
      },
      afterSuccess: async () => {
        await fetchData();
        form.reset();
        table.toggleAllRowsSelected(false);
        setHapusRoleDialogOpen(false);
      },
    };

    await makeToast(toastParams);
  };

  return {
    form,
    handleSubmit,
  };
}
