import { DataTable } from "@/components/DataTable";
import useBatchUbahRole from "./hooks/useBatchUbahRole";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VscChromeClose } from "react-icons/vsc";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { roleAccess } from "../akun-create/constants/roleAccess";
import { Form, FormField, FormItem } from "@/components/ui/form";

export default function BatchUbahRole(): JSX.Element {
  const {
    table,
    searchValue,
    handleSearchValueChange,
    dialogOpen,
    setDialogOpen,
    isSubmitDisabled,
    setSubmitDisabled,
    form,
    handleSubmit,
  } = useBatchUbahRole();

  return (
    <main className="flex w-full flex-col gap-5 px-4">
      <DataTable
        table={table}
        headline="Pengaturan Role Pengguna"
        searchValue={searchValue}
        setSearchValue={handleSearchValueChange}
        // onClickCreate={onClickCreate}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader className="gap-2">
            <DialogTitle>Ubah Role Pengguna</DialogTitle>
            <DialogDescription>
              Anda akan mengubah role pada{" "}
              {table.getSelectedRowModel().flatRows.length} akun pengguna.{" "}
              <span className="font-bold">
                Semua pengguna akan diberikan role berikut.
              </span>
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="access"
                render={() => (
                  <FormItem className="flex flex-col gap-1">
                    {form.getValues().access.length > 0 ? (
                      <ul className="flex flex-wrap gap-2 ">
                        {form.getValues().access.map((acc, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-2 rounded-md py-1 text-xs font-medium text-primary"
                          >
                            {acc.name}
                            <button
                              onClick={() => {
                                form.setValue(
                                  "access",
                                  form
                                    .getValues()
                                    .access.filter((v) => v.id !== acc.id),
                                );
                                setSubmitDisabled(
                                  form.getValues().access.length === 0,
                                );
                              }}
                            >
                              <VscChromeClose />
                            </button>
                          </Badge>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs font-medium text-muted-foreground">
                        Pilih role di bawah...
                      </p>
                    )}

                    <Select
                      onValueChange={(val) => {
                        if (
                          !form
                            .getValues()
                            .access.map((v) => v.id.toString())
                            .includes(val)
                        ) {
                          form.setValue("access", [
                            ...form.getValues().access,
                            roleAccess.find(
                              (v) => v.id.toString() === val,
                            ) as any,
                          ]);
                          setSubmitDisabled(
                            form.getValues().access.length === 0,
                          );
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleAccess.map((acc, index) => (
                          <SelectItem value={acc.id.toString()} key={index}>
                            {acc.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <div className="mt-8 flex w-full justify-end gap-2">
                <Button
                  disabled={isSubmitDisabled}
                  className="bg-blue-500 text-gray-100 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-primary-foreground"
                  type="submit"
                >
                  Ubah Role
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
