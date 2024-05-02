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
    <div className="rounded-lg bg-white flex flex-col gap-2">
      <img src={PendaftaranHeaderGraphic} className="rounded-t-md" alt="" />
      <div className="px-6 py-3 flex flex-col gap-3">
        <CardTitle>Registrasi {title}</CardTitle>
        <CardDescription>
          Registrasi {title.toLowerCase()} dibuka. Untuk mendaftar, pastikan
          Anda telah berkonsultasi dengan dosen pembimbing.
        </CardDescription>
        {disabled ? (
          <button
            className="rounded-md bg-gray-100 px-9 py-2 text-sm text-gray-500 hover:cursor-not-allowed ml-auto mt-2 "
            disabled={disabled}
            onClick={() => navigate(path)}
          >
            <Link to={path}></Link>
            Daftar
          </button>
        ) : (
          <button
            className="rounded-md bg-blue-500 px-9 py-2 text-sm text-white hover:bg-blue-600 ml-auto mt-2 hover:cursor-pointer "
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
