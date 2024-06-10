import CreateAccountForm from "../components/CreateAccountForm";
import useAkunCreate from "./hooks/useAkunCreate";

export default function AkunCreate(): JSX.Element {
  const { form, handleSubmit, roleAccess } = useAkunCreate();

  return (
    <CreateAccountForm
      form={form}
      handleSubmit={handleSubmit}
      roleAccess={roleAccess}
      title="Tambah Akun"
    />
  );
}
