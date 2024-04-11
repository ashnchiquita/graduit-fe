import ExpandableMahasiswaCard from "@/components/ExpandableMahasiswaCard";
import useDetailSubmissionTugas from "./hooks/useDetailSubmissionTugas";
import TaskHeader from "../components/TaskHeader";
import BerkasBadge from "@/components/BerkasBadge";

export default function DetailSubmissionTugas(): JSX.Element {
  const { data } = useDetailSubmissionTugas();

  return (
    <main className="flex flex-col gap-3.5 px-4 pb-10">
      <ExpandableMahasiswaCard
        user={{
          id: data.nim,
          name: data.nama,
          email: data.email,
          major: data.jalurPilihan,
          submissionTime: data.waktuSubmisi,
        }}
        backArrow
        topik={data.topik}
        deskripsi={data.deskripsiTopik}
      />
      <TaskHeader
        title={data.tugas}
        course={data.namaMatkul}
        startTime={data.waktuMulai}
        endTime={data.waktuSelesai}
        creatorName={data.namaPembuat}
        createdAt={data.waktuDibuat}
        editorName={data.namaPengubah}
        editedAt={data.waktuDiubah}
        files={data.berkasTugas.map((berkas) => ({
          title: berkas.nama,
          link: berkas.link,
        }))}
      />

      <section className="flex w-full flex-col gap-3.5 rounded-2xl bg-white p-7 text-xs">
        <h2 className="text-xl font-medium">Jawaban</h2>
        <p className="text-gray-600 md:text-sm">{data.deskripsiTugas}</p>
        <div className="w-full rounded-lg border border-gray-400 px-4 py-2">
          <p className="md:text-sm">{data.jawaban}</p>
        </div>
      </section>

      <section className="flex w-full flex-col gap-3.5 rounded-2xl bg-white p-7 text-xs">
        <h2 className="text-xl font-medium">Berkas Terkait</h2>
        <p className="text-gray-600 md:text-sm">
          Silakan unggah berkas-berkas terkait bimbingan ini.{" "}
          <span className="font-bold">Bagian ini bersifat opsional.</span>
        </p>
        <ul className="flex flex-wrap items-start gap-2.5">
          {data.berkasJawaban.map((berkas, index) => (
            <BerkasBadge key={index} title={berkas.nama} link={berkas.link} />
          ))}
        </ul>
      </section>
    </main>
  );
}
