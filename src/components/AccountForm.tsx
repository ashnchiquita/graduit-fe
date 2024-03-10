import { Form, FormControl, FormField, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { VscChromeClose } from "react-icons/vsc";
import { FaChevronLeft } from "react-icons/fa";
import MailLogo from "@/assets/mail-logo.svg";
import UserLogo from "@/assets/user-logo.svg";
import CheckLogo from "@/assets/check-logo.svg";
import LockLogo from "@/assets/lock-logo.svg";
import { UseFormReturn } from "react-hook-form";
import { Link } from "react-router-dom";

interface ComponentProps {
  form: UseFormReturn<
    {
      email: string;
      name: string;
      access: {
        name: string;
        id: number;
      }[];
    },
    any,
    undefined
  >;
  handleSubmit: (values: {
    email: string;
    name: string;
    access: {
      name: string;
      id: number;
    }[];
  }) => void;
  roleAccess: {
    id: number;
    name: string;
  }[];
  title: string;
}

export default function AccountForm({
  form,
  handleSubmit,
  roleAccess,
  title,
}: ComponentProps): JSX.Element {
  return (
    <main className="h-screen w-full p-5 pt-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex size-full flex-col gap-10 rounded-2xl bg-white p-8 lg:px-12"
        >
          <div className="flex w-full justify-between">
            <div className="flex items-center">
              <Link to="/manajemen/kelola-akun">
                <FaChevronLeft />
              </Link>
              <h1 className="ml-6 text-xl font-medium">{title}</h1>
            </div>
            <Button
              className="bg-blue-500 px-9 text-gray-100 hover:bg-blue-600"
              type="submit"
            >
              Simpan
            </Button>
          </div>

          <div className="grid w-full grid-cols-[40px_100px_1fr] items-center gap-y-3.5 lg:grid-cols-[50px_100px_1fr] lg:gap-y-[18px] lg:pl-10">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <>
                  <FormLabel className="col-start-1 col-end-1 row-start-1 row-end-1">
                    <img src={MailLogo} className="size-7" alt="" />
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

            <FormField
              control={form.control}
              name="access"
              render={() => (
                <>
                  <FormLabel className="col-start-1 col-end-1 row-start-5 row-end-5 lg:row-start-3 lg:row-end-3">
                    <img src={LockLogo} className="size-7" alt="" />
                  </FormLabel>
                  <FormLabel className="col-start-2 col-end-4 row-start-5 row-end-5 text-sm font-bold text-slate-500 lg:row-start-3 lg:row-end-3">
                    Akses Aplikasi
                  </FormLabel>

                  <ul className="col-start-1 col-end-4 row-start-6 row-end-6 flex flex-wrap gap-2 lg:col-start-2 lg:col-end-4 lg:row-start-4 lg:row-end-4">
                    {form.getValues().access.map((access, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-2 rounded-md py-1 text-xs font-medium text-primary"
                      >
                        {access.name}
                        <button
                          onClick={() => {
                            form.setValue(
                              "access",
                              form
                                .getValues()
                                .access.filter((v) => v.id !== access.id),
                            );
                          }}
                        >
                          <VscChromeClose />
                        </button>
                      </Badge>
                    ))}
                  </ul>

                  <Command className="col-start-1 col-end-4 row-start-9 row-end-9 border lg:col-start-2 lg:col-end-4 lg:row-start-6 lg:row-end-6">
                    <CommandInput />
                    <CommandGroup>
                      {roleAccess.map((access, index) => (
                        <CommandItem
                          className="px-8 py-2 text-sm font-medium"
                          value={access.name}
                          key={index}
                          onSelect={() => {
                            if (
                              !form
                                .getValues()
                                .access.map((v) => v.id)
                                .includes(access.id)
                            ) {
                              form.setValue("access", [
                                ...form.getValues().access,
                                access,
                              ]);
                            }
                          }}
                        >
                          {access.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </>
              )}
            ></FormField>
          </div>
        </form>
      </Form>
    </main>
  );
}
