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
  FormMessage,
} from "@/components/ui/form/form";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { StreamSelectOptions } from "../../constants";
import { StreamCardProps, useStreamCardImpl } from "./useStreamCardImpl";

export const StreamCard = ({ form }: StreamCardProps) => {
  const { streamSearchValue, setStreamSeachValue } = useStreamCardImpl();

  return (
    <Card
      HeaderElement={
        <CardHeader>
          <CardTitle>
            Jalur Pilihan <span className="text-destructive">*</span>
          </CardTitle>
          <CardDescription>
            Pilih salah satu jalur pilihan yang dituju
          </CardDescription>
        </CardHeader>
      }
      ContentElement={
        <FormField
          control={form.control}
          name="stream"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <SearchableSelect
                  dataOptions={StreamSelectOptions}
                  inputValue={streamSearchValue}
                  setInputValue={setStreamSeachValue}
                  selected={field.value}
                  setSelected={(selected) => {
                    field.onChange(selected);
                  }}
                  placeholder="Cari jalur pilihan..."
                  shouldFilter={true}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      }
    />
  );
};
