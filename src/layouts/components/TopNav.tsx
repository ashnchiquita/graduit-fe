// Local imports
import Logo from "@/assets/logo.svg";
import { VscClose, VscMenu } from "react-icons/vsc";

interface TopNavProps {
  closed: boolean;
  setClosed: (closed: boolean) => void;
}

export default function TopNav({
  closed,
  setClosed,
}: TopNavProps): JSX.Element {
  return (
    <div className="sticky top-0 flex w-full justify-between border-b-[1px] border-b-gray-300 bg-white px-4 py-2 md:hidden">
      <div className="flex items-center gap-2">
        <img
          src={Logo}
          alt="Logo"
          className="ml-2 size-5 transition-all duration-100 lg:size-6"
        />
        <h1 className="font-['Urbanist'] text-xl font-bold transition-all duration-100 lg:text-2xl">
          GraduIT
        </h1>
      </div>
      <button onClick={() => setClosed(!closed)}>
        {!closed ? <VscClose size={20} /> : <VscMenu size={20} />}
      </button>
    </div>
  );
}
