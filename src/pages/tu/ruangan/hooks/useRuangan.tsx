import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PengajuanSidang } from "../types";
import { SidangEnum } from "@/types/jenis-sidang";
import JadwalSidang from "../components/JadwalSidang";
import JenisSidang from "../components/JenisSidang";
import ChangeRuanganDialog from "../components/ChangeRuanganDialog";
import RowAction from "../components/RowAction";

export default function useRuangan() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );
  const [filterMahasiswa, setFilterMahasiswa] = useState("Semua Mahasiswa");
  const [filterTipeSidang, setFilterTipeSidang] = useState("Semua");

  const navigate = useNavigate();

  const handleSearchValueChange = (value: string) => {
    setSearchParams(value ? { search: value } : {});
    setSearchValue(value);
    // fetchData();
  };

  const handleFilterMahasiswaChange = (value: string) => {
    setFilterMahasiswa(value);
  };

  const handleFilterTipeSidangChange = (value: string) => {
    setFilterTipeSidang(value);
  };

  const handleSubmitChangeRuangan = (value: string) => {
    console.log("TODO: Konekin ke db juga, new ruangan:", value);
  };

  const handleSendMail = () => {
    console.log("TODO: Konekin ke send mail");
  };

  useEffect(() => {
    // fetchData();
  }, [searchValue]);

  //   TODO : KONEKIN KE DB
  //   const { data = [], mutate: fetchData } = useSWR("/akun", async () => {
  //     const res = await getAllAccounts({
  //       search: searchValue === "" ? undefined : searchValue,
  //       page: table.getState().pagination.pageIndex + 1,
  //       limit: table.getState().pagination.pageSize,
  //     });

  //     const data: Account[] = res.data.akun.map(
  //       (resAccount: GetAccountResponseItem) => ({
  //         id: resAccount.id,
  //         email: resAccount.email,
  //         name: resAccount.nama,
  //         access: resAccount.roles,
  //       }),
  //     );

  //     return data;
  //   });

  //   dummy dulu gak sih
  const data: PengajuanSidang[] = [
    {
      id: "69",
      nim: "13521999",
      nama: "Azizi Asadel",
      jadwal_sidang: new Date(),
      jenis_sidang: SidangEnum.SEMINAR,
      ruangan: undefined,
    },
    {
      id: "70",
      nim: "13521998",
      nama: "Adzana Ashel",
      jadwal_sidang: new Date(),
      jenis_sidang: SidangEnum.SIDANG,
      ruangan: undefined,
    },
    {
      id: "71",
      nim: "13521500",
      nama: "Paul Muda'dib Atreides",
      jadwal_sidang: new Date(),
      jenis_sidang: SidangEnum.SEMINAR,
      ruangan: "7603",
    },
    {
      id: "70",
      nim: "13521404",
      nama: "Barry Allen",
      jadwal_sidang: new Date(),
      jenis_sidang: SidangEnum.SIDANG,
      ruangan: "7707",
    },
    {
      id: "70",
      nim: "13521400",
      nama: "Martian Hunter",
      jadwal_sidang: undefined,
      jenis_sidang: SidangEnum.SIDANG,
      ruangan: undefined,
    },
  ];

  const columns: ColumnDef<PengajuanSidang>[] = [
    {
      header: "NIM",
      accessorKey: "nim",
    },
    {
      header: "Nama",
      accessorKey: "nama",
    },
    {
      header: "Jadwal Sidang",
      accessorKey: "jadwal_sidang",
      cell: ({ row }) => (
        <JadwalSidang jadwal_sidang={row.original.jadwal_sidang} />
      ),
    },
    {
      header: "Jenis Sidang",
      accessorKey: "jenis_sidang",
      cell: ({ row }) => (
        <JenisSidang jenis_sidang={row.original.jenis_sidang} />
      ),
    },
    {
      header: "Ruangan",
      accessorKey: "ruangan",
      cell: ({ row }) => (
        <td className={row.original.ruangan ?? "text-red-500"}>
          {row.original.ruangan ?? "Belum ada"}
        </td>
      ),
      enableSorting: false,
    },
    {
      id: "change_room",
      cell: ({ row }) => (
        <ChangeRuanganDialog
          name={row.original.nama}
          handleSubmit={handleSubmitChangeRuangan}
          handleSendMail={handleSendMail}
        />
      ),
      enableSorting: false,
    },
    {
      id: "action",
      cell: ({ row }) => (
        <RowAction
          idPengajuan={row.original.id}
          handleSendMail={handleSendMail}
        />
      ),
      enableSorting: false,
    },
  ];

  const table = useReactTable({
    columns,
    columnResizeMode: "onChange",
    data,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    searchValue,
    handleSearchValueChange,
    // fetchData,
    filterMahasiswa,
    handleFilterMahasiswaChange,
    filterTipeSidang,
    handleFilterTipeSidangChange,
  };
}
