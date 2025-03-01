import StatusPendaftaranBadge from "@/components/StatusPendaftaranBadge";
import { Button } from "@/components/ui/button";
import useSession from "@/hooks/useSession";
import { formatDate } from "@/lib/dateformat";
import { RoleEnum } from "@/types/session-data";
import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";
import {
  ColumnDef,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { GoPencil } from "react-icons/go";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import WawancaraModal from "../../components/WawancaraModal";
import {
  getRegMhsS1,
  getRegMhsS2,
  getStatisticS1,
  getStatisticS2,
  updateInterviewS1,
  updateInterviewS2,
} from "../clients";
import RowAction from "../components/RowAction";
import {
  Mahasiswa,
  RegStatistic,
  RekapPendaftaranDosbimHookRet,
} from "../types";

const STATUS_MAP_S2 = new Map<string, StatusPendaftaranEnum>([
  ["NOT_ASSIGNED", StatusPendaftaranEnum.PROCESS],
  ["INTERVIEW", StatusPendaftaranEnum.PROCESS],
  ["APPROVED", StatusPendaftaranEnum.ACCEPTED],
  ["REJECTED", StatusPendaftaranEnum.REJECTED],
]);

export default function useRekapPendaftaranDosbim(): RekapPendaftaranDosbimHookRet {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("filter") ?? "",
  );

  const { data: sessionData } = useSession();

  const handleSearchValueChange = (value: string) => {
    const obj: any = {};
    value && (obj.search = value);
    statusFilter && statusFilter !== "semua" && (obj.filter = statusFilter);

    setSearchParams(obj);
    setSearchValue(value);
  };

  const { data: s2MhsData = [] } = useSWR(
    ["/rekap-pendaftaran/dosbim/s2", searchValue],
    async ([_, search]) => {
      const { data } = await getRegMhsS2(search);

      return data.data.map((d) => ({
        id: d.mahasiswa_id,
        nim: d.nim,
        nama: d.mahasiswa_nama,
        jadwalWawancara: d.jadwal_interview
          ? new Date(d.jadwal_interview)
          : null,
        status: STATUS_MAP_S2.get(d.status) ?? StatusPendaftaranEnum.PROCESS,
        strata: "S2" as "S2",
      }));
    },
  );

  const { data: s1MhsData = [] } = useSWR(
    "/rekap-pendaftaran/dosbim/s1",
    async () => {
      const { data } = await getRegMhsS1();
      console.log(data);
      return data.data.map((d) => ({
        id: d.mahasiswa_id,
        nim: d.nim,
        nama: d.mahasiswa_nama + " (s1)",
        jadwalWawancara: d.jadwal_interview
          ? new Date(d.jadwal_interview)
          : null,
        status: STATUS_MAP_S2.get(d.status) ?? StatusPendaftaranEnum.PROCESS,
        strata: "S1" as "S1",
      }));
    },
  );

  const defaultStatistic = {
    diterima: { amount: 0, percentage: 0 },
    sedang_proses: { amount: 0, percentage: 0 },
    ditolak: { amount: 0, percentage: 0 },
  };

  const { data: s2Statistic = defaultStatistic } = useSWR(
    "/rekap-pendaftaran/dosbim/s2/statistic",
    async () => {
      const { data } = await getStatisticS2();

      return {
        diterima: data.diterima,
        sedang_proses: data.sedang_proses,
        ditolak: data.ditolak,
        strata: "S2" as "S2",
      };
    },
  );

  const { data: s1Statistic = defaultStatistic } = useSWR(
    "/rekap-pendaftaran/dosbim/s1/statistic",
    async () => {
      const { data } = await getStatisticS1();
      return {
        diterima: data.data.diterima,
        sedang_proses: data.data.sedang_proses,
        ditolak: data.data.ditolak,
        strata: "S1" as "S1",
      };
    },
  );

  useEffect(() => {
    if (sessionData && sessionData.roles.includes(RoleEnum.S1_PEMBIMBING)) {
      setRegData((prev) => {
        const prevData = prev.filter((mahasiswa) => mahasiswa.strata === "S2");
        return [...prevData, ...s1MhsData];
      });
    }
  }, [s1MhsData, sessionData]);

  useEffect(() => {
    if (sessionData && sessionData.roles.includes(RoleEnum.S2_PEMBIMBING)) {
      setRegData((prev) => {
        const prevData = prev.filter((mahasiswa) => mahasiswa.strata === "S1");
        return [...prevData, ...s2MhsData];
      });
    }
  }, [s2MhsData, sessionData]);

  const [regData, setRegData] = useState<Mahasiswa[]>([]);
  const statData = useMemo<RegStatistic>(
    () => ({
      diterima: {
        amount: s1Statistic.diterima.amount + s2Statistic.diterima.amount,
        percentage:
          (s1Statistic.diterima.percentage * s2Statistic.diterima.percentage) /
          100,
      },
      sedang_proses: {
        amount:
          s1Statistic.sedang_proses.amount + s2Statistic.sedang_proses.amount,
        percentage:
          (s1Statistic.sedang_proses.percentage *
            s2Statistic.sedang_proses.percentage) /
          100,
      },
      ditolak: {
        amount: s1Statistic.ditolak.amount + s2Statistic.ditolak.amount,
        percentage:
          (s1Statistic.ditolak.percentage * s2Statistic.ditolak.percentage) /
          100,
      },
    }),
    [s1Statistic, s2Statistic],
  );

  const handleStatusFilterChange = (value: string) => {
    const obj: any = {};
    value && value !== "semua" && (obj.filter = value);
    searchValue && (obj.search = searchValue);

    setSearchParams(obj);
    setStatusFilter(value);
  };

  type TriggerInterviewS2Arg = {
    arg: {
      date: Date;
      mhsId: string;
    };
  };

  type TriggerInterviewS1Arg = {
    arg: {
      date: Date;
      mhsId: string;
    };
  };
  const { trigger: triggerInterviewS2 } = useSWRMutation(
    ["/rekap-pendaftaran/dosbim/s2", searchValue],
    async (_, { arg }: TriggerInterviewS2Arg) => {
      await updateInterviewS2(arg.mhsId, arg.date);
    },
  );

  const { trigger: triggerInterviewS1 } = useSWRMutation(
    ["/rekap-pendaftaran/dosbim/s2", searchValue],
    async (_, { arg }: TriggerInterviewS1Arg) => {
      await updateInterviewS1(arg.mhsId, arg.date);
    },
  );
  const handleInterviewUpdate = async (row: Row<Mahasiswa>, date: Date) => {
    const toastId = toast.loading("Menetapkan jadwal interview...");
    try {
      if (row.original.strata === "S2") {
        await triggerInterviewS2({
          date,
          mhsId: row.original.id,
        });
      } else {
        await triggerInterviewS1({
          date,
          mhsId: row.original.id,
        });
      }

      toast.update(toastId, {
        render: "Berhasil menetapkan jadwal interview",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menetapkan jadwal interview",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  const columns: ColumnDef<Mahasiswa>[] = [
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
      header: "Jadwal Wawancara",
      accessorKey: "jadwalWawancara",
      enableSorting: false,
      cell: ({ row }) =>
        row.original.jadwalWawancara ? (
          <span className="text-sm font-bold">
            {formatDate(row.original.jadwalWawancara)}
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-red-400">Belum Ada</span>
            {row.original.status === StatusPendaftaranEnum.PROCESS && (
              <WawancaraModal
                dateInit={row.original.jadwalWawancara}
                onChange={(date: Date) => handleInterviewUpdate(row, date)}
                modalTrigger={
                  <Button
                    variant="outline"
                    className="ml-1 size-fit gap-2 px-2 py-1 text-xs"
                  >
                    <GoPencil className="size-3" /> Ubah
                  </Button>
                }
              />
            )}
          </div>
        ),
    },
    // {
    //   id: "ubah_jadwal",
    //   enableSorting: false,
    //   cell: ({ row }) =>
    //     row.original.status === StatusPendaftaranEnum.PROCESS ? (
    //       <WawancaraModal
    //         dateInit={row.original.jadwalWawancara}
    //         onChange={(date: Date) => handleInterviewUpdate(row, date)}
    //         modalTrigger={
    //           <Button variant="outline" className="size-fit gap-2 text-xs">
    //             <GoPencil className="size-3" /> Ubah
    //           </Button>
    //         }
    //       />
    //     ) : null,
    // },
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
      cell: ({ row }) => <RowAction row={row} searchValue={searchValue} />,
      enableSorting: false,
      meta: {
        align: "right",
      },
    },
  ];

  const table = useReactTable({
    columns,
    data: regData,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    searchValue,
    handleSearchValueChange,
    statusFilter,
    handleStatusFilterChange,
    statistic: statData,
  };
}
