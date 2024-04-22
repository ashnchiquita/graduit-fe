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

export type DataTugas = {
  kodeMataKuliah: string;
  namaMataKuliah: string;
  kelasId: string;
  id: string;
  judul: string;
  waktuMulai: string;
  waktuSelesai: string;
  submisiTugasId?: string;
  isSubmitted?: boolean;
};
