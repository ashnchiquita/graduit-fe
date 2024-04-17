import { createContext, useContext } from "react";

const DataContext = createContext({
  refreshData: () => {},
});

export const useData = () => useContext(DataContext);
export default DataContext;
