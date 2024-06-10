"use client";
import { DataTable } from "@/components/DataTable";
import TagStatus from "./components/TagStatus";
import useLogBimbingan from "./hooks/useLogBimbingan";
import { Button } from "@/components/ui/button";
// import { VscListFilter } from "react-icons/vsc";
import { Plus } from "lucide-react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
import { Link } from "react-router-dom";

export default function LogMahasiswa(): JSX.Element {
  const { table, onClickCreate, data, isDefault } = useLogBimbingan();

  if (isDefault) {
    return (
      <main className="w-full px-4">
        <p className="w-full text-center">
          Data pendaftaran tidak ditemukan. Silakan mendaftar terlebih dahulu.
        </p>
      </main>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-4 pb-20">
      <TagStatus status={data.status.toLowerCase()} />
      <DataTable
        headline="Log Bimbingan"
        table={table}
        allowHorizontalOverflow
        // customElementsLeft={
        //   <Popover>
        //     <PopoverTrigger asChild>
        //       <Button
        //         variant={"ghost"}
        //         className="flex h-fit flex-row items-center gap-2 rounded-md border border-gray-300 px-3 py-1 text-gray-600 hover:bg-gray-200"
        //       >
        //         <VscListFilter size={14} />
        //         Filter
        //       </Button>
        //     </PopoverTrigger>

        //     <PopoverContent>
        //       <Calendar
        //         defaultMonth={new Date(2022, 8)}
        //         mode="range"
        //         min={3}
        //         max={6}
        //         selected={range}
        //         onSelect={(e) => {
        //           setRange(e);
        //           console.log(e);
        //         }}
        //       />
        //     </PopoverContent>
        //   </Popover>
        // }
        customElementsRight={
          <Link to="/add-log-bimbingan">
            <Button
              className="flex h-fit flex-row items-center gap-2 rounded-md border bg-blue-600 px-3 py-1 text-gray-100"
              onClick={onClickCreate}
            >
              <Plus size={14} />
              Isi Baru
            </Button>
          </Link>
        }
      />
    </div>
  );
}
