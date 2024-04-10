import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useInfoKontakDialog from "../hooks/useInfoKontakDialog";
import {
  FormControl,
  FormField,
  FormItem,
  Form,
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";

type InfoKontakDialogProps = {
  infoKontak: string;
  dialogTrigger: JSX.Element;
};

export default function InfoKontakDialog({
  infoKontak,
  dialogTrigger,
}: InfoKontakDialogProps): JSX.Element {
  const { form, kontakDialogOpen, setKontakDialogOpen, handleSubmit } =
    useInfoKontakDialog(infoKontak);

  return (
    <Dialog open={kontakDialogOpen} onOpenChange={setKontakDialogOpen}>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent className="max-w-[330px] rounded-md md:max-w-[425px]">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-left">Ubah Informasi Kontak</DialogTitle>
          <DialogDescription className="text-left">
            Anda akan mengubah informasi kontak Anda yang bisa dilihat oleh
            mahasiswa.
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Informasi dapat berupa nomor telepon, email, ataupun MS Teams.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="infoKontak"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Masukkan informasi kontak Anda"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="mt-8 flex w-full justify-end gap-2">
              <Button
                disabled={
                  form.formState.isSubmitting ||
                  form.getValues().infoKontak === infoKontak
                }
                className="bg-blue-500 px-4 text-gray-100 hover:bg-blue-600"
                type="submit"
              >
                Ubah Kontak
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
