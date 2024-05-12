export enum RoleEnum {
  ADMIN = "ADMIN",
  S2_MAHASISWA = "S2_MAHASISWA",
  S2_PEMBIMBING = "S2_PEMBIMBING",
  S2_PENGUJI = "S2_PENGUJI",
  S2_TIM_TESIS = "S2_TIM_TESIS",
  S1_MAHASISWA = "S1_MAHASISWA",
  S1_PEMBIMBING = "S1_PEMBIMBING",
  S1_PENGUJI = "S1_PENGUJI",
  S1_TIM_TA = "S1_TIM_TA",
  TU = "TU",
}

export type SessionData = {
  id: string;
  nama: string;
  email: string;
  nim: string | null;
  roles: RoleEnum[];
};
