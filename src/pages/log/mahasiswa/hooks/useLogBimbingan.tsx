import type { MahasiswaLogs } from "@/lib/entity";
import {
  ColumnDef,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Badge } from '../components/BadgeTable';
import { ButtonDownload } from '../components/ButtonTable';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const useLogBimbingan = () => {
        const data: MahasiswaLogs[] = [
            {
            tanggal: "12/12/2024",
            laporanKemajuan: "lorem ipsum",
            toDo: "membantu orang tua",
            berkas: {
                nama: "berkas",
                url: "google.com"
            },
            status: "Menunggu",
            rencana: "12/1/2025",
            },
        ];
    
      const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
      });
    
      const [sorting, setSorting] = useState<SortingState>([
        {
          id: "id",
          desc: false,
        },
      ]);
    
      useEffect(() => {
        console.log(sorting);
      }, [sorting]);
    
      const navigate = useNavigate();


      const onClickCreate = () => {
        console.log("HAHAH")
      }

      const onClickFilter = () => {
        
      }

      const columns: ColumnDef<MahasiswaLogs>[] = [
        {
          header: "Tanggal",
          accessorKey: "tanggal",
          minSize: 1000,
        },
        {
          header: "Laporan Kemajuan",
          accessorKey: "laporanKemajuan",
          minSize: 1000,
          enableSorting: false
        },
        {
          header: "To-Do",
          accessorKey: "toDo",
          minSize: 1000,
          enableSorting: false
    
        },
        {
          header: "Berkas",
          accessorKey: "berkas",
          minSize: 1000,
          cell: ({ row }) => <ButtonDownload row={row}/>,
          enableSorting: false,
    
        },
        {
          header: "Status",
          accessorKey: "status",
          minSize: 1000,
          cell: ({row}) => <Badge row={row} variant={row.original.status == "Sah" ? "default" : (row.original.status == "Menunggu" ? "warning" : "danger")}/>,
          enableSorting: false
        },
        {
          header: "Rencana",
          accessorKey: "rencana",
          minSize: 1000,
          enableSorting: false
        },
      ];

      const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        state: {
          pagination,
          sorting,
        },
      });
  return {
    table,
    onClickCreate,
    onClickFilter
  }
}

export default useLogBimbingan
