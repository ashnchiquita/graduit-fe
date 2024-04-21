import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import { deleteTopic } from "../clients";

export default function useDeleteDialog(
  updateData: () => Promise<any>,
  closeDialog: () => void,
) {
  const { trigger } = useSWRMutation(
    "/alokasi-topik",
    async (_, { arg }: { arg: string }) => {
      await deleteTopic(arg);
    },
  );

  const handleDelete = async (id: string) => {
    await trigger(id);
    updateData();
    closeDialog();
    toast.success("Berhasil menghapus topik!");
  };

  return { handleDelete };
}
