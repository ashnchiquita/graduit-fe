import CheckIcon from "@/assets/dash-tim-tugas/check.svg";
import {
  ColumnDef,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { getDashboardTimTAData, getDashboardTimTesisData } from "../client";
import RowAction from "../components/RowAction";
import {
  DashboardTimTugasHookProps,
  DashboardTimTugasHookRet,
  DashTableData,
  GetDashboardTimTAReqParams,
  GetDashboardTimTesisReqParams,
  GetDashboardTimTesisStatusEnum,
} from "../types";

export default function useDashboardTimTugas({
  strata,
}: DashboardTimTugasHookProps): DashboardTimTugasHookRet {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );
  const [strataFilter, setStrataFilter] = useState<"S1" | "S2">("S1");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const handleSearchValueChange = (value: string) => {
    const obj: any = {};
    value && (obj.search = value);

    setSearchParams(obj);
    setSearchValue(value);
  };

  const { data: { data, pageCount } = { data: [], pageCount: 0 }, mutate } =
    useSWR(
      ["/dashboard-tim-tugas", searchValue, pagination, strataFilter],
      async () => {
        if (strata === "S1" || (strata === "ALL" && strataFilter === "S1")) {
          const params: GetDashboardTimTAReqParams = {
            limit: 10,
            offset: 0,
          };
          const resp = (await getDashboardTimTAData(params)).data;
          const data: DashTableData[] = resp.data.map(
            ({ id, nama, nim, PengajuanTopik, SeminarProposal, Sidang }) => ({
              id: id,
              nim: nim,
              nama: nama,
              pengajuanTopik: PengajuanTopik,
              seminarProposal: SeminarProposal,
              seminarTesis: false,
              sidang: Sidang,
            }),
          );
          return { data };
        } else {
          const params: GetDashboardTimTesisReqParams = {
            limit: pagination.pageSize,
            page: pagination.pageIndex + 1,
          };

          if (searchValue) params.search = searchValue;

          const resp = (await getDashboardTimTesisData(params)).data;

          const data: DashTableData[] = resp.data.map(
            ({ nim_mahasiswa, id_mahasiswa, nama_mahasiswa, status }) => ({
              id: id_mahasiswa,
              nim: nim_mahasiswa,
              nama: nama_mahasiswa,
              pengajuanTopik: status.includes(
                GetDashboardTimTesisStatusEnum.PENGAJUAN_TOPIK,
              ),
              seminarProposal: status.includes(
                GetDashboardTimTesisStatusEnum.SEMINAR_1,
              ),
              seminarTesis: status.includes(
                GetDashboardTimTesisStatusEnum.SEMINAR_2,
              ),
              sidang: status.includes(GetDashboardTimTesisStatusEnum.SIDANG),
            }),
          );
          return { data, pageCount: resp.maxPage };
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
      cell: ({ row }) => (
        <RowAction row={row} fetchData={mutate} searchValue={searchValue} />
      ),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strataFilter]);

  let columns = allColumns;
  if (strata === "S1" || (strata === "ALL" && strataFilter === "S1")) {
    columns.splice(4, 1);
  }

  let table = useReactTable({
    columns,
    data,
    columnResizeMode: "onChange",
    onPaginationChange: setPagination,
    pageCount,
    state: {
      pagination,
    },
    manualPagination: true,
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
