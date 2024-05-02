import { CardDescription, CardTitle } from "@/components/Card";

const KonfirmasiPendaftaranCard = ({ title }: { title: string }) => {
  return (
    <div className="rounded-lg bg-white flex flex-col gap-2 px-4 py-4">
      <CardTitle>{title}</CardTitle>
      <CardDescription>
        Anda telah berhasil melakukan registrasi untuk {title.toLowerCase()}.
        Berikut adalah beberapa informasi penting yang perlu Anda perhatikan:
        <br />
        <br />
        1. Silakan periksa kembali data Anda pada{" "}
        <span className="text-blue-500 underline hover:cursor-pointer hover:text-blue-700">
          link berikut
        </span>
        <br />
        2. Jadwal dan ruangan seminar Anda akan diinformasikan melalui laman
        ini.
        <br />
        3. Jika Anda perlu melakukan perubahan jadwal, silahkan hubungi dosen
        pembimbing secepatnya.
        <br />
        <br />
        Mohon cek email Anda secara berkala untuk mendapatkan informasi terbaru
        mengenai sidang. Kami menantikan kehadiran dan presentasi Anda.
      </CardDescription>
    </div>
  );
};

export default KonfirmasiPendaftaranCard;
