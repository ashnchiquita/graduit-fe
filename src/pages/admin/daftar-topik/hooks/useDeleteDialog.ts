import s2Instance from "@/config/s2-axios-config";
import useSWRMutation from "swr/mutation";

export default function useDeleteDialog(
  updateData: () => Promise<any>,
  closeDialog: () => void,
) {
  const { trigger } = useSWRMutation(
    "/alokasi-topik",
    async (url, { arg }: { arg: string }) => {
      await s2Instance.delete(url + `/${arg}`);
    },
  );

  const handleDelete = async (id: string) => {
    await trigger(id);
    updateData();
    closeDialog();
  };

  return { handleDelete };
}
