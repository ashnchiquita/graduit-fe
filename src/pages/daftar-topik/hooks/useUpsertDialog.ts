import SelectData from "@/types/select-data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {
  getAllDosenPembimbing,
  postNewTopic,
  putExistingTopic,
} from "../clients";
import { UpsertTopikFormData, UpsertTopikFormSchema } from "../constants";
import {
  DaftarTopikData,
  PostNewTopicReqData,
  PutExistingTopicReqData,
} from "../types";
import useSession from "@/hooks/useSession";
import { RoleEnum, SessionData } from "@/types/session-data";
import { useEffect } from "react";

function isDosen(sessionData: SessionData | null) {
  return (
    sessionData?.roles.includes(RoleEnum.S2_PEMBIMBING) ||
    sessionData?.roles.includes(RoleEnum.S1_PEMBIMBING)
  );
}

export function useUpsertDialog(
  closeDialog: () => void,
  updateData: () => Promise<any>,
  row?: Row<DaftarTopikData>,
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
    if (sessionData && isDosen(sessionData)) {
      form.setValue("idPengaju", sessionData.id);
    }
  }, [sessionData, form]);

  const { trigger: triggerPost } = useSWRMutation(
    "/registrasi-topik",
    async (_, { arg }: { arg: PostNewTopicReqData }) => {
      return await postNewTopic(arg);
    },
  );

  const { trigger: triggerPut } = useSWRMutation(
    "/registrasi-topik",
    async (_, { arg }: { arg: PutExistingTopicReqData }) => {
      if (row) return await putExistingTopic(row?.original.id, arg);
    },
  );

  const { data: dosenOptions = [], isLoading: isDosenListLoading } = useSWR(
    "/dosen-bimbingan",
    async () => {
      if (isDosen(sessionData)) return [];

      const res = await getAllDosenPembimbing();

      const options: SelectData[] = res.data.map(({ id, nama }) => ({
        label: nama,
        value: id,
      }));

      return options;
    },
  );

  const onSubmit = async (values: UpsertTopikFormData) => {
    try {
      if (row) {
        const data: PutExistingTopicReqData = {
          ...values,
        };
        await triggerPut(data);
      } else {
        const data: PostNewTopicReqData = {
          ...values,
        };
        await triggerPost(data);
      }
      toast.success(`Berhasil ${row ? "mengubah" : "menambahkan"} topik`);
    } catch (error) {
      toast.error(`Gagal ${row ? "mengubah" : "menambahkan"} topik`);
    } finally {
      closeDialog();
      updateData();
    }
  };

  return {
    onSubmit,
    form,
    dosenOptions,
    isDosenListLoading,
    showDropdown: !isDosen(sessionData),
  };
}
