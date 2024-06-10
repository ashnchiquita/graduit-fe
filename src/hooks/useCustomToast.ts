import { toast } from "react-toastify";

export type ToastParams = {
  loadingText: string;
  successText: string;
  errorText: string;
  action: () => Promise<any>;
  beforeSuccess?: () => Promise<void> | void;
  afterSuccess?: () => Promise<void> | void;
  beforeError?: (err: any) => Promise<void> | void;
  afterError?: (err: any) => Promise<void> | void;
};

export default function useCustomToast() {
  async function makeToast(params: ToastParams) {
    const toastId = toast.loading(params.loadingText);

    await params
      .action()
      .then(async () => {
        await params.beforeSuccess?.();
        toast.update(toastId, {
          render: params.successText,
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
        await params.afterSuccess?.();
      })
      .catch(async (err) => {
        await params.beforeError?.(err);
        toast.update(toastId, {
          render: params.errorText,
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
        await params.afterError?.(err);
      });
  }

  return { makeToast };
}
