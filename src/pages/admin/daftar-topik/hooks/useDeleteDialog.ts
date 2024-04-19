import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";

export default function useDeleteDialog(
  updateData: () => Promise<any>,
  closeDialog: () => void,
) {
  const { trigger } = useSWRMutation(
    "/alokasi-topik",
    async (_, { arg }: { arg: string }) => {
      // await s2Instance.delete(url + `/${arg}`);
      console.log(arg);
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
