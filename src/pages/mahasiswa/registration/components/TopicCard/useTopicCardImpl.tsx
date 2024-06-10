import SelectData from "@/types/select-data";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import useSWR from "swr";
import { getAlokasiTopikPerPembimbing, getAlokasiTopikPerPembimbingS1 } from "../../clients";
import { RegistrationFormData } from "../../constants";
import { RoleEnum } from "@/types/session-data";
import useSession from "@/hooks/useSession";

export type TopicCardProps = {
  form: UseFormReturn<RegistrationFormData>;
  lecturerId: string;
  setNewOptionCreated?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useTopicCardImpl = ({ lecturerId, form }: TopicCardProps) => {
  const [streamSearchValue, setStreamSeachValue] = useState("");
  const [topicList, setTopicList] = useState<SelectData[]>([]);

  const { data: sessionData } = useSession();
  const strata = sessionData?.roles.includes(RoleEnum.S1_MAHASISWA)
        ? "S1"
        : sessionData?.roles.includes(RoleEnum.S2_MAHASISWA)
          ? "S2"
          : "";

  const { data: topicData = [], isLoading } = useSWR(
    ["/alokasi-topik", lecturerId],
    async () => {
      if (!lecturerId) return [];

      if (strata === "S1") {
        const res = await getAlokasiTopikPerPembimbingS1({
          idPembimbing: lecturerId,
        });
  
        return res.data.data.data ?? [];
      } else if (strata === "S2") {
        const res = await getAlokasiTopikPerPembimbing({
          idPembimbing: lecturerId,
        });
  
        return res.data.data ?? [];
      } else {
        return []
      }
    },
  );

  useEffect(() => {
    const newTopicList = topicData.map(({ id, judul }) => ({
      value: id,
      label: judul,
    }));
    setTopicList(newTopicList);
  }, [topicData]);

  const setTopicDescription = (topicId: string) => {
    const selectedTopicData = topicData.find(({ id }) => id === topicId);
    if (selectedTopicData)
      form.setValue("topicDescription", selectedTopicData.deskripsi);
  };

  return {
    isLoading,
    topicData,
    topicList,
    streamSearchValue,
    setStreamSeachValue,
    setTopicDescription,
  };
};
