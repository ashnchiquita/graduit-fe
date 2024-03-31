import { AiOutlineCopy, AiOutlineCloudDownload } from "react-icons/ai";
import { Row } from "@tanstack/react-table";
import { BimbinganLogs } from "../types";

export default function DownloadBox({
  row,
}: {
  row: Row<BimbinganLogs>;
}): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      {row.original.berkas.map((item, index) => (
        <div
          key={index}
          className="bg-[#F1F5F9] flex py-2 px-4 rounded-md gap-3 "
        >
          <div className="flex gap-3">
            <div className="bg-transparent border rounded-md border-[#0070FF] p-1 w-8 h-8">
              <AiOutlineCopy className="h-5 w-5 text-[#0070FF]" />
            </div>
            <div className="flex flex-col">
              <p className="font-medium text-xs">{item}</p>
              <div className="flex gap-0.5 hover:underline  hover:cursor-pointer">
                <AiOutlineCloudDownload className="h-3.5 w-3.5 text-[#0070FF] mt-0.5" />
                <p className="text-[10px] text-[#0070FF]">Download</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
