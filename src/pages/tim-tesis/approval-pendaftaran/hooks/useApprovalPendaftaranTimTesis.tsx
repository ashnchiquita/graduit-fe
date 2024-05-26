import StatusPendaftaranBadge from "@/components/StatusPendaftaranBadge";
import useSession from "@/hooks/useSession";
import { RoleEnum } from "@/types/session-data";
import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import { convertStatus } from "../../helper";
import {
  getRekapPendaftaranTable,
  getRekapPendaftaranTableS1,
} from "../clients";
import JenisSidangBadge from "../components/JenisSidangBadge";
import RowAction from "../components/RowAction";
import {
  ApprovalPendaftaranTopik,
  Jenis,
  RekapPendaftaranTimTesisHookRet,
  Status,
} from "../types";
// import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";

export default function useApprivalPendaftaranTimTesis(): RekapPendaftaranTimTesisHookRet {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );

  const [status, setStatus] = useState<Status>(Status.Semua);
  const [jenis, setJenis] = useState<Jenis>(Jenis.Semua)
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const { data } = useSession();

  const handleSearchValueChange = (value: string) => {
    const obj: any = {};
    value && (obj.search = value);

    setSearchParams(obj);
    setSearchValue(value);
  };

  const columns: ColumnDef<ApprovalPendaftaranTopik>[] = [
    {
      header: "ID",
      accessorKey: "id",
      enableSorting: false,
      enableHiding: true,
    },
    {
      header: "NIM",
      accessorKey: "nim",
      enableSorting: false,
    },
    {
      header: "Nama",
      accessorKey: "nama",
      enableSorting: false,
    },
    {
      header: "Dosen Pembimbing",
      accessorKey: "dosenPembimbing",
      enableSorting: false,
    },
    {
      header: "Jenis Sidang",
      accessorKey: "tipe",
      enableSorting: false,
      cell: ({ row }) => <JenisSidangBadge jenis={row.original.tipe} />,
    },
    {
      header: "Status Pengajuan",
      accessorKey: "status",
      enableSorting: false,
      cell: ({ row }) => (
        <StatusPendaftaranBadge status={row.original.status} />
      ),
    },
    {
      id: "aksi",
      cell: ({ row }) => <RowAction row={row} />,
      enableSorting: false,
      meta: {
        align: "right",
      },
    },
  ];

  const { data: dataTable = [], mutate: mutateTable } = useSWR<
    ApprovalPendaftaranTopik[]
  >("/TIMTA/pendaftaran-sidsem", async () => {
    if (!data) {
      return [] as ApprovalPendaftaranTopik[];
    }

    if (
      data.roles.includes(RoleEnum.S1_TIM_TA) &&
      data.roles.includes(RoleEnum.S2_TIM_TESIS)
    ) {
      const response1 = await getRekapPendaftaranTableS1({});
      const data1 = response1.data.data.map((item) => ({
        id: item.id_mahasiswa,
        nim: item.nim,
        nama: item.nama_mahasiswa,
        tipe: item.tipe,
        dosenPembimbing: item.nama_dosbing,
        status: item.status
          ? StatusPendaftaranEnum.ACCEPTED
          : StatusPendaftaranEnum.REJECTED,
      }));

      const response2 = await getRekapPendaftaranTable({
        view: RoleEnum.S2_TIM_TESIS,
        page: page,
        search: searchValue,
      });

      // Map GetRekapPendaftaranTableRes to PendaftaranTopik
      const data2 = response2.data.data.map((item) => ({
        id: item.mahasiswa_id,
        nim: item.nim,
        nama: item.mahasiswa_nama,
        tipe: item.tipe,
        dosenPembimbing: item.pembimbing_nama,
        status: convertStatus(item.status),
      }));

      return [...data1, ...data2];
    } else if (data.roles.includes(RoleEnum.S1_TIM_TA)) {
      try {
        const response = await getRekapPendaftaranTableS1({});

        const data = response.data.data.map((item) => ({
          id: item.id,
          nim: item.nim,
          nama: item.nama_mahasiswa,
          tipe: item.tipe,
          dosenPembimbing: item.nama_dosbing,
          status: item.status
            ? StatusPendaftaranEnum.ACCEPTED
            : StatusPendaftaranEnum.REJECTED,
        }));

        return data;
      } catch (error) {
        toast.error("Gagal memuat data tabel");
        return [];
      }
    } else if (data.roles.includes(RoleEnum.S2_TIM_TESIS)) {
      try {
        const response = await getRekapPendaftaranTable({
          view: RoleEnum.S2_TIM_TESIS,
          page: page,
          search: searchValue,
        });

        // Map GetRekapPendaftaranTableRes to PendaftaranTopik
        const data = response.data.data.map((item) => ({
          id: item.mahasiswa_id,
          nim: item.nim,
          nama: item.mahasiswa_nama,
          tipe: item.tipe,
          dosenPembimbing: item.pembimbing_nama,
          status: convertStatus(item.status),
        }));

        return data;
      } catch (error) {
        toast.error("Gagal memuat data tabel");
        return [];
      }
    } else {
      return [] as ApprovalPendaftaranTopik[];
    }
  });

  const refreshData = () => {
    mutateTable();
  };
  // const getDataS1 = () => {
  //   const {data: s1MahasiswData = [],mutate: mutateTableS1 } = useSWR<
  //   ApprovalPendaftaranTopik[]
  //   >("/TIMTA/pendaftaran-sidsem", async () => {
  //     try{
  //       const response = await getRekapPendaftaranTableS1({})

  //       const data = response.data.data.map((item) => ({
  //         id: item.id_mahasiswa,
  //         nim: item.nim,
  //         nama: item.nama_mahasiswa,
  //         tipe: item.tipe,
  //         dosenPembimbing: item.nama_dosbing,
  //         status: item.status ? StatusPendaftaranEnum.ACCEPTED :StatusPendaftaranEnum.REJECTED,
  //       }));

  //       return data;
  //     }catch(error){
  //       toast.error("Gagal memuat data tabel");
  //       return [];
  //     }
  //   })
  //   return {dataTable:s1MahasiswData,mutateTable:mutateTableS1}
  // }

  // const getDataS2 = () => {
  //   const { data: s2MahasiswaData = [], mutate: mutateTable } = useSWR<
  //     ApprovalPendaftaranTopik[]
  //   >("/registrasi-tesis", async () => {
  //     try {
  //       const response = await getRekapPendaftaranTable({
  //         view: RoleEnum.S2_TIM_TESIS,
  //         page: page,
  //         search: searchValue,
  //       });

  //       // Map GetRekapPendaftaranTableRes to PendaftaranTopik
  //       const data = response.data.data.map((item) => ({
  //         id: item.mahasiswa_id,
  //         nim: item.nim,
  //         nama: item.mahasiswa_nama,
  //         tipe: item.tipe,
  //         dosenPembimbing: item.pembimbing_nama,
  //         status: convertStatus(item.status),
  //       }));

  //       return data;
  //     } catch (error) {
  //       toast.error("Gagal memuat data tabel");
  //       return [];
  //     }
  //   });
  //   return {dataTable:s2MahasiswaData, mutateTable:mutateTable}
  // }

  // if(data){
  //   const {dataTable,mutateTable} = data.roles.includes(RoleEnum.S1_TIM_TA) ? getDataS1() : getDataS2()
  //   const refreshData = () => {
  //     mutateTable();
  //   };

  // }

  const table = useReactTable({
    columns,
    data: dataTable,
    state: {
      columnVisibility: {
        id: false,
      },
    },
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  });

  // On search change
  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      mutateTable();
      setPage(1);
    }, 500);
    return () => clearTimeout(debouncedSearch);
  }, [searchValue, mutateTable]);

  //On data change
  useEffect(() => {
    mutateTable();
  }, [data]);

  return {
    table,
    searchValue,
    handleSearchValueChange,
    refreshData,
    jenis,
    setJenis,
    status,
    setStatus
  };
  // const dummyData: ApprovalPendaftaranTopik[] = [
  //   {
  //     id: "1",
  //     nim: "20210001",
  //     nama: "John Doe",
  //     tipe: "Sidang Seminar",
  //     dosenPembimbing: "Jane Smith",
  //     status: StatusPendaftaranEnum.ACCEPTED,
  //   },
  //   {
  //     id: "2",
  //     nim: "20210002",
  //     nama: "Alice Johnson",
  //     tipe: "Sidang Tesis",
  //     dosenPembimbing: "Bob Anderson",
  //     status: StatusPendaftaranEnum.PROCESS,
  //   },
  //   {
  //     id: "2",
  //     nim: "20210002",
  //     nama: "Alice Johnson",
  //     tipe: "Seminar Proposal",
  //     dosenPembimbing: "Bob Anderson",
  //     status: StatusPendaftaranEnum.REJECTED,
  //   },
  // ];
}
