import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import SelectData from "@/types/select-data";
import {
  PaginationState,
  RowSelectionState,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import { MahasiswaKelas } from "../types";

const DUMMY_DATA: MahasiswaKelas[] = [
  {
    id: "1",
    email: "13521171@mahasiswa.itb.ac.id",
    kelas: "K01",
    mataKuliah: "IF3280 Grafika Komputer",
    idMahasiswa: "1234",
    namaMahasiswa: "Alisha Listya Wardhani",
    nilai: 78,
  },
  {
    id: "2",
    email: "13521171@mahasiswa.itb.ac.id",
    kelas: "K01",
    mataKuliah: "IF3280 Grafika Komputer",
    idMahasiswa: "1234",
    namaMahasiswa: "Alisha Listya Wardhani",
    nilai: null,
  },
  {
    id: "3",
    email: "13521171@mahasiswa.itb.ac.id",
    kelas: "K01",
    mataKuliah: "IF3270 Machine Learning",
    idMahasiswa: "12345",
    namaMahasiswa: "Rava maulatan",
    nilai: null,
  },
  {
    id: "69",
    email: "13521171@mahasiswa.itb.ac.id",
    kelas: "K01",
    mataKuliah: "IF3280 Grafika Komputer",
    idMahasiswa: "1234",
    namaMahasiswa: "Alisha Listya Wardhani",
    nilai: 78,
  },
];

const DUMMY_OPTIONS: SelectData[] = [
  {
    label: "Semua Kelas",
    value: "ALL",
  },
  {
    label: "IF3280 - Grafika Komputer",
    value: "1234",
  },
  {
    label: "IF3270 - Sistem Paralel Terdistribusi",
    value: "12345",
  },
  {
    label: "IF3260 - Strategi Algotirma",
    value: "12",
  },
];

const columnHelper = createColumnHelper<MahasiswaKelas>();

export default function useInputNilai() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (searchValue) {
      searchParams.set("search", searchValue);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: parseInt(searchParams.get("pageIndex") ?? "0"),
    pageSize: parseInt(searchParams.get("pageSize") ?? "10"),
  });

  // TODO test while wiring
  useEffect(() => {
    if (pagination.pageIndex === 0) {
      searchParams.delete("pageIndex");
    } else {
      searchParams.set("pageIndex", pagination.pageIndex.toString());
    }

    if (pagination.pageSize === 10) {
      searchParams.delete("pageIndex");
    } else {
      searchParams.set("pageIndex", pagination.pageIndex.toString());
    }
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  const [selectFilterValue, setSelectFilterValue] = useState(
    searchParams.get("mata-kuliah") ?? "ALL",
  );
  const { data: selectFilterOptions = [] } = useSWR("/list-kelas", async () => {
    return DUMMY_OPTIONS;
  });

  // TODO test while wiring
  useEffect(() => {
    if (selectFilterValue === "ALL") {
      searchParams.delete("mata-kuliah");
    } else {
      searchParams.set("mata-kuliah", selectFilterValue);
    }
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectFilterValue]);

  const [changeScoreModalOpen, setChangeScoreModalOpen] = useState(false);
  const [changeScoreModalData, setChangeScoreModalData] = useState<
    MahasiswaKelas[]
  >([]);

  const {
    data = { data: [], maxPage: 1 },
    isLoading,
    mutate: updateData,
  } = useSWR("/nilai-kelas", async () => {
    return { data: DUMMY_DATA, maxPage: 1 };
  });

  // TODO test when selected then applied filter
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const handleClickBulkUbahNilai = () => {
    const selectedIdx = Object.keys(rowSelection).map((key) => parseInt(key));

    if (selectedIdx.length === 0) {
      toast.error("Harap pilih mahasiswa terlebih dahulu");
      return;
    }

    setChangeScoreModalOpen(true);
    setChangeScoreModalData(
      data.data.filter((_, idx) => selectedIdx.includes(idx)),
    );
  };

  const handleClickSingleUbahNilai = (row: MahasiswaKelas) => {
    setChangeScoreModalOpen(true);
    setChangeScoreModalData([row]);
    setRowSelection({});
  };

  const handleCloseUbahNilaiDialog = () => {
    setChangeScoreModalOpen(false);
    setChangeScoreModalData([]);
  };

  const columns = [
    columnHelper.accessor("id", {
      id: "select",
      enableSorting: false,
      enableResizing: false,
      minSize: 30,
      size: 30,
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(value)
          }
          className="bg-white"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => {
            row.toggleSelected(value);
          }}
        />
      ),
    }),
    columnHelper.accessor("email", {
      enableSorting: false,
      minSize: 100,
      size: 100,
      header: "Email",
    }),
    columnHelper.accessor("namaMahasiswa", {
      enableSorting: false,
      minSize: 120,
      size: 120,
      header: "Nama",
    }),
    columnHelper.accessor("mataKuliah", {
      enableSorting: false,
      minSize: 120,
      size: 120,
      header: "Mata Kuliah",
    }),
    columnHelper.accessor("kelas", {
      enableSorting: false,
      minSize: 70,
      size: 70,
      header: "Kelas",
    }),
    columnHelper.accessor("nilai", {
      enableSorting: false,
      minSize: 70,
      size: 70,
      header: "Nilai",
      cell: ({ getValue }) => (
        <div className="font-bold">{getValue() ?? "-"}</div>
      ),
    }),
    columnHelper.accessor("id", {
      id: "action",
      enableSorting: false,
      minSize: 100,
      size: 100,
      header: "Ubah Nilai",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          className="border-none text-blue-500 hover:text-blue-600"
          onClick={() => {
            handleClickSingleUbahNilai(row.original);
          }}
        >
          Ubah Nilai
        </Button>
      ),
    }),
  ];

  const table = useReactTable({
    data: data.data,
    columns,
    pageCount: data.maxPage,
    rowCount: 1,
    columnResizeMode: "onChange",
    state: {
      pagination,
      rowSelection,
    },
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    isLoading,
    rowSelection,
    changeScoreModalOpen,
    changeScoreModalData,
    selectFilterOptions,
    searchValue,
    selectFilterValue,
    setSelectFilterValue,
    handleSearchValueChange,
    handleClickBulkUbahNilai,
    handleClickSingleUbahNilai,
    updateData,
    handleCloseUbahNilaiDialog,
    setChangeScoreModalOpen,
  };
}
