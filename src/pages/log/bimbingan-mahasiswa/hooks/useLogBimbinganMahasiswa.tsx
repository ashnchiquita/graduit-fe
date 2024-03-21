import {
  ColumnDef,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { BimbinganLogs } from "../types";
import { useEffect, useState } from "react";
import DownloadBox from "../components/DownloadBox";
import StatusCircle from "../components/StatusCircle";

export default function useLogBimbinganMahasiswa() {
  const dummyBimbinganLogs: BimbinganLogs[] = [
    {
      tanggal: "01/03/2024",
      laporan_kemajuan:
        "Minggu pertama, telah menyelesaikan pembacaan buku A dan B",
      todo: "Minggu depan, akan mulai menulis bab 1 dari tesis",
      rencana:
        "Minggu depan, akan bertemu dengan dosen pembimbing untuk diskusi lebih lanjut",
      berkas: ["file1.pdf", "file2.docx"],
      status: true,
    },
    {
      tanggal: "08/03/2024",
      laporan_kemajuan: "Minggu kedua, telah menulis bab 1 dari tesis",
      todo: "Minggu depan, akan menyelesaikan analisis data",
      rencana: "Minggu depan, akan mengajukan proposal penelitian",
      berkas: ["proposal.pdf", "data.xlsx"],
      status: true,
    },
    {
      tanggal: "15/03/2024",
      laporan_kemajuan: "Minggu ketiga, telah menyelesaikan analisis data",
      todo: "Minggu depan, akan menulis bab 2 dari tesis",
      rencana: "Minggu depan, akan membuat presentasi untuk seminar proposal",
      berkas: ["presentation.pptx", "thesis.docx"],
      status: false,
    },
    // Add more dummy data as needed
  ];

  const columns: ColumnDef<BimbinganLogs>[] = [
    {
      header: "Tanggal",
      accessorKey: "tanggal",
      minSize: 1000,
    },
    {
      header: "Laporan Kemajuan",
      accessorKey: "laporan_kemajuan",
      minSize: 1000,
    },
    {
      header: "To-do",
      accessorKey: "todo",
      minSize: 1000,
    },
    {
      header: "Rencana",
      accessorKey: "rencana",
      minSize: 1000,
    },
    {
      header: "Berkas",
      accessorKey: "berkas",
      cell: ({ row }) => <DownloadBox row={row} />,
      minSize: 1000,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => <StatusCircle row={row} />,
      minSize: 1000,
      enableSorting: false,
    },
  ];

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "id",
      desc: false,
    },
  ]);

  useEffect(() => {
    console.log(sorting);
  }, [sorting]);

  const table = useReactTable({
    data: dummyBimbinganLogs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      pagination,
      sorting,
    },
  });

  return {
    table,
  };
}
