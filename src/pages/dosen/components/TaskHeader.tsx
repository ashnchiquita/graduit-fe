import BerkasBadge from "@/components/BerkasBadge";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

type TaskHeaderProps = {
  title: string;
  description?: string;
  course: string;
  startTime: Date;
  endTime: Date;
  creatorName: string;
  createdAt: Date;
  editorName: string;
  editedAt: Date;
  files?: {
    title: string;
    link: string;
  }[];
  changeDetail?: boolean;
};

export default function TaskHeader({
  title,
  description,
  course,
  startTime,
  endTime,
  creatorName,
  createdAt,
  editorName,
  editedAt,
  changeDetail,
  files,
}: TaskHeaderProps): JSX.Element {
  const DATETIME_FORMAT = "DD/MM/YYYY - HH:mm";

  return (
    <section className="relative flex w-full flex-col gap-2.5 rounded-2xl bg-white p-7 text-xs">
      <div className="absolute left-0 top-0 h-1.5 w-full rounded-t-2xl bg-sky-700 md:h-full md:w-1.5 md:rounded-l-2xl" />

      <div className="flex w-full items-center justify-between">
        <h2 className="text-xl font-medium">{title}</h2>
        {changeDetail && (
          <Link className="hidden md:block" to="/">
            <Button className="bg-blue-500 px-4 text-sm text-gray-100 hover:bg-blue-600">
              Ubah detail tugas
            </Button>
          </Link>
        )}
      </div>

      <div>
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-3.5">
          <p>
            Course: <span className="text-blue-500">{course}</span>
          </p>
          <div className="hidden h-6 w-[1px] bg-gray-300 md:block" />
          <div className="flex items-center gap-2.5">
            <AiOutlineClockCircle className="size-4 text-gray-400" />
            <p className="text-gray-600">
              Start: {dayjs(startTime).format(DATETIME_FORMAT)}
            </p>
          </div>
          <div className="hidden h-6 w-[1px] bg-gray-300 md:block" />
          <div className="flex items-center gap-2.5">
            <AiOutlineClockCircle className="size-4 text-gray-400" />
            <p className="text-gray-600">
              End: {dayjs(endTime).format(DATETIME_FORMAT)}
            </p>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden items-center gap-3.5 text-balance text-gray-600 md:flex">
          <p>
            Dibuat oleh:{" "}
            <span className="text-nowrap text-blue-500">{creatorName}</span>{" "}
            pada <span>{dayjs(createdAt).format(DATETIME_FORMAT)}</span>
          </p>
          <div className="h-6 w-[1px] bg-gray-300" />
          <p>
            Diperbarui oleh:{" "}
            <span className="text-nowrap text-blue-500">{editorName}</span> pada{" "}
            <span>{dayjs(editedAt).format(DATETIME_FORMAT)}</span>
          </p>
        </div>
      </div>

      {description && (
        <p className="mt-3 text-gray-600 md:mt-0 md:text-sm">{description}</p>
      )}

      {/* Mobile */}
      <div className="flex flex-col text-balance text-[10px] text-gray-600 md:hidden">
        <p>
          Dibuat oleh:{" "}
          <span className="text-nowrap text-blue-500">{creatorName}</span> pada{" "}
          <span>{dayjs(createdAt).format(DATETIME_FORMAT)}</span>
        </p>
        <p>
          Diperbarui oleh:{" "}
          <span className="text-nowrap text-blue-500">{editorName}</span> pada{" "}
          <span>{dayjs(editedAt).format(DATETIME_FORMAT)}</span>
        </p>
      </div>

      {files && (
        <ul className="flex flex-wrap items-center gap-2.5">
          {files.map((file, index) => (
            <BerkasBadge key={index} title={file.title} link={file.link} />
          ))}
        </ul>
      )}

      {changeDetail && (
        <Link className="md:hidden" to="/">
          <Button className="mt-3 bg-blue-500 px-4 text-sm text-gray-100 hover:bg-blue-600">
            Ubah detail tugas
          </Button>
        </Link>
      )}
    </section>
  );
}
