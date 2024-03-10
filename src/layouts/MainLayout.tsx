// Library imports
import { Outlet } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";

// Local imports
// import axios from "@/config/axios-config";

// Component imports
import Sidebar from "@/layouts/components/Sidebar";
import Breadcrumb from "@/layouts/components/Breadcrumb";
import { Loader } from "@/components/ui/loader";
import TopNav from "@/layouts/components/TopNav";

const MainLayoutLoader = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Loader size={64} />
    </div>
  );
};

export default function MainLayout(): JSX.Element {
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
          <Sidebar closed={sidebarClosed} />
          <div className="flex h-screen w-full flex-col overflow-y-scroll">
            <TopNav closed={sidebarClosed} setClosed={setSidebarClosed} />
            <Breadcrumb closed={sidebarClosed} setClosed={setSidebarClosed} />
            <Suspense fallback={<MainLayoutLoader />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
