type Berkas = {
  nama: string;
  link: string;
};

export type SubmisiMahasiswa = {
  id: string;
  nim: string;
  nama: string;
  berkas: Berkas[];
  selesai: boolean;
};

export type SubmisiTugas = {
  tugas: string;
  deskripsiTugas: string;
  berkasTugas: Berkas[];
  namaMatkul: string;
  waktuMulai: Date;
  waktuSelesai: Date;
  namaPembuat: string;
  waktuDibuat: Date;
  namaPengubah: string;
  waktuDiubah: Date;
  jawaban: string;
  mahasiswa: SubmisiMahasiswa[];
};
