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
import useSWR from "swr";
import {
  getAllDosenPembimbing,
  updateDosenPembimbing,
} from "../rekap-pendaftaran/clients";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";
import { areArraysEqualByValue } from "../helper";
import { useData } from "../context/DataContext";

interface EditDosenPembimbingDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  initialDosenPembimbing: SelectData[];
}

export default function EditDosenPembimbingDialog({
  open,
  setOpen,
  id,
  initialDosenPembimbing,
}: EditDosenPembimbingDialogProps): JSX.Element {
  const [selectedDosenPembimbing, setSelectedDosenPembimbing] = useState<
    SelectData[]
  >([]);

  const [isChanged, setIsChanged] = useState(false);

  const { refreshData } = useData();

  // Set selected dosen pembimbing to initial dosen pembimbing when dialog is opened
  useEffect(() => {
    setSelectedDosenPembimbing(initialDosenPembimbing);
  }, [open, initialDosenPembimbing]);

  // Set initial selected dosen pembimbing
  useState(() => {
    setSelectedDosenPembimbing(initialDosenPembimbing);
  });

  // Check if selected dosen pembimbing has changed
  useEffect(() => {
    if (
      areArraysEqualByValue(selectedDosenPembimbing, initialDosenPembimbing)
    ) {
      setIsChanged(false);
    } else {
      setIsChanged(true);
    }
  }, [selectedDosenPembimbing, initialDosenPembimbing]);

  const { data: dosenPembimbingList = [] } = useSWR(
    "/dosen-bimbingan",
    async () => {
      const res = await getAllDosenPembimbing();

      const options: SelectData[] = res.data.map(({ id, nama }) => ({
        label: nama,
        value: id,
      }));

      return options;
    },
  );

  const { trigger: updateDosenPembimbingTrigger } = useSWRMutation(
    `registrasi-tesis/${id}/pembimbing`,
    async (_) => {
      try {
        const res = await updateDosenPembimbing(
          id,
          selectedDosenPembimbing.map((dosen) => dosen.value),
        );

        toast.success("Berhasil mengubah dosen pembimbing");
        return res.data;
      } catch (error) {
        toast.error("Gagal mengubah dosen pembimbing");
      }
    },
  );

  const onSubmitDosenPembimbing = async () => {
    await updateDosenPembimbingTrigger();
    refreshData();
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
          setEditedFlag={setIsChanged}
        />
        <div className="flex w-full items-center justify-end">
          <Button
            onClick={() => {
              onSubmitDosenPembimbing();
              setOpen(false);
            }}
            className="bg-blue-500 text-gray-100 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-primary-foreground"
            disabled={!isChanged || selectedDosenPembimbing.length === 0}
          >
            Simpan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
