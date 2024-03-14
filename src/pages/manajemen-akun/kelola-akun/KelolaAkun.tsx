import { DataTable } from "@/components/DataTable";
import useKelolaAkun from "./hooks/useKelolaAkun";

export default function KelolaAkun(): JSX.Element {
  const { table, searchValue,handleSearchValueChange, onClickCreate } = useKelolaAkun();

  return (
    <main className="flex w-full flex-col gap-5 px-4">
      <DataTable table={table} headline="Kelola Akun Pengguna" searchValue={searchValue} setSearchValue={handleSearchValueChange} onClickCreate={onClickCreate} />
      {/* <div className="flex w-full gap-4">
        <Input
          defaultValue={searchParams.get("search") || ""}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            // TODO: Debounce
            setSearchParams(e.target.value ? { search: e.target.value } : {})
          }
          className="w-full"
          placeholder="Masukkan nama atau email"
        />
        <Link to="/manajemen/tambah-akun">
          <Button className="px-7">Buat Akun</Button>
        </Link>
      </div>

      <Table className="border-none text-sm">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="group/row border-none">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="group/cell px-0 pb-1.5 font-normal text-primary"
                >
                  <div className="min-h-11 w-full bg-input px-4 py-3 group-first/cell:rounded-s-md group-last/cell:rounded-e-md">
                    <div className="flex min-h-5 items-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </div>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="group/row border-none">
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="group/cell px-0 py-0.5 group-first/row:pt-1.5 group-last/row:pb-0"
                >
                  <div className="min-h-11 w-full bg-white px-4 py-3 group-first/cell:rounded-s-md group-last/cell:rounded-e-md">
                    <div className="flex min-h-5 items-center text-ellipsis whitespace-nowrap font-medium text-primary">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </div>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
    </main>
  );
}
