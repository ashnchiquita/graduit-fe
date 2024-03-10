// Library imports
import { useEffect, useState } from "react";
// Local imports
// import axios from "@/config/axios-config";

// Component imports
import Breadcrumb from "@/layouts/components/Breadcrumb";
import SidebarTimTesis from "@/layouts/components/SidebarTimTesis";
import AccountTimTesis from "./components/AccountTimTesis";

export default function AccountTimTesisLayout(): JSX.Element {
  // Component states
  const [loading, setLoading] = useState<boolean>(true);
  const [sidebarClosed, setSidebarClosed] = useState<boolean>(true);

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
          <SidebarTimTesis />
          <div className="flex h-screen w-full flex-col overflow-y-scroll">
            <Breadcrumb closed={sidebarClosed} setClosed={setSidebarClosed} />
            <AccountTimTesis />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
