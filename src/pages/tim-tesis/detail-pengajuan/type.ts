import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type Berkas = {
  nama: string;
  link: string;
};

export type GetDetailRes = {
  data: {
    id_mahasiswa: string;
    nama: string;
    email: string;
    jalur_pilihan: string;
    dosbing_name: string;
    dosuji_name: Dospeng[];
    tipe: string;
    judul_proposal: string;
    deskripsi: string;
    berkas_sidsem: Berkas[];
    jadwal_sidang: string;
    tempat: string;
    status: boolean;
  };
};

export type GetDetailResS2 = {
  idPengajuanSidsem: string;
  idMahasiswa: string;
  nimMahasiswa: string;
  namaMahasiswa: string;
  emailMahasiswa: string;
  jadwalSidang: string | null;
  jenisSidang: string;
  ruangan: string | null;
  jalurPilihan: string;
  judulTopik: string;
  deskripsiTopik: string;
  status: string;
  berkasSidsem: {
    id: string;
    nama: string;
    url: string;
  }[];
  judulSidsem: string;
  deskripsiSidsem: string;
  dosenPembimbing: { nama: string; id: string }[];
  dosenPenguji: { nama: string; id: string }[];
};

export type Detail = {
  id_mahasiswa: string;
  nama: string;
  email: string;
  jalur_pilihan: string;
  dosbing_name: string;
  dosuji_name: Dospeng[];
  tipe: string;
  judul_topik: string;
  deskripsi_topik: string;
  judul_proposal: string;
  deskripsi_proposal: string;
  berkas_sidsem: Berkas[];
  jadwal_sidang: string;
  tempat: string;
  status: boolean | null;
};

export type GetDospengRes = {
  data: {
    id: string;
    nama: string;
  }[];
};

export type GetDospengResS2 = {
  id: string;
  nama: string;
  email: string;
  keahlian: string;
}[];

export type Dospeng = {
  id: string;
  nama: string;
};

export type SidangModalProps = {
  dateInit: Date | null;
  onChange: (date: Date) => void;
  modalTrigger: JSX.Element;
};

export type TempatModalProps = {
  tempat: string | null;
  onChange: (tempat: string) => void;
  modalTrigger: JSX.Element;
};

export type DospengModalProps = {
  dosenPenguji: Dospeng[] | null;
  modalTrigger: JSX.Element;
  onChange: (data: Dospeng[]) => void;
  listDosenPenguji: Dospeng[] | null;
};

export type DospengModalHookRet = {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (data: z.infer<typeof FormSchemaDospeng>) => void;
  form: UseFormReturn<z.infer<typeof FormSchemaDospeng>>;
  isMobile: boolean;
};

export type SidangModalHookRet = {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (data: z.infer<typeof FormSchemaDate>) => void;
  form: UseFormReturn<z.infer<typeof FormSchemaDate>>;
  isMobile: boolean;
};

export type TempatModalHookRet = {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (data: z.infer<typeof FormSchemaTempat>) => void;
  form: UseFormReturn<z.infer<typeof FormSchemaTempat>>;
  isMobile: boolean;
};

export const FormSchemaDate = z.object({
  jadwalSidang: z.date().refine((date) => date !== undefined, {
    message: "Tanggal sidang tidak boleh kosong",
  }),
});

export const FormSchemaTempat = z.object({
  tempat: z.string({
    required_error: "Tempat Sidang/Seminar harus diisi",
  }),
});

export const FormSchemaDospeng = z.object({
  dospeng: z.array(
    z.object({
      id: z.string(),
      nama: z.string(),
    }),
  ),
});
