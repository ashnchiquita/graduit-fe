import AccountForm from "../components/AccountForm";
import useAkunDetail from "./hooks/useAkunDetail";

export default function AkunDetail(): JSX.Element {
  const { form, handleSubmit, roleAccess } = useAkunDetail();

  return (
    <AccountForm
      form={form}
      handleSubmit={handleSubmit}
      roleAccess={roleAccess}
      title="Detail Akun"
    />
  );
}
