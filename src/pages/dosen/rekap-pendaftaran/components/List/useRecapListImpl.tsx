import { useState } from "react";
import { RECAP_FILTER_STATUS_OPTIONS } from "../../constants";

const useRecapListImpl = () => {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState(
    RECAP_FILTER_STATUS_OPTIONS[0].value,
  );

  const [currentPage, setCurrentPage] = useState(1);

  return {
    searchValue,
    statusFilter,
    currentPage,
    setCurrentPage,
    setStatusFilter,
    setSearchValue,
  };
};

export default useRecapListImpl;
