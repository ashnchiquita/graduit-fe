import MailLogo from "@/assets/account-form/mail-logo.svg";
import UserLogo from "@/assets/account-form/user-logo.svg";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface ComponentProps {
  form: UseFormReturn<{
    email: string;
    name: string;
    access: { name: string; id: number }[];
    nim?: string;
  }>;
  handleSubmit: (values: {
    email: string;
    name: string;
    access: { name: string; id: number }[];
    nim?: string;
  }) => void;
  roleAccess: { name: string; id: number }[];
  title: string;
}

export default function AccountForm({
  form,
  handleSubmit,
  title,
}: ComponentProps): JSX.Element {
  const navigate = useNavigate();

  const onSubmit = () => {
    const values = form.getValues();
    handleSubmit(values);
  };

  return (
    <main className="w-full px-4 pb-4">
      <Form {...form}>
        <form className="flex size-full flex-col gap-6 rounded-lg bg-white p-4">
          <div className="flex w-full justify-between">
            <div className="flex items-center">
              <button type="button" onClick={() => navigate(-1)}>
                <ArrowLeft size={20} className="text-gray-500" />
              </button>
              <h1 className="ml-4 text-lg font-bold">{title}</h1>
            </div>
            <Button
              className="h-fit rounded-lg bg-blue-500 px-4 text-gray-100 hover:bg-blue-600"
              type="button"
              onClick={onSubmit} // Call the custom onSubmit handler
            >
              Simpan
            </Button>
          </div>

          <div className="grid w-full grid-cols-[40px_100px_1fr] items-center gap-y-3.5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <>
                  <FormLabel className="col-start-1 col-end-1 row-start-1 row-end-1">
                    <img src={MailLogo} className="size-8" alt="" />
                  </FormLabel>
                  <FormLabel className="col-start-2 col-end-2 row-start-1 row-end-1 text-sm font-bold text-slate-500">
                    Email
                  </FormLabel>
                  <FormControl className="col-start-1 col-end-4 row-start-2 row-end-2 lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-1">
                    <Input {...field} className="text-sm" type="email" />
                  </FormControl>
                </>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <>
                  <FormLabel className="col-start-1 col-end-1 row-start-3 row-end-3 lg:row-start-2 lg:row-end-2">
                    <img src={UserLogo} className="size-7" alt="" />
                  </FormLabel>
                  <FormLabel className="col-start-2 col-end-2 row-start-3 row-end-3 text-sm font-bold text-slate-500 lg:row-start-2 lg:row-end-2">
                    Nama
                  </FormLabel>
                  <FormControl className="col-start-1 col-end-4 row-start-4 row-end-4 lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-2">
                    <Input {...field} className="text-sm" />
                  </FormControl>
                </>
              )}
            />
          </div>
        </form>
      </Form>
    </main>
  );
}
