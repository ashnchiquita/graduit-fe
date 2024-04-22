export type DataKelas = {
  id: string;
  nomor: string;
  kode_mata_kuliah: string;
  nama_mata_kuliah: string;
  jumlah_mahasiswa: number;
  warna: string;
};

export type DataTugas = {
  kelasId: string;
  id: string;
  judul: string;
  waktuMulai: string;
  waktuSelesai: string;
  submisiTugasId?: string;
  isSubmitted?: boolean;
};
