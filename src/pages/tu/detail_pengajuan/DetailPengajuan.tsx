import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import dayjs from "dayjs";
import { Lightbulb, Pencil, WrapText } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa6";
import useDetailPengajuan from "./hooks/useDetailPengajuan";
import { DATETIME_FORMAT } from "./constants";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import ChangeRuanganDialog from "../ruangan/components/ChangeRuanganDialog";

const DetailPengajuan = () => {
  const { data, navigate, handleSubmitChangeRuangan, handleSendMail } =
    useDetailPengajuan();
  return (
    <main className="flex w-full flex-col gap-5 px-4">
      <div className="flex h-full flex-1 flex-col gap-8 overflow-hidden rounded-2xl bg-white p-6 md:px-10 md:py-8">
        <div className="flex items-center gap-4 md:gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="w-fit"
          >
            <FaArrowLeft className="size-4 text-gray-500 md:size-6" />
          </Button>
          <Avatar className="size-12">
            <AvatarFallback className="bg-violet-500 text-xl text-white">
              {data?.nama.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 md:space-y-2">
            <div className="flex items-center gap-3">
              <div className="font-medium">{data?.nama}</div>
            </div>

            {/* Desktop */}
            <div className="hidden gap-2 text-xs text-muted-foreground md:flex">
              <div>{data?.email}</div>
              <div>•</div>
              <div>{data?.stream}</div>
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-1 text-xs text-muted-foreground md:hidden">
              <div className="font-medium">{data?.stream}</div>
              <div>{data?.email}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between overflow-hidden">
          <div className="flex flex-1 flex-col space-y-5 overflow-hidden pb-7">
            {/* Topik */}
            <div className="space-y-1">
              <div className="flex w-full items-center gap-3">
                <Avatar className="size-6">
                  <AvatarFallback className="bg-yellow-200">
                    <Lightbulb className="size-4 text-yellow-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-muted-foreground">Topik</div>
              </div>
              <div className="pl-9 text-sm md:text-base">{data?.topik}</div>
            </div>

            {/* Deskripsi */}
            <div className="flex flex-col space-y-1 overflow-hidden">
              <div className="flex w-full items-center gap-3">
                <Avatar className="size-6">
                  <AvatarFallback className="bg-pink-200">
                    <WrapText className="size-4 text-pink-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-muted-foreground">Deskripsi</div>
              </div>
              <ScrollArea className="flex-1">
                <div className="pl-9 text-justify text-sm md:text-base">
                  {data?.deskripsi}
                </div>
              </ScrollArea>
            </div>

            {/* Dosen Pembimbing */}
            <div className="space-y-1">
              <div className="flex w-full items-center gap-3">
                <Avatar className="size-6">
                  <AvatarFallback className="bg-blue-200">
                    <Lightbulb className="size-4 text-yellow-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-muted-foreground">Dosen Pembimbing</div>
              </div>
              <div className="pl-9 text-sm md:text-base">
                {data?.dosen_pembimbing}
              </div>
            </div>

            {/* Dosen Penguji */}
            {data?.dosen_penguji.map((val, idx) => (
              <div className="space-y-1" key={idx}>
                <div className="flex w-full items-center gap-3">
                  <Avatar className="size-6">
                    <AvatarFallback className="bg-sky-200">
                      <Lightbulb className="size-4 text-yellow-600" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-muted-foreground">
                    Dosen Penguji {idx + 1}
                  </div>
                </div>
                <div className="pl-9 text-sm md:text-base">{val}</div>
              </div>
            ))}

            {/* Jenis Sidang */}
            <div className="space-y-1">
              <div className="flex w-full items-center gap-3">
                <Avatar className="size-6">
                  <AvatarFallback className="bg-lime-200">
                    <Lightbulb className="size-4 text-yellow-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-muted-foreground">Jenis Sidang</div>
              </div>
              <div className="pl-9 text-sm md:text-base">
                {data?.jenis_sidang}
              </div>
            </div>

            {/* Jadwal Sidang */}
            <div className="space-y-1">
              <div className="flex w-full items-center gap-3">
                <Avatar className="size-6">
                  <AvatarFallback className="bg-indigo-200">
                    <CiCalendar className="size-4 text-indigo-400" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-muted-foreground">Jadwal Sidang</div>
              </div>
              <div className="pl-9 text-sm md:text-base">
                {data?.jadwal_sidang
                  ? dayjs(data.jadwal_sidang).format(DATETIME_FORMAT)
                  : "Belum ada"}
              </div>
            </div>

            {/* Ruang Sidang */}
            <div className="space-y-1">
              <div className="flex w-full items-center gap-3">
                <Avatar className="size-6">
                  <AvatarFallback className="bg-blue-200">
                    <CiLocationOn className="size-4 text-blue-400" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-muted-foreground">Ruang Sidang</div>
              </div>
              <div className="flex flex-row items-center justify-start gap-4 pl-9 text-sm md:text-base">
                <p>{data?.ruangan_sidang}</p>
                <ChangeRuanganDialog
                  name={data?.nama}
                  handleSubmit={handleSubmitChangeRuangan}
                  handleSendMail={handleSendMail}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailPengajuan;
