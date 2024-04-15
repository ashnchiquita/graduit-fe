import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  SubmisiMahasiswa,
  SubmisiTugas,
  SubmissionTugasHookRet,
} from "../types";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import BerkasBadge from "@/components/BerkasBadge";
import StatusTugasBadge from "../components/StatusTugasBadge";
import { Button } from "@/components/ui/button";

export default function useSubmissionTugas(): SubmissionTugasHookRet {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("selesai") ?? "",
  );

  const { idTugas } = useParams();

  const handleSearchValueChange = (value: string) => {
    const obj: any = {};
    value && (obj.search = value);
    statusFilter && statusFilter !== "semua" && (obj.filter = statusFilter);

    setSearchParams(obj);
    setSearchValue(value);
  };

  const [data] = useState<SubmisiTugas>({
    tugas: "Pengumpulan Bagian B",
    deskripsiTugas:
      "Perhatikan hanya satu orang saja yang perlu mengumpul (NIM terkecil) supaya memudahkan asisten untuk memeriksa dan mendokumentasi. Jika dalam bentuk file, jawablah dengan tautan atau link tugas.",
    berkasTugas: [
      {
        nama: "Youtube",
        link: "https://www.youtube.com/",
      },
      {
        nama: "Youtube",
        link: "https://www.youtube.com/",
      },
      {
        nama: "Youtube",
        link: "https://www.youtube.com/",
      },
    ],
    namaMatkul: "IF3260 Komputasi Masyarakat",
    waktuMulai: new Date(),
    waktuSelesai: new Date(),
    namaPembuat: "Dr. Rinaldy Adin, S.T., M.T.",
    waktuDibuat: new Date(),
    namaPengubah: "Dr. Rinaldy Adin, S.T., M.T.",
    waktuDiubah: new Date(),
    jawaban: "Jawaban saya adalah sebagai berikut. File terlampir.",
    mahasiswa: [
      {
        id: "111",
        nim: "23521149",
        nama: "Rava James Maulana",
        berkas: [
          {
            nama: "Youtube",
            link: "https://www.youtube.com/",
          },
          {
            nama: "Youtube",
            link: "https://www.youtube.com/",
          },
        ],
        selesai: true,
      },
      {
        id: "222",
        nim: "23521148",
        nama: "Maulana James Rava",
        berkas: [],
        selesai: false,
      },
      {
        id: "333",
        nim: "23521147",
        nama: "James Rava Maulana",
        berkas: [],
        selesai: false,
      },
      {
        id: "444",
        nim: "23521146",
        nama: "Rava James Maulana",
        berkas: [
          {
            nama: "Youtube",
            link: "https://www.youtube.com/",
          },
        ],
        selesai: true,
      },
      {
        id: "555",
        nim: "23521145",
        nama: "Maulana James Rava",
        berkas: [],
        selesai: false,
      },
      {
        id: "666",
        nim: "23521144",
        nama: "James Rava Maulana",
        berkas: [],
        selesai: false,
      },
    ],
  });

  const handleStatusFilterChange = (value: string) => {
    const obj: any = {};
    value && value !== "semua" && (obj.selesai = value);
    searchValue && (obj.search = searchValue);

    setSearchParams(obj);
    setStatusFilter(value);
  };

  const columns: ColumnDef<SubmisiMahasiswa>[] = [
    {
      header: "NIM",
      accessorKey: "nim",
      enableSorting: true,
    },
    {
      header: "Nama",
      accessorKey: "nama",
      enableSorting: false,
    },
    {
      header: "Berkas",
      accessorKey: "berkas",
      cell: ({ row }) => (
        <ul className="flex flex-col items-start gap-2">
          {row.original.berkas.map((b, index) => (
            <BerkasBadge key={index} title={b.nama} link={b.link} />
          ))}
        </ul>
      ),
      enableSorting: false,
    },
    {
      header: "Status Pengerjaan",
      accessorKey: "selesai",
      cell: ({ row }) => <StatusTugasBadge selesai={row.original.selesai} />,
      enableSorting: false,
    },
    {
      id: "link",
      cell: ({ row }) => (
        <Link to={`/tugas/${idTugas}/submisi/${row.original.id}`}>
          <Button
            variant="outline"
            className="size-fit border-blue-300 text-xs text-blue-500 hover:text-blue-500"
          >
            Buka
          </Button>
        </Link>
      ),
      meta: {
        align: "right",
      },
    },
  ];

  const table = useReactTable({
    columns,
    data: data.mahasiswa,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    data,
    searchValue,
    handleSearchValueChange,
    table,
    statusFilter,
    handleStatusFilterChange,
    idTugas,
  };
}
