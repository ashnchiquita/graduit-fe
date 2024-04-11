import SelectData from "@/types/select-data";
import { RoleEnum } from "@/types/session-data";
import {
  PaginationState,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import * as XLSX from "xlsx";
import { getAllDosenPembimbing, postNewTopicBulk } from "../clients";
import RowAction from "../components/RowAction";
import { EXCEL_HEADERS } from "../constants";
import {
  DaftarTopikData,
  LoadedExcelData,
  PostNewTopicBulkReqData,
} from "../types";

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
  {
    id: "1",
    deskripsi: "desk 2",
    judul: "topik 2",
    pengaju: {
      id: "d682f596-9ee3-485d-89bb-402e54106b60",
      nama: "Rafa Maulana 1",
      email: "gmail@gmail.com",
      roles: [RoleEnum.S2_PEMBIMBING],
    },
    periode: "PRABOWO",
  },
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

  // TODO wire actual data
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

  const { data: dosenOptions = [] } = useSWR("/dosen-bimbingan", async () => {
    const res = await getAllDosenPembimbing();

    const options: SelectData[] = res.data.map(({ id, nama }) => ({
      label: nama,
      value: id,
    }));

    return options;
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

  const { trigger: triggerPost } = useSWRMutation(
    "/registrasi-topik/bulk",
    async (_, { arg }: { arg: PostNewTopicBulkReqData }) => {
      return await postNewTopicBulk(arg);
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

    try {
      await triggerPost(postData);
      toast.success(`Berhasil menambahkan ${postData.data.length} topik`);
    } catch (error) {
      toast.error(`Gagal mengirimkan penambahan topik`);
      console.error(error);
    } finally {
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
  };
}
