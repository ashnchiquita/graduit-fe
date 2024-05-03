import { useSearchParams } from "react-router-dom";
import {
  DashboardTimTugasHookProps,
  DashboardTimTugasHookRet,
  DashTableData,
} from "../types";
import { useEffect, useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useSWR from "swr";
import CheckIcon from "@/assets/dash-tim-tugas/check.svg";
import RowAction from "../components/RowAction";

export default function useDashboardTimTugas({
  strata,
}: DashboardTimTugasHookProps): DashboardTimTugasHookRet {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );
  const [strataFilter, setStrataFilter] = useState<"S1" | "S2">("S1");

  const handleSearchValueChange = (value: string) => {
    const obj: any = {};
    value && (obj.search = value);

    setSearchParams(obj);
    setSearchValue(value);
  };

  const { data = [], mutate } = useSWR(
    ["/dashboard-tim-tugas", searchValue],
    () => {
      if (strata === "S1" || (strata === "ALL" && strataFilter === "S1")) {
        return [
          {
            nim: "13521149",
            nama: "John Doe",
            pengajuanTopik: true,
            seminarProposal: true,
            seminarTesis: true,
            sidang: true,
          },
          {
            nim: "13521941",
            nama: "Jane Doe",
            pengajuanTopik: true,
            seminarProposal: false,
            seminarTesis: false,
            sidang: false,
          },
        ];
      } else {
        return [
          {
            nim: "23521149",
            nama: "John Doe",
            pengajuanTopik: true,
            seminarProposal: true,
            seminarTesis: true,
            sidang: true,
          },
          {
            nim: "23521941",
            nama: "Jane Doe",
            pengajuanTopik: true,
            seminarProposal: true,
            seminarTesis: false,
            sidang: false,
          },
          {
            nim: "23521491",
            nama: "Kia Mhalifa",
            pengajuanTopik: true,
            seminarProposal: true,
            seminarTesis: true,
            sidang: false,
          },
        ];
      }
    },
  );

  const allColumns: ColumnDef<DashTableData>[] = [
    {
      header: "NIM",
      accessorKey: "nim",
      enableSorting: false,
      minSize: 100,
    },
    {
      header: "Nama",
      accessorKey: "nama",
      enableSorting: false,
      minSize: 300,
    },
    {
      header: "Pengajuan Topik",
      accessorKey: "pengajuanTopik",
      enableSorting: false,
      minSize: 195,
      cell: ({ row }) =>
        row.original.pengajuanTopik ? (
          <img src={CheckIcon} alt="check" className="size-4" />
        ) : null,
      meta: {
        align: "center",
        alignHeader: "center",
      },
    },
    {
      header: "Seminar Proposal",
      accessorKey: "seminarProposal",
      enableSorting: false,
      minSize: 235,
      cell: ({ row }) =>
        row.original.seminarProposal ? (
          <img src={CheckIcon} alt="check" className="size-4" />
        ) : null,
      meta: {
        align: "center",
        alignHeader: "center",
      },
    },
    {
      header: "Seminar Tesis",
      accessorKey: "seminarTesis",
      enableSorting: false,
      minSize: 180,
      cell: ({ row }) =>
        row.original.seminarTesis ? (
          <img src={CheckIcon} alt="check" className="size-4" />
        ) : null,
      meta: {
        align: "center",
        alignHeader: "center",
      },
    },
    {
      header: `Sidang ${strata === "S1" ? "Tugas Akhir" : "Tesis"}`,
      accessorKey: "sidang",
      enableSorting: false,
      minSize: strata === "S1" ? 240 : 160,
      cell: ({ row }) =>
        row.original.sidang ? (
          <img src={CheckIcon} alt="check" className="size-4" />
        ) : null,
      meta: {
        align: "center",
        alignHeader: "center",
      },
    },
    {
      id: "aksi",
      cell: ({ row }) => <RowAction row={row} searchValue={searchValue} />,
      enableSorting: false,
      minSize: 100,
      meta: {
        align: "right",
        alignHeader: "center",
      },
    },
  ];

  useEffect(() => {
    mutate();
  }, [strataFilter]);

  let columns = allColumns;
  if (strata === "S1" || (strata === "ALL" && strataFilter === "S1")) {
    columns.splice(4, 1);
  }

  let table = useReactTable({
    columns,
    data,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    searchValue,
    handleSearchValueChange,
    strataFilter,
    setStrataFilter,
  };
}
