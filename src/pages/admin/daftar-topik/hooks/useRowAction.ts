import { useState } from "react";

export default function useRowAction() {
  const [deleteDialogOpen, setDeteleDialogOpen] = useState(false);

  const openDeleteDialog = () => {
    setDeteleDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeteleDialogOpen(false);
  };

  return { deleteDialogOpen, openDeleteDialog, closeDeleteDialog };
}
