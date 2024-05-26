import { CardTitle } from "@/components/Card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lightbulb, WrapText, Pencil, Calendar } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa6";
import { RiFilePaper2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import DosenPembimbingIcon from "../../../assets/detail-sidsem/dosen-pembimbing-icon.svg";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { ButtonDownload } from "./components/ButtonDownload";
import RegAcceptDialog from "./components/RegAcceptDialog";
import RegRejectDialog from "./components/RegRejectDialog";
import { useState } from "react";

import { IoCheckmark } from "react-icons/io5";
import SidangModal from "./components/SidangModal";
import TempatModal from "./components/TempatModal";
import DospengModal from "./components/DospengModal";

const data = [
  {
    nama: "Log 1",
    link: "https://www.google.com",
  },
  {
    nama: "Log 2",
    link: "https://www.google.com",
  },
  {
    nama: "Log 3",
    link: "https://www.google.com",
  },
];

export default function DetailPengajuan() {
  const navigate = useNavigate();
  const [accept, setAccept] = useState<boolean>(false);

  const [reject, setReject] = useState<boolean>(false);
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
              {"R"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 md:space-y-2">
            <CardTitle>{"Rava"}</CardTitle>

            {/* Desktop */}
            <div className="hidden gap-2 text-xs font-normal text-muted-foreground md:flex">
              <div>{"data.data.email"}</div>
              <div>•</div>
              <div>{"data.data.jalur_pilihan"}</div>
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-1 text-xs text-muted-foreground md:hidden">
              <div className="font-medium">{"data.data.jalur_pilihan"}</div>
              <div>{"data.data.email"}</div>
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
              <div className="pl-9 text-sm md:text-base">
                {"data.data.judul"}
              </div>
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
                  {"data.data.deskripsi"}
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
                {"data.data.dosbing_name"}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex w-full items-center gap-3">
                <Avatar className="size-6">
                  <img src={DosenPembimbingIcon} alt="" />
                </Avatar>
                <div className="text-base text-muted-foreground">
                  Dosen Penguji
                </div>
              </div>
              <DospengModal
                dosenPenguji={[]}
                listDosenPenguji={[
                  {
                    id: 1,
                    nama: "Fajar",
                  },
                  {
                    id: 2,
                    nama: "Rava",
                  },
                  {
                    id: 3,
                    nama: "Rava",
                  },
                ]}
                modalTrigger={
                  <div className="pl-9 text-sm md:text-base">
                    {"data.data.dosbing_name"}
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full rounded-2xl bg-white p-6 text-base md:px-10 md:py-8 my-4">
        <CardTitle>Detail Pengajuan</CardTitle>
        <div className="mt-8 flex flex-1 flex-col justify-between overflow-hidden">
          <div className="flex flex-1 flex-col space-y-5 overflow-hidden">
            <div className="flex flex-col space-y-1 overflow-hidden">
              <div className="flex w-full items-center gap-3">
                <Avatar className="size-6">
                  <AvatarFallback className="bg-lime-200">
                    <RiFilePaper2Line className="size-4 text-lime-500" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-base text-muted-foreground">
                  Jenis Sidang
                </div>
              </div>
              <ScrollArea className="flex-1">
                <div className="pl-9 text-sm md:text-base">
                  {"data.data.deskripsi"}
                </div>
              </ScrollArea>
            </div>

            <div className="flex flex-col space-y-1 overflow-hidden">
              <div className="flex w-full items-center gap-3">
                <Avatar className="size-6">
                  <AvatarFallback className="bg-yellow-200">
                    <Lightbulb className="size-4 text-yellow-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-base text-muted-foreground">
                  Judul Sidang / Seminar{" "}
                </div>
              </div>
              <ScrollArea className="flex-1">
                <div className="pl-9 text-sm md:text-base">
                  {"data.data.deskripsi"}
                </div>
              </ScrollArea>
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
                  {"data.data.deskripsi"}
                </div>
              </ScrollArea>
            </div>

            <div className="flex flex-col space-y-1 overflow-hidden">
              <div className="flex w-full items-center gap-3">
                <Avatar className="size-6">
                  <AvatarFallback className="bg-zinc-200">
                    <IoDocumentAttachOutline className="size-4 text-zinc-500" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-base text-muted-foreground">
                  Berkas Terkait
                </div>
              </div>
              <ScrollArea className="flex-1">
                <div className="pl-9 text-sm md:text-base flex span-1 gap-2">
                  <ButtonDownload data={data} />
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full rounded-2xl bg-white p-6 text-base md:px-10 md:py-8 my-4">
        <CardTitle>Pengaturan Sidang / Seminar </CardTitle>
        <div className="mt-8 flex flex-1 flex-col justify-between overflow-hidden">
          <div className="flex flex-1 flex-col space-y-5 overflow-hidden">
            <div className="space-y-1">
              <div className="flex w-full items-center gap-3">
                <Avatar className="size-6">
                  <AvatarFallback className="bg-blue-200">
                    <WrapText className="size-4 text-blue-400" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-muted-foreground">Jadwal Sidang</div>
              </div>
              <div className="flex items-center gap-5 pl-9 text-sm md:text-base">
                {
                  <div className="flex items-center gap-5 text-sm md:text-base">
                    Belum ada
                  </div>
                }
                {
                  <SidangModal
                    dateInit={null}
                    onChange={(date: Date) => {}}
                    modalTrigger={
                      <Button
                        variant="outline"
                        className="flex h-7 gap-2 px-3 py-2 text-sm"
                      >
                        <Pencil size={12} />
                        {"Jadwalkan"}
                      </Button>
                    }
                  />
                }
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex w-full items-center gap-3">
                <Avatar className="size-6">
                  <AvatarFallback className="bg-orange-200">
                    <Calendar className="size-4 text-orange-400" />
                  </AvatarFallback>
                </Avatar>
                <ScrollArea className="text-muted-foreground">
                  Status
                </ScrollArea>
              </div>
              <div className="pl-9 text-sm md:text-base">
                <TempatModal
                  tempat={"7609"}
                  onChange={(date: Date) => {}}
                  modalTrigger={<p>Belum Ada</p>}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex w-full items-center gap-3">
                <Avatar className="size-6">
                  <AvatarFallback className="bg-blue-100">
                    <IoCheckmark className="size-4 text-[#0070FF]" />
                  </AvatarFallback>
                </Avatar>
                <ScrollArea className="text-muted-foreground">
                  Status
                </ScrollArea>
              </div>
              <div className="pl-9 text-sm md:text-base">
                {"Belum Ditetapkan"}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-5 justify-self-end pl-9 mt-4">
            <RegAcceptDialog
              acceptDialogOpen={accept}
              setAcceptDialogOpen={setAccept}
              name={"fajar"}
              onAccept={() => {}}
              dialogTrigger={
                <Button
                  size="sm"
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                >
                  Setujui
                </Button>
              }
            />

            <RegRejectDialog
              rejectDialogOpen={reject}
              setRejectDialogOpen={setReject}
              name={"fajar"}
              onReject={() => {}}
              dialogTrigger={
                <Button size="sm" className="flex-1" variant="outline">
                  Tolak
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </main>
  );
}
