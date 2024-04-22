import { Card, CardHeader, CardTitle } from "@/components/Card";
import { TugasDetail } from "../types";
import { AiOutlineClockCircle } from "react-icons/ai";
import BerkasBadge from "@/components/BerkasBadge";

export const FormHeaderCard = (props: TugasDetail) => {
  return (
    <Card
      leftHighlight
      HeaderElement={
        <CardHeader>
          <CardTitle>{props.judul}</CardTitle>
        </CardHeader>
      }
      ContentElement={
        <div className="flex flex-col gap-1 text-gray-600">
          <div className="flex gap-4">
            <div className="inline-flex gap-2">
              Course: <span className="text-blue-500">{props.matakuliah}</span>
            </div>
            <p className="text-gray-300">|</p>
            <div className="inline-flex items-center gap-2">
              <AiOutlineClockCircle size={18} className="text-gray-400" />
              <p>Start: {props.waktuMulai.toLocaleDateString()}</p>
            </div>
            <p className="text-gray-300">|</p>
            <div className="inline-flex items-center gap-2">
              <AiOutlineClockCircle size={18} className="text-gray-400" />
              <p>End: {props.waktuSelesai.toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              Dibuat oleh:{" "}
              <span className="text-blue-500">{props.namaPembuat}</span> pada{" "}
              {props.createdAt.toLocaleDateString()}
            </div>
            <p className="text-gray-300">|</p>
            <div>
              Diperbarui oleh:{" "}
              <span className="text-blue-500">{props.namaPengubah}</span> pada{" "}
              {props.updatedAt.toLocaleDateString()}
            </div>
          </div>
          <div className="pt-2">{props.deskripsi}</div>
          <div className="flex gap-3 pb-5 pt-1">
            {props.berkasTugas.map((berkas, index) => (
              <BerkasBadge key={index} title={berkas.nama} link={berkas.url} />
            ))}
          </div>
          <div className="text-sm text-destructive">
            * Menandai bagian yang wajib diisi
          </div>
        </div>
      }
    />
  );
};
