import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { SubmisiMahasiswa, SubmissionTugasHookRet } from "../types";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import BerkasBadge from "@/components/BerkasBadge";
import StatusTugasBadge from "../components/StatusTugasBadge";
import { Button } from "@/components/ui/button";
import { getListMhs, getTugas } from "../clients";
import useSWR from "swr";

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

  const defaultData = {
    tugas: "",
    deskripsiTugas: "",
    berkasTugas: [],
    namaMatkul: "",
    waktuMulai: new Date(),
    waktuSelesai: new Date(),
    namaPembuat: "",
    waktuDibuat: new Date(),
    namaPengubah: "",
    waktuDiubah: new Date(),
  };

  const handleStatusFilterChange = (value: string) => {
    const obj: any = {};
    value && value !== "semua" && (obj.selesai = value);
    searchValue && (obj.search = searchValue);

    setSearchParams(obj);
    setStatusFilter(value);
  };

  const { data: listMhs = [] } = useSWR(
    [`/tugas/${idTugas}/submisi`, searchValue, statusFilter],
    async (): Promise<SubmisiMahasiswa[]> => {
      if (!idTugas) return [];

      const { data } = await getListMhs(
        idTugas,
        searchValue,
        statusFilter === "true"
          ? true
          : statusFilter === "false"
            ? false
            : undefined,
      );

      return data.map((d) => ({
        id: d.id,
        nim: d.nim,
        nama: d.nama,
        idSubmisi: d.submisiTugas?.id,
        berkas:
          d?.submisiTugas?.berkasSubmisiTugas.map((b) => ({
            nama: b.nama,
            link: b.url,
          })) ?? [],
        selesai: d?.submisiTugas?.isSubmitted ?? false,
      }));
    },
  );

  const { data = defaultData } = useSWR(`/tugas/${idTugas}`, async () => {
    if (!idTugas) return defaultData;

    const { data } = await getTugas(idTugas);
    return {
      tugas: data.judul,
      deskripsiTugas: data.deskripsi,
      berkasTugas: data.berkasTugas.map((b) => ({
        nama: b.nama,
        link: b.url,
      })),
      namaMatkul: `${data.kelas.mataKuliah.kode} ${data.kelas.mataKuliah.nama}`,
      waktuMulai: new Date(data.waktuMulai),
      waktuSelesai: new Date(data.waktuSelesai),
      namaPembuat: data.pembuat.nama,
      waktuDibuat: new Date(data.createdAt),
      namaPengubah: data.pengubah.nama,
      waktuDiubah: new Date(data.updatedAt),
    };
  });

  const [tableData, setTableData] = useState<SubmisiMahasiswa[]>([]);
  useEffect(() => {
    setTableData(listMhs);
  }, [listMhs]);

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
      cell: ({ row }) =>
        row.original.selesai ? (
          <Link to={`/tugas/${idTugas}/submisi/${row.original.idSubmisi}`}>
            <Button
              variant="outline"
              className="size-fit border-blue-300 text-xs text-blue-500 hover:text-blue-500"
            >
              Buka
            </Button>
          </Link>
        ) : null,
      meta: {
        align: "right",
      },
    },
  ];

  const table = useReactTable({
    columns,
    data: tableData,
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
