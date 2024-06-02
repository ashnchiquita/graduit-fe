import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";

import { Form } from "@/components/ui/form/form";
import { useNavigate, useParams } from "react-router-dom";
import { AddBerkas } from "./components/AddBerkas";
import { DataDiriComponent } from "./components/DataDiri";
import { DetailTopikComponent } from "./components/DetailTopik";
import useRegistrationSidSem from "./hooks/UseRegistrationSidSem";

export default function RegistrationSidSem() {
  const { data, form, onSubmit } = useRegistrationSidSem();
  const navigate = useNavigate();

  const { tipe, strata } = useParams();

  const tipePendaftaran =
    tipe === "sidang"
      ? "Sidang"
      : tipe === "seminar"
        ? "Seminar"
        : tipe === "seminar-proposal"
          ? "Seminar-Proposal"
          : tipe === "seminar-tesis"
            ? "seminar-tesis"
            : tipe === "sidang"
              ? "Sidang"
              : "";

  const tipeStrata =
    strata?.toUpperCase() === "S1"
      ? "S1"
      : strata?.toUpperCase() === "S2"
        ? "S2"
        : "";

  if (!tipePendaftaran || !tipeStrata) {
    navigate("/not-found");
  }

  return (
    <main>
      <Form {...form}>
        <form
          className="flex flex-col gap-6 pb-10 pl-5 pr-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Card
            leftHighlight
            HeaderElement={
              <CardHeader>
                <CardTitle>Registrasi {tipePendaftaran}</CardTitle>
                <CardDescription>
                  Untuk mendaftar, pastikan Anda telah berkonsultasi dengan
                  dosen pembimbing.
                </CardDescription>
              </CardHeader>
            }
          />
          <DataDiriComponent data={data} strata={strata || ""} />
          <DetailTopikComponent form={form} />
          <AddBerkas form={form} />
          <div className="flex flex-col gap-5 px-4">
            <CardDescription>
              Mohon periksa kembali seluruh bagian sebelum mengirimkan formulir
            </CardDescription>
            <div className="flex gap-2">
              <button
                className="mr-auto rounded-md bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
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
