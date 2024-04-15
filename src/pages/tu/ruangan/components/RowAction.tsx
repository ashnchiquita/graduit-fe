import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaHistory } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link } from "react-router-dom";

interface ComponentProps {
  idPengajuan: string;
  handleSendMail: () => void;
}

const RowAction = ({ idPengajuan, handleSendMail }: ComponentProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <IoEllipsisVertical className="text-[#94A3B8]" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="left"
        className="w-[233px] overflow-hidden rounded-md p-0"
      >
        <Link to={`/ruangan-sidang/${idPengajuan}`}>
          <Button className="flex w-full flex-row items-center justify-start gap-2 bg-transparent text-xs text-slate-700 hover:bg-gray-100">
            <FaHistory size={14} />
            Lihat Detail Pengajuan
          </Button>
        </Link>
        <Button
          className="flex w-full flex-row items-center justify-start gap-2 bg-transparent text-xs text-slate-700 hover:bg-gray-100"
          onClick={() => handleSendMail()}
        >
          <FiMail size={14} />
          Kirim Ulang Email
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default RowAction;
