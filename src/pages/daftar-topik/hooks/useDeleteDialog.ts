import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import { deleteTopicS1, deleteTopicS2 } from "../clients";
import useSession from "@/hooks/useSession";
import { isAdmin } from "@/lib/checkRole";
import { RoleEnum } from "@/types/session-data";

export default function useDeleteDialog(
  updateData: () => Promise<any>,
  closeDialog: () => void,
  strata?: "S1" | "S2",
) {
  const { data: sessionData } = useSession();

  const { trigger: triggerDeleteS1, error: errorDeleteS1 } = useSWRMutation(
    "/alokasi-topik",
    async (_, { arg }: { arg: string }) => {
      return await deleteTopicS1(arg);
    },
  );

  const { trigger: triggerDeleteS2, error: errorDeleteS2 } = useSWRMutation(
    "/alokasi-topik",
    async (_, { arg }: { arg: string }) => {
      return await deleteTopicS2(arg);
    },
  );

  const handleDelete = async (id: string) => {
    if (!sessionData) return;

    const toastId = toast.loading("Menghapus topik...");

    if (isAdmin(sessionData.roles)) {
      if (strata === "S1") {
        await triggerDeleteS1(id);
      } else if (strata === "S2") {
        await triggerDeleteS2(id);
      }
    } else {
      if (sessionData.roles.includes(RoleEnum.S1_PEMBIMBING)) {
        await triggerDeleteS1(id);
      } else if (sessionData.roles.includes(RoleEnum.S2_PEMBIMBING)) {
        await triggerDeleteS2(id);
      }
    }

    if (errorDeleteS1 || errorDeleteS2) {
      toast.update(toastId, {
        render: "Gagal menghapus topik",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } else {
      toast.update(toastId, {
        render: "Berhasil menghapus topik",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      updateData();
      closeDialog();
    }
  };

  return { handleDelete };
}
