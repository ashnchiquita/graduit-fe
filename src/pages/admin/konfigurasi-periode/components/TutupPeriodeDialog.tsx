import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CircleAlertIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";

interface TutupPeriodeDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  period: string;
}

export default function TutupPeriodeDialog({
  dialogOpen,
  setDialogOpen,
  period,
}: TutupPeriodeDialogProps): JSX.Element {
  const [stage, setStage] = useState<0 | 1>(0);
  const [confirmationText, setConfirmationText] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);

  // On close, reset the stage
  useEffect(() => {
    if (!dialogOpen) {
      setTimeout(() => {
        setStage(0);
        setConfirmationText("");
      }, 100);
    }
  }, [dialogOpen]);

  // Check if the confirmation text is correct
  useEffect(() => {
    if (confirmationText === `Tutup Periode Pendidikan ${period}`) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [confirmationText, period]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-w-[330px] rounded-md md:max-w-[525px]">
        <DialogHeader className="gap-2">
          <DialogTitle>Tutup Periode Pendidikan {period}</DialogTitle>
        </DialogHeader>

        {stage === 0 ? (
          <div className="flex w-full flex-col">
            <div className="flex items-center gap-2 rounded-md border border-yellow-500 bg-yellow-100/60 p-6">
              <IoWarningOutline size={16} className="text-yellow-600" />
              <p className="font-medium text-slate-800">
                Mohon perhatikan baik-baik sebelum melanjutkan.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 p-4">
              <div className="flex gap-3">
                <CircleAlertIcon size={24} className="my-0.5" />
                <p className="text-slate-800">
                  Ini akan menutup periode pendidikan {period} dan mengakhiri
                  semua proses yang terkait.
                </p>
              </div>
              <div className="flex gap-3">
                <CircleAlertIcon size={24} className="my-0.5" />
                <p className="text-slate-800">
                  Seluruh data yang terkait dengan periode ini akan diarsipkan
                  dan tidak dapat diubah lagi.
                </p>
              </div>
              <div className="flex gap-3">
                <CircleAlertIcon size={28} className="my-0.5" />
                <p className="text-slate-800">
                  Akses pengguna selain tim tesis akan sementara ditutup dan
                  tidak dapat diakses sebelum periode baru dibuka.
                </p>
              </div>
            </div>
            <Button
              className="w-full rounded-lg border border-red-500 bg-transparent py-2 text-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => setStage(1)}
            >
              <p className="font-bold">
                Saya telah memahami dan ingin melanjutkan
              </p>
            </Button>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-4">
            <p className="font-medium">
              Untuk mengonfirmasi, silakan tulis{" "}
              <span className="font-bold">
                "Tutup Periode Pendidikan {period}"
              </span>{" "}
              di bawah ini.
            </p>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 p-2"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
            />
            <Button
              className="w-full rounded-lg border border-red-500 bg-transparent py-2 text-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => {
                setDialogOpen(false);
              }}
              disabled={submitDisabled}
            >
              <p className="font-bold">Tutup Periode Pendidikan {period}</p>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
