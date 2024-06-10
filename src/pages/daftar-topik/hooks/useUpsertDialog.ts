import SelectData from "@/types/select-data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {
  getAllDosenPembimbingS2,
  postNewTopicS1,
  postNewTopicS2,
  putExistingTopicS1,
  putExistingTopicS2,
} from "../clients";
import { UpsertTopikFormData, UpsertTopikFormSchema } from "../constants";
import {
  DaftarTopikData,
  PostNewTopicReqData,
  PutExistingTopicReqData,
} from "../types";
import useSession from "@/hooks/useSession";
import { useEffect } from "react";
import { isAdmin, isDosen } from "@/lib/checkRole";
import { RoleEnum } from "@/types/session-data";
import useCustomToast, { ToastParams } from "@/hooks/useCustomToast";

export function useUpsertDialog(
  closeDialog: () => void,
  updateData: () => Promise<any>,
  row?: Row<DaftarTopikData>,
  strata?: "S1" | "S2",
) {
  const { data: sessionData } = useSession();

  const form = useForm<UpsertTopikFormData>({
    defaultValues: row
      ? {
          deskripsi: row.original.deskripsi,
          idPengaju: row.original.pengaju.id,
          judul: row.original.judul,
        }
      : { deskripsi: "", idPengaju: "", judul: "" },
    resolver: zodResolver(UpsertTopikFormSchema),
  });

  useEffect(() => {
    if (sessionData && isDosen(sessionData?.roles)) {
      form.setValue("idPengaju", sessionData.id);
    }
  }, [sessionData, form]);

  const { trigger: triggerPostS1, error: errorPostS1 } = useSWRMutation(
    "/registrasi-topik",
    async (_, { arg }: { arg: PostNewTopicReqData }) => {
      return await postNewTopicS1(arg);
    },
  );

  const { trigger: triggerPostS2, error: errorPostS2 } = useSWRMutation(
    "/registrasi-topik",
    async (_, { arg }: { arg: PostNewTopicReqData }) => {
      return await postNewTopicS2(arg);
    },
  );

  const { trigger: triggerPutS1, error: errorPutS1 } = useSWRMutation(
    "/registrasi-topik",
    async (_, { arg }: { arg: PutExistingTopicReqData }) => {
      if (row) return await putExistingTopicS1(row?.original.id, arg);
    },
  );

  const { trigger: triggerPutS2, error: errorPutS2 } = useSWRMutation(
    "/registrasi-topik",
    async (_, { arg }: { arg: PutExistingTopicReqData }) => {
      if (row) return await putExistingTopicS2(row?.original.id, arg);
    },
  );

  const { data: dosenOptions = [], isLoading: isDosenListLoading } = useSWR(
    "/dosen-bimbingan",
    async () => {
      if (isDosen(sessionData?.roles)) return [];

      const res = await getAllDosenPembimbingS2();

      const options: SelectData[] = res.data.map(({ id, nama }) => ({
        label: nama,
        value: id,
      }));

      return options;
    },
  );

  const { makeToast } = useCustomToast();
  const onSubmit = async (values: UpsertTopikFormData) => {
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
      loadingText: `${row ? "Mengubah" : "Menambahkan"} topik...`,
      successText: `Berhasil ${row ? "mengubah" : "menambahkan"} topik`,
      errorText: `Gagal ${row ? "mengubah" : "menambahkan"} topik`,
      action: () => {
        if (row) {
          const data: PutExistingTopicReqData = {
            ...values,
          };

          if (isAdmin(sessionData.roles)) {
            if (strata === "S1") {
              return triggerPutS1(data);
            } else {
              return triggerPutS2(data);
            }
          } else {
            if (sessionData.roles.includes(RoleEnum.S1_PEMBIMBING)) {
              return triggerPutS1(data);
            } else {
              // S2_PEMBIMBING
              return triggerPutS2(data);
            }
          }
        } else {
          const data: PostNewTopicReqData = {
            ...values,
          };
          if (isAdmin(sessionData.roles)) {
            if (strata === "S1") {
              return triggerPostS1(data);
            } else {
              return triggerPostS2(data);
            }
          } else {
            if (sessionData.roles.includes(RoleEnum.S1_PEMBIMBING)) {
              return triggerPostS1(data);
            } else {
              // S2_PEMBIMBING
              return triggerPostS2(data);
            }
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

  return {
    onSubmit,
    form,
    dosenOptions,
    isDosenListLoading,
    showDropdown: !isDosen(sessionData?.roles),
  };
}
