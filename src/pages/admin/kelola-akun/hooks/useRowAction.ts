import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { deleteAccount } from "../../clients";
interface ReturnType {
  handleDelete: (id: string) => Promise<void>;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useRowAction(
  refetchAccounts: () => Promise<unknown>,
): ReturnType {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { trigger, error } = useSWRMutation(
    `/akun`,
    async (_, { arg }: { arg: string }) => {
      const res = await deleteAccount(arg);
      return res.data;
    },
  );

  const handleDelete = async (id: string) => {
    trigger(id);

    if (error) {
      // TODO: Add toast
      console.error(error);
    } else {
      await refetchAccounts();
      setDialogOpen(false);
    }
  };

  return { handleDelete, dialogOpen, setDialogOpen };
}
