import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { HapusRoleDialogProps } from "../types";

export default function HapusRoleDialog({
  hapusRoleDialogOpen,
  setHapusRoleDialogOpen,
  table,
  form,
  handleSubmit,
}: HapusRoleDialogProps): JSX.Element {
  return (
    <Dialog open={hapusRoleDialogOpen} onOpenChange={setHapusRoleDialogOpen}>
      <DialogContent className="max-w-[330px] rounded-md md:max-w-[425px]">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-left">Ubah Role Pengguna</DialogTitle>
          <DialogDescription className="text-left">
            Anda akan{" "}
            <span className=" font-bold text-destructive">MENGHAPUS</span>{" "}
            seluruh akses aplikasi pada{" "}
            {table.getSelectedRowModel().flatRows.length} akun pengguna.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex w-full justify-end gap-2">
              <Button variant={"ghost"} className="border border-input">
                Cancel
              </Button>
              <Button
                className="bg-destructive text-gray-100 disabled:bg-slate-200 disabled:text-primary-foreground"
                type="submit"
              >
                Hapus
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
