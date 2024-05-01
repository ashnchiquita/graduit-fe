"use client";
import { DataTable } from "@/components/DataTable";
import TagStatus from "./components/TagStatus";
import useLogBimbingan from "./hooks/useLogBimbingan";
import { Button } from "@/components/ui/button";
import { VscListFilter } from "react-icons/vsc";
import { Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function LogMahasiswa(): JSX.Element {
  const { table, onClickCreate, range, setRange, data } =
    useLogBimbingan();

  return (
    <div className="flex flex-col gap-4 px-4 pb-20">
      <TagStatus status={data.status ? "SAH" : "TIDAKSAH"} />
      <DataTable
        headline="Log Bimbingan"
        table={table}
        customElementsLeft={
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"ghost"}
                className="flex h-fit flex-row items-center gap-2 rounded-md border border-gray-300 px-3 py-1 text-gray-600 hover:bg-gray-200"
              >
                <VscListFilter size={14} />
                Filter
              </Button>
            </PopoverTrigger>

            <PopoverContent>
              <Calendar
                defaultMonth={new Date(2022, 8)}
                mode="range"
                min={3}
                max={6}
                selected={range}
                onSelect={setRange}
              />
            </PopoverContent>
          </Popover>
        }
        customElementsRight={
          <Button
            className="flex h-fit flex-row items-center gap-2 rounded-md border px-3 py-1 bg-blue-600 text-gray-100"
            onClick={onClickCreate}
          >
            <Plus size={14} />
            Isi Baru
          </Button>
        }
      />
    </div>
  );
}
