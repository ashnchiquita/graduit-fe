import { CardTitle } from "@/components/Card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lightbulb, WrapText } from "lucide-react";
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
    <main className="ml-6 mr-3 ">
      <div className="w-full rounded-2xl bg-white p-6 text-base md:px-10 md:py-8">
        <div className="flex items-center gap-4 md:gap-6">
          <Button
            variant="ghost"
            size="icon"
            className="w-fit"
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
          >
            <FaArrowLeft className="size-4 text-gray-500 md:size-6" />
          </Button>
          <Avatar className="size-12">
            <AvatarFallback className="bg-violet-500 text-xl text-white">
              {data.data.nama.length > 0 && data.data.nama[0]}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 md:space-y-2">
            <CardTitle>{data.data.nama}</CardTitle>

            {/* Desktop */}
            <div className="hidden gap-2 text-xs font-normal text-muted-foreground md:flex">
              <div>{data.data.email}</div>
              <div>•</div>
              <div>{data.data.jalur_pilihan}</div>
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-1 text-xs text-muted-foreground md:hidden">
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
