import { AiOutlineCopy } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
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
          className="flex gap-3 rounded-md bg-[#F1F5F9] px-4 py-2 "
        >
          <div className="flex gap-3">
            <div className="size-8 rounded-md border border-[#0070FF] bg-transparent p-1">
              <AiOutlineCopy className="size-5 text-[#0070FF]" />
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-medium">{item.nama}</p>
              <div className="flex gap-0.5 hover:cursor-pointer  hover:underline">
                <FiExternalLink className="mt-0.5 size-3.5 text-[#0070FF]" />
                <a href={item.link} className="text-[10px] text-[#0070FF]">
                  Lihat
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
