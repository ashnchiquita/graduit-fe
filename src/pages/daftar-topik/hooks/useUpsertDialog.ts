import SelectData from "@/types/select-data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {
  getAllDosenPembimbingS2,
  postNewTopicS2,
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
      // TODO: S1 post new topic disini
      return await postNewTopicS2(arg);
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
      // TODO: S1 update topic disini
      if (row) return await putExistingTopicS2(row?.original.id, arg);
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

  const onSubmit = async (values: UpsertTopikFormData) => {
    if (!sessionData) return;

    const toastId = toast.loading(
      `${row ? "Mengubah" : "Menambahkan"} topik...`,
    );

    if (row) {
      const data: PutExistingTopicReqData = {
        ...values,
      };

      if (isAdmin(sessionData.roles)) {
        if (strata === "S1") {
          await triggerPutS1(data);
        } else if (strata === "S2") {
          await triggerPutS2(data);
        }
      } else {
        if (sessionData.roles.includes(RoleEnum.S1_PEMBIMBING)) {
          await triggerPutS1(data);
        } else if (sessionData.roles.includes(RoleEnum.S2_PEMBIMBING)) {
          await triggerPutS2(data);
        }
      }
    } else {
      const data: PostNewTopicReqData = {
        ...values,
      };

      if (isAdmin(sessionData.roles)) {
        if (strata === "S1") {
          await triggerPostS1(data);
        } else if (strata === "S2") {
          await triggerPostS2(data);
        }
      } else {
        if (sessionData.roles.includes(RoleEnum.S1_PEMBIMBING)) {
          await triggerPostS1(data);
        } else if (sessionData.roles.includes(RoleEnum.S2_PEMBIMBING)) {
          await triggerPostS2(data);
        }
      }
    }

    if (errorPostS1 || errorPostS2 || errorPutS1 || errorPutS2) {
      toast.update(toastId, {
        render: `Gagal ${row ? "mengubah" : "menambahkan"} topik`,
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } else {
      toast.update(toastId, {
        render: `Berhasil ${row ? "mengubah" : "menambahkan"} topik`,
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      updateData();
      closeDialog();
    }
  };

  return {
    onSubmit,
    form,
    dosenOptions,
    isDosenListLoading,
    showDropdown: !isDosen(sessionData?.roles),
  };
}
