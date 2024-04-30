import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";

import { Form } from "@/components/ui/form/form";
import useRegistrationSidSem from "./hooks/UseRegistrationSidSem";
import { useParams } from "react-router-dom";
import { DataDiriComponent } from "./components/DataDiri";
import { AddBerkas } from "./components/AddBerkas";
import { DetailTopikComponent } from "./components/DetailTopik";

export default function RegistrationSidSem() {
  const { form, onSubmit } = useRegistrationSidSem();

  const { tipe } = useParams();

  const tipePendaftaran =
    tipe === "sidang"
      ? "Sidang"
      : tipe === "seminar"
        ? "Seminar Proposal"
        : "Not found";

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
                <CardTitle>Registrasi {tipePendaftaran}</CardTitle>
                <CardDescription>
                  Registrasi {tipePendaftaran} dibuka dari tanggal 21 April 2024
                  - 29 April 2024. Untuk mendaftar, pastikan Anda telah
                  berkonsultasi dengan dosen pembimbing.
                </CardDescription>
              </CardHeader>
            }
          />

          <DataDiriComponent form={form} />
          <DetailTopikComponent form={form} />

          <AddBerkas form={form} />

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
