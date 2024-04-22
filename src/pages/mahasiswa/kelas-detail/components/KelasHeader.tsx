import { MdOutlineClass } from "react-icons/md";
import KelasDialog, { KelasDialogProps } from "./KelasDialog";

type KelasHeaderProps = {
  nomor: string;
  kodeMataKuliah: string;
  namaMataKuliah: string;
  warna: string;
  totalMahasiswa: number;
  detail: KelasDialogProps;
};

export default function KelasHeader(props: KelasHeaderProps) {
  return (
    <div className="flex w-full rounded-lg bg-white">
      <div className={`w-[30%] rounded-l-lg ${props.warna}`}></div>
      <div className="flex w-full flex-row items-center justify-between py-5 pl-8 pr-5">
        <div className="flex w-full flex-col gap-3">
          <h1 className="text-xl">
            {props.kodeMataKuliah} {props.namaMataKuliah}
          </h1>
          <div className="inline-flex items-center gap-3">
            <div className="inline-flex items-center gap-2">
              <p className="text-gray-600">Course: </p>
              <p className="mr-10 text-blue-500">
                {props.kodeMataKuliah} - {props.nomor}
              </p>
            </div>
            <p className="text-gray-300">|</p>
            <div className="inline-flex items-center gap-2 text-gray-600">
              <MdOutlineClass size={18} />
              <p>{props.totalMahasiswa} Mahasiswa</p>
            </div>
          </div>
        </div>
        <KelasDialog {...props.detail} />
      </div>
    </div>
  );
}
