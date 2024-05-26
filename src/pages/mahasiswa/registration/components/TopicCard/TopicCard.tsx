import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { Textarea } from "@/components/ui/textarea";
import { TopicCardProps, useTopicCardImpl } from "./useTopicCardImpl";

export const TopicCard = ({
  form,
  lecturerId,
  setNewOptionCreated,
}: TopicCardProps) => {
  const {
    streamSearchValue,
    setStreamSeachValue,
    topicList,
    setTopicDescription,
  } = useTopicCardImpl({
    lecturerId,
    form,
  });

  return (
    <Card
      HeaderElement={
        <CardHeader>
          <CardTitle>
            Usulan Topik <span className="text-destructive">*</span>
          </CardTitle>
          {/* TODO link */}
          <CardDescription>
            Research interests setiap dosen dapat dilihat di link ini
          </CardDescription>
        </CardHeader>
      }
      ContentElement={
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topik</FormLabel>
                <FormControl>
                  <SearchableSelect
                    dataOptions={topicList}
                    inputValue={streamSearchValue}
                    setInputValue={setStreamSeachValue}
                    selected={field.value}
                    setSelected={(selected) => {
                      field.onChange(selected);
                      setTopicDescription(selected);
                    }}
                    placeholder="Pilih judul topik yang Anda ajukan"
                    suggestAddOption={true}
                    suggestAddOptionPrompt="Usulkan"
                    onNewOptionCreated={setNewOptionCreated}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="topicDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi Singkat</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Masukkan deskripsi topik yang Anda ajukan"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      }
    />
  );
};
