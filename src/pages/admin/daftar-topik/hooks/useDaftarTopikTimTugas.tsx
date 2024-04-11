import { RoleEnum } from "@/types/session-data";
import {
  PaginationState,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import RowAction from "../components/RowAction";
import { DaftarTopikData } from "../types";

const DUMMY_DATA: DaftarTopikData[] = [
  {
    id: "1",
    deskripsi: "no",
    judul: "yeehaw",
    pengaju: {
      id: "d682f596-9ee3-485d-89bb-402e54106b60",
      nama: "Rafa Maulana 1",
      email: "gmail@gmail.com",
      roles: [RoleEnum.S2_PEMBIMBING],
    },
    periode: "PRABOWO",
  },
];

const columHelper = createColumnHelper<DaftarTopikData>();

export default function useDaftarTopikTimTugas() {
  const [isInsertDialogOpen, setIsInsertDialogOpen] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );

  const handleChangeSearchValue = (value: string) => {
    setSearchParams(value ? { search: value } : {});
    setSearchValue(value);
  };

  const { data = { data: [], maxPage: 1 }, mutate: updateData } = useSWR(
    ["/alokasi-topik", pagination, searchValue],
    async () => {
      // const res = await getAllTopics({
      //   page: pagination.pageIndex,
      //   limit: pagination.pageSize,
      //   search: searchValue === "" ? undefined : searchValue,
      // });

      return { data: DUMMY_DATA, maxPage: 1 };
      //   return { data: res.data.data, maxPage: res.data.maxPage };
    },
  );

  const columns = [
    columHelper.accessor("judul", {
      minSize: 150,
      enableSorting: false,
      header: "Nama Topik",
    }),
    columHelper.accessor("deskripsi", {
      minSize: 250,
      enableSorting: false,
      header: "Deskripsi",
    }),
    columHelper.accessor("pengaju.nama", {
      minSize: 170,
      enableSorting: false,
      header: "Dosen Pengaju",
    }),
    columHelper.accessor("id", {
      id: "action",
      minSize: 50,
      maxSize: 50,
      header: "",
      enableSorting: false,
      enableResizing: false,
      cell: ({ row }) => <RowAction row={row} updateData={updateData} />,
    }),
  ];

  // TODO on pagination change
  const table = useReactTable({
    data: data.data,
    columns,
    pageCount: data.maxPage,
    rowCount: 1,
    columnResizeMode: "onChange",
    initialState: {
      pagination,
    },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    searchValue,
    isInsertDialogOpen,
    setIsInsertDialogOpen,
    handleChangeSearchValue,
    updateData,
  };
}
