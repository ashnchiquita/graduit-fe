import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { TugasDetail } from "./types";
import { Link } from "react-router-dom";

export const FormHeaderCard = (props: TugasDetail) => {
  return (
    <Card
      leftHighlight
      HeaderElement={
        <CardHeader>
          <CardTitle>{props.judul}</CardTitle>
          {/* <CardDescription>{props.deskripsi}</CardDescription> */}
        </CardHeader>
      }
      ContentElement={
        <div>
          <div>
            <div>Course: {props.matakuliah}</div>
            <div>Start: {props.waktuMulai.toLocaleDateString()}</div>
            <div>End: {props.waktuSelesai.toLocaleDateString()}</div>
          </div>
          <div>
            <div>
              Dibuat oleh: {props.namaPembuat} pada{" "}
              {props.createdAt.toLocaleDateString()}
            </div>
            <div>
              Diperbarui oleh: {props.namaPengubah} pada{" "}
              {props.updatedAt.toLocaleDateString()}
            </div>
          </div>
          <div>{props.deskripsi}</div>
          <div>
            {props.berkasTugas.map((berkas, index) => (
              <div key={index}>
                <div>{berkas.nama}</div>
                <Link to={berkas.url} target="_blank" rel="noreferrer">
                  Lihat
                </Link>
              </div>
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
