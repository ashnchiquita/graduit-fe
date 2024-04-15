import { CgProfile } from "react-icons/cg";
import { FaArrowLeft } from "react-icons/fa6";
import { useState } from "react";
import { Icon } from "@iconify/react";
import type { User } from "@/lib/entity";
import { Link, useNavigate } from "react-router-dom";

const MahasiswaCard = ({
  user,
  topik,
  deskripsiTopik,
  backArrow,
  logs,
}: {
  user: User;
  topik: string;
  deskripsiTopik: string;
  backArrow: boolean;
  logs: boolean;
}) => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };
  const navigate = useNavigate();

  return (
    <div className="rounded-lg border border-[#EAECF0] bg-white px-6 py-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center space-x-4">
          {backArrow ? (
            <FaArrowLeft
              onClick={() => navigate(-1)}
              className="cursor-pointer text-[20px] hover:text-blue-500"
            />
          ) : (
            <></>
          )}

          <CgProfile className="text-[60px]" />

          <div className="flex flex-col">
            <p className="mb-2 lg:text-2xl">{user.name}</p>
            <div className="flex flex-row items-center space-x-2">
              <p className="font-light text-gray-500">{user.email}</p>
              <div className="aspect-square size-[2px] rounded-full bg-gray-500" />
              <p className="font-light text-gray-500">{user.major}</p>
            </div>
          </div>
        </div>
        {logs ? (
          <Link to={`/log/bimbingan/${user.id}`}>
            <p className="hover:cursor-pointer hover:underline">See Logs</p>
          </Link>
        ) : (
          <>
            <button className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <Icon
                icon="lucide:chevron-down"
                width="20"
                height="20"
                onClick={toggleSubMenu}
              />
            </button>
          </>
        )}
      </div>

      {subMenuOpen && (
        <div className="my-2 flex h-[50%] flex-col space-y-4 px-[75px] pt-3">
          <p className="text-xl">Topik</p>
          <span className="text-slate-500">{topik}</span>
          <p className="text-xl">Deskripsi</p>
          <span className="text-slate-500">{deskripsiTopik}</span>
        </div>
      )}
    </div>
  );
};

export default MahasiswaCard;
