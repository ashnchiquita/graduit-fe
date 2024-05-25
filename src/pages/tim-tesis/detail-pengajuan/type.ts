import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type Berkas = {
    nama: string;
    link: string;
  };
  
  export type LogBimbinganStatusData = {
    status: boolean;
    bimbingan_logs: LogBimbinganData[];
  };
  
  export type GetLogBimbinganStatusResData = {
    data: {
      status: boolean;
      bimbingan_logs: LogBimbinganData[];
    };
  };
  
  export type LogBimbinganData = {

    berkas: Berkas[];
    status: boolean;
  };
  
  type BimbinganLogS2 = {
    id: string;
    waktuBimbingan: string;
    laporanKemajuan: string;
    todo: string;
    bimbinganBerikutnya: string | null;
    disahkan: boolean;
    berkas: {
      nama: string;
      url: string;
    }[];
  };

  
  export type GetBimbinganS2Res = {
    bimbingan: BimbinganLogS2[];
  };

export type SidangModalProps = {
  dateInit: Date | null;
  onChange: (date: Date) => void;
  modalTrigger: JSX.Element;
};

export type TempatModalProps = {
    tempat: string | null;
    onChange: (date: Date) => void;
    modalTrigger: JSX.Element;
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

export type FormSchemaTempat = {
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleChange: (data: z.infer<typeof FormSchemaTempat>) => void;
    form: UseFormReturn<z.infer<typeof FormSchemaTempat>>;
    isMobile: boolean;
  };

export const FormSchemaDate = z.object({
  jadwalWawan: z.date({
    required_error: "Jadwal Sidang/Seminar harus diisi",
  }),
  tempat: z.string({
    required_error: "Tempat Sidang/Seminar harus diisi"
  }
  )
});

export const FormSchemaTempat = z.object({
    jadwalWawan: z.date({
      required_error: "Jadwal Sidang/Seminar harus diisi",
    }),
    tempat: z.string({
      required_error: "Tempat Sidang/Seminar harus diisi"
    }
    )
  });
