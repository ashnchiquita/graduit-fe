import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import dayjs from "dayjs";
import { Lightbulb, Pencil, WrapText } from "lucide-react";
import { DATETIME_FORMAT, RECAP_FILTER_STATUS_OPTIONS } from "../constants";
// import useApproval from "../hooks/useApproval";
import WawancaraModal from "@/pages/dosen/components/WawancaraModal";
import RegAcceptDialog from "../../components/RegAcceptDialog";
import useDetailRekapPendaftaran from "../hooks/useDetailRekapPendaftaran";
import { FaArrowLeft } from "react-icons/fa6";
import RegRejectDialog from "../../components/RegRejectDialog";

const RecapDetail = () => {
  const {
    data,
    setData,
    acceptDialogOpen,
    setAcceptDialogOpen,
    rejectDialogOpen,
    setRejectDialogOpen,
    navigate,
  } = useDetailRekapPendaftaran();

  // const { handleApprove, handleReject } = useApproval({
  //   id: data?.id ?? "",
  // });

  return (
    <div className="flex h-full flex-1 flex-col gap-8 overflow-hidden rounded-2xl bg-white px-10 py-8">
      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <FaArrowLeft className="size-6 text-gray-500" />
        </Button>
        <Avatar className="size-12">
          <AvatarFallback className="bg-violet-500 text-xl text-white">
            {data && data.name.length > 0 && data?.name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div>{data?.name}</div>
            <div className="text-xs text-muted-foreground">
              {dayjs(data?.apply_date).format(DATETIME_FORMAT)}
            </div>
          </div>
          <div className="flex gap-2 text-xs text-muted-foreground">
            <div>{data?.email}</div>
            <div>•</div>
            <div>{data?.stream}</div>
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
            <div className="pl-9">{data?.topic}</div>
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
              <div className="pl-9">{data?.description}</div>
            </ScrollArea>
          </div>

          <div className="space-y-1">
            <div className="flex w-full items-center gap-3">
              <Avatar className="size-6">
                <AvatarFallback className="bg-blue-200">
                  <WrapText className="size-4 text-blue-400" />
                </AvatarFallback>
              </Avatar>
              <div className="text-muted-foreground">Jadwal Wawancara</div>
            </div>
            <div className="flex items-center gap-5 pl-9">
              {data === null ? (
                <></>
              ) : data.interview_date !== null ? (
                dayjs(data.interview_date).format(DATETIME_FORMAT)
              ) : (
                <div className="flex items-center gap-5">Belum ada</div>
              )}
              {data?.status !== "APPROVED" && data?.status !== "REJECTED" ? (
                <WawancaraModal
                  dateInit={data?.interview_date ?? null}
                  onChange={(date: Date) =>
                    setData((prev) => ({ ...prev, interview_date: date }))
                  }
                  modalTrigger={
                    <Button
                      variant="outline"
                      className="flex h-7 gap-2 px-3 py-2 text-sm"
                    >
                      <Pencil size={12} />
                      {data?.interview_date ? "Ubah" : "Jadwalkan"}
                    </Button>
                  }
                />
              ) : null}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex w-full items-center gap-3">
              <Avatar className="size-6">
                <AvatarFallback className="bg-indigo-200">
                  <WrapText className="size-4 text-indigo-400" />
                </AvatarFallback>
              </Avatar>
              <ScrollArea className="text-muted-foreground">Status</ScrollArea>
            </div>
            <div className="pl-9">
              {
                RECAP_FILTER_STATUS_OPTIONS.find(
                  ({ value }) => value === data?.status,
                )?.label
              }
            </div>
          </div>
        </div>

        {data?.status !== "APPROVED" && data?.status !== "REJECTED" && (
          <div className="flex items-center justify-center gap-5 justify-self-end pl-9">
            <RegAcceptDialog
              acceptDialogOpen={acceptDialogOpen}
              setAcceptDialogOpen={setAcceptDialogOpen}
              name={data.name}
              onAccept={() =>
                setData((prev) => ({ ...prev, status: "APPROVED" }))
              }
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
              name={data.name}
              onReject={() =>
                setData((prev) => ({ ...prev, status: "REJECTED" }))
              }
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
  );
};

export default RecapDetail;
