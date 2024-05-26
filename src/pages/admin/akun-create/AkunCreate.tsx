import AccountForm from "../components/AccountForm";
import useAkunCreate from "./hooks/useAkunCreate";

export default function AkunCreate(): JSX.Element {
  const { form, handleSubmit, roleAccess } = useAkunCreate();

  return (
    <AccountForm
      form={form}
      handleSubmit={handleSubmit}
      roleAccess={roleAccess}
      title="Tambah Akun"
    />
  );
}
