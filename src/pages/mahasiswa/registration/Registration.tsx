import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form/form";
import { LecturerCard } from "./components/LecturerCard/LecturerCard";
import { StreamCard } from "./components/StreamCard/StreamCard";
import { TopicCard } from "./components/TopicCard/TopicCard";
import useThesisRegistrationImpl from "./useRegistrationImpl";

const Registration = () => {
  const { form, onSubmit } = useThesisRegistrationImpl();

  return (
    <div className="flex-1">
      <Form {...form}>
        <form
          className="flex flex-col gap-4 px-4"
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <Card
            leftHighlight
            HeaderElement={
              <CardHeader>
                <CardTitle>Registrasi Tesis</CardTitle>
                <CardDescription>
                  Mahasiswa diberikan kesempatan untuk memilih dosen pembimbing
                  yang dikehendaki. Akan tetapi, Tim Tesis S2 Informatika yang
                  akan menetapkan dosen pembimbing (yang dapat berbeda dari
                  pilihan) berdasarkan proses matchmaking dan ketersediaan sisa
                  kuota jumlah bimbingan setiap dosen.
                </CardDescription>
              </CardHeader>
            }
            ContentElement={
              <div className="text-sm text-destructive">
                * Menandai bagian yang wajib diisi
              </div>
            }
          />

          <LecturerCard form={form} />
          <TopicCard form={form} lecturerId={form.watch("lecturer")} />
          <StreamCard form={form} />

          <div className="flex flex-col gap-8 p-6">
            <div className="text-gray-600">
              Mohon periksa kembali seluruh bagian sebelum mengirimkan formulir.
            </div>
            <div className="flex justify-between">
              <Button
                className="bg-blue-500 text-gray-100 hover:bg-blue-600"
                type="submit"
              >
                Kirim
              </Button>
              <Button
                className="text-blue-500 hover:text-blue-600"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.reset();
                }}
              >
                Hapus Formulir
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Registration;
