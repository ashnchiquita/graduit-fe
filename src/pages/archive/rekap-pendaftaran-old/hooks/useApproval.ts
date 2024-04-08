import useSWRMutation from "swr/mutation";
import { ApprovalHookProps, ApprovalHookRet } from "../types";
import { approvePendaftaran, rejectPendaftaran } from "../clients";

export default function useApproval({
  id,
  fetchData,
}: ApprovalHookProps): ApprovalHookRet {
  const { trigger: triggerApprove, error: approveError } = useSWRMutation(
    "/akun/roles-batch",
    async () => {
      const res = await approvePendaftaran(id);
      return res.data;
    },
  );

  const { trigger: triggerReject, error: rejectError } = useSWRMutation(
    "/akun/roles-batch",
    async () => {
      const res = await rejectPendaftaran(id);
      return res.data;
    },
  );

  const handleApprove = async () => {
    await triggerApprove();

    if (approveError) {
      // TODO: Add toast
      console.error(approveError);
    } else {
      await fetchData();
    }
  };

  const handleReject = async () => {
    await triggerReject();

    if (approveError) {
      // TODO: Add toast
      console.error(rejectError);
    } else {
      await fetchData();
    }
  };

  return {
    handleApprove,
    handleReject,
  };
}
