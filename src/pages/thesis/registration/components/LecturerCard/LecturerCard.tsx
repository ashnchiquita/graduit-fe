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
import { DUMMY_DOSEN } from "../../constants";
import { LecturerCardProps, useLecturerCardImpl } from "./useLecturerCardImpl";

export const LecturerCard = ({ form }: LecturerCardProps) => {
  const { lecturerSearchValue, setLecturerSeachValue } = useLecturerCardImpl();

  return (
    <Card
      HeaderElement={
        <CardHeader>
          <CardTitle>Calon Pembimbing</CardTitle>
          <CardDescription>
            Pilih satu atau lebih calon pembimbing tesis.{" "}
            <strong>Bagian ini bersifat opsional.</strong>
          </CardDescription>
        </CardHeader>
      }
      ContentElement={
        <FormField
          control={form.control}
          name="lecturer"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <SearchableSelect
                  dataOptions={DUMMY_DOSEN.map((value) => ({
                    label: value,
                    value,
                  }))}
                  inputValue={lecturerSearchValue}
                  setInputValue={setLecturerSeachValue}
                  selected={field.value ?? ""}
                  setSelected={(selected) => field.onChange(selected)}
                  placeholder="Pilih dosen pembimbing..."
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
