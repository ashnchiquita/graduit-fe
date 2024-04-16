import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import useKonfigurasiPeriode from "./hooks/useKonfigurasiPeriode";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Semester } from "./constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RentangMasa from "./components/RentangMasa";
import { useState } from "react";
import TutupPeriodeDialog from "./components/TutupPeriodeDialog";

export default function KonfigurasiPeriode(): JSX.Element {
  const { form, handleSubmit, years } = useKonfigurasiPeriode();
  const [showTutupPeriodeDialog, setShowTutupPeriodeDialog] = useState(false);

  return (
    <main className="flex w-full flex-col gap-3 px-4 pb-3">
      {/* Dialog */}
      <TutupPeriodeDialog
        period={`${form.getValues().semester} ${form.getValues().tahun}`}
        dialogOpen={showTutupPeriodeDialog}
        setDialogOpen={setShowTutupPeriodeDialog}
      />

      <div className="flex w-full flex-col gap-6 rounded-xl bg-white p-8">
        <h1 className="text-3xl font-bold">Pengaturan Periode Pendidikan</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex w-full flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-medium text-slate-500">
                Periode pendidikan saat ini
              </h2>

              <div className="flex flex-col gap-2 lg:flex-row lg:gap-8">
                <FormField
                  control={form.control}
                  name="semester"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between gap-2 lg:justify-between">
                      <FormLabel
                        className="text-sm font-medium text-slate-900"
                        htmlFor="semester"
                      >
                        Semester
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            id="semester"
                            style={{ marginTop: 0 }}
                            className="w-[200px] capitalize"
                          >
                            <SelectValue placeholder="Semester" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent className="w-[200px]">
                          {Semester.map((sem, idx) => (
                            <SelectItem
                              key={idx}
                              value={sem}
                              className="capitalize"
                            >
                              {sem.toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tahun"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between gap-2 lg:justify-between">
                      <FormLabel
                        className="text-sm font-medium text-slate-900"
                        htmlFor="tahun"
                      >
                        Tahun
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            id="tahun"
                            style={{ marginTop: 0 }}
                            className="w-[200px]"
                          >
                            <SelectValue placeholder="Tahun Pembelajaran" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent className="w-[200px]">
                          {years.map((sem, idx) => (
                            <SelectItem key={idx} value={sem}>
                              {sem}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex w-1/2 flex-col gap-2 pr-2.5">
              <FormField
                control={form.control}
                name="minimalBimbingan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="minimal-bimbingan">
                      <h2 className="text-sm text-slate-500">
                        Minimal bimbingan untuk kelulusan
                      </h2>
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        className="w-full"
                        id="minimal-bimbingan"
                        placeholder="Jumlah minimal bimbingan"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <RentangMasa
              form={form}
              label="Rentang masa pendaftaran mahasiswa"
              startFieldName="awalPendaftaran"
              endFieldName="akhirPendaftaran"
              startPlaceholder="Awal pendaftaran"
              endPlaceholder="Akhir pendaftaran"
            />
            <RentangMasa
              form={form}
              label="Rentang masa seminar proposal"
              startFieldName="awalSempro"
              endFieldName="akhirSempro"
              startPlaceholder="Awal seminar proposal"
              endPlaceholder="Akhir seminar proposal"
            />
            <RentangMasa
              form={form}
              label="Rentang masa seminar tesis"
              startFieldName="awalSemTesis"
              endFieldName="akhirSemTesis"
              startPlaceholder="Awal seminar tesis"
              endPlaceholder="Akhir seminar tesis"
            />
            <RentangMasa
              form={form}
              label="Rentang masa sidang tesis"
              startFieldName="awalSidang"
              endFieldName="akhirSidang"
              startPlaceholder="Awal sidang tesis"
              endPlaceholder="Akhir sidang tesis"
            />

            <div className="flex w-full justify-end">
              <Button
                className="w-fit bg-blue-500 text-gray-100 hover:bg-blue-600"
                type="submit"
              >
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="flex w-full flex-col gap-3 rounded-xl bg-white p-4">
        <div className="flex w-full flex-col justify-between gap-4 rounded-lg border border-red-500 p-4 md:flex-row md:justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-slate-800">
              Tutup Periode Pendidikan
            </h3>
            <p className="text-sm font-medium text-slate-500">
              Menutup periode pendidikan akan membatasi seluruh akses pengguna
              untuk mengubah data.
            </p>
          </div>
          <Button
            className="w-full self-end rounded-lg border border-red-500 bg-transparent py-2 text-red-500 hover:bg-red-500 hover:text-white md:w-fit md:self-start md:px-8"
            onClick={() => setShowTutupPeriodeDialog(true)}
            // Disable if periode is not set
            disabled={!form.getValues().semester || !form.getValues().tahun}
            title={
              form.getValues().semester && form.getValues().tahun
                ? ""
                : "Pilih periode pendidikan terlebih dahulu"
            }
          >
            <p className="font-bold">Tutup Periode Pendidikan</p>
          </Button>
        </div>
      </div>
    </main>
  );
}
