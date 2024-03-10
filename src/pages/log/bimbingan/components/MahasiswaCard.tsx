import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { Icon } from "@iconify/react";
import type { User } from "@/lib/entity";
import { Link } from "react-router-dom";

const MahasiswaCard = ({ user, logs }: { user: User; logs: boolean }) => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="rounded-lg bg-white px-6 py-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center space-x-4">
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
          <span className="text-slate-500">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </span>
          <p className="text-xl">Deskripsi</p>
          <span className="text-slate-500">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </span>
        </div>
      )}
    </div>
  );
};

export default MahasiswaCard;
