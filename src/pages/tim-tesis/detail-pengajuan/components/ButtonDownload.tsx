import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { AiOutlineCopy } from "react-icons/ai";
import { Berkas } from "../type";
import { FiExternalLink } from "react-icons/fi";
interface ButtonDownloadProps extends HTMLAttributes<HTMLDivElement> {
  data: Berkas[];
}

export const ButtonDownload = forwardRef<HTMLDivElement, ButtonDownloadProps>(
  ({ data, className, ...props }) => {
    return (
      <>
        {data.map((item: Berkas) => {
          return (
            <div
              className={cn(
                "flex flex-col xl:flex-row items-center gap-2 justify-center bg-[#F1F5F9] w-fit py-2 px-3 rounded-sm",
                className,
              )}
              {...props}
            >
              <button className="mr-1 w-fit rounded-sm border border-blue-500 p-1">
                <AiOutlineCopy className="text-lg text-blue-500" />
              </button>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium text-[#475569]">
                  {item.nama}
                </p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={item.link}
                  className="flex items-center gap-1"
                >
                  <FiExternalLink className="size-3.5 text-[#0070FF]" />
                  <p className="text-xs font-medium text-blue-500">Lihat</p>
                </a>
              </div>
            </div>
          );
        })}
      </>
    );
  },
);
