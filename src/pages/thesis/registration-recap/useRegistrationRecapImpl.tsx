import useWindowSize from "@/hooks/useWindowSize";
import { useEffect, useState } from "react";
import { MOBILE_BREAKPOINT } from "./constants";
import { useRegistrationRecapData } from "./hooks/useRegistrationRecapData";
import { RegistrationRecapListData } from "./types";

const useRegistrationRecapImpl = () => {
  const [currentApplicationId, setCurrentApplicationId] = useState("");
  const [currentApplicationData, setCurrentApplicationData] =
    useState<RegistrationRecapListData | null>(null);

  const [width] = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  const { data: listData, mutate: fetchData } = useRegistrationRecapData();

  useEffect(() => {
    setCurrentApplicationData(
      listData.find(({ id }) => id === currentApplicationId) ?? null,
    );
  }, [currentApplicationId, listData]);

  useEffect(() => {
    setIsMobile(width < MOBILE_BREAKPOINT);
    if (
      currentApplicationId === "" &&
      width >= MOBILE_BREAKPOINT &&
      listData.length > 0
    ) {
      setCurrentApplicationId(listData[0].id);
    }
  }, [width, listData, currentApplicationId]);

  return {
    listData,
    currentApplicationData,
    currentApplicationId,
    setCurrentApplicationId,
    isMobile,
    fetchData,
  };
};

export default useRegistrationRecapImpl;
