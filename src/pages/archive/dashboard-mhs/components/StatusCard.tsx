const StatusCard = ({
  registrationDate = "22 Januari 2024",
  interviewDate = "22/03/24 13.00",
  decision = "Tidak disetujui",
}) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Pengiriman Registrasi</span>
          <span>{registrationDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Jadwal Interview</span>
          <span>{interviewDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Keputusan Dosen Pembimbing</span>
          <span className="cursor-pointer rounded-full bg-red-100 px-4 py-1 text-red-600 hover:bg-red-200">
            {decision}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
