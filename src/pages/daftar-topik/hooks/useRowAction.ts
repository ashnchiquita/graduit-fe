import { useState } from "react";

export default function useRowAction() {
  const [deleteDialogOpen, setDeteleDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  return {
    deleteDialogOpen,
    updateDialogOpen,
    setUpdateDialogOpen,
    setDeteleDialogOpen,
  };
}
