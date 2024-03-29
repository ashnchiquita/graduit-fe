import useSWR from "swr";
import { RegistrationRecapListData } from "../types";
import { getPendaftaran } from "../clients";

export const useRegistrationRecapData = () => {
  const { data = [], ...swr } = useSWR<RegistrationRecapListData[]>(
    `regist-recap`,
    async () => {
      const res = await getPendaftaran();

      const mappedData = res.data.data.map((d) => ({
        id: d.id,
        name: d.mahasiswa.nama,
        apply_date: new Date(d.waktuPengiriman),
        email: d.mahasiswa.email,
        stream: d.jalurPilihan,
        topic: d.topik.judul,
        description: d.topik.deskripsi,
        interview_date: d.jadwalInterview ? new Date(d.jadwalInterview) : null,
        status: d.status,
      }));

      return mappedData;
    },
  );

  return { data, ...swr };
};
