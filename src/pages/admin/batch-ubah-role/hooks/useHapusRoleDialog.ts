import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HapusRoleDialogHookProps, HapusRoleDialogHookRet } from "../types";
import useSWRMutation from "swr/mutation";
import { removeBatchUpdateRole } from "../../clients";
import { RemoveBatchUpdateRole } from "../../types";
import { toast } from "react-toastify";

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

  const { trigger, error } = useSWRMutation(
    "/akun/roles/batch-remove",
    async (_, { arg }: { arg: RemoveBatchUpdateRole }) => {
      const res = await removeBatchUpdateRole(arg);
      return res.data;
    },
  );

  const handleSubmit = async () => {
    await trigger({
      ids: table.getSelectedRowModel().rows.map((r) => r.original.id),
    });

    if (error) {
      console.error(error);
      toast.error("Gagal mengubah role");
    } else {
      toast.success("Berhasil mengubah role");
      await fetchData();
      form.reset();
      table.toggleAllRowsSelected(false);
      setHapusRoleDialogOpen(false);
    }
  };

  return {
    form,
    handleSubmit,
  };
}
