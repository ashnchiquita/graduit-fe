import SelectData from "@/types/select-data";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import useSWR from "swr";
import { getAlokasiTopikPerPembimbing } from "../../clients";
import { thesisRegistrationFormData } from "../../constants";

export type TopicCardProps = {
  form: UseFormReturn<thesisRegistrationFormData>;
  lecturerId: string;
};

export const useTopicCardImpl = ({ lecturerId, form }: TopicCardProps) => {
  const [streamSearchValue, setStreamSeachValue] = useState("");
  const [topicList, setTopicList] = useState<SelectData[]>([]);

  const { data: topicData = [], isLoading } = useSWR(
    ["/alokasi-topik", lecturerId],
    async () => {
      if (!lecturerId) return [];

      const res = await getAlokasiTopikPerPembimbing({
        idPembimbing: lecturerId,
      });

      return res.data.data ?? [];
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
