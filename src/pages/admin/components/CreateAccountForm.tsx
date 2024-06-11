import MailLogo from "@/assets/account-form/mail-logo.svg";
import UserLogo from "@/assets/account-form/user-logo.svg";
import PasswordLogo from "@/assets/account-form/lock-logo.svg";
import RoleLogo from "@/assets/account-form/check-logo.svg";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { RoleEnum } from "@/types/session-data";

interface ComponentProps {
  form: UseFormReturn<{
    email: string;
    name: string;
    password: string;
    access: { name: string; id: RoleEnum }[];
    nim?: string;
  }>;
  handleSubmit: (values: {
    email: string;
    name: string;
    password: string;
    access: { name: string; id: RoleEnum }[];
    nim?: string;
  }) => void;
  roleAccess: { name: string; id: RoleEnum }[];
  title: string;
}

export default function CreateAccountForm({
  form,
  handleSubmit,
  title,
}: ComponentProps): JSX.Element {
  const navigate = useNavigate();
  const { watch, formState } = form;
  const access = watch("access");
  const isMahasiswa =
    access.some((role) => role.id === RoleEnum.S2_MAHASISWA) ||
    access.some((role) => role.id === RoleEnum.S1_MAHASISWA);

  const accessOptions = [
    { name: "Admin", id: RoleEnum.ADMIN },
    { name: "Tim Tesis", id: RoleEnum.S2_TIM_TESIS },
    { name: "Mahasiswa S2", id: RoleEnum.S2_MAHASISWA },
    { name: "Dosen Pembimbing S2", id: RoleEnum.S2_PEMBIMBING },
    { name: "Dosen Penguji S2", id: RoleEnum.S2_PENGUJI },
    { name: "Tim TA", id: RoleEnum.S1_TIM_TA },
    { name: "Mahasiswa S1", id: RoleEnum.S1_MAHASISWA },
    { name: "Dosen Pembimbing S1", id: RoleEnum.S1_PEMBIMBING },
    { name: "Dosen Penguji S1", id: RoleEnum.S1_PENGUJI },
  ];

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
              className={`h-fit rounded-lg px-4 text-gray-100 ${
                formState.isValid && (isMahasiswa ? form.watch("nim") : true)
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "cursor-not-allowed bg-gray-300"
              }`}
              type="button"
              onClick={onSubmit}
              disabled={
                !formState.isValid || (isMahasiswa && !form.watch("nim"))
              }
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
              name="password"
              render={({ field }) => (
                <>
                  <FormLabel className="col-start-1 col-end-1 row-start-5 row-end-5 lg:row-start-3 lg:row-end-3">
                    <img src={PasswordLogo} className="size-7" alt="" />
                  </FormLabel>
                  <FormLabel className="col-start-2 col-end-2 row-start-5 row-end-5 text-sm font-bold text-slate-500 lg:row-start-3 lg:row-end-3">
                    Password
                  </FormLabel>
                  <FormControl className="col-start-1 col-end-4 row-start-6 row-end-6 lg:col-start-3 lg:col-end-3 lg:row-start-3 lg:row-end-3">
                    <Input {...field} className="text-sm" type="password" />
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
              render={({ field }) => (
                <>
                  <FormLabel className="col-start-1 col-end-1 row-start-7 row-end-7 lg:row-start-4 lg:row-end-4">
                    <img src={RoleLogo} className="size-7" alt="" />
                  </FormLabel>
                  <FormLabel className="col-start-2 col-end-2 row-start-7 row-end-7 text-sm font-bold text-slate-500 lg:row-start-4 lg:row-end-4">
                    Role
                  </FormLabel>
                  <FormControl className="col-start-1 col-end-4 row-start-8 row-end-8 lg:col-start-3 lg:col-end-3 lg:row-start-4 lg:row-end-4">
                    <select
                      {...field}
                      className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm"
                      value={field.value.map((v) => v.id.toString())}
                      onChange={(e) => {
                        const selectedOptions = Array.from(
                          e.target.selectedOptions,
                          (option) => option.value,
                        );
                        const selectedRoles = accessOptions.filter((option) =>
                          selectedOptions.includes(option.id.toString()),
                        );
                        field.onChange(selectedRoles);
                      }}
                    >
                      {accessOptions.map((option) => (
                        <option key={option.id} value={option.id.toString()}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </>
              )}
            />

            {isMahasiswa && (
              <FormField
                control={form.control}
                name="nim"
                render={({ field }) => (
                  <>
                    <FormLabel className="col-start-1 col-end-1 row-start-9 row-end-9 lg:row-start-5 lg:row-end-5">
                      <img src={UserLogo} className="size-7" alt="" />
                    </FormLabel>
                    <FormLabel className="col-start-2 col-end-2 row-start-9 row-end-9 text-sm font-bold text-slate-500 lg:row-start-5 lg:row-end-5">
                      NIM
                    </FormLabel>
                    <FormControl className="col-start-1 col-end-4 row-start-10 row-end-10 lg:col-start-3 lg:col-end-3 lg:row-start-5 lg:row-end-5">
                      <Input {...field} className="text-sm" />
                    </FormControl>
                  </>
                )}
              />
            )}
          </div>
        </form>
      </Form>
    </main>
  );
}
