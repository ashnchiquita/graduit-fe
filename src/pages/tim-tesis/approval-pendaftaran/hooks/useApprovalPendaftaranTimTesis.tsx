import StatusPendaftaranBadge from "@/components/StatusPendaftaranBadge";
import useSession from "@/hooks/useSession";
import { RoleEnum } from "@/types/session-data";
import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";
import {
  ColumnDef,
  PaginationState,
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
import { ApprovalPendaftaranTopik, Jenis, Status } from "../types";

export default function useApprovalPendaftaranTimTesis() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );

  const [status, setStatus] = useState<Status | undefined>();
  const [jenis, setJenis] = useState<Jenis | undefined>();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: parseInt(searchParams.get("page") ?? "1"),
    pageSize: parseInt(searchParams.get("pageSize") ?? "10"),
  });
  const { data } = useSession();
  const [strata, setStrata] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log(
      data
        ? data.roles.includes(RoleEnum.S2_TIM_TESIS) ||
          data.roles.includes(RoleEnum.S2_PEMBIMBING) ||
          data.roles.includes(RoleEnum.S2_PENGUJI)
          ? "S2"
          : data.roles.includes(RoleEnum.S1_TIM_TA)
            ? "S1"
            : undefined
        : undefined,
    );

    setStrata(
      data
        ? data.roles.includes(RoleEnum.S2_TIM_TESIS) ||
          data.roles.includes(RoleEnum.S2_PEMBIMBING) ||
          data.roles.includes(RoleEnum.S2_PENGUJI)
          ? "S2"
          : data.roles.includes(RoleEnum.S1_TIM_TA)
            ? "S1"
            : undefined
        : undefined,
    );
  }, [data]);

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
      cell: ({ row }) => {
        return strata && <RowAction strata={strata} row={row} />;
      },
      enableSorting: false,
      meta: {
        align: "right",
      },
    },
  ];

  const { data: dataTable = [], mutate: mutateTable } = useSWR<
    ApprovalPendaftaranTopik[] | any
  >(
    ["/TIMTA/pendaftaran-sidsem", status, searchValue, jenis, strata],
    async () => {
      if (!data) {
        return [] as ApprovalPendaftaranTopik[];
      }

      if (strata === "S1") {
        try {
          const response = await getRekapPendaftaranTableS1({});

          const data = response.data.data.map((item) => ({
            id: item.id,
            id_mahasiswa: item.id_mahasiswa,
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
      } else if (strata === "S2") {
        try {
          const response = await getRekapPendaftaranTable({
            view: data.roles.includes(RoleEnum.S2_TIM_TESIS)
              ? RoleEnum.S2_TIM_TESIS
              : data.roles.includes(RoleEnum.S2_PEMBIMBING)
                ? RoleEnum.S2_PEMBIMBING
                : RoleEnum.S2_PENGUJI,
            page: pagination.pageIndex,
            limit: pagination.pageSize,
            search: searchValue,
            jenisSidang:
              jenis === Jenis.SeminarProposal
                ? "SEMINAR_1"
                : jenis === Jenis.SeminarTesis
                  ? "SEMINAR_2"
                  : jenis === Jenis.SidangTesis
                    ? "SIDANG"
                    : undefined,
            status:
              status && status === Status.Diterima
                ? "APPROVED"
                : status === Status.Ditolak
                  ? "REJECTED"
                  : undefined,
          });

          // Map GetRekapPendaftaranTableRes to PendaftaranTopik
          const resData: ApprovalPendaftaranTopik[] = response.data.data.map(
            (item) => ({
              id: item.idPengajuanSidsem,
              id_mahasiswa: item.idMahasiswa,
              nim: item.nimMahasiswa,
              nama: item.namaMahasiswa,
              tipe: item.jenisSidang,
              dosenPembimbing: item.dosenPembimbing
                .map(({ nama }) => nama)
                .join(", "),
              status: convertStatus(item.status),
            }),
          );

          return resData;
        } catch (error) {
          toast.error("Gagal memuat data tabel");
          return [];
        }
      } else {
        return [] as ApprovalPendaftaranTopik[];
      }
    },
  );

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
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  });

  // On search change
  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      mutateTable();
      setPagination({ pageIndex: 1, pageSize: pagination.pageSize });
    }, 500);
    return () => clearTimeout(debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, mutateTable]);

  //On data change
  useEffect(() => {
    mutateTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {
    table,
    searchValue,
    handleSearchValueChange,
    refreshData,
    jenis,
    setJenis,
    status,
    setStatus,
    strata,
    setStrata,
    hasBothRoles: data
      ? data.roles.includes(
          RoleEnum.S2_TIM_TESIS ||
            RoleEnum.S2_PEMBIMBING ||
            RoleEnum.S2_PENGUJI,
        ) && data.roles.includes(RoleEnum.S1_TIM_TA)
      : false,
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
