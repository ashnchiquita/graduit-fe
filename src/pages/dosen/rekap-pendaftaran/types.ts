import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";
import { Table } from "@tanstack/react-table";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type Mahasiswa = {
  nim: string;
  nama: string;
  jadwalWawancara: Date | null;
  status: StatusPendaftaranEnum;
};

export type RekapPendaftaranDosbimHookRet = {
  table: Table<Mahasiswa>;
  searchValue: string;
  handleSearchValueChange: (value: string) => void;
};

export type RowActionHookRet = {
  acceptDialogOpen: boolean;
  setAcceptDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rejectDialogOpen: boolean;
  setRejectDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAccept: (nim: string) => void;
  handleReject: (nim: string) => void;
};

export type WawancaraModalProps = {
  dateInit: Date | null;
  setData: React.Dispatch<React.SetStateAction<Mahasiswa[]>>;
  nim: string;
};

export type WawancaraModalHookRet = {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (data: z.infer<typeof FormSchema>) => void;
  form: UseFormReturn<z.infer<typeof FormSchema>>;
};

export const FormSchema = z.object({
  jadwalWawan: z.date({
    required_error: "Jadwal wawancara harus diisi",
  }),
});
