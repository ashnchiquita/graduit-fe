import { SidangEnum } from "@/types/jenis-sidang";

interface JenisSidangProps {
  jenis_sidang: SidangEnum;
}

const JenisSidang = ({ jenis_sidang }: JenisSidangProps) => {
  return (
    <td
      className={`${jenis_sidang === SidangEnum.SIDANG ? "bg-green-600" : "bg-blue-600"} flex w-fit flex-row items-center gap-2 rounded-full  px-3 py-1 text-white`}
    >
      <div
        className={`${jenis_sidang === SidangEnum.SIDANG ? "bg-green-900" : "bg-blue-900"} size-[10px] rounded-full `}
      />
      <p>{jenis_sidang}</p>
    </td>
  );
};

export default JenisSidang;
