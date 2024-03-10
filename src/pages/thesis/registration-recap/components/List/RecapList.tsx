import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import PageNavigation from "@/components/ui/page-navigation/page-navigation";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { Search } from "lucide-react";
import { VscChevronDown, VscChevronRight } from "react-icons/vsc";
import { DATETIME_FORMAT, RECAP_FILTER_STATUS_OPTIONS } from "../../constants";
import { RegistrationRecapListData } from "../../models";
import useRecapListImpl from "./useRecapListImpl";

type RecapListProps = {
  currentApplicationId: string;
  setCurrentApplicationId: (id: string) => void;
  listData: RegistrationRecapListData[];
};

const RecapList = ({
  currentApplicationId,
  setCurrentApplicationId,
  listData,
}: RecapListProps) => {
  const {
    searchValue,
    statusFilter,
    currentPage,
    setCurrentPage,
    setStatusFilter,
    setSearchValue,
  } = useRecapListImpl();

  return (
    <div className="flex size-full flex-col justify-between md:w-[344px]">
      <div className="space-y-[20px]">
        <div className="space-y-[10px]">
          <div className="group flex items-center rounded-md border border-gray-300 px-3 ring-offset-background placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
            <Search className="mr-2 size-4 shrink-0 opacity-50" />
            <Input
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              placeholder="Cari mahasiswa..."
              className="border-none shadow-none focus-visible:outline-none focus-visible:ring-0"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="select-none text-slate-700">Status Pengajuan</div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex cursor-pointer items-center justify-end gap-1 rounded-sm px-1 text-slate-900 ring-offset-background focus-within:ring-1 focus-within:ring-ring focus:outline-none">
                {
                  RECAP_FILTER_STATUS_OPTIONS.find(
                    ({ value }) => value === statusFilter,
                  )?.label
                }
                <VscChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {RECAP_FILTER_STATUS_OPTIONS.map(({ label, value }) => (
                  <DropdownMenuItem
                    onClick={() => {
                      setStatusFilter(value);
                    }}
                    className="cursor-pointer"
                    key={value}
                  >
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          {listData.map(({ name, apply_date, id }) => (
            <div
              className={cn(
                "flex items-center justify-between rounded-xl bg-white px-5 py-4 cursor-pointer border hover:bg-slate-50",
                id === currentApplicationId
                  ? "border-slate-300"
                  : "border-accent",
              )}
              onClick={() => {
                setCurrentApplicationId(id);
              }}
            >
              <div className="flex items-center gap-5">
                <Avatar>
                  <AvatarFallback className="bg-violet-500 text-xl text-white">
                    {name.length > 0 && name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div>{name}</div>
                  <div className="text-xs text-muted-foreground">
                    {dayjs(apply_date).format(DATETIME_FORMAT)}
                  </div>
                </div>
              </div>
              <VscChevronRight size={24} />
            </div>
          ))}
        </div>
      </div>
      <PageNavigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={10}
      />
    </div>
  );
};

export default RecapList;
