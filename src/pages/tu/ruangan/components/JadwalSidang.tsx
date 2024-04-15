interface JadwalSidangProps {
  jadwal_sidang?: Date;
}

const JadwalSidang = ({ jadwal_sidang }: JadwalSidangProps) => {
  if (jadwal_sidang) {
    return <td>{parseToStringDate(jadwal_sidang)}</td>;
  }
  return <td className="text-red-500">Belum ada</td>;
};

const parseToStringDate = (jadwal_sidang: Date) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use 24-hour format
    timeZone: "Asia/Jakarta", // Set timezone to WIB (Indonesian Time)
  } as Intl.DateTimeFormatOptions;

  const formattedDate = jadwal_sidang.toLocaleString("id-ID", options);
  return formattedDate;
};

export default JadwalSidang;
