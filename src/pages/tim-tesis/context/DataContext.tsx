import { createContext, useContext } from "react";

const DataContext = createContext({
  refreshData: () => {},
});

// eslint-disable-next-line
export const useData = () => useContext(DataContext);
export default DataContext;
