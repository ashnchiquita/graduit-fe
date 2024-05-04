import { CardDescription, CardTitle } from "@/components/Card";
import { useNavigate } from "react-router-dom";

const KonfirmasiPendaftaranCard = ({
  title,
  path,
}: {
  title: string;
  path: string;
}) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg bg-white flex flex-col gap-2 px-4 py-4">
      <CardTitle>Konfirmasi Pendaftaran {title}</CardTitle>
      <CardDescription>
        Anda telah berhasil melakukan registrasi untuk {title.toLowerCase()}.
        Berikut adalah beberapa informasi penting yang perlu Anda perhatikan:
        <br />
        <br />
        1. Silakan <span className="font-bold">periksa kembali</span> data Anda
        pada{" "}
        <span
          className="text-blue-500 underline hover:cursor-pointer hover:text-blue-700"
          onClick={() => navigate(path)}
        >
          link berikut
        </span>
        <br />
        2. Jadwal dan ruangan seminar Anda akan diinformasikan melalui laman
        ini.
        <br />
        3. Jika Anda perlu melakukan perubahan jadwal, silahkan hubungi dosen
        pembimbing secepatnya.
        <br />
      </CardDescription>
    </div>
  );
};

export default KonfirmasiPendaftaranCard;
