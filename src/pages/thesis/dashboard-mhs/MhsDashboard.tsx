import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { SubmissionCard } from "./components/SubmissionCard";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";

const MhsDashboard = () => {
  const navigate = useNavigate();

  const navigateToThesisRegistration = () => {
    navigate("/tesis/registrasi");
  };

  return (
    <div className="flex flex-col gap-4 px-4">
      <Card
        leftHighlight
        HeaderElement={
          <CardHeader>
            <CardTitle>Registrasi Tesis</CardTitle>
            <CardDescription>
              Mahasiswa diberikan kesempatan untuk memilih dosen pembimbing yang
              dikehendaki. Akan tetapi, Tim Tesis S2 Informatika yang akan
              menetapkan dosen pembimbing (yang dapat berbeda dari pilihan)
              berdasarkan proses matchmaking dan ketersediaan sisa kuota jumlah
              bimbingan setiap dosen.
            </CardDescription>
          </CardHeader>
        }
        ContentElement={
          <div className="text-sm text-destructive">
            <Button onClick={navigateToThesisRegistration}>Daftar</Button>
          </div>
        }
      />

      <SubmissionCard />
    </div>
  );
};

export default MhsDashboard;
