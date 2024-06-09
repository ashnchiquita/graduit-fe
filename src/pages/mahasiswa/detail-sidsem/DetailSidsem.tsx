import { CardTitle } from "@/components/Card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Lightbulb, WrapText } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import DosenPembimbingIcon from "../../../assets/detail-sidsem/dosen-pembimbing-icon.svg";
import JadwalSidangIcon from "../../../assets/detail-sidsem/jadwal-sidang-icon.svg";
import JenisSidangIcon from "../../../assets/detail-sidsem/jenis-sidang-icon.svg";
import RuanganSidangIcon from "../../../assets/detail-sidsem/ruangan-sidang-icon.svg";
import StatusIcon from "../../../assets/detail-sidsem/status-icon.svg";
import useDetailSidsem from "./hooks/useDetailSidsem";

const DetailSidsem = () => {
  const navigate = useNavigate();
  const { data, tipePendaftaran } = useDetailSidsem();

  return (
    <main className="ml-6 mr-3">
      <div className="mb-8 w-full rounded-lg bg-white p-4 py-5 text-base">
        <div className="flex items-center gap-3 md:gap-3.5">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={20} className="text-gray-500" />
          </button>
          <Avatar className="z-0 size-10">
            <AvatarFallback className="z-0 bg-violet-500 text-lg text-white">
              {data && data.data.nama ? data.data.nama[0].toUpperCase() : "A"}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-3">
              <div className="font-medium">{data.data.nama}</div>
            </div>

            {/* Desktop */}
            <div className="hidden gap-2 text-sm text-muted-foreground md:flex">
              <div>{data.data.email}</div>
              <div>•</div>
              <div>{data.data.jalur_pilihan}</div>
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-1 text-sm text-muted-foreground md:hidden">
              <div className="font-medium">{data.data.jalur_pilihan}</div>
              <div>{data.data.email}</div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-1 flex-col justify-between overflow-hidden">
          <div className="flex flex-1 flex-col space-y-5 overflow-hidden">
            <div className="space-y-1">
              <div className="flex w-full items-center gap-3">
                <Avatar className="size-6">
                  <AvatarFallback className="bg-yellow-200">
                    <Lightbulb className="size-4 text-yellow-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-base text-muted-foreground">Topik</div>
              </div>
              <div className="pl-9 text-sm md:text-base">{data.data.judul}</div>
            </div>

            <div className="flex flex-col space-y-1 overflow-hidden">
              <div className="flex w-full items-center gap-3">
                <Avatar className="size-6">
                  <AvatarFallback className="bg-pink-200">
                    <WrapText className="size-4 text-pink-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-base text-muted-foreground">Deskripsi</div>
              </div>
              <ScrollArea className="flex-1">
                <div className="pl-9 text-sm md:text-base">
                  {data.data.deskripsi}
                </div>
              </ScrollArea>
            </div>

            <div className="space-y-1">
              <div className="flex w-full items-center gap-3">
                <Avatar className="size-6">
                  <img src={DosenPembimbingIcon} alt="" />
                </Avatar>
                <div className="text-base text-muted-foreground">
                  Dosen Pembimbing
                </div>
              </div>
              <div className="pl-9 text-sm md:text-base">
                {data.data.dosbing_name}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex w-full items-center gap-3">
                <Avatar className="size-6">
                  <img src={JenisSidangIcon} alt="" />
                </Avatar>
                <div className="text-base text-muted-foreground">
                  Jenis Sidang
                </div>
              </div>
              <div className="pl-9 text-sm md:text-base">{tipePendaftaran}</div>
            </div>

            <div className="space-y-1">
              <div className="flex w-full items-center gap-3">
                <Avatar className="size-6">
                  <img src={JadwalSidangIcon} alt="" />
                </Avatar>
                <div className="text-base text-muted-foreground">
                  Jadwal Sidang
                </div>
              </div>
              <div className="pl-9 text-sm md:text-base">
                {data.data.waktu_mulai}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex w-full items-center gap-3">
                <Avatar className="size-6">
                  <img src={RuanganSidangIcon} alt="" />
                </Avatar>
                <div className="text-base text-muted-foreground">
                  Ruangan Sidang
                </div>
              </div>
              <div className="pl-9 text-sm md:text-base">
                {data.data.nama_ruangan}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex w-full items-center gap-3">
                <Avatar className="size-6">
                  <img src={StatusIcon} alt="" />
                </Avatar>
                <div className="text-base text-muted-foreground">
                  Status Sidang
                </div>
              </div>
              <div className="pl-9 text-sm md:text-base">
                {data.data.ditolak
                  ? "Diterima"
                  : data.data.ditolak === null
                    ? "Belum ditentukan"
                    : "Ditolak"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailSidsem;
