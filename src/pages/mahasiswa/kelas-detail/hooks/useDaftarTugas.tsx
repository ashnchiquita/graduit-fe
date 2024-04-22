import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RowAction from "../components/RowAction";
import useSWR from "swr";
import { getDaftarTugas } from "../clients";
import StatusTugasBadge from "@/pages/dosen/submission-tugas/components/StatusTugasBadge";

export type Tugas = {
  nomor: number;
  id: string;
  judul: string;
  waktuMulai: string;
  waktuSelesai: string;
  selesai: boolean;
};

export default function useDaftarTugas(idKelas: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("filter") ?? "",
  );

  const handleSearchValueChange = (value: string) => {
    const obj: any = {};
    value && (obj.search = value);
    statusFilter && statusFilter !== "semua" && (obj.filter = statusFilter);

    setSearchParams(obj);
    setSearchValue(value);
  };

  const [data, setData] = useState<Tugas[]>([]);

  const { data: fetchedTugas } = useSWR(
    `/tugas/kelas/${idKelas}/daftar-tugas`,
    async () => {
      const res = await getDaftarTugas();
      const filtered = res.data.filter((tugas) => tugas.kelasId === idKelas);

      const mapped = filtered.map((tugas, idx) => {
        return {
          id: tugas.id,
          judul: tugas.judul,
          waktuMulai: tugas.waktuMulai,
          waktuSelesai: tugas.waktuSelesai,
          nomor: idx + 1,
          selesai: tugas.isSubmitted === true,
        } as Tugas;
      });

      return mapped;
    },
  );

  useEffect(() => {
    if (fetchedTugas) {
      setData([...fetchedTugas]);
    }
  }, [fetchedTugas]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const columns: ColumnDef<Tugas>[] = [
    {
      header: "Nomor",
      accessorKey: "nomor",
      enableSorting: false,
    },
    {
      header: "Judul",
      accessorKey: "judul",
      enableSorting: false,
    },
    {
      header: "Start",
      accessorKey: "waktuMulai",
      enableSorting: false,
    },
    {
      header: "End",
      accessorKey: "waktuSelesai",
      enableSorting: false,
    },
    {
      header: "Status Pengerjaan",
      cell: ({ row }) => <StatusTugasBadge selesai={row.original.selesai} />,
      enableSorting: false,
    },
    {
      id: "link",
      cell: ({ row }) => (
        <RowAction url={`/tugas/assignment/${row.original.id}`} />
      ),
      meta: {
        align: "right",
      },
    },
  ];

  const table = useReactTable({
    columns,
    data,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    searchValue,
    handleSearchValueChange,
    statusFilter,
    handleStatusFilterChange,
  };
}
