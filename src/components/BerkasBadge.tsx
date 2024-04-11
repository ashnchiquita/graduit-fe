import { AiOutlineCopy } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";

type BerkasBadgeProps = {
  title: string;
  link: string;
};

export default function BerkasBadge({
  title,
  link,
}: BerkasBadgeProps): JSX.Element {
  return (
    <div className="flex gap-3 rounded-lg bg-[#F1F5F9] py-2 pl-2 pr-6">
      <div className="flex gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-md border border-blue-500 bg-transparent p-1">
          <AiOutlineCopy className="size-5 text-blue-500" />
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-medium">{title}</p>

          <Link to={link} target="_blank" className="block">
            <div className="flex gap-1 hover:underline">
              <FiExternalLink className="mt-0.5 size-2.5 text-blue-500" />
              <p className="text-[10px] font-bold text-blue-500">Lihat</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
