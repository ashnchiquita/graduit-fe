import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import StatusCard from "./StatusCard";

export const SubmissionCard = () => {
  return (
    <Card
      HeaderElement={
        <CardHeader>
          <CardTitle>Pengajuan</CardTitle>
        </CardHeader>
      }
      ContentElement={
        <div className="flex">
          <div className="flex-1">
            <CardDescription>
              <div>
                <strong>Topik</strong>
              </div>
              <div>
                Diagram Relasi Aktivitas untuk Memvisualisasikan Jurnal
                Aktivitas Guna Mendukung Penyusunan Alur Cerita
              </div>
            </CardDescription>

            <div className="mb-4"></div>

            <CardDescription>
              <strong>Dosen Pembimbing</strong>
              <div>Ir. Dr. Rinaldy Adin, S.T., M.T., Ph.D.</div>
            </CardDescription>
          </div>

          <div className="flex-1 p-4">
            <CardDescription>
              <strong>Status Pendaftaran</strong>
              <StatusCard />
            </CardDescription>
          </div>
        </div>
      }
    />
  );
};
