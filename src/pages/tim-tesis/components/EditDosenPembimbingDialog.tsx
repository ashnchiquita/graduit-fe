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
  getAllDosenPembimbingS1,
  getSelfData,
  updateDosenPembimbing,
  updateDosenPembimbingS1,
} from "../riwayat-pendaftaran/clients";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";
import { areArraysEqualByValue } from "../helper";
import { useData } from "../context/DataContext";
import { RoleEnum } from "@/types/session-data";

interface EditDosenPembimbingDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  pendaftaranId: string;
  initialDosenPembimbing: SelectData[];
}

export default function EditDosenPembimbingDialog({
  open,
  setOpen,
  id,
  pendaftaranId,
  initialDosenPembimbing,
}: EditDosenPembimbingDialogProps): JSX.Element {
  const [selectedDosenPembimbing, setSelectedDosenPembimbing] = useState<
    SelectData[]
  >([]);

  const [isChanged, setIsChanged] = useState(false);
  const [isMulti, setIsMulti] = useState(true); // s1 cuman bisa 1 dosbing, multi kalau true = bisa lebih dari 1 dosbing

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
      if (!isMulti && selectedDosenPembimbing.length > 1) {
        setSelectedDosenPembimbing([
          selectedDosenPembimbing[selectedDosenPembimbing.length - 1],
        ]);
      }
    }
  }, [selectedDosenPembimbing, initialDosenPembimbing]);

  const { data: dosenPembimbingList = [] } = useSWR(
    "/dosen-bimbingan",
    async () => {
      const self = await getSelfData();
      if (self.data.roles.includes(RoleEnum.S2_TIM_TESIS)) {
        const res = await getAllDosenPembimbing();

        if (!res.data || res.data.length === 0) {
          return [] as SelectData[];
        }

        const options: SelectData[] = res.data
          .filter(({ nama, email }) => nama !== null || email !== null)
          .map(({ id, nama, email }) => {
            let label = nama?.trim() || "";
            if (!label && email) {
              const emailPrefix = email.split("@")[0];
              if (emailPrefix.trim()) {
                label = emailPrefix;
              }
            }
            if (label) {
              return {
                label: label,
                value: id,
              } as SelectData;
            }
            return null;
          })
          .filter((item): item is SelectData => item !== null); // Type guard to filter out nulls

        return options;
      } else {
        const res = await getAllDosenPembimbingS1();
        setIsMulti(false);
        if (!res.data.data || res.data.data.length === 0) {
          return [] as SelectData[];
        }

        const options: SelectData[] = res.data.data
          .filter(({ nama, email }) => nama !== null || email !== null)
          .map(({ id, nama, email }) => {
            let label = nama?.trim() || "";
            if (!label && email) {
              const emailPrefix = email.split("@")[0];
              if (emailPrefix.trim()) {
                label = emailPrefix;
              }
            }
            if (label) {
              return {
                label: label,
                value: id,
              } as SelectData;
            }
            return null;
          })
          .filter((item): item is SelectData => item !== null); // Type guard to filter out nulls
        // console.log(options)

        return options;
      }
    },
  );

  const { trigger: updateDosenPembimbingTrigger } = useSWRMutation(
    `registrasi-tesis/${id}/pembimbing`,
    async (_) => {
      try {
        const self = await getSelfData();
        if (self.data.roles.includes(RoleEnum.S2_TIM_TESIS)) {
          const res = await updateDosenPembimbing(
            id,
            selectedDosenPembimbing.map((dosen) => dosen.value),
          );

          toast.success("Berhasil mengubah dosen pembimbing");
          return res.data;
        } else {
          const res = await updateDosenPembimbingS1(
            pendaftaranId,
            selectedDosenPembimbing.map((dosen) => dosen.value),
          );

          toast.success("Berhasil mengubah dosen pembimbing");
          return res.data;
        }
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
