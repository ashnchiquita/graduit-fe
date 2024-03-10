import axios from "@/config/login-axios-config";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
interface ReturnType {
  handleDelete: (id: string) => Promise<void>;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useRowAction(
  refetchAccounts: (search: string) => Promise<void>,
): ReturnType {
  const [searchParams] = useSearchParams();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = async (id: string) => {
    // TODO: Add toast
    try {
      await axios.delete(`/akun/${id}`);
      await refetchAccounts(searchParams.get("search") || "");
      setDialogOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return { handleDelete, dialogOpen, setDialogOpen };
}
