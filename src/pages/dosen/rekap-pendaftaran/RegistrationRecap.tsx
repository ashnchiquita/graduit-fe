import { ChevronLeft } from "lucide-react";
import RecapDetail from "./components/Detail/RecapDetail";
import RecapList from "./components/List/RecapList";
import useRegistrationRecapImpl from "./useRegistrationRecapImpl";

const RegistrationRecap = () => {
  const {
    currentApplicationId,
    listData,
    currentApplicationData,
    setCurrentApplicationId,
    isMobile,
    fetchData,
  } = useRegistrationRecapImpl();

  return (
    <div className="flex flex-1 flex-col gap-9 overflow-hidden px-4">
      <div className="flex items-center gap-3">
        {isMobile && currentApplicationId !== "" && (
          <ChevronLeft
            className="cursor-pointer"
            onClick={() => setCurrentApplicationId("")}
            size={32}
          />
        )}
        <h1 className="text-3xl font-bold">
          {isMobile && currentApplicationId !== ""
            ? "Detail Pendaftaran"
            : "Rekap Pendaftaran"}
        </h1>
      </div>
      <div className="flex flex-1 gap-4  overflow-hidden pb-8">
        {(!isMobile || (isMobile && currentApplicationId === "")) && (
          <RecapList
            currentApplicationId={currentApplicationId}
            setCurrentApplicationId={setCurrentApplicationId}
            listData={listData}
          />
        )}
        {(!isMobile || (isMobile && currentApplicationId !== "")) && (
          <RecapDetail data={currentApplicationData} refetchData={fetchData} />
        )}
      </div>
    </div>
  );
};

export default RegistrationRecap;
