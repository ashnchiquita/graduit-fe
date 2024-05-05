import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import dayjs from "dayjs";
import { Lightbulb, WrapText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import useDetailMahasiswa from "./hooks/useDetailMahasiswa";
import DosenIcon from "@/assets/dash-tim-tugas/dosen.svg";

export default function DetailMahasiswa(): JSX.Element {
  const { navigate, data } = useDetailMahasiswa();

  return (
    <main className="flex overflow-hidden px-4 pb-8">
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
              {data && data.name.length > 0 && data?.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 md:space-y-2">
            <div className="flex items-center gap-3">
              <div className="font-medium">{data?.name}</div>
              <div className="hidden text-xs text-muted-foreground md:block">
                {dayjs(data?.apply_date).format("DD/MM/YYYY HH.mm")}
              </div>
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
            <div className="space-y-1">
              <div className="flex w-full items-center gap-3">
                <Avatar className="size-6">
                  <AvatarFallback className="bg-yellow-200">
                    <Lightbulb className="size-4 text-yellow-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-muted-foreground">Topik</div>
              </div>
              <div className="pl-9 text-sm md:text-base">{data?.topic}</div>
            </div>

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
                <div className="pl-9 text-sm md:text-base">
                  {data?.description}
                </div>
              </ScrollArea>
            </div>

            <div className="space-y-1">
              <div className="flex w-full items-center gap-3">
                <img src={DosenIcon} className="size-6" alt="" />
                <div className="text-muted-foreground">Dosen Pembimbing</div>
              </div>
              <ul>
                {data?.pembimbing.map((dosen, index) => (
                  <li key={index} className="pl-9 text-sm md:text-base">
                    {dosen}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
