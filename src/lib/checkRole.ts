import { RoleEnum } from "@/types/session-data";

export function isAdmin(roles?: RoleEnum[]) {
  return (
    roles?.includes(RoleEnum.S2_TIM_TESIS) ||
    roles?.includes(RoleEnum.S1_TIM_TA) ||
    roles?.includes(RoleEnum.ADMIN)
  );
}

export function isDosen(roles?: RoleEnum[]) {
  return (
    roles?.includes(RoleEnum.S2_PEMBIMBING) ||
    roles?.includes(RoleEnum.S1_PEMBIMBING)
  );
}

export function isMahasiswa(roles?: RoleEnum[]) {
  return (
    roles?.includes(RoleEnum.S2_MAHASISWA) ||
    roles?.includes(RoleEnum.S1_MAHASISWA)
  );
}
