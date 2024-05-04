import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import RentangMasa from "./components/RentangMasa";
import useKonfigurasiPeriode from "./hooks/useKonfigurasiPeriode";

export default function KonfigurasiPeriode(): JSX.Element {
  const { form, handleSubmit } = useKonfigurasiPeriode();

  return (
    <main className="flex w-full flex-col gap-3 px-4 pb-3">
      <div className="flex w-full flex-col gap-6 rounded-xl bg-white p-5">
        <h1 className="text-xl font-bold">Pengaturan Periode Pendidikan</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex w-full flex-col gap-6"
          >
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
    </main>
  );
}
