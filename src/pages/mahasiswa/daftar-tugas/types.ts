export type Tugas = {
  nomor: number;
  kodeMataKuliah: string;
  namaMataKuliah: string;
  judul: string;
  start: string;
  end: string;
  statusPengerjaan: string;
  submisi?: {
    isSubmitted: boolean;
    submissionId: string;
  };
};
