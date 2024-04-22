import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import AddLogBimbinganCard from "./components/AddLogBimbinganCard";
import useAddLogBimbigan from "./hooks/useAddLogBimbingan";
import {
  tanggalBimbinganTitle,
  tanggalBimbinganDesc,
  rencanaBimbinganTitle,
  rencanaBimbinganDesc,
  laporanKemajuanTitle,
  laporanKemajuanDesc,
  todoTitle,
  todoDesc,
  berkasTitle,
  berkasDesc,
} from "./constants";
import { Form } from "@/components/ui/form/form";

export default function AddLogBimbingan() {
  const { form, onSubmit } = useAddLogBimbigan();

  return (
    <main>
      <Form {...form}>
        <form
          className="pl-5 pr-3 flex flex-col gap-6 pb-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Card
            leftHighlight
            HeaderElement={
              <CardHeader>
                <CardTitle>Pengisian Log Bimbingan</CardTitle>
                <CardDescription>
                  Silakan isi log bimbingan setelah melakukan bimbingan dengan
                  dosen pembimbing
                </CardDescription>
              </CardHeader>
            }
          />

          <AddLogBimbinganCard
            title={tanggalBimbinganTitle}
            description={tanggalBimbinganDesc}
            optional={false}
            type="bimbingan_date"
            form={form}
          />
          <AddLogBimbinganCard
            title={laporanKemajuanTitle}
            description={laporanKemajuanDesc}
            optional={false}
            type="laporan_kemajuan"
            form={form}
          />
          <AddLogBimbinganCard
            title={todoTitle}
            description={todoDesc}
            optional={false}
            type="todo"
            form={form}
          />
          <AddLogBimbinganCard
            title={berkasTitle}
            description={berkasDesc}
            optional={true}
            type="berkas"
            form={form}
          />
          <AddLogBimbinganCard
            title={rencanaBimbinganTitle}
            description={rencanaBimbinganDesc}
            optional={true}
            type="next_bimbingan_date"
            form={form}
          />
          <div className="px-4 flex flex-col gap-5">
            <CardDescription>
              Mohon periksa kembali seluruh bagian sebelum mengirimkan formulir
            </CardDescription>
            <div className="flex gap-2">
              <button
                className="rounded-md bg-blue-500 px-5 py-2 text-white hover:bg-blue-600 mr-auto"
                type="submit"
              >
                Kirim
              </button>
              <button
                className="text-blue-500 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.reset();
                }}
              >
                Hapus Formulir
              </button>
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
}
