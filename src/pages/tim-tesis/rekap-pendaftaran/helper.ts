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
