import { toast } from "react-toastify";

export type ToastParams = {
  loadingText: string;
  successText: string;
  errorText: string;
  action: () => Promise<any>;
  beforeSuccess?: () => void;
  afterSuccess?: () => void;
  beforeError?: () => void;
  afterError?: () => void;
};

export default function useCustomToast() {
  async function makeToast(params: ToastParams) {
    const toastId = toast.loading(params.loadingText);

    await params
      .action()
      .then(() => {
        params.beforeSuccess?.();
        toast.update(toastId, {
          render: params.successText,
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
        params.afterSuccess?.();
      })
      .catch(() => {
        params.beforeError?.();
        toast.update(toastId, {
          render: params.errorText,
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
        params.afterError?.();
      });
  }

  return { makeToast };
}
