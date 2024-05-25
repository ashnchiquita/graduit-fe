import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
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
  import { Form, FormField, FormItem } from "@/components/ui/form";
  import { RoleDialogProps } from "../types";
  
  export default function TambahRoleDialog({
    tambahRoleDialogOpen,
    setTambahRoleDialogOpen,
    isSubmitDisabled,
    setSubmitDisabled,
    table,
    form,
    handleSubmit,
    roleAccess,
  }: RoleDialogProps): JSX.Element {
    return (
      <Dialog open={tambahRoleDialogOpen} onOpenChange={setTambahRoleDialogOpen}>
        <DialogContent className="max-w-[330px] rounded-md md:max-w-[425px]">
          <DialogHeader className="gap-2">
            <DialogTitle className="text-left">Ubah Role Pengguna</DialogTitle>
            <DialogDescription className="text-left">
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
    );
  }
  