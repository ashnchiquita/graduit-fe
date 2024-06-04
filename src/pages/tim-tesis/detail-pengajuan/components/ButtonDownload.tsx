import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { AiOutlineCopy, AiOutlineCloudDownload } from "react-icons/ai";
import { Berkas } from "../type";
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
              <button className="border w-fit rounded-sm p-1 border-blue-500">
                <AiOutlineCopy className="text-blue-500 text-xl" />
              </button>
              <div className="flex flex-col">
                <p className="text-[10px] font-medium text-[#475569]">
                  {item.nama}
                </p>
                <a href={item.link} className="flex gap-1">
                  <AiOutlineCloudDownload className="text-blue-500 text-sm" />
                  <p className="text-[10px] font-medium text-blue-500">
                    Download
                  </p>
                </a>
              </div>
            </div>
          );
        })}
      </>
    );
  },
);
