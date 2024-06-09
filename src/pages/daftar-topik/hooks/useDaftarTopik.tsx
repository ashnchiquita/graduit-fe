import SelectData from "@/types/select-data";
import {
  PaginationState,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import * as XLSX from "xlsx";
import {
  getAllDosenPembimbingS1,
  getAllDosenPembimbingS2,
  getAllTopicsS1,
  getAllTopicsS2,
  postNewTopicBulkS1,
  postNewTopicBulkS2,
} from "../clients";
import RowAction from "../components/RowAction";
import { EXCEL_HEADERS } from "../constants";
import {
  DaftarTopikData,
  LoadedExcelData,
  PostNewTopicBulkReqData,
} from "../types";
import useSession from "@/hooks/useSession";
import { RoleEnum } from "@/types/session-data";
import { isAdmin, isDosen, isMahasiswa } from "@/lib/checkRole";

const columHelper = createColumnHelper<DaftarTopikData>();

function withDropdown(roles?: RoleEnum[]) {
  return (
    isAdmin(roles) ||
    (roles?.includes(RoleEnum.S1_PEMBIMBING) &&
      roles?.includes(RoleEnum.S2_PEMBIMBING))
  );
}

export default function useDaftarTopik() {
  const { data: sessionData } = useSession();

  const [isInsertDialogOpen, setIsInsertDialogOpen] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );
  const [strataFilter, setStrataFilter] = useState<"S1" | "S2">("S1");

  const handleChangeSearchValue = (value: string) => {
    setSearchParams(value ? { search: value } : {});
    setSearchValue(value);
  };

  const { data = { data: [], maxPage: 1 }, mutate: updateData } = useSWR(
    [
      `/alokasi-topik/${isDosen(sessionData?.roles) ? sessionData?.id : "admin"}`,
      pagination,
      searchValue,
    ],
    async () => {
      if (!sessionData) return { data: [], maxPage: 1 };
      if (
        (isAdmin(sessionData.roles) && strataFilter === "S1") ||
        sessionData.roles.includes(RoleEnum.S1_PEMBIMBING) ||
        sessionData.roles.includes(RoleEnum.S1_MAHASISWA)
      ) {
        const res = await getAllTopicsS1({
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          search: searchValue === "" ? undefined : searchValue,
          idPembimbing: isDosen(sessionData?.roles)
            ? sessionData?.id
            : undefined,
        });
        console.log(res.data.data.data);
        return { data: res.data.data.data, maxPage: res.data.data.maxPage };
      } else if (
        (isAdmin(sessionData.roles) && strataFilter === "S2") ||
        sessionData.roles.includes(RoleEnum.S2_PEMBIMBING) ||
        sessionData.roles.includes(RoleEnum.S2_MAHASISWA)
      ) {
        const res = await getAllTopicsS2({
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          search: searchValue === "" ? undefined : searchValue,
          idPembimbing: isDosen(sessionData?.roles)
            ? sessionData?.id
            : undefined,
        });

        return { data: res.data.data, maxPage: res.data.maxPage };
      } else {
        return { data: [], maxPage: 1 };
      }
    },
  );

  useEffect(() => {
    updateData();
  }, [strataFilter]);

  const columns = [
    columHelper.accessor("judul", {
      minSize: 150,
      enableSorting: false,
      header: "Nama Topik",
    }),
    columHelper.accessor("deskripsi", {
      minSize: 450,
      enableSorting: false,
      header: "Deskripsi",
    }),
    columHelper.accessor("pengaju.nama", {
      minSize: 150,
      maxSize: 150,
      enableSorting: false,
      header: "Dosen Pengaju",
    }),
    columHelper.accessor("id", {
      id: "action",
      minSize: 10,
      maxSize: 10,
      header: "",
      enableSorting: false,
      enableResizing: false,
      cell: ({ row }) => (
        <RowAction
          row={row}
          updateData={updateData}
          strata={withDropdown(sessionData?.roles) ? strataFilter : undefined}
        />
      ),
      meta: {
        align: "right",
      },
    }),
  ];

  if (!isAdmin(sessionData?.roles)) {
    if (isDosen(sessionData?.roles)) {
      columns.splice(2, 1);
    } else if (isMahasiswa(sessionData?.roles)) {
      columns.splice(3, 1);
    }
  }

  const table = useReactTable({
    data: data.data,
    columns,
    pageCount: data.maxPage,
    columnResizeMode: "onChange",
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  const { data: dosenOptions = [] } = useSWR("/dosen-bimbingan", async () => {
    if (!sessionData || !isAdmin(sessionData?.roles)) return [];

    if (strataFilter === "S1") {
      const res = await getAllDosenPembimbingS1();

      const options: SelectData[] = res.data.map(({ id, nama }) => ({
        label: nama,
        value: id,
      }));

      return options;
    } else if (strataFilter === "S2") {
      const res = await getAllDosenPembimbingS2();

      const options: SelectData[] = res.data.map(({ id, nama }) => ({
        label: nama,
        value: id,
      }));

      return options;
    } else {
      return [];
    }
  });

  const handleClickGenerateTemplate = () => {
    const emptyObj: Record<string, null> = {};
    EXCEL_HEADERS.forEach((header) => {
      emptyObj[header] = null;
    });

    const worksheet = XLSX.utils.json_to_sheet([emptyObj]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Topik");

    XLSX.utils.sheet_add_aoa(
      worksheet,
      [["Pilihan Dosen:"], ...dosenOptions.map(({ label }) => [label])],
      {
        origin: "E3",
      },
    );

    worksheet["!cols"] = [
      { wch: 20 },
      { wch: 50 },
      { wch: 20 },
      { wch: 5 },
      { wch: 30 },
    ];
    XLSX.writeFile(workbook, "topik_template.xlsx", { compression: true });
  };

  const { trigger: triggerPostS1, error: errorPostS1 } = useSWRMutation(
    "/registrasi-topik/bulk",
    async (_, { arg }: { arg: PostNewTopicBulkReqData }) => {
      return await postNewTopicBulkS1(arg);
    },
  );

  const { trigger: triggerPostS2, error: errorPostS2 } = useSWRMutation(
    "/registrasi-topik/bulk",
    async (_, { arg }: { arg: PostNewTopicBulkReqData }) => {
      return await postNewTopicBulkS2(arg);
    },
  );

  const readAndPostTemplate = async (file: File) => {
    const ab = await file.arrayBuffer();
    const workbook = XLSX.read(ab);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const raw_data = XLSX.utils
      .sheet_to_json(worksheet, {
        header: EXCEL_HEADERS,
        blankrows: true,
      })
      .filter((_, idx) => idx > 0) as LoadedExcelData;

    const dosenNameIdMapping: Record<string, string> = {};
    dosenOptions.forEach(({ label, value }) => {
      dosenNameIdMapping[label] = value;
    });

    const postData: PostNewTopicBulkReqData = {
      data: [],
    };

    for (let idx = 0; idx < raw_data.length; idx++) {
      const element = raw_data[idx];
      if (!element.Judul && !element.Deskripsi && !element["Dosen Pengaju"])
        continue;

      if (!(element["Dosen Pengaju"] in dosenNameIdMapping)) {
        toast.error(
          `Terdapat nama dosen pengaju yang tidak valid pada row ${idx + 2}, harap perbaiki dan import ulang`,
        );
        return;
      }

      if (element.Judul.length === 0) {
        toast.error(
          `Terdapat judul kosong pada row ${idx + 2}, harap perbaiki dan import ulang`,
        );
        return;
      }

      if (element.Deskripsi.length === 0) {
        toast.error(
          `Terdapat deskripsi kosong pada row ${idx + 2}, harap perbaiki dan import ulang`,
        );
        return;
      }

      postData.data.push({
        judul: element.Judul,
        deskripsi: element.Deskripsi,
        idPengaju: dosenNameIdMapping[element["Dosen Pengaju"]],
      });
    }

    const toastId = toast.loading(
      `Menambahkan ${postData.data.length} topik...`,
    );

    if (strataFilter === "S1") {
      await triggerPostS1(postData);
    } else if (strataFilter === "S2") {
      await triggerPostS2(postData);
    }

    if (errorPostS1 || errorPostS2) {
      toast.update(toastId, {
        render: "Gagal menambahkan topik",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } else {
      toast.update(toastId, {
        render: `Berhasil menambahkan ${postData.data.length} topik...`,
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      updateData();
    }
  };

  const handleClickImportFromTemplate = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (_) => {
      let files = Array.from(input.files ?? []) ?? [];
      if (files.length > 0) {
        readAndPostTemplate(files[0]);
      }
    };
    input.click();
  };

  return {
    table,
    searchValue,
    isInsertDialogOpen,
    setIsInsertDialogOpen,
    handleChangeSearchValue,
    updateData,
    handleClickGenerateTemplate,
    handleClickImportFromTemplate,
    roles: sessionData?.roles,
    strataFilter,
    setStrataFilter,
  };
}
