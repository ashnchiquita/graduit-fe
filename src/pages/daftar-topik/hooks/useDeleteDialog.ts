import useSWRMutation from "swr/mutation";
import { deleteTopicS1, deleteTopicS2 } from "../clients";
import useSession from "@/hooks/useSession";
import { isAdmin } from "@/lib/checkRole";
import { RoleEnum } from "@/types/session-data";
import useCustomToast, { ToastParams } from "@/hooks/useCustomToast";

export default function useDeleteDialog(
  updateData: () => Promise<any>,
  closeDialog: () => void,
  strata?: "S1" | "S2",
) {
  const { data: sessionData } = useSession();

  const { trigger: triggerDeleteS1 } = useSWRMutation(
    "/alokasi-topik",
    async (_, { arg }: { arg: string }) => {
      return await deleteTopicS1(arg);
    },
  );

  const { trigger: triggerDeleteS2 } = useSWRMutation(
    "/alokasi-topik",
    async (_, { arg }: { arg: string }) => {
      return await deleteTopicS2(arg);
    },
  );

  const { makeToast } = useCustomToast();
  const handleDelete = async (id: string) => {
    if (
      !sessionData ||
      !(
        isAdmin(sessionData.roles) ||
        sessionData.roles.includes(RoleEnum.S1_PEMBIMBING) ||
        sessionData.roles.includes(RoleEnum.S2_PEMBIMBING)
      )
    )
      return;

    const toastParams: ToastParams = {
      loadingText: "Menghapus topik...",
      successText: "Berhasil menghapus topik",
      errorText: "Gagal menghapus topik",
      action: () => {
        if (isAdmin(sessionData.roles)) {
          if (strata === "S1") {
            return triggerDeleteS1(id);
          } else {
            return triggerDeleteS2(id);
          }
        } else {
          if (sessionData.roles.includes(RoleEnum.S1_PEMBIMBING)) {
            return triggerDeleteS1(id);
          } else {
            // S2_PEMBIMBING
            return triggerDeleteS2(id);
          }
        }
      },
      afterSuccess: () => {
        updateData();
        closeDialog();
      },
    };

    await makeToast(toastParams);
  };

  return { handleDelete };
}
