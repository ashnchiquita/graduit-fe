import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { deleteAccount } from "../../clients";
import useCustomToast, { ToastParams } from "@/hooks/useCustomToast";
interface ReturnType {
  handleDelete: (id: string) => Promise<void>;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useRowAction(
  refetchAccounts: () => Promise<unknown>,
): ReturnType {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { trigger } = useSWRMutation(
    `/akun`,
    async (_, { arg }: { arg: string }) => {
      const res = await deleteAccount(arg);
      return res.data;
    },
  );

  const { makeToast } = useCustomToast();
  const handleDelete = async (id: string) => {
    const toastParams: ToastParams = {
      loadingText: "Menghapus akun...",
      successText: "Berhasil menghapus akun",
      errorText: "Gagal menghapus akun",
      action: () => trigger(id),
      afterError: (err) => {
        console.error(err);
      },
      afterSuccess: async () => {
        await refetchAccounts();
        setDialogOpen(false);
      },
    };

    await makeToast(toastParams);
  };

  return { handleDelete, dialogOpen, setDialogOpen };
}
