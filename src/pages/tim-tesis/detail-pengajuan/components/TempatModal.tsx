import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TempatModalProps } from "../type";
import { FormField, FormItem, Form } from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import useTempatModal from "../hooks/useTempatModal";

export default function TempatModal({
  tempat,
  onChange,
  modalTrigger,
}: TempatModalProps): JSX.Element {
  const { dialogOpen, setDialogOpen, handleChange, form } = useTempatModal(
    tempat,
    onChange,
  );
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{modalTrigger}</DialogTrigger>

      <DialogContent className="max-w-[330px] rounded-md md:max-w-[425px]">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-left">Ruangan Sidang</DialogTitle>
          <DialogDescription className="text-left">
            Ubah ruangan untuk sidang.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleChange)}>
            <FormField
              control={form.control}
              name="tempat"
              render={({ field }) => (
                <FormItem>
                  <Input value={field.value} onChange={field.onChange} />
                  <div className="flex w-full justify-end gap-2">
                    <Button
                      className="bg-blue-500 px-4 text-gray-100 hover:bg-blue-600"
                      type="submit"
                    >
                      Ubah
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
