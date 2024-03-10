import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LecturerCard } from "./components/LecturerCard/LecturerCard";
import { StreamCard } from "./components/StreamCard/StreamCard";
import useThesisRegistrationImpl from "./useThesisRegistrationImpl";

const ThesisRegistration = () => {
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
                        <Input
                          placeholder="Masukkan judul topik yang Anda ajukan"
                          {...field}
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

          <StreamCard form={form} />
          <LecturerCard form={form} />

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

export default ThesisRegistration;
