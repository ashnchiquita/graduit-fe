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
import { LecturerCardProps, useLecturerCardImpl } from "./useLecturerCardImpl";

export const LecturerCard = ({
  form,
  strata,
}: LecturerCardProps & { strata: string }) => {
  const {
    lecturerOptions,
    isLoading,
    lecturerSearchValue,
    setLecturerSeachValue,
  } = useLecturerCardImpl(strata as "S1" | "S2");

  return (
    <Card
      HeaderElement={
        <CardHeader>
          <CardTitle>
            Calon Pembimbing <span className="text-destructive">*</span>
          </CardTitle>
          <CardDescription>
            Pilih satu calon pembimbing{" "}
            {strata === "S1" ? "tugas akhir" : "tesis"}.
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
                  dataOptions={lecturerOptions}
                  inputValue={lecturerSearchValue}
                  setInputValue={setLecturerSeachValue}
                  selected={field.value ?? ""}
                  setSelected={(selected) => field.onChange(selected)}
                  placeholder="Pilih dosen pembimbing..."
                  disabled={isLoading}
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
