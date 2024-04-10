import ExpandableMahasiswaCard from "@/components/ExpandableMahasiswaCard";
import useDetailSubmissionTugas from "./hooks/useDetailSubmissionTugas";

export default function DetailSubmissionTugas(): JSX.Element {
  const { data } = useDetailSubmissionTugas();

  return (
    <main className="px-4">
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
      <h1>HELLO</h1>
    </main>
  );
}
