import { CardTitle, CardDescription } from "@/components/Card";
import PendaftaranHeaderGraphic from "../../../../assets/dashboard/pendaftaran_header_graphic.svg";
import { Link, useNavigate } from "react-router-dom";

type RegisterSidSemCardProps = {
  title: string;
  path: string;
  disabled: boolean;
};

const RegisterSidSemCard = ({
  title,
  path,
  disabled,
}: RegisterSidSemCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-white">
      <img src={PendaftaranHeaderGraphic} className="rounded-t-md" alt="" />
      <div className="flex flex-col gap-3 px-6 py-3">
        <CardTitle>Registrasi {title}</CardTitle>
        <CardDescription>
          Registrasi {title.toLowerCase()} dibuka. Untuk mendaftar, pastikan
          Anda telah berkonsultasi dengan dosen pembimbing.
        </CardDescription>
        {disabled ? (
          <button
            className="ml-auto mt-2 rounded-md bg-gray-100 px-9 py-2 text-sm text-gray-500 hover:cursor-not-allowed "
            disabled={disabled}
            onClick={() => navigate(path)}
          >
            <Link to={path}></Link>
            Daftar
          </button>
        ) : (
          <button
            className="ml-auto mt-2 rounded-md bg-blue-500 px-9 py-2 text-sm text-white hover:cursor-pointer hover:bg-blue-600 "
            disabled={disabled}
            onClick={() => navigate(path)}
          >
            <Link to={path}></Link>
            Daftar
          </button>
        )}
      </div>
    </div>
  );
};

export default RegisterSidSemCard;
