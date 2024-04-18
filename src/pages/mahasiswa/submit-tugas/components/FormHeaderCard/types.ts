export type TugasDetail = {
  judul: string;
  waktuMulai: Date;
  waktuSelesai: Date;
  deskripsi: string;
  berkasTugas: {
    nama: string;
    url: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
  namaPembuat: string;
  namaPengubah: string;
  matakuliah: string;
};

export const TugasDetailData: TugasDetail = {
  judul: "Tugas 1",
  waktuMulai: new Date(),
  waktuSelesai: new Date(),
  deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  berkasTugas: [
    {
      nama: "Tugas 1",
      url: "https://google.com",
    },
    {
      nama: "Tugas 2",
      url: "https://google.com",
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
  namaPembuat: "John Doe",
  namaPengubah: "John Doe",
  matakuliah: "IF3021 Pemrograman Web",
};
