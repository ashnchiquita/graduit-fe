// Library imports
import { useEffect, useState } from "react";
// Local imports
// import axios from "@/config/axios-config";

// Component imports
import SidebarTimTesis from "@/layouts/components/SidebarTimTesis";
import Alert from "./components/Alert";

export default function DashboardTimTesisLayout(): JSX.Element {
  // Component states
  const [loading, setLoading] = useState<boolean>(true);
  const [sidebarClosed] = useState<boolean>(false); // Sidebar muncul diawal

  useEffect(() => {
    (async () => {
      // await axios.get("/users/session");
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {!loading ? (
        <div className="flex h-screen w-full overflow-hidden bg-slate-100">
          <SidebarTimTesis closed={sidebarClosed} />
          <div className="flex h-screen w-full flex-col overflow-y-scroll">
            <Alert deadline="10-03-2024 00:00" />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
