import { HTMLAttributes, forwardRef, useState, MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { VariantProps, cva } from "class-variance-authority";
import { AiOutlineCopy, AiOutlineCloudDownload } from "react-icons/ai";

interface CardTableProps extends HTMLAttributes<HTMLDivElement> {
  TableHeader: React.ReactNode;
  TableContent: TableRowProps[];
}

export const CardTable = forwardRef<HTMLDivElement, CardTableProps>(
  ({ TableHeader, TableContent, className, ...props }, ref) => {
    return (
      <>
        <div className={cn("w-full", className)} {...props} ref={ref}>
          {TableHeader}
          {TableContent.map((data, idx) => {
            return (
              <TableRow
                tabIndex={idx}
                tanggal={data.tanggal}
                laporanKemajuan={data.laporanKemajuan}
                todo={data.todo}
                status={data.status}
                rencana={data.rencana}
                berkas={data.berkas}
              />
            );
          })}
        </div>
      </>
    );
  },
);

export const ButtonIcon = ({ sort }: { sort?: () => void }) => {
  const [sortDown, setSortDown] = useState<boolean>(false);

  const handleEvent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSortDown(!sortDown);
    if (sort) {
      sort();
    }
  };

  return (
    <>
      <button onClick={handleEvent}>
        {sortDown ? <IoMdArrowRoundDown /> : <IoMdArrowRoundUp />}
      </button>
    </>
  );
};

interface TableHeaderProps extends HTMLAttributes<HTMLDivElement> {
  sort?: () => void;
}

export const TableHeader = forwardRef<HTMLDivElement, TableHeaderProps>(
  ({ sort, className, ...props }, ref) => {
    return (
      <>
        <div
          className={cn(
            "grid grid-cols-8 gap-1 bg-slate-50 py-3 px-4 border-y-2 border-y-[#EAECF0] text-xs font-medium text-[#667085] justify-center",
            className,
          )}
          ref={ref}
          {...props}
        >
          <div className="col-span-1 flex gap-2 items-center">
            <p>Tanggal</p>
            <ButtonIcon sort={sort} />
          </div>
          <div className="col-span-2">Laporan Kemajuan</div>
          <div className="col-span-2">To-do</div>
          <div className="col-span-1">Berkas</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Rencana</div>
        </div>
      </>
    );
  },
);

export const badgeVariants = cva(
  "flex justify-center items-center font-medium text-xs",
  {
    variants: {
      variant: {
        default: "bg-green-50 text-[#037847]",
        warning: "bg-yellow-50 text-amber-400",
        danger: "bg-red-50 text-red-500",
      },
      size: {
        default: "w-fit px-4 py-1 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface badgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  status?: Status;
}

export const Badge = forwardRef<HTMLDivElement, badgeProps>(
  ({ status = "Sah", size, variant, className, ...props }, ref) => {
    return (
      <>
        <div
          className={cn(badgeVariants({ variant, size, className }))}
          {...props}
          ref={ref}
        >
          <span
            className={`flex w-2 h-2 me-2 ${status == "Sah" ? "bg-[#037847]" : status == "Menunggu" ? "bg-amber-400" : "bg-red-500"} rounded-full`}
          ></span>
          <p className="text-[10px]">{status}</p>
        </div>
      </>
    );
  },
);

type Status = "Sah" | "Menunggu" | "Tidak Sah";

export interface TableRowProps extends HTMLAttributes<HTMLDivElement> {
  tanggal: React.ReactNode;
  laporanKemajuan: React.ReactNode;
  todo: React.ReactNode;
  berkas: {
    nama: string;
    url: string;
  };
  status: Status;
  rencana: React.ReactNode;
}

interface ButtonDownloadProps extends HTMLAttributes<HTMLDivElement> {
  berkas: {
    nama: string;
    url: string;
  };
}

export const ButtonDownload = forwardRef<HTMLDivElement, ButtonDownloadProps>(
  ({ berkas, className, ...props }, ref) => {
    return (
      <>
        <div
          className={cn(
            "flex flex-col xl:flex-row items-center gap-2 justify-center bg-[#F1F5F9] w-fit py-2 px-3 rounded-sm",
            className,
          )}
          {...props}
        >
          <button className="border w-fit rounded-sm p-1 border-blue-500">
            <AiOutlineCopy className="text-blue-500 text-xl" />
          </button>
          <div className="flex flex-col">
            <p className="text-[10px] font-medium text-[#475569]">
              {berkas.nama}
            </p>
            <a href={berkas.url} className="flex gap-1">
              <AiOutlineCloudDownload className="text-blue-500 text-sm" />
              <p className="text-[10px] font-medium text-blue-500">Download</p>
            </a>
          </div>
        </div>
      </>
    );
  },
);

export const TableRow = forwardRef<HTMLDivElement, TableRowProps>(
  (
    {
      tanggal,
      laporanKemajuan,
      todo,
      berkas,
      status,
      rencana,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <>
        <div
          className={cn(
            "grid grid-cols-8 gap-1 py-3 px-4 border-b-2 border-b-[#EAECF0] text-xs text-[#667085] justify-center",
            className,
          )}
          {...props}
          ref={ref}
        >
          <div className="col-span-1">{tanggal}</div>
          <div className="col-span-2">{laporanKemajuan}</div>
          <div className="col-span-2">{todo}</div>
          <div className="col-span-1">
            <ButtonDownload berkas={berkas} />
          </div>
          <div className="col-span-1">
            <Badge
              status={status}
              variant={
                status == "Sah"
                  ? "default"
                  : status == "Menunggu"
                    ? "warning"
                    : "danger"
              }
            />
          </div>
          <div className="col-span-1">{rencana}</div>
        </div>
      </>
    );
  },
);
