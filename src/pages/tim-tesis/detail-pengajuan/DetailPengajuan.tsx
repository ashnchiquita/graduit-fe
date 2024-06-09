import { CardTitle } from "@/components/Card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Lightbulb, Pencil, WrapText } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa6";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { RiFilePaper2Line } from "react-icons/ri";
import DosenPembimbingIcon from "../../../assets/detail-sidsem/dosen-pembimbing-icon.svg";
import { ButtonDownload } from "./components/ButtonDownload";
import RegAcceptDialog from "./components/RegAcceptDialog";
import RegRejectDialog from "./components/RegRejectDialog";

import { formatDate } from "@/lib/dateformat";
import { IoCheckmark } from "react-icons/io5";
import DospengModal from "./components/DospengModal";
import SidangModal from "./components/SidangModal";
import TempatModal from "./components/TempatModal";
import useDetailPengajuan from "./hooks/useDetailPengajuan";

export default function DetailPengajuan() {
  const {
    data,
    navigate,
    acceptDialogOpen,
    setAcceptDialogOpen,
    rejectDialogOpen,
    setRejectDialogOpen,
    handleTempatUpdate,
    handleJadwalUpdate,
    handleApprove,
    handleReject,
    dospengData,
    handleDospengUpdate,
    strata,
  } = useDetailPengajuan();
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
              {data.nama[0]}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 md:space-y-2">
            <CardTitle>{data.nama}</CardTitle>

            {/* Desktop */}
            <div className="hidden gap-2 text-xs font-normal text-muted-foreground md:flex">
              <div>{data.email}</div>
              <div>•</div>
              <div>{data.jalur_pilihan}</div>
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-1 text-xs text-muted-foreground md:hidden">
              <div className="font-medium">{data.jalur_pilihan}</div>
              <div>{data.email}</div>
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
                {data.judul_topik}
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
                  {data.deskripsi_topik}
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
                {data.dosbing_name}
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
              <div className="flex items-center gap-5 pl-9 text-sm md:text-base">
                {
                  <div className="flex items-center gap-5 text-sm md:text-base">
                    <ul>
                      {data.dosuji_name.length > 0
                        ? data.dosuji_name.map((val) => {
                            return <li>{val.nama}</li>;
                          })
                        : "Belum ada"}
                    </ul>
                  </div>
                }
                <DospengModal
                  dosenPenguji={data.dosuji_name}
                  listDosenPenguji={dospengData}
                  onChange={handleDospengUpdate}
                  modalTrigger={
                    <>
                      {data.status && (
                        <Button
                          variant="outline"
                          className="flex h-7 gap-2 px-3 py-2 text-sm"
                        >
                          <Pencil size={12} />
                          {"Ubah"}
                        </Button>
                      )}
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-4 w-full rounded-2xl bg-white p-6 text-base md:px-10 md:py-8">
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
                <div className="pl-9 text-sm md:text-base">{data.tipe}</div>
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
                  {data.judul_proposal}
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
                  {data.deskripsi_proposal}
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
                <div className="span-1 flex gap-2 pl-9 text-sm md:text-base">
                  {data.berkas_sidsem.length > 0 ? (
                    <ButtonDownload data={data.berkas_sidsem} />
                  ) : (
                    "Belum Ada"
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>

      <div className="my-4 w-full rounded-2xl bg-white p-6 text-base md:px-10 md:py-8">
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
                    {data.jadwal_sidang === ""
                      ? "Belum Ada"
                      : formatDate(new Date(data.jadwal_sidang))}
                  </div>
                }
                {
                  <SidangModal
                    dateInit={new Date(data.jadwal_sidang)}
                    onChange={(date) => {
                      handleJadwalUpdate(date);
                    }}
                    modalTrigger={
                      <>
                        {data.status && (
                          <Button
                            variant="outline"
                            className="flex h-7 gap-2 px-3 py-2 text-sm"
                          >
                            <Pencil size={12} />
                            {"Jadwalkan"}
                          </Button>
                        )}
                      </>
                    }
                  />
                }
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex w-full items-center gap-3">
              <Avatar className="size-6">
                <AvatarFallback className="bg-orange-200">
                  <Calendar className="size-4 text-orange-400" />
                </AvatarFallback>
              </Avatar>
              <ScrollArea className="text-muted-foreground">Tempat</ScrollArea>
            </div>
            <div className="pl-9 text-sm md:text-base">
              <div className="flex items-center gap-5 text-sm md:text-base">
                {
                  <div className="flex items-center gap-5 text-sm md:text-base">
                    {data.tempat === "" ? "Belum Ada" : data.tempat}
                  </div>
                }
                <TempatModal
                  tempat={data.tempat}
                  onChange={handleTempatUpdate}
                  modalTrigger={
                    <>
                      {data.status && (
                        <Button
                          variant="outline"
                          className="flex h-7 gap-2 px-3 py-2 text-sm"
                        >
                          <Pencil size={12} />
                          {"Ubah"}
                        </Button>
                      )}
                    </>
                  }
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
                {data.status === null
                  ? "Belum Ditentukan"
                  : data.status
                    ? "Diterima"
                    : "Ditolak"}
              </div>
            </div>
          </div>
          {(data.status === null || strata === "S1") && (
            <div className="mt-4 flex items-center justify-center gap-5 justify-self-end pl-9">
              <RegAcceptDialog
                acceptDialogOpen={acceptDialogOpen}
                setAcceptDialogOpen={setAcceptDialogOpen}
                name={data.nama}
                onAccept={handleApprove}
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
                rejectDialogOpen={rejectDialogOpen}
                setRejectDialogOpen={setRejectDialogOpen}
                name={data.nama}
                onReject={handleReject}
                dialogTrigger={
                  <Button size="sm" className="flex-1" variant="outline">
                    Tolak
                  </Button>
                }
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
