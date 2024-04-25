import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { getAllDosenPembimbing, postTopics } from "../clients";
import { PostNewTopicBulkReqData, Topic } from "../types";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import { EXCEL_HEADERS } from "@/pages/admin/daftar-topik/constants";
import { LoadedExcelData } from "@/pages/admin/daftar-topik/types";
import SelectData from "@/types/select-data";

const DUMMY_DATA: Topic[] = [
  {
    id: "test",
    lect_name: "test",
    title: "test",
    description: "test",
    period: "test",
  },
];

export default function useTopik() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );

  const [isInsertDialogOpen, setIsInsertDialogOpen] = useState(false);

  const { data: dosenOptions = [] } = useSWR("/dosen-bimbingan", async () => {
    const res = await getAllDosenPembimbing();

    const options: SelectData[] = res.data.map(({ id, nama }) => ({
      label: nama,
      value: id,
    }));

    return options;
  });

  const handleClickImportFromTemplate = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (_) => {
      let files = Array.from(input.files ?? []) ?? [];
      if (files.length > 0) {
        startImport(files[0]);
      }
    };
    input.click();
  };

  const startImport = async (file: File) => {
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
      fetchData();
    }
  };

  const { trigger: triggerPost } = useSWRMutation(
    "/api/admin/alokasi-topik",
    async (_, { arg }: { arg: PostNewTopicBulkReqData }) => {
      return await postTopics(arg);
    },
  );

  const handleSearchValueChange = (value: string) => {
    setSearchParams(value ? { search: value } : {});
    setSearchValue(value);
    fetchData();
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const { data = [], mutate: fetchData } = useSWR(
    "/api/admin/alokasi-topik",
    async () => {
      return DUMMY_DATA;

      // TODO: Fix wiring

      // const res = await getAllS1Topics({
      //   search: searchValue === "" ? undefined : searchValue,
      // });

      // const dataS1: Topic[] = res.data.data.map((resTopic) => ({
      //   id: resTopic.id,
      //   lect_name: resTopic.lect_name,
      //   title: resTopic.title,
      //   description: resTopic.description,
      //   period: resTopic.period,
      // }));

      // return dataS1;
    },
  );

  const columns: ColumnDef<Topic>[] = [
    {
      header: "Nama Topik",
      accessorKey: "title",
    },
    {
      header: "Deskripsi",
      accessorKey: "description",
    },
    {
      header: "Dosen Pengaju",
      accessorKey: "lect_name",
    },
  ];

  const table = useReactTable({
    columns,
    data,
    columnResizeMode: "onChange",
    enableSorting: false,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    searchValue,
    isInsertDialogOpen,
    handleSearchValueChange,
    fetchData,
    setIsInsertDialogOpen,
    handleClickImportFromTemplate,
  };
}
