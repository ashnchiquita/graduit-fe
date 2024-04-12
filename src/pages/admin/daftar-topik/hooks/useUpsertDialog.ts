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

export function useUpsertDialog(
  closeDialog: () => void,
  updateData: () => Promise<any>,
  row?: Row<DaftarTopikData>,
) {
  const form = useForm<UpsertTopikFormData>({
    defaultValues: row
      ? {
          deskripsi: row.original.deskripsi,
          idPengaju: row.original.pengaju.id,
          judul: row.original.judul,
        }
      : { deskripsi: "", idPengaju: "", judul: "" },
    resolver: async (data, context, options) => {
      console.log("formData", data);
      console.log(
        "validation result",
        await zodResolver(UpsertTopikFormSchema)(data, context, options),
      );
      return zodResolver(UpsertTopikFormSchema)(data, context, options);
    },
  });

  const { trigger: triggerPost } = useSWRMutation(
    "/registrasi-topik",
    async (_, { arg }: { arg: PostNewTopicReqData }) => {
      return await postNewTopic(arg);
    },
  );

  const { trigger: triggerPut } = useSWRMutation(
    "/registrasi-topik",
    async (_, { arg }: { arg: PutExistingTopicReqData }) => {
      return await putExistingTopic(arg);
    },
  );

  const { data: dosenOptions = [], isLoading: isDosenListLoading } = useSWR(
    "/dosen-bimbingan",
    async () => {
      const res = await getAllDosenPembimbing();

      const options: SelectData[] = res.data.map(({ id, nama }) => ({
        label: nama,
        value: id,
      }));

      return options;
    },
  );

  const onSubmit = async (values: UpsertTopikFormData) => {
    console.log(values);

    try {
      if (row) {
        const data: PutExistingTopicReqData = {
          idTopic: row.original.id,
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

  return { onSubmit, form, dosenOptions, isDosenListLoading };
}
