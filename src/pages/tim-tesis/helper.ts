import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";

// Convert status in response to StatusPendaftaranEnum
export function convertStatus(status: string): StatusPendaftaranEnum {
  switch (status) {
    case "APPROVED":
      return StatusPendaftaranEnum.ACCEPTED;
    case "REJECTED":
      return StatusPendaftaranEnum.REJECTED;
    case "NOT_ASSIGNED":
      return StatusPendaftaranEnum.PROCESS;
    default:
      return StatusPendaftaranEnum.PROCESS;
  }
}

export function areArraysEqualByValue(arr1: any[], arr2: any[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const sortedArr1 = [...arr1].sort((a, b) => a.value.localeCompare(b.value));
  const sortedArr2 = [...arr2].sort((a, b) => a.value.localeCompare(b.value));

  return sortedArr1.every(
    (item, index) => item.value === sortedArr2[index].value,
  );
}
