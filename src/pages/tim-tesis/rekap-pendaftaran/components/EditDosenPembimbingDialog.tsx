import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import SelectData from "@/types/select-data";
import { MultiSelect } from "@/components/ui/multi-select";

interface EditDosenPembimbingDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditDosenPembimbingDialog({
  open,
  setOpen,
}: EditDosenPembimbingDialogProps): JSX.Element {
  const [dosenPembimbingList, setDosenPembimbingList] = useState<SelectData[]>(
    [],
  );

  const [selectedDosenPembimbing, setSelectedDosenPembimbing] = useState<
    SelectData[]
  >([]);

  // TODO: Get dosen pembimbing data from API
  useEffect(() => {
    // Fetch dosen pembimbing data
    setDosenPembimbingList([
      { value: "1", label: "Dosen 1" },
      { value: "2", label: "Dosen 2" },
      { value: "3", label: "Dosen 3" },
    ]);
  }, []);

  // TODO: Fetch current dosen pembimbing data from API
  useEffect(() => {
    // Fetch current dosen pembimbing data
    setSelectedDosenPembimbing([
      { value: "1", label: "Dosen 1" },
      { value: "2", label: "Dosen 2" },
    ]);
  }, []);

  const onSubmitDosenPembimbing = () => {
    // TODO: POST request to API to update dosen pembimbing
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah/Ubah Dosen Pembimbing</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p className="text-sm text-slate-500">
            Pilih dosen pembimbing yang baru untuk mahasiswa ini.
          </p>
        </DialogDescription>
        <MultiSelect
          options={dosenPembimbingList}
          selected={selectedDosenPembimbing}
          setSelected={setSelectedDosenPembimbing}
          placeholder="Pilih Dosen Pembimbing..."
        />
        <div className="flex w-full items-center justify-end">
          <Button
            onClick={() => {
              onSubmitDosenPembimbing();
              setOpen(false);
            }}
            className="bg-blue-500 text-gray-100 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-primary-foreground"
          >
            Ubah
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
